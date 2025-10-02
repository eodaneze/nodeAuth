const userService = require('../services/user.service');


const updateProfile = async(req, res) => {
    try{
       const userId = req.user._id;
      const updateData = req.body;

      const updatedUser = await userService.updateUserProfile(userId, updateData);
      res.json({message: "Profile updated successfully"})
       
    }catch(error){
        res.status(500).json({error: error.message})
    }
}

const getProfile = async(req, res) => {
    const userId = req.user._id;
    try{
      const userProfile = await userService.getUserProfile(userId);
      res.status(200).json({message: "User profile fetched successfully", data: userProfile})
    }catch(error){
        res.status(500).json({error: error.message})
    }
}

const requestAccountDeletion = async(req, res)=> {
    const userId = req.user._id;
    try{
        await userService.requestAccountDeletion(userId);
        res.status(200).json({message: "A delete token have been sent to your email"})
    }catch(error){
        res.status(500).json({error: error.message})
    }
}

const confirmAccountDeletion = async(req, res) => {

    try{
        const userId = req.user._id;
         const {deleteToken} = req.body;
         
         if(!deleteToken) return res.status(400).json({error: "Delete token is required"})
            const user = await userService.confirmAccountDeletion(userId, deleteToken);
            res.status(200).json({message: "Account deleted successfully"})
    }catch(error){
        res.status(500).json({error: error.message})
    }

}
module.exports = {updateProfile, getProfile, requestAccountDeletion, confirmAccountDeletion }