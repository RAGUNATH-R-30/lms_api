const mongoose = require("mongoose");
const User = require("../models/user");
const Course = require("../models/course");
const courseController = {
  uploadcourse: async (req, res) => {
    try {
      const { author_name, description, mentor_id, name, sections } = req.body;
      const newCourse = new Course({
        author_name,
        description,
        mentor_id,
        name,
        sections,
      });
      const createdCourse = await newCourse.save()
      return res.status(200).json({ message: "Course Created",createdCourse:createdCourse });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

module.exports = courseController;
