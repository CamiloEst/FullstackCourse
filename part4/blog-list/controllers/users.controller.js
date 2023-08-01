const User = require('../models/user.schema')
const password_helper = require('../utils/password.util')

const getAllUsers = async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    url: 1,
    title: 1,
    author: 1,
    id: 1,
  })
  response.json(users)
}

module.exports.getAllUsers = getAllUsers

const postUser = async (request, response) => {
  const { username, password, name } = request.body
  if (!password_helper.isPasswordSizeValid(password))
    return response
      .status(400)
      .json({
        error: 'Password is shorter than the minimum allowed length (3).',
      })

  const user = new User({
    username: username,
    passwordHash: await password_helper.encryptPassword(password),
    name: name,
  })

  const savedUser = await user.save()

  return response.status(201).json(savedUser)
}

module.exports.postUser = postUser
