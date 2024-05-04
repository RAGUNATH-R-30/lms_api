const express = require('express')
const courseRouter = express.Router()
const courseController = require('../controllers/courseController')
const auth = require('../middleware/auth')
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Specify the directory where uploaded files will be stored
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Use the original filename with a timestamp to avoid naming conflicts
    }
  });
  
  // Initialize Multer with the storage options
//   const upload = multer({ storage: storage });
  const upload = multer();

courseRouter.post('/uploadcourse',auth.isAuth,courseController.uploadcourse)
courseRouter.post('/uploadvideo',auth.isAuth, upload.single('video'),courseController.uploadvideo)
courseRouter.post('/mycourses',auth.isAuth,courseController.getMycourses)
courseRouter.post('/getcoursebyid',auth.isAuth,courseController.getCoursebyId)
courseRouter.post('/getvideourl',auth.isAuth,courseController.getVideoUrl)
courseRouter.post('/getallvideos',auth.isAuth,courseController.getAllvideos)
courseRouter.get('/getallcourses',auth.isAuth,courseController.getAllcourses)
courseRouter.post('/enrollcourse',auth.isAuth,courseController.enrollCourse)
courseRouter.post('/getusercourses',auth.isAuth,courseController.getUsercourses)

module.exports = courseRouter

