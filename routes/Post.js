const express= require('express')
const PostController = require('../Controller/PostController')
const router =express.Router()
const {authentication}=require('../Middleware/Authentication')
const { deleteAuthorization, updateAuthorization,updatestatusAuthorization } = require('../Middleware/Authorization')

router.get('/',authentication,PostController.showPosts)
router.post('/',authentication,PostController.createPost)
router.get('/:id',authentication,PostController.showPost)
// router.delete('/:id',authentication,deleteAuthorization,PostController.deletePost)
router.put('/:id',authentication,updateAuthorization,PostController.updatePost)
router.patch('/:id/:status',authentication,updatestatusAuthorization,PostController.updateStatusPost)
module.exports = router