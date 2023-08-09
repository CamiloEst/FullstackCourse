const router = require('express').Router()
const testingController = require('../controllers/testing.controller')

router.post('/testing/reset', testingController.testingReset)

module.exports = router