const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/DBproductwithJWT");
    console.log("DBproductwithJWT Connected");
  } catch (err) {
    // Error
    console.log(err);
  }
};

module.exports = connectDB;
