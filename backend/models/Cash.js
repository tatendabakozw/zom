const mongoose  = require('mongoose')

const cashSchema = new mongoose.Schema({
    owner:{
        type: String,
        required: true
    },
    earned:{
        type: String,
        required: true
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Cash', cashSchema)