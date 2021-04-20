const Category = require('../models/Category')
const Product = require('../models/Product')

//post request
//http://localhost:6789/product/create
//creatinf a product
exports.createProduct = async (req, res, next) => {
    try {
        const user = req.user
        if (user) {
            const { name, price, discountPrice, categoryid, subcategory, sku, barcode, stock, tags, description } = req.body
            const category = await Category.findOne({ _id: categoryid })

            let productpicture = []; //defining pictures for multer
            if (req.files.length > 0) {
                productpicture = req.files.map(file => {
                    return { img: file.filename }
                })
            }
            if (user.role === 'seller') {
                const newProuct = new Product({
                    name,
                    owner: user.user_id,
                    description,
                    price,
                    discountPrice,
                    category: category.name,
                    subcategory,
                    sku,
                    barcode,
                    stock,
                    tags,
                    productpicture,
                    location: user.address,
                    userpic: user.picture,
                    verified: user.verified
                })

                const product = await newProuct.save()
                res.status(200).json({ product: product })
            } else {
                return res.status(404).json({ error: 'Only sellers can create products' })
            }
        } else {
            return res.status(404).json({ error: 'user not found' })
        }
    } catch (error) {
        next(error)
    }
}

//get request
//http://localhost:6789/product/create
//get all products
exports.getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find({})
        if (products) {
            res.status(200).json({ products: products })
        } else {
            return res.status(403).json({ error: 'No products Found' })
        }
    } catch (error) {
        next(error)
    }
}

//get request
//http://localhost:6789/api/v1/product/user/:id
//get products for a user
exports.getUserProducts = async (req, res, next) => {
    try {
        const { id } = req.params
        const products = await Product.find({ owner: id })
        res.status(200).json({ products: products })
        return res.status(403).json({ error: 'Not authorised' })
    } catch (error) {
        next(error)
    }
}