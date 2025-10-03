const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();


const{MONGO_LOCAL_URL, MONGO_PROD_URL} = process.env



const connectDb = async() => {
     try{
         await mongoose.connect(MONGO_PROD_URL);
            console.log("✅MongoDB connected successfully");
     }catch(error){
            console.log("❌MongoDB connection failed", error);
     }
}

module.exports = connectDb;