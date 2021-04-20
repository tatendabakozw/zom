const express = require('express')
const { createService, getAllServices, getUserService } = require('../controllers/service')
const { requireSignIn } = require('../middleware')
const upload = require('../middleware/upload')
const router = express.Router()

//create a service
//post  request
//http://localhost:5500/api/v1/service/create
router.post('/create', requireSignIn, upload.array('servicepicture'), createService)

//get all services
//get  request
//http://localhost:5500/api/v1/service/all
router.get('/all', getAllServices)

// @get - request
//getting user for a service
//http://localhost:5500/service/user/:serviceId
router.get('/user/:id',getUserService)

module.exports = router