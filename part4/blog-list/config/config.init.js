require('dotenv').config()

const PORT = process.env.PORT
const MONGO_USER =  process.env.MONGO_USER
const MONGO_PASS = process.env.MONGO_PASS
const MONGO_DB = process.env.NODE_ENV === 'test'
  ? process.env.MONGO_DB_TEST
  : process.env.MONGO_DB
const MONGO_URL= process.env.MONGO_URL
const SECRET_KEY = process.env.SECRET_KEY

module.exports = {
  PORT,
  MONGO_USER,
  MONGO_PASS,
  MONGO_DB,
  MONGO_URL,
  SECRET_KEY
}