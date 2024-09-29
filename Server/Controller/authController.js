const User = require("../Model/userModel");
const jwt = require("jsonwebtoken");
const asyncErrorHandler = require("../Utils/asyncErrorHandler");
const CustomError = require("../Utils/CustomErrorHandler");
const crypto = require("crypto");
const sendEmail = require("../Utils/email");

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

// Forget Password functionality
exports.forgetPassword = asyncErrorHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(
      new CustomError("We Could not find the user with the given email", 404)
    );
  }
  const resetToken = user.createResetPasswordToken();
  await user.save({ validateBeforeSave: false });
  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/auth/resetPassword/${resetToken}`;
  const message = `We have received a password reset request. Please use the below link to  reset your password \n\n ${resetPasswordUrl}\n\n This password link will be valid only for 10 minutes`;
  try {
    const options = {
      username: user.username,
      email: user.email,
      subject: "Password change request received",
      message: message,
    };
    await sendEmail(options);
    res.status(200).json({
      status: "success",
      message: "password reset link send to the user email",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;
    await user.save({ validateBeforeSave: false });
    console.log(err);
    next(
      new CustomError(
        "There was an error in sending reset password email! Please try again later",
        500
      )
    );
  }
});
exports.resetPassword = asyncErrorHandler(async (req, res, next) => {
  const resetToken = req.params.resetToken;
  if (!resetToken) {
  }
  const token = crypto.createHash("sha256").update(resetToken).digest("hex");
  const user = await User.findOne({
    passwordResetToken: token,
    passwordResetTokenExpires: { $gt: Date.now() },
  });
  if (!user) {
    next(new CustomError("Token is invalid or has expired", 400));
  }
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpires = undefined;
  await user.save();
  createSendResponse(user, 201, res);
});
