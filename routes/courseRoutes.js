const express = require('express')
const courseRouter = express.Router()
const courseController = require('../controllers/courseController')
const auth = require('../middleware/auth')

courseRouter.post('/uploadcourse',auth.isAuth,courseController.uploadcourse)
courseRouter.post('/uploadvideo',auth.isAuth,courseController.uploadvideo)
courseRouter.post('/mycourses',auth.isAuth,courseController.getMycourses)


module.exports = courseRouter