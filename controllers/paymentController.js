const mongoose = require("mongoose");
const User = require("../models/user");
const Course = require("../models/course");
const config = require("../utils/config");
const Order = require("../models/order");
const crypto = require("crypto");
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: config.RAZORPAY_KEY_ID || "",
  key_secret: config.RAZORPAY_KEY_SECRET,
});

const paymentController = {
  checkout: async (req, res) => {
    const { course_id, user_id, price } = req.body;
    try {
      const order = await razorpay.orders.create({
        amount: Number(price * 100),
        currency: "INR",
      });
      await Order.create({
        order_id: order.id,
        user_id: user_id,
        course_id: course_id,
      });
      return res.status(200).json({ order, message: `${price} received` });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  verification: async (req, res) => {
    console.log(req.body);
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      req.body;
    const { course_id, user_id } = req.body;
    const body_data = razorpay_order_id + "|" + razorpay_payment_id;

    const expect = crypto
      .createHmac("sha256", config.RAZORPAY_KEY_SECRET || "")
      .update(body_data)
      .digest("hex");

    const isValid = expect === razorpay_signature;
    console.log(isValid);
    if (isValid) {
      console.log("payment is successful");

      await Order.findOneAndUpdate(
        { order_id: razorpay_order_id },
        {
          $set: { razorpay_payment_id, razorpay_order_id, razorpay_signature },
        }
      );
      // const user_courses = await User.findByIdAndUpdate(user_id,{$push:{mycourses:course_id}})

      res.redirect(
        `http://localhost:5173/success/payment_id=${razorpay_order_id}`
      );
      return;
    } else {
      res.redirect(
        `http://localhost:5173/failure/payment_id=${razorpay_order_id}`
      );
    }
  },
};

module.exports = paymentController;
