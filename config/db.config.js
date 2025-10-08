const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const { MONGO_LOCAL_URL, MONGO_PROD_URL } = process.env;

const connectDb = async () => {
  try {
    await mongoose.connect(MONGO_LOCAL_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
  }
};

module.exports = connectDb;
