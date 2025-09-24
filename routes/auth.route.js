const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');
const { auth } = require('../middleware/auth.middleware');


// public route
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/verify-email", AuthController.verifyEmail);
router.post("/resend-token", AuthController.resendEmailToken);
router.post("/request-password-reset-token", AuthController.requestPasswordResetToken);
router.post("/reset-password", AuthController.resetPassword);

// protected route

router.get("/profile", auth, AuthController.getProfile)

module.exports = router