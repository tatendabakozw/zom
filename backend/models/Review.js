const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    shopowner:{
        type: String
    },
    general:{
        type: String,
    },
    review:{
        type: String,
    },
    rating:{
        type: Number,
    },
    reviewer:{
        type: String,
    },
    reviewerpic:{
        type: String
    },
    firstname:{
        type: String
    },
    lastname:{
        type: String
    },
    reviewerpic: [
        { img: { type: String } }
    ],
},{
    timestamps: true
})

module.exports = mongoose.model('Review', reviewSchema)