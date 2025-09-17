const express = require('express');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/user.model');
const connectDb = require('./config/db.config');
const jwt = require('jsonwebtoken');
const { auth } = require('./middleware/auth.middleware');

dotenv.config();

connectDb();

const app = express();
app.use(express.json());



const{PORT, JWT_SECRET} = process.env;


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
            const user = await User.findOne({email});
            if(!user){
                return res.status(400).json({message: "Invalid email"});
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if(!isPasswordValid){
                return res.status(400).json({message: "Invalid password"});
            }


        const token = jwt.sign(
            {id: user._id, email: user.email},
            JWT_SECRET,
            {expiresIn: '1h'}
        )

        res.status(200).json({message: "Login successful", token, user});
        
    }catch(error){
        res.status(500).json({message: "Server Error", error: error.message});
    }
})


app.get("/profile", auth, async(req, res) => {
    res.json(req.user)
})
// const{PORT} = process.env


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});