const cartService = require('../services/cart.service');


const addToCart = async(req, res) => {
     try{
       const userId = req.user._id;
       const{productId, quantity} = req.body;
       const cart = await cartService.addToCart(userId, productId, quantity);
       res.status(200).json({message: "Product added to cart", cart})
     }catch(error){
        res.status(500).json({message: error.message})
     }
}

module.exports = {addToCart}