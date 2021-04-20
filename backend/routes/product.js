const express = require('express')
const { createProduct, getAllProducts, getUserProducts } = require('../controllers/product')
const { requireSignIn } = require('../middleware')
const upload = require('../middleware/upload')
const router = express.Router()


//post request
//http://localhost:6789/product/create
//creatinf a product
router.post('/create', requireSignIn, upload.array('productpicture'),createProduct)

//get request
//http://localhost:6789/product/create
//get all products
router.get('/user/:id',getUserProducts)

//get request
//http://localhost:6789/product/create
//get all products
router.get('/all', getAllProducts)

module.exports = router