const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    order_id:String,
    user_id:String,
    course_id:String
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Order", orderSchema, "Orders");
