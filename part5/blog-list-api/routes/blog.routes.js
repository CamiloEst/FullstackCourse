const router = require('express').Router()
const blogController = require('../controllers/blogs.controller')
const {tokenExtractor, userExtractor} = require('../utils/middlewares.util')

router.get('/blogs',blogController.getAllBlogs)
router.post('/blogs',  tokenExtractor,userExtractor, blogController.postBlog)
router.delete('/blogs/:id', tokenExtractor,userExtractor, blogController.deleteBlog)
router.put('/blogs/:id', blogController.updateBlog)

module.exports = router