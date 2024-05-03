const express = require('express')
const courseRouter = express.Router()
const courseController = require('../controllers/courseController')
const auth = require('../middleware/auth')

courseRouter.post('/uploadcourse',auth.isAuth,courseController.uploadcourse)
courseRouter.post('/uploadvideo',auth.isAuth,courseController.uploadvideo)
courseRouter.post('/mycourses',auth.isAuth,courseController.getMycourses)
courseRouter.post('/getcoursebyid',auth.isAuth,courseController.getCoursebyId)
courseRouter.post('/getvideourl',auth.isAuth,courseController.getVideoUrl)
courseRouter.post('/getallvideos',auth.isAuth,courseController.getAllvideos)
courseRouter.get('/getallcourses',auth.isAuth,courseController.getAllcourses)

module.exports = courseRouter

