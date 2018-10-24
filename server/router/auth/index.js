const router = require('express').Router()
const controller = require('./auth.controller')

router.post('/login', controller.login)

module.exports = router