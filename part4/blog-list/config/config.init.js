require('dotenv').config()

const PORT = process.env.PORT
const MONGO_USER = process.env.MONGO_USER
const MONGO_PASS = process.env.MONGO_PASS
const MONGO_DB = process.env.MONGO_DB
const MONGO_URL= process.env.MONGO_URL
module.exports = {
  PORT,
  MONGO_USER,
  MONGO_PASS,
  MONGO_DB,
  MONGO_URL
}