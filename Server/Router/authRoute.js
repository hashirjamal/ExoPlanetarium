const express = require("express");
const authRouter = express.Router();
const authController = require("../Controller/authController");

// Authentication Routes
authRouter.route("/signIn").post(authController.signIn);
authRouter.route("/signUp").post(authController.signUp);


module.exports = authRouter;
