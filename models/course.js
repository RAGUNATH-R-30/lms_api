const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    author_name: String,
    description: String,
    mentor_id: String,
    name: String,
    price:String, 
    sections: {},
    section1avgscore:Number,
    section2avgscore:Number,
    section3avgscore:Number,
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Course", courseSchema, "Courses");
