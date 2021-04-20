const express = require('express')
const { createCategory, getAllCategories } = require('../controllers/category')
const router = express.Router()

//create a category
//post request
//http://localhost:6789/category/create
router.post('/create',createCategory)

//get all categories
//get request
//http://localhost:6789/category/all
router.get('/all',getAllCategories )

module.exports = router