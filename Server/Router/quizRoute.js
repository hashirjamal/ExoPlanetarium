const express = require("express");
const quizRouter = express.Router();
const quizController = require("../Controller/quizController");

// Quiz Routes
quizRouter.route("/addQuestion").post(quizController.addQuestion);
quizRouter.route("/getQuestions").get(quizController.getQuestions);
quizRouter.route("/deleteQuestion/:id").delete(quizController.deleteQuestion);
quizRouter.route("/updateQuestion/:id").patch(quizController.updateQuestion);

module.exports = quizRouter;