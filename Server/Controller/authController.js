const User = require("../Model/userModel");
const jwt = require("jsonwebtoken");
const asyncErrorHandler = require("../Utils/asyncErrorHandler");

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
exports.signIn = (req, res, next) => {
  console.log("hello jani kaise ho");
  console.log(req.body);
};
exports.signUp = asyncErrorHandler(async (req, res, next) => {
  const user = await User.create(req.body);
  console.log(user);
  createSendResponse(user, 201, res);
});
