const express = require("express");
const authRouter = express.Router();
const authController = require("../Controller/authController");

// Authentication Routes
authRouter.route("/signUp").post(authController.signUp);
// authRouter
//   .route("/resetPassword/:resetToken")
//   .post(authController.);
// authRouter.route("/forgetPassword").post(authController.forgetPassword);
authRouter.route("/signIn").post(authController.signIn);

module.exports = authRouter;
