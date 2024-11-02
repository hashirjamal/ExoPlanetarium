const express = require("express");
const authRouter = express.Router();
const authController = require("../Controller/authController");

// Authentication Routes
authRouter.route("/signUp").post(authController.signUp);
authRouter.route("/forgetPassword").post(authController.forgotPassword);
authRouter.route("/signIn").post(authController.signIn);
authRouter.route("/verifyOtp").post(authController.verifyOtp);
authRouter.route("/resetPassword").patch(authController.resetPassword);
authRouter.route("/logout").post(authController.logout);

module.exports = authRouter;
