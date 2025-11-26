const mongoose = require('mongoose');
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://WebDevelopment:interviewMock%4025@cluster0.6xsotjd.mongodb.net/", {
      dbName: "WebDevelopment"
    });
    console.log("✅ MongoDB Connected:", mongoose.connection.name);
  } catch (err) {
    console.error("❌ MongoDB Error:", err);
  }
};

module.exports = connectDB;
