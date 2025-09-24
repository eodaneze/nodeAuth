const AuthService = require("../services/auth.service");

const register = async(req, res) => {
    try{
            const {fullName, email, password, role} = req.body;
    
            if(!fullName || !email || !password){
                return res.status(400).json({message: "Please fill all required fields"});
            }
            await AuthService.registerUser({fullName, email, password, role})
            return res.status(201).json({message: "User registration was successful"})
        }catch(error){
            res.status(500).json({message: "Server Error", error: error.message});
        }
}

const verifyEmail = async(req, res) => {
    try{
        const{email, token} = req.body;
        if(!email || !token){
            return res.status(400).json({message: "Email and token are required"});
        }
        await AuthService.verifyEmail({email, token});
        res.status(200).json({message: "Email verified successfully"});
    }catch(error){
        res.status(500).json({message: "Server Error", error: error.message});
    }
}

const resendEmailToken = async(req, res) => {
    try{
        const{email} = req.body;
        if(!email){
            return res.status(400).json({message: "Email is required"});
        }
        await AuthService.resendEmailToken(email);
        res.status(200).json({message: "Verification email sent"});
    }catch(error){
        res.status(500).json({message: "Server Error", error: error.message});
    }
}

const requestPasswordResetToken = async(req, res) => {
    try{
     const{email} = req.body;
        if(!email) return res.status(400).json({message: "Email is required"});
        await AuthService.requestPasswordResetToken(email);
        res.status(200).json({message: "Password reset token sent to email"});
        
    }catch(error){
        res.status(500).json({message: "Server Error", error: error.message});
    }
}

const resetPassword = async(req, res) => {
      try{
          const{email, token, newPassword, confirmNewPassword} = req.body;
            if(!email || !token || !newPassword || !confirmNewPassword) return res.status(400).json({message: "All fields are required"});

            if(newPassword !== confirmNewPassword) return res.status(400).json({message: "Passwords do not match"});

            await AuthService.resetPassword({email, token, newPassword});
            res.status(200).json({message: "Password reset successful"});
            
      }catch(error){
        res.status(500).json({message: "Server Error", error: error.message});
      }
}
const login = async(req, res) => {
     try{
        const {email, password} = req.body;
        
            if(!email || !password){
                return res.status(400).json({message: "Email and password are required"});
            }
            const{user, token} = await AuthService.loginUser({email, password})
            res.status(200).json({message: "Login successful", token, user});
            
        }catch(error){
            res.status(500).json({message: "Server Error", error: error.message});
        }
}

const getProfile = async(req, res) => {
   res.json(req.user)
}

module.exports = {
        register, 
        login, 
        getProfile, 
        verifyEmail, 
        resendEmailToken, 
        requestPasswordResetToken,
        resetPassword
}