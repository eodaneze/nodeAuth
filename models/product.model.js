const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String},
    category: {type: String, required: true},
    inStock: {type: Number, default: 1},
    image:{type: String, required: true},
    createdAt: {type: Date, default: Date.now}
}, {timestamps: true});

module.exports = mongoose.model('Product', productSchema);