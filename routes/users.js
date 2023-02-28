const express = require('express')
const UserController = require('../Controller/userController')
const router = express.Router()

router.post('/register',UserController.createUser)
router.post('/login',UserController.login)
router.post('/googleLogin',UserController.googleLogin)
module.exports=router