const express = require('express')
const router = express.Router()

//http://localhost/api/v1/ratings/rate
//patch request
//rate services of a user
router.patch('/rare',(req,res,next)=>{
    res.send('rate a product')
})

module.exports = router