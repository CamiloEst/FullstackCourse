const bcrypt = require('bcrypt')

const encryptPassword = async (password) => await bcrypt.hash(password, 10)

const comparePassword = async (password, hash) => await bcrypt.compare(password, hash)

const isPasswordSizeValid = (password) => password.length > 2

module.exports = {encryptPassword, isPasswordSizeValid, comparePassword}