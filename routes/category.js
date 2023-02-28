const express = require('express')
const CategoryController = require('../Controller/categoryController')
const router = express.Router()
const {authentication}=require('../Middleware/Authentication')

router.get('/',authentication,CategoryController.showCategories)
router.post('/',authentication,CategoryController.addCategories)
router.delete('/:categoryId',authentication,CategoryController.deleteCategory)
module.exports = router