const User = require('../models/user.schema')
const auth = require('../utils/auth.util')
const password_helper = require('../utils/password.util')

const login = async (request, response) => {
  const { username, password } = request.body

  if (!username || !password)
    return response
      .status(400)
      .json({ error: 'Incomplete or bad formated data' })

  const user = await User.findOne({ username })

  const matchPassword =
    user === null
      ? false
      : await password_helper.comparePassword(password, user.passwordHash)

  if (!matchPassword)
    return response.status(401).json({ error: 'Invalid username or password' })

  const token = auth.createToken({ id: user._id })

  return response
    .status(200)
    .json({ token, username: user.username, name: user.name, id: user._id })
}
module.exports.login = login
