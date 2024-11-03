const User = require("../Model/userModel");
const jwt = require("jsonwebtoken");
const asyncErrorHandler = require("../Utils/asyncErrorHandler");
const CustomError = require("../Utils/CustomErrorHandler");
const sendEmail = require("../Utils/email");
const crypto = require("crypto");
// functionlity for generating generating
const signToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_STR, {
    expiresIn: process.env.LOGIN_EXPIRES,
  });
};
const createSendResponse = (user, statusCode, res) => {
  const token = signToken(user._id);
  const options = {
    maxAge: process.env.LOGIN_EXPIRES,
    httpOnly: true,
  };
  res.cookie("jwt", token, options);
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};
// Sign Up functionality
exports.signUp = asyncErrorHandler(async (req, res, next) => {
  console.log(req.body);

  const user = await User.create(req.body);

  const { password: _password, ...rest } = user._doc;
  createSendResponse(rest, 201, res);
});
// Sign In functionality
exports.signIn = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email) {
    return next(new CustomError("Please provide Email ID for sign in", 404));
  }
  if (!password) {
    return next(new CustomError("Please provide password for sign in", 404));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.comparePasswordInDB(password, user.password))) {
    return next(new CustomError("Incorrect email or password", 401));
  }
  const { password: _password, ...rest } = user._doc;
  createSendResponse(rest, 200, res);
});

exports.forgotPassword = asyncErrorHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    const error = new CustomError(
      "Could not find the user with given email!",
      404
    );
    next(error);
  }

  const resetToken = user.createResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  try {
    await sendEmail({
      email: user.email,
      resetToken: resetToken,
    });

    res.status(200).json({
      status: "success",
      message: "OTP send to the user email!",
    });
  } catch (err) {
    console.log(err);
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;
    user.save({ validateBeforeSave: false });
    return next(
      new CustomError(
        "There was an error sending password reset email. Please try again later!",
        500
      )
    );
  }
});

exports.verifyOtp = asyncErrorHandler(async (req, res, next) => {
  const token = crypto.createHash("sha256").update(req.body.otp).digest("hex");
  const user = await User.findOne({
    passwordResetToken: token,
    passwordResetTokenExpires: { $gt: Date.now() },
  });

  if (!user) {
    const error = new CustomError("Token is invalid or has expired!", 400);
    next(error);
  }

  user.passwordResetToken = undefined;
  user.passwordResetTokenExpires = undefined;

  await user.save();

  res.status(200).json({
    status: "success",
    message: "OTP verified successfully! You can now reset your password.",
  });
});

exports.resetPassword = asyncErrorHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    const error = new CustomError(
      "Could not find the user with given email!",
      404
    );
    next(error);
  }

  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpires = undefined;
  user.passwordChangedAt = Date.now();

  user.save();

  res.status(200).json({
    status: "success",
    message: "Password reset successfully!",
  });
});

exports.logout = asyncErrorHandler(async (req, res, next) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });

  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });

  return res.status(200).json({ message: "Logged out successfully" });
});
