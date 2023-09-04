const Blog = require('../models/blog.schema')
const User = require('../models/user.schema')

const testingReset =  async (request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
}

module.exports.testingReset = testingReset