const mongoose = require("mongoose");
const config = require("./utils/config");
console.log("connecting to mongodb...");
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log("connected to mongodb..");
  })
  .catch((error) => {
    console.log("Error connecting to mongodb", error.message);
  });
