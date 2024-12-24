const mongoose = require('mongoose');

// Define the schema for the product
const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        trim: true,
    },
    productDescription: {
        type: String,
        required: true,
    },
    productPrice: {
        type: Number,
        required: true,
        min: 0,
    },
    productImage: {
        type: String,
        required: true, // Ensure that an image is always uploaded
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Create the model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
