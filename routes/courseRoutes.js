const express = require('express')
const courseRouter = express.Router()
const courseController = require('../controllers/courseController')
const auth = require('../middleware/auth')

courseRouter.post('/uploadcourse',auth.isAuth,courseController.uploadcourse)
module.exports = courseRouter