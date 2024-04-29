const mongoose = require("mongoose");
const User = require("../models/user");
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

      //   res.cookie('token', token, {
      //     httpOnly: true,
      //     secure: true,
      //     sameSite: 'none',
      //     expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours expiration
      // });

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
};
module.exports = userController;
