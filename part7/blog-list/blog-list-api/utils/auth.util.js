const jwt = require('jsonwebtoken')
const { SECRET_KEY } = require('../config/config.init')

const createToken = (payload) =>
  jwt.sign({ ...payload }, SECRET_KEY, { expiresIn: 60 * 60 })

const decodeToken = token =>  jwt.verify(token,SECRET_KEY)


module.exports = {
  createToken,
  decodeToken
}
