const User = require('../models/Order')
const Order = require('../models/Order')
const Product = require('../models/Product')

//create an order
//post request
//http://localhost:6789/order/create
exports.createOrder = async (req, res, next) => {
    try {
        const user = req.user
        if (user) {
            const { ord } = req.body
            if (!ord) {
                return res.status(422).json({ error: 'Nothing ordered' })
            } else {
                const item = await Product.findOne({ _id: ord })
                if (!item) {
                    return res.status(200).json({ error: 'Item no longer available' })
                } else {
                    const orderedItem = new Order({
                        itemId: ord,
                        orderer: user.email,
                        item: item.name,
                        phonenumber: user.phonenumber,
                        datecreated: new Date,
                        status: 'pending',
                        itemowner: item.owner
                    })
                    const ordrd = await orderedItem.save()
                    res.status(200).json({ ordrd: ordrd })
                }
            }
        } else {
            return res.status(403).json({ error: 'Sign in to order goods' })
        }
    } catch (error) {
        next(error)
    }
}

//getiing an order
//get request
//http://localhost:6789/api/v1/order/:id
exports.getOrder = (req, res, next) => {
    try {
        const user = req.user
        if (user) {
            res.json(user)
        } else {
            return res.status(403).json({ error: 'Sign In to order goods' })
        }
    } catch (error) {
        next(error)
    }
}

//getiing all orders per user
//get request
//http://localhost:6789/api/v1/order/user
exports.getOrders = async (req, res, next) => {
    try {
        const user = req.user
        if (user) {
            const orders = await Order.find({itemowner: user.user_id })
            res.status(200).json({orders: orders})
        } else {
            return res.status(403).json({ error: 'Sign In to order goods' })
        }
    } catch (error) {
        next(error)
    }
}