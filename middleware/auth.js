const jwt = require("jsonwebtoken");
const config = require("../utils/config");

const auth = {
  isAuth: (req, res, next) => {
    try {
        // console.log(req)
     const token = req.cookies.token;
    //   console.log("tokene",token)
      if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      try {
        const decodedtoken = jwt.verify(token, config.SECRET_KEY);
        req.userId = decodedtoken.id;
        next();
      } catch (error) {
        res.status(401).json({ message: "invalid token" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  isMentor: (req, res, next) => {
    try {
        // console.log(req)
     const token = req.cookies.token;
    //   console.log("tokene",token)
      if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      try {
        const decodedtoken = jwt.verify(token, config.SECRET_KEY);
        req.mentorId = decodedtoken.id;
        next();
      } catch (error) {
        res.status(401).json({ message: "invalid token" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  isAdmin: (req, res, next) => {
    try {
        // console.log(req)
     const token = req.cookies.token;
      // console.log("tokene",token)
      if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      try {
        const decodedtoken = jwt.verify(token, config.SECRET_KEY);
        req.mentorId = decodedtoken.id;
        next();
      } catch (error) {
        res.status(401).json({ message: "invalid token" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
module.exports = auth;