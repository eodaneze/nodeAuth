const User = require('../models/user.model');
const Token = require('../models/token.model');
const MailService = require('./mail.service');

const updateUserProfile = async(userId, updateData) => {
    try{
        const user = await User.findById(userId);

        if(!user) throw new Error("User not found");

        await User.findByIdAndUpdate(userId, updateData, 
            {
                new: true, runValidators: true
            }).select('-password');
        return user;
    }catch(error){
        throw new Error("Profile update failed: " + error.message)
    }
}

const getUserProfile = async(userId) => {
    try{
       const user = await User.findById(userId).select('-password');
       if(!user) throw new Error("User not found");
       return user;
    }catch(error){
        throw new Error("Fetching profile failed: " + error.message)
    }
}

const requestAccountDeletion = async(userId) => {
     try{
        const user = await User.findById(userId);
        if(!user) throw new Error("User not found");

        await Token.deleteMany({userId: user._id});

        const deleteToken = ("" + Math.floor(1000 + Math.random() * 9000))
        await Token.create({userId: user._id, code: deleteToken});

        await MailService.sendAccountDeletionEmail(user.email, user.fullName, deleteToken);
        return;
     }catch(error){
        throw new Error("Account deletion request failed: " + error.message)
     }
}

const confirmAccountDeletion = async(userId, deleteToken) => {
    try{
         const user = await User.findById(userId);
         if(!user) throw new Error("User not found");

            const tokenDoc = await Token.findOne({userId: user._id, code:deleteToken});
            if(!tokenDoc) throw new Error("Invalid or expired delete token");
            
            await User.findByIdAndDelete(userId);

            await Token.deleteMany({userId: user._id});
            return;
    }catch(error){
        throw new Error("Account deletion failed: " + error.message)
    }
}

module.exports = {updateUserProfile, getUserProfile, requestAccountDeletion, confirmAccountDeletion}