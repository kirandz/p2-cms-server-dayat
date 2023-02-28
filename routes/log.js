const express= require('express')
const LogController = require('../Controller/logController')
const router =express.Router()
const {authentication}=require('../Middleware/Authentication')

router.get('/',authentication,LogController.showLogs)

module.exports = router