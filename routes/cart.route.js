const router = require('express').Router();
const cartController = require('../controllers/cart.controller');
const{auth} = require('../middleware/auth.middleware');


router.post('/add-to-cart', auth, cartController.addToCart);
router.get('/view-cart', auth, cartController.viewCart)
router.delete("/delete-cart/:id", auth, cartController.deleteCart);


module.exports = router;