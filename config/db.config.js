const mongoose = require('mongoose');


const mongo_local_url = "mongodb://localhost:27017/userAuth"

const connectDb = async() => {
     try{
         await mongoose.connect(mongo_local_url);
            console.log("✅MongoDB connected successfully");
     }catch(error){
            console.log("❌MongoDB connection failed", error);
     }
}

module.exports = connectDb;