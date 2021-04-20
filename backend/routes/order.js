const express = require('express')
const { createOrder, getOrder, getOrders } = require('../controllers/order')
const { requireSignIn } = require('../middleware')
const router = express.Router()

//create an order
//post request
//http://localhost:6789/api/v1/order/create
router.post('/create',requireSignIn,createOrder)

// //getiing an order
// //get request
// //http://localhost:6789/api/v1/order/:id
// router.get('/:id',getOrder)

//getiing all orders per store
//get request
//http://localhost:6789/api/v1/order/user
router.get('/user',requireSignIn,getOrders)


module.exports = router