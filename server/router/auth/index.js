const router = require('express').Router()
const controller = require('./auth.controller')

//router.post('/register', controller.register)
router.post('/login', controller.login)

//router.use('/check', authMiddleware)
router.get('/check', controller.check)

module.exports = router