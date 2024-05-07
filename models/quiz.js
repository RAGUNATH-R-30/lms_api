const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema(
  {
    id: String,
    quiz: Array,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Quiz", quizSchema, "Quizes");
