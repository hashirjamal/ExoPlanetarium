const express = require("express");
const quizRouter = express.Router();
const quizController = require("../Controller/quizController");

// Quiz Routes
quizRouter.route("/addQuestion").post(quizController.addQuestion);
quizRouter.route("/deleteQuestion/:id").delete(quizController.deleteQuestion);
quizRouter.route("/updateQuestion/:id").patch(quizController.updateQuestion);
quizRouter.route("/saveHighScore").patch(quizController.saveHighScore);
quizRouter.route("/getQuestions").get(quizController.getQuestions);
quizRouter.route("/getHighScore").get(quizController.getHighScore);

module.exports = quizRouter;