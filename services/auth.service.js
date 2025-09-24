const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const Token = require('../models/token.model');
const MailService = require('./mail.service');
dotenv.config()


const{JWT_SECRET} = process.env;

const registerUser = async({fullName, email, password, role}) => {
     const existingUser = await User.findOne({email});

     if(existingUser){
         throw new Error("Email already exists")
     }

     const hashedPassword = await bcrypt.hash(password, 10);
     const newUser = new User({
        fullName,
        email,
        password:hashedPassword,
        role: role || "user",
     })

     await newUser.save();

     const code = ("" + Math.floor(1000 + Math.random() * 9000))

     await Token.create({
        userId: newUser._id,
        code
     })

     await MailService.sendVerificationEmail(email, fullName, code)
     return newUser;

}

const loginUser = async({email, password}) => {
    const user = await User.findOne({email});

    if(!user) throw new Error("no user exist with this email");

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) throw new Error("Password mismatch");

    if(user.isVerified == false){
        throw new Error("Plase verify your email")
    }
    const token = jwt.sign(
        {id: user._id, email: user.email},
        JWT_SECRET,
        {expiresIn: "1h"}
    );

    return{user, token}
}
module.exports = {registerUser, loginUser}