const Blog = require('../models/blog.schema')
const User = require('../models/user.schema')

const getAllBlogs = async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  })
  return response.json(blogs)
}
module.exports.getAllBlogs = getAllBlogs

const postBlog = async (request, response) => {
  const { title, author, url, likes } = request.body
  const userId = request.userId
  
  if (!userId) return response.status(401).json({ error: 'token invalid' })

  const user = await User.findById(userId)
  const newBlog = new Blog({ title, author, url, likes, user: userId })

  const savedBlog = await newBlog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  return response.status(201).json(savedBlog)
}
module.exports.postBlog = postBlog

const deleteBlog = async (request, response) => {
  const id = request.params.id
  const userId = request.userId

  if (!userId) return response.status(401).json({ error: 'token invalid' })

  const blogToDelete = await Blog.findById(id)
  if (blogToDelete === null) return response.status(404).json({ error: 'Blog not found' })

  const isBySameAuthor = blogToDelete.user.toString() === userId

  if (!isBySameAuthor)
    return response
      .status(401)
      .json({ error: `The user ${userId} can´t remove this blog` })

  await Blog.findByIdAndRemove(id)

  response.status(204).end()
}
module.exports.deleteBlog = deleteBlog

const updateBlog = async (request, response) => {
  const id = request.params.id
  const { title, author, url, likes } = request.body

  const blog = { title, author, url, likes }

  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true })
  response.status(200).json(updatedBlog)
}
module.exports.updateBlog = updateBlog
