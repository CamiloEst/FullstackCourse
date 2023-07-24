const Blog = require('../models/blog.schema')

const getAllBlogs = (request, response) => {
  Blog.find({}).then((blogs) => response.json(blogs))
}

module.exports.getAllBlogs = getAllBlogs

const postBlog = (request, response) => {
  const blog = new Blog(request.body)
  blog.save().then((result) => response.status(201).json(result))
}

module.exports.postBlog = postBlog
