const express = require('express')
const PubUserController = require('../Controller/pubUser')
const { customerAuthentication } = require('../Middleware/Authentication')
const router = express.Router()

router.post('/register',PubUserController.register)
router.post('/login',PubUserController.login)
router.get('/posts',PubUserController.showPosts)
router.get('/likePosts',customerAuthentication,PubUserController.favoriteShowPosts)
router.post('/likePosts/:postId',customerAuthentication,PubUserController.addFavoritePost)
router.get('/posts/:postId',PubUserController.detailPost)
router.get('/categories',PubUserController.showCategories)
router.post('/googleSignIn',PubUserController.googleLogin)

module.exports=router

