const mongoose = require("mongoose");
const config = require("./utils/config");
const app = require("./app")

console.log("connecting to mongodb...");

//mongodb connection
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log("connected to mongodb..");
    app.listen(config.PORT,()=>{
        console.log(`Server Running on port ${config.PORT}`)
      })
  })
  .catch((error) => {
    console.log("Error connecting to mongodb", error.message);
  });


