const mongoose = require('mongoose')

const serviceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    servicepicture: [
        { img: { type: String } }
    ],
    category: {
        type: String,
        required: true
    },
    subcategory: {
        type: String,
        required: true
    },
    tags: [String],
}, {
    timestamps: true
})

module.exports = mongoose.model('Service', serviceSchema)