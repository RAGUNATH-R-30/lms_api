const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    author_name: String,
    description: String,
    mentor_id: String,
    name: String,
    price:String, 
    sections: {},
    section1length:Number,
    section2length:Number,
    section3length:Number,
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Course", courseSchema, "Courses");
