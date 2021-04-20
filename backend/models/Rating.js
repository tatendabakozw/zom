const mongoose = require('mongoose')

const ratingSchema = new mongoose.Schema({
    user:{
        type: String,
    },
    rating: {
        type: Number,
        required: true
    },
    product:{
        type: String
    }
},{
    timestamps: true
})

module.exports = new mongoose.model('Rating', ratingSchema)