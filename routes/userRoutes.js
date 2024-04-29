const express = require('express')
const userRouter = express.Router()
const userController = require("../controllers/userController")
const auth = require('../middleware/auth')

userRouter.post("/register",userController.register)
userRouter.post("/login",userController.login)
userRouter.get('/me',auth.isAuth,userController.me)

module.exports = userRouter