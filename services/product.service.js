const Product = require("../models/product.model");
const cloudinary = require("../config/cloudinary.config");

const createProduct = async ({name, description, price, category, inStock, image}) => {
    const uploadResult = await cloudinary.uploader.upload_stream(
        { resource_type: 'image', folder: 'products' },
        async (error, result) => {
            if (error) {
                throw new Error('Image upload failed');
            }
            const newProduct = new Product({
                name,
                description,
                price,
                category,
                inStock,
                image: result.secure_url,
            });
            await newProduct.save();
        }
    );
    uploadResult.end(image);
    return;
}

const getAllProducts = async () => {
    return Product.find().sort({ createdAt: -1 });
}

const getProductById = async (productId) => {
    return Product.findById(productId);
}
const deleteProduct = async (productId) => {
    return Product.findByIdAndDelete(productId);
}

const updateProduct = async (productId, updateData) => {
    try{
          return Product.findByIdAndUpdate(productId, updateData, {
             new: true,
             runValidators: true
          })
    }catch(error){
        throw new Error('Update failed', error.Error);
    }
}

const searchProducts =async(name, category) => {
     const query = {};
     if(name){
         query.name = { $regex: name, $options: 'i' };
     }
     if(category){
            query.category = category;
     }
     return Product.find(query).sort({ createdAt: -1 });
}
module.exports = {createProduct, getAllProducts, getProductById, deleteProduct, updateProduct, searchProducts}