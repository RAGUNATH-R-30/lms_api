const mongoose = require("mongoose");
const User = require("../models/user");
const Course = require("../models/course");
const Video = require("../models/video");
const Mentor = require('../models/mentor')
const multer = require('multer');
const { PutObjectCommand, S3Client } = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
  region: "ap-southeast-2"
});


// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/'); // Specify the directory where uploaded files will be stored
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname); // Use the original filename with a timestamp to avoid naming conflicts
//   }
// });

// const upload = multer({ storage: storage });

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
      const video = req.file

      // console.log(video)
      // const video_url =
      //   "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

      const uploadParams = {
        Bucket: "lms-ragunath-coursevideos",
        Key: video.originalname,
        Body: video.buffer
    };

    const data = await s3Client.send(new PutObjectCommand(uploadParams));

    // Construct S3 URL
    const video_url = `https://${uploadParams.Bucket}.s3.amazonaws.com/${uploadParams.Key}`;

      const newVideo = new Video({
        course_id,
        video_id,
        video_url,
      });
      const videoCreated = await newVideo.save();
      return res
        .status(200)
        .json({ message: "video Uploaded",url:video_url });
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: error.message });
    }
  },
  // uploadvideo: async (req, res) => {
  //   try {
  //     // console.log(Object(req.body.video))
  //     console.log(req)
  //     console.log(req.body)
  //     // console.log(req.body.video)
  //     // if (!req.body.video) {
  //     //   return res.status(400).json({ message: 'No file uploaded.' });
  //     // }
  //     // const { video_id ,course_id} = req.body;
  //     // // const { path: video_url } = req.file;
  //     // // console.log(path)
  //     // // const video_url =
  //     // //   "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

  //     // const video_url = req.protocol + '://' + req.get('host') + '/uploads/' + req.body.video.filename;
  //     // const newVideo = new Video({
  //     //   course_id,
  //     //   video_id,
  //     //   video_url,
  //     // });
  //     // const videoCreated = await newVideo.save();
  //     // return res
  //     //   .status(200)
  //     //   .json({ message: "video Uploaded", videoCreated: videoCreated });
  //     return res
  //     .status(200)
  //     .json({ message: "video Uploaded" });
  //   } catch (error) {
  //     return res.status(500).json({ message: error.message });
  //   }
  // },

  getMycourses: async (req, res) => {
    try {
      const { mentor_id } = req.body;
      console.log(mentor_id);
      const mentor = await Mentor.findById(mentor_id);
      if (!mentor) {
        return res.status(400).json({ message: "Mentor Not Exist!" });
      }
      const myCourses = await Course.find({ mentor_id: mentor_id });
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
  },
  getAllcourses:async(req,res)=>{
    try {
      const allcourses = await Course.find({})
      return res.status(200).json({message:"Courses Retrived",allcourses:allcourses})
    } catch (error) {
      return res.status(500).json({ message: error.message });
      
    }
  },
  enrollCourse:async(req,res)=>{
    try {
      const {course_id,user_id} =req.body
      const user_courses = await User.findByIdAndUpdate(user_id,{$push:{mycourses:course_id}})

      return res.status(200).json({message:"Course Enrolled",mycourses:user_courses})
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  getUsercourses:async(req,res)=>{
    try {
      const {user_id} = req.body
      const user = await User.findById(user_id)
      const user_course_ids = user.mycourses;
      let userCourses = []
      // user_course_ids.map(async(item)=>{
      //   let course = await Course.findById(item)
      //   userCourses.push(course)
      // })
      await Promise.all(user_course_ids.map(async (item) => {
        let course = await Course.findById(item);
        userCourses.push(course);
      }));
      // console.log(userCourses)
      return res.status(200).json({message:"Retrieved User Courses",usercourses:userCourses})

      // console.log(user)
    } catch (error) {
      return res.status(500).json({ message: error.message });
      
    }
  }
};

module.exports = courseController;
