const express = require("express");
const authRouter = express.Router();
const authController = require("../Controller/authController");

// Authentication Routes
authRouter.route("/signIn").post(authController.signIn);
authRouter.route("/signUp").post(authController.signUp);
authRouter.route("/forgetPassword").post(authController.forgetPassword);
authRouter
  .route("/resetPassword/:resetToken")
  .post(authController.resetPassword);

module.exports = authRouter;
