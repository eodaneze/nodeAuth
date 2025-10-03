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

const getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.status(200).json({ message: "Products fetched successfully", products });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getProductById = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await productService.getProductById(productId);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json({ message: "Product fetched successfully", product });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
const deleteProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        const deletedProduct = await productService.deleteProduct(productId);
        if (!deletedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    }catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const updateProduct = async(req, res) => {
     try{
        const productId = req.params.id;
        const updateData = req.body;

        const updatedProduct = await productService.updateProduct(productId, updateData);
        
        if(!updatedProduct){
            return res.status(404).json({message: "Product not found"});
        }
        res.status(200).json({message: "Product updated successfully", product: updatedProduct});
     }catch(error){
        res.status(400).json({message: error.message})
     }
}

const searchProducts = async(req, res) => {
    try{
         const{name, category} = req.query;
            const products = await productService.searchProducts(name, category);
            res.status(200).json({message: "Products fetched successfully", products});
    }catch(error){
        res.status(400).json({message: error.message})
    }
}

module.exports = {createProduct, getAllProducts, getProductById, deleteProduct, updateProduct, searchProducts}