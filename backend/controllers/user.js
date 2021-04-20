const User = require("../models/User")

//get a single user 
//get request
//http://localhost:6789/api/v1/user/:id
exports.getUser = async (req, res, next) => {
    try {
        const { id } = req.params
        const user = await User.find({ _id: id })
        if (user) {
            res.status(200).json({
                address: user[0].address,
                role: user[0].role,
                username: user[0].username,
                firstname: user[0].firstname,
                lastname: user[0].lastname,
                email: user[0].email,
                phonenumber: user[0].phonenumber,
                propicture: user[0].proPictures,
                verified: user[0].verified
            })
        } else {
            res.status(404).json({ error: 'User not found' })
        }
    } catch (error) {
        next(error)
    }
}

//make a user a seller\
//patch request
//localhost:6789/api/v1/user/location/:id
exports.makeSeller =  async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.params.id })
        if (req.body.location) {
            user.address = req.body.location
            user.role = "seller"
        }
        let proPictures = []; //defining pictures for multer
        if (req.files.length > 0) {
            proPictures = req.files.map(file => {
                return { img: file.filename }
            })
        }
        if (proPictures) {
            user.proPictures = proPictures
            user.role = "seller"
        }

        await user.save()
        res.send(user)
    } catch (error) {
        next(error)
    }
}