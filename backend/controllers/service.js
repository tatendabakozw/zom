const  Service = require('../models/Service')
const User = require('../models/User')

//create a service
//post  request
//http://localhost:5500/api/v1/service/create
exports.createService = async (req, res, next) => {
    try {
        const user = req.user
        if (user) {
            const { title, category, subcategory, tags, description } = req.body
            let servicepicture = []; //defining pictures for multer
            if (req.files.length > 0) {
                servicepicture = req.files.map(file => {
                    return { img: file.filename }
                })
            }
            if (user.role === "admin" || user.role === 'seller') {
                if (!title || !category || !subcategory || !tags || !description || !servicepicture) {
                    return res.status(422).json({ error: "Enter all fields" })
                } else {
                    const service = new Service({
                        title,
                        category,
                        subcategory,
                        tags,
                        description,
                        servicepicture,
                        owner: user.user_id
                    })
                    const savedService = await service.save()
                    res.status(200).json({ message: 'Saved', service: savedService })
                }

            } else {
                return res.status(403).json({ error: "Not Allowed" })
            }
        } else {
            return res.status(404).json({ error: "User not found" })
        }
    } catch (error) {
        next(error)
    }
}

//get all services
//get  request
//http://localhost:5500/api/v1/service/all
exports.getAllServices = async(req, res, next) => {
    try {
        const services = await Service.find({})
        if (services) {
            res.status(200).json({ services: services })
        } else {
            return res.status(403).json({ error: 'No Services Found' })
        }
    } catch (error) {
        next(error)
    }
}

// @get - request
//getting user for a service
//http://localhost:5500/service/user/:serviceId
exports.getUserService = async (req, res, next) => {
    try {
        const { id } = req.params
        if (id) {
            const service = await Service.findOne({ _id: id })
            if (service) {
                const user = await User.findOne({ _id: service.owner })
                if (user) {
                    res.json({
                        user_id: user._id,
                        storename: user.storename,
                        email: user.email,
                        phonenumber: user.phonenumber,
                        fullname: user.fullname,
                        location: user.address,
                        propic : user.proPictures
                    })
                } else {
                    return res.status(404).json({ error: 'No such user' })
                }
            } else {
                return res.status(404).json({ error: 'No such service' })
            }
        } else {
            return res.status(404).json({ error: 'No such service' })
        }
    } catch (error) {
        next(error)
    }
}