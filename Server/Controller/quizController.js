const Quiz = require("../Model/quizModel");
const asyncErrorHandler = require("../Utils/asyncErrorHandler");
const CustomError = require("../Utils/CustomErrorHandler");
const User= require("../Model/userModel");
const jwt = require("jsonwebtoken");

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

// Get High Score functionality
exports.getHighScore = asyncErrorHandler(async (req, res, next) => {
  console.log(req.cookies);
  const token = req.cookies.jwt;
  console.log(token);
  if (!token) {
    return next(new CustomError("Please provide token", 404));
  }
  const decoded = jwt.verify(token, process.env.SECRET_STR);
  try {
    console.log(decoded);
    const result = await User.findById(decoded.id);
    console.log(result);
    const highScore = result.hiScore;
    res.status(200).json({
      status: "success",
      data: {
        highScore,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

exports.saveHighScore = asyncErrorHandler(async (req, res, next) => {
  const token = req.cookies.jwt;
  console.log(token);
  if (!token) {
    return next(new CustomError("Please provide token", 404));
  }
  const decoded = jwt.verify(token, process.env.SECRET_STR);
  try {
    const result = await User.findByIdAndUpdate(decoded.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        result,
      },
    });
  } catch (err) {
    console.log(err);
  }
});
