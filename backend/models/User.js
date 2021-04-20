const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    firstname:{
        type: String,
        required:true
    },
    lastname:{
        type: String,
        required:[true, 'Enter lastname']
    },
    email:{
        type: String,
        required:[true, 'Enter email']
    },
    password:{
        type: String,
        required:true
    },
    phonenumber:{
        type: String,
    },
    address:{
        type: String,
        default:'none'
    }, 
    longitude:{
        type: Number,
        default: 0
    },
    latitude:{
        type: Number,
        default: 0
    },
    storename:{
        type: String,
    },
    verified:{
        type: String,
        enum: ['yes', 'no'],
        default: 'no'
    },
    proPictures: [
        { img: { type: String } }
    ],
    slug:{
        type: String,
    },
    role: {
        type: String,
        enum: ['buyer', 'seller', 'admin'],
        default: 'buyer'
    }
},{
    timestamps: true
})

module.exports = mongoose.model("User", userSchema)