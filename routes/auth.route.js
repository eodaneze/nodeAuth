const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');
const { auth } = require('../middleware/auth.middleware');


// public route
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);


// protected route

router.get("/profile", auth, AuthController.getProfile)

module.exports = router