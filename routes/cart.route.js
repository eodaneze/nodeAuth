const router = require('express').Router();
const cartController = require('../controllers/cart.controller');
const{auth} = require('../middleware/auth.middleware');


router.post('/add-to-cart', auth, cartController.addToCart);


module.exports = router;