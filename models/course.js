const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    author_name: String,
    description: String,
    mentor_id: String,
    name: String,
    sections: {},
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Course", courseSchema, "Courses");
