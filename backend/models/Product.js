const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    verified: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    discountPrice: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    sku: {
        type: String,
        // required: true
    },
    barcode: {
        type: String,
        // required: true
    },
    stock: {
        type: String,
        // required: true
    },
    tags: [String],
    type: {
        type: String,
        enum: ['private', 'public'],
        default: 'public'
    },
    productpicture: [
        { img: { type: String } }
    ],
    userpic: [
        { img: { type: String } }
    ],
}, {
    timestamps: true
})

module.exports = mongoose.model('Product', productSchema)