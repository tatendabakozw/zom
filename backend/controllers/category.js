const Category = require('../models/Category')

//create a category
//post request
//http://localhost:6789/category/create
exports.createCategory =  async(req,res,next)=>{
    try {
        const {name} = req.body
        if(!name){
            return res.status(422).json({error: 'Enter category name'})
        }else{
            const category = new Category({
                name
            })

            const savedCategory = await category.save()
            res.status(200).json({category: savedCategory}) 
        }
    } catch (error) {
        next(error)
    }
}

//get all categories
//get request
//http://localhost:6789/category/all
exports.getAllCategories = async(req,res,next)=>{
    try {
        const categories = await Category.find({})
        if (categories) {
            res.status(200).json({ categories: categories })
        } else {
            return res.status(403).json({ error: 'No categories Found' })
        }
    } catch (error) {
        next(error)
    }
}