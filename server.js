const express = require('express');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/user.model');
const connectDb = require('./config/db.config');

dotenv.config();

connectDb();

const app = express();
app.use(express.json());


// register endpoint

app.post("/register", async(req, res) => {
    try{
        const {fullName, email, password, role} = req.body;

        if(!fullName || !email || !password){
            return res.status(400).json({message: "Please fill all required fields"});
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: `User already exists with this email: ${email}`});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
            role: role || 'user'
        })

        await newUser.save();
        res.status(201).json({message: "User registered successfully", user: newUser});
    }catch(error){
        res.status(500).json({message: "Server Error", error: error.message});
    }
})



// login endpoint
app.post("/login", async(req, res) => {
    try{
        const {email, password} = req.body;
        
            if(!email || !password){
              return res.status(400).json({message: "Email and password are required"});
            }

        
    }catch(error){
        res.status(500).json({message: "Server Error", error: error.message});
    }
})
// const{PORT} = process.env
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});