const Blog = require('../models/blog.schema')
const User = require('../models/user.schema')
const Comment = require('../models/comment.schema')

const getAllBlogs = async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', {
      username: 1,
      name: 1,
      id: 1,
    })
    .populate('comments', { content: 1 })
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
  return response
    .status(201)
    .json(await savedBlog.populate('user', { username: 1 }))
}
module.exports.postBlog = postBlog

const deleteBlog = async (request, response) => {
  const id = request.params.id
  const userId = request.userId

  if (!userId) return response.status(401).json({ error: 'token invalid' })

  const blogToDelete = await Blog.findById(id)
  if (blogToDelete === null)
    return response.status(404).json({ error: 'Blog not found' })

  const isBySameAuthor = blogToDelete.user.toString() === userId

  if (!isBySameAuthor)
    return response
      .status(401)
      .json({ error: `The user ${userId} can´t remove this blog` })

  await Blog.findByIdAndRemove(id)

  const user = await User.findById(userId)
  user.blogs = user.blogs.filter((b) => b._id.toString() !== id)

  await user.save()

  response.status(204).end()
}
module.exports.deleteBlog = deleteBlog

const updateBlog = async (request, response) => {
  const id = request.params.id
  const { title, author, url, likes } = request.body

  const blog = { title, author, url, likes }

  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, {
    new: true,
  }).populate('user', { username: 1 })
  response.status(200).json(updatedBlog)
}
module.exports.updateBlog = updateBlog

const voteBlog = async (request, response) => {
  const id = request.params.id
  const { content } = request.body

  const blog = await Blog.findById(id)

  if (!blog) return response.status(404).json({ error: 'Blog not found' })

  const comment = new Comment({ content, blogId: blog.id })

  const newComment = await comment.save()
  blog.comments = blog.comments.concat(newComment._id)

  const savedBlog = await blog.save()
  await savedBlog.populate('user comments', ['content', 'username', 'name'])

  return response.status(200).json(savedBlog)
}
module.exports.voteBlog = voteBlog
