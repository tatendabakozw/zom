const express = require('express')
const { requireSignIn } = require('../middleware')
const Review = require('../models/Review')
const User = require('../models/User')
const router = express.Router()

//create a reviews
//http://localhost:6789/api/v1/review/create
//post request
router.post('/create', requireSignIn, async (req, res, next) => {
    try {
        const user = req.user
        if (user) {
            const { general, rating, review, shopowner } = req.body
            if (!general || !rating || !review) {
                return res.status(200).json({ error: 'Enter all fields' })
            } else {
                const newreview = new Review({
                    shopowner: shopowner,
                    rating: rating,
                    review: review,
                    general: general,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    reviewer: user.user_id,
                    reviewerpic: user.picture
                })

                const savedreview = await newreview.save()

                return res.status(200).json({ review: savedreview })
            }

        } else {
            return res.status(200).json({ error: 'Please Login first' })
        }
    } catch (error) {
        next(error)
    }
})

//get all fore user
//http://localhost:6789/api/v1/:shopownerId
//get request
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        if (id) {
            const userreviews = await Review.find({ shopowner: id })
            return res.status(200).json({ reviews: userreviews })

        } else {
            return res.status(200).json({ error: 'No such user' })
        }

    } catch (error) {
        next(error)
    }

})

module.exports = router