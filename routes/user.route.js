// const express = require('express');
// const router = express.Router();

const router = require('express').Router();
const userController = require('../controllers/user.controller');
const {auth} = require('../middleware/auth.middleware');


router.patch('/update-profile', auth, userController.updateProfile);
router.get('/profile', auth, userController.getProfile);
router.post('/delete-account/request', auth, userController.requestAccountDeletion);
router.post('/delete-account/confirm', auth, userController.confirmAccountDeletion);

module.exports = router;