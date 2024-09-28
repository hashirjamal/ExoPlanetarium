const Quiz = require("../Model/quizModel");
const asyncErrorHandler = require("../Utils/asyncErrorHandler");
const CustomError = require("../Utils/CustomErrorHandler");

// Add Question functionality
exports.addQuestion = asyncErrorHandler(async (req, res, next) => {
  const question = await Quiz.create(req.body);
  res.status(201).json({
    status: "success",
    message: "Question added successfully",
    data: {
      question,
    },
  });
});

// Get Questions functionality
exports.getQuestions = asyncErrorHandler(async (req, res, next) => {
  const questions = await Quiz.find().select("-__v");
  res.status(200).json({
    status: "success",
    data: {
      questions,
    },
  });
});

// Delete Question functionality
exports.deleteQuestion = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next(new CustomError("Please provide id to delete", 404));
  }
  await Quiz.findByIdAndDelete(id);
  res.status(200).json({
    status: "success",
    message: "Question deleted successfully",
  });
});

// Update Question functionality
exports.updateQuestion = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next(new CustomError("Please provide id to update", 404));
  }
  const question = await Quiz.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    message: "Question updated successfully",
    data: {
      question,
    },
  });
});