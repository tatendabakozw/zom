const mongoose = require('mongoose')
const mongOption = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }
const mongoUrl = process.env.mongoUrl

const connectDB = async () => {
    try {
        mongoose.connect(mongoUrl, mongOption)
        mongoose.connection.once('open',(err)=>{
            if(err){
                console.log(err)
            }else{
                console.log(`Database Connected Sucessfully`)
            }
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB