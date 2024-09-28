const User = require("../Model/userModel");
const jwt = require("jsonwebtoken");
const asyncErrorHandler = require("../Utils/asyncErrorHandler");
const CustomError = require("../Utils/CustomErrorHandler");

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
