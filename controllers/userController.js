const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const userController = {
  register: async (req, res) => {
    try {
      const { username, name, password } = req.body;

      const user = await User.findOne({username});

      if (user) {
        return res.status(500).json({ message: "User Already Exist!!" });
      }
      const passwordHash = await bcrypt.hash(password, 10);

      const newUser = new User({
        username,
        name,
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
};
module.exports = userController;
