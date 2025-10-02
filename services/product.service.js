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

module.exports = {createProduct }