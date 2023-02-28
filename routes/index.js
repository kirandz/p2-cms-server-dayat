const express = require('express')
const router = express.Router()
const post = require('./Post')
const category = require('./category')
const user = require('./users')
const log = require('./log')
const pub = require('./pubCustomer')



router.use('/users', user)
router.use('/posts', post)
router.use('/categories', category)
router.use('/logs', log)
router.use('/pub',pub)



module.exports = router