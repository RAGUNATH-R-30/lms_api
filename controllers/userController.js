const mongoose = require("mongoose");
const User = require("../models/user");
const Mentor = require("../models/mentor")
const Admin =require("../models/admin")
const Requestmentor = require("../models/requestMentor")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");

const userController = {
  register: async (req, res) => {
    try {
      const { email, username, password } = req.body;

      const user = await User.findOne({ email });

      if (user) {
        return res.status(500).json({ message: "User Already Exist!!" });
      }
      const passwordHash = await bcrypt.hash(password, 10);

      const newUser = new User({
        email,
        username,
        passwordHash: passwordHash,
      });

      const createduser = await newUser.save();

      return res
        .status(200)
        .json({ message: "User Created", newuser: createduser });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  mentorRegister:async(req,res)=>{
    try {
      const { email, username, password } = req.body;

      const mentor = await Mentor.findOne({ email });

      if (mentor) {
        return res.status(500).json({ message: "User Already Exist!!" });
      }
      const passwordHash = await bcrypt.hash(password, 10);

      const newMentor = new Mentor({
        email,
        username,
        passwordHash: passwordHash,
      });

      const createdmentor = await newMentor.save();

      return res
        .status(200)
        .json({ message: "User Created", newmentor: createdmentor });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  adminRegister:async(req,res)=>{
    try {
      const { email, username, password } = req.body;

      const admin = await Admin.findOne({ email });

      if (admin) {
        return res.status(500).json({ message: "User Already Exist!!" });
      }
      const passwordHash = await bcrypt.hash(password, 10);

      const newAdmin = new Admin({
        email,
        username,
        passwordHash: passwordHash,
      });

      const createdadmin = await newAdmin.save();

      return res
        .status(200)
        .json({ message: "User Created", newadmin: createdadmin });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "User Not Exist!" });
      }
      const isPassword = await bcrypt.compare(password, user.passwordHash);

      if (!isPassword) {
        return res.status(400).json({ message: "Incorrect password" });
      }

      const token = jwt.sign(
        {
          email: user.email,
          id: user._id,
        },
        config.SECRET_KEY
      );
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours expiration
      });

      res.status(200).json({ message: "Login Successfully", token });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  mentorLogin:async(req,res)=>{
    try {
      const { email, password } = req.body;
      const mentor = await Mentor.findOne({ email });

      if (!mentor) {
        return res.status(400).json({ message: "User Not Exist!" });
      }
      const isPassword = await bcrypt.compare(password, mentor.passwordHash);

      if (!isPassword) {
        return res.status(400).json({ message: "Incorrect password" });
      }

      const token = jwt.sign(
        {
          email: mentor.email,
          id: mentor._id,
        },
        config.SECRET_KEY
      );
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours expiration
      });

      res.status(200).json({ message: "Login Successfully", token });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  adminLogin:async(req,res)=>{
    try {
      const { email, password } = req.body;
      const admin = await Admin.findOne({ email });

      if (!admin) {
        return res.status(400).json({ message: "User Not Exist!" });
      }
      const isPassword = await bcrypt.compare(password, admin.passwordHash);

      if (!isPassword) {
        return res.status(400).json({ message: "Incorrect password" });
      }

      const token = jwt.sign(
        {
          email: admin.email,
          id: admin._id,
        },
        config.SECRET_KEY
      );
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours expiration
      });

      res.status(200).json({ message: "Login Successfully", token });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  me: async (req, res) => {
    try {
      const userId = req.userId;
      const user = await User.findById(userId).select('-passwordHash -__v ');
      if(!user){
        return res.status(400).json({ message: 'user not found' });
      }
      res.status(200).json({ user });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  mentorme: async (req, res) => {
    try {
      const mentorId = req.mentorId;
      const mentor = await Mentor.findById(mentorId).select('-passwordHash -__v ');
      if(!mentor){
        return res.status(400).json({ message: 'user not found' });
      }
      res.status(200).json({ mentor });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  requestMentor:async(req,res)=>{
    try {
      const {id,username,email} = req.body
      const newmentorRequest = new Requestmentor({
        id,
        username,
        email
      })
      const newrequest =  await newmentorRequest.save()
      return res.status(200).json({ message: 'request Created' });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  getMentorrequests:async(req,res)=>{
    try {
      const allmentorRequests = await Requestmentor.find();
      // console.log(allmentorRequests)
      return res.status(200).json({ message: 'request sent' ,allrequests:allmentorRequests});
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
};
module.exports = userController;
