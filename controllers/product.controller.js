const productService = require("../services/product.service");


const createProduct = async(req, res) => {
    try{
        const{name, description, price, category, inStock} = req.body;
        if(!name || !description || !price || !category || !inStock || !req.file){
            return res.status(400).json({message: "All fields are required"});
        }
        const image = req.file.buffer;
        await productService.createProduct({name, description, price, category, inStock, image});
        res.status(201).json({message: "Product created successfully"});
    }catch(error){
        res.status(400).json({message: error.message})
    }
}

module.exports = {createProduct}