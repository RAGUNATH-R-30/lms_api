const express = require('express')
const userRouter = express.Router()
const userController = require("../controllers/userController")
const auth = require('../middleware/auth')

userRouter.post("/register",userController.register)
userRouter.post("/login",userController.login)
userRouter.get('/me',auth.isAuth,userController.me)

//mentorroutes 
userRouter.post("/mentorregister",userController.mentorRegister);
userRouter.post("/mentorlogin",userController.mentorLogin);
userRouter.get('/mentorme',auth.isMentor,userController.mentorme)

//adminroutes
userRouter.post("/adminregister",userController.adminRegister);
userRouter.post("/adminlogin",userController.adminLogin);
userRouter.get("/getmentorrequests",auth.isAdmin,userController.getMentorrequests)

//requestmentor
userRouter.post("/requestmentor",auth.isAuth,userController.requestMentor)



module.exports = userRouter