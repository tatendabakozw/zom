const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    orderer:{
        type: String,
        required: true
    },
    item:{
        type: String,
        required: true
    },
    itemId:{
        type: String,
        required: true
    },
    phonenumber:{
        type: String,
        required: true
    },
    datecreated:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true,
        enum: ['pending', 'paid']
    },
    itemowner:{
        type: String,
        required: true
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Order', orderSchema)