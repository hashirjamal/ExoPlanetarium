const mongoose = require("mongoose");
const validator = require("validator");
const bycrypt = require("bcryptjs");
const quizQuestionSchema = mongoose.Schema({
  question: {
    type: String,
    required: [true, "Question is a required field"],
  },
  options: {
    type: [String],
    required: [true, "Options are required"],
  },
  correctOption: {
    type: String,
    required: [true, "Correct option is required"],
    validate: {
      validator: function (val) {
        return this.options.includes(val);
      },
      message: "Correct option is not in the options",
    }
  },
});

const quizModel = mongoose.model("Quiz", quizQuestionSchema);
module.exports = quizModel;
