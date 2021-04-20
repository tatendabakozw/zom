const express = require('express')
const { createSubcategory, getAllSubcategories } = require('../controllers/subcategory')
const router = express.Router()

//post request
//creat a subcategory
//http://localhost:6789/api/v1/subcategory/create/:categoryId
router.post('/create/:id',createSubcategory)

//get all subcateogories user a cateogory
//get request
//http://localhost:6789/api/v1/subcategory/subcategories/:category
router.get('/subcategories/:id', getAllSubcategories)

module.exports = router