const { Category } = require('../models')
class CategoryController {
    static async showCategories(request, response, next) {
        try {
            let data = await Category.findAll()
            response.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async addCategories(request, response, next) {
        try {
            let { name } = request.body
            let data = await Category.create({ name })
            response.status(201).json({ data })
        }
        catch (error) {
            next(error)
        }
    }

    static async deleteCategory(request, response, next) {
        try {
            let id = request.params.categoryId
            let data = await Category.destroy({
                where:{
                    id:id
                }
            })
            if(data===0){
                throw{name:'error not found'}
            }
            response.status(200).json({message:"Category has been deleted"})
        }
        catch (error) {
            next(error)
        }
    }
}
module.exports = CategoryController