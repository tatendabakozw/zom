const Category = require('../models/Category')
const SubCategory = require('../models/SubCategory')

//post request
//creat a subcategory
//http://localhost:6789/api/v1/subcategory/create/:categoryId
exports.createSubcategory =  async (req, res, next) => {
    try {
        const { id } = req.params
        const category = await Category.findOne({ _id: id })
        if (category) {
            const { name } = req.body
            if (!name) {
                return res.status(422).json({ error: 'please enter sub-category name' })
            } else {
                const subcategory = new SubCategory({
                    name,
                    category: category._id
                })
                const savedSubCat = await subcategory.save()
                res.status(200).json({ subcategory: savedSubCat })
            }
        } else {
            return res.status(404).json({ error: 'Category not found' })
        }
    } catch (error) {
        next(error)
    }
}

//get all subcateogories user a cateogory
//get request
//http://localhost:6789/api/v1/subcategory/subcategories/:category
exports.getAllSubcategories = async (req, res, next) => {
    try {
        const { id } = req.params
        const subcategories = await SubCategory.find({ category: id })
        if (subcategories) {
            res.json({subcategories: subcategories})
        } else {
            res.status(404).json({ error: 'category not found' })
        }
    } catch (error) {
        next(error)
    }
}