const express = require("express");
const chatbotRouter = express.Router();
const chatbotController = require("../Controller/chatbotController")


chatbotRouter.route("/askAi").post(chatbotController.handlePrompt);


module.exports = chatbotRouter;