const router = require('express').Router()
const blogController = require('../controllers/blog.controller')

router.get('/blogs', blogController.getAllBlogs)
router.post('/blogs', blogController.postBlog)

module.exports = router