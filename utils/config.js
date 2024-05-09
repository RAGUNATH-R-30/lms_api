require("dotenv").config();
const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT;
const SECRET_KEY = process.env.SECRET_KEY
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;
const ACCESSKEYID = process.env.ACCESSKEYID;
const SECRETACCESSKEY =process.env.SECRETACCESSKEY;
module.exports = {
  MONGODB_URI,
  PORT,
  SECRET_KEY,
  RAZORPAY_KEY_ID,
  RAZORPAY_KEY_SECRET,
  ACCESSKEYID,
  SECRETACCESSKEY
};
