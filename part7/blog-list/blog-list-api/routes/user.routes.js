const router = require('express').Router()
const userController = require('../controllers/users.controller')

router.get('/users', userController.getAllUsers)
router.post('/users', userController.postUser)

module.exports = router