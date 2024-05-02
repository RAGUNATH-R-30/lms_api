const mongoose = require("mongoose");
const User = require("../models/user");
const Course = require("../models/course");
const Video = require("../models/video");
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
      const createdCourse = await newCourse.save();
      return res
        .status(200)
        .json({ message: "Course Created", createdCourse: createdCourse });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  uploadvideo: async (req, res) => {
    try {
      const { video_id ,course_id} = req.body;
      const video_url =
        "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
      const newVideo = new Video({
        course_id,
        video_id,
        video_url,
      });
      const videoCreated = await newVideo.save();
      return res
        .status(200)
        .json({ message: "video Uploaded", videoCreated: videoCreated });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  getMycourses: async (req, res) => {
    try {
      const { mentor_id } = req.body;
      console.log(mentor_id);
      const mentor = await User.findById(mentor_id);
      if (!mentor) {
        return res.status(400).json({ message: "Mentor Not Exist!" });
      }
      const myCourses = await Course.find({ mentor_id: mentor_id });
      console.log(myCourses)
      if (myCourses.length == 0) {
        return res.status(400).json({ message: "No Courses Available" });
      }
      return res
        .status(200)
        .json({ message: "Courses Available", myCourses: myCourses });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  getCoursebyId: async (req, res) => {
    try {
      const { course_id } = req.body;
      const course = await Course.findById(course_id);

      if (!course) {
        return res.status(400).json({ message: "No Courses Available" });
      }
      return res
        .status(200)
        .json({ message: "Course Available", course: course });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  getVideoUrl: async (req,res) => {
    try {

      const { video_id } = req.body;
      const video = await Video.findOne({video_id:video_id})
      const video_url = video.video_url;

      if (!video_url) {
        return res.status(400).json({ message: "No Video Available" });
      }
      return res
        .status(200)
        .json({ message: "Video Available", video_url: video_url });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  getAllvideos:async(req,res)=>{
    try {
      const {course_id} = req.body
   
      const videos = await Video.find({course_id:course_id})
   
      return res
        .status(200)
        .json({ message: "Videos Available", videos: videos });

    } catch (error) {
      return res.status(500).json({ message: error.message });
      
    }
  }
};

module.exports = courseController;
