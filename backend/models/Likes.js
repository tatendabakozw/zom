const mongoose = require('mongoose')

const likesSchema = new mongoose.Schema({
    likeditem:{
        type: String,
        required: true
    },
    itemowner:{
        type: String,
        required: true
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Like', likesSchema)