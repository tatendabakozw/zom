const express = require('express')
const { getUser, makeSeller } = require('../controllers/user')
const { requireSignIn } = require('../middleware')
const upload = require('../middleware/upload')
const router = express.Router()
const User = require('../models/User')



//make a user a seller\
//patch request
//localhost:6789/api/v1/user/location/:id
router.patch("/location/add/:id", upload.array('proPictures'),makeSeller)


//add picture
router.put('/add/picture', (req, res, next) => {
    res.send('add picture')
})

//http://localhost:6789/api/v1/user/:id
router.get('/:id',getUser)
module.exports = router