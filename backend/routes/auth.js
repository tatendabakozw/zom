const express = require('express')
const { regisiterUser, loginUser, logoutUser } = require('../controllers/auth')
const router = express.Router()
const upload = require('../middleware/upload')

//create an account
//post request
//http://localhost:6789/api/v1/auth/register
router.post('/register',upload.array('proPictures'),regisiterUser)

//login with existing account
//post request
//http://localhost:6789/api/v1/auth/login
router.post('/login', loginUser)

//logout of an account
//post request
//http://localhost:6789/api/v1/auth/logout
router.post('/logout',logoutUser)

module.exports = router