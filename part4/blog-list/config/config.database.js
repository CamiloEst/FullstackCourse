const mongoose = require('mongoose')
const {
  MONGO_USER,
  MONGO_PASS,
  MONGO_DB,
  MONGO_URL,
} = require('../config/config.init')
const { info, error } = require('../utils/logger.util')

const mongoOptions = {
  user: MONGO_USER,
  pass: MONGO_PASS,
  dbName: MONGO_DB,
  writeConcern: 'majority',
  retryWrites: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
}



const connect = () =>{
  mongoose.set('strictQuery', false)
  mongoose
  .connect(MONGO_URL, mongoOptions)
  .then(() => info(`Connected to database ${MONGO_DB} with user ${MONGO_USER}`))
  .catch((err) => error(err))
}



module.exports = {connect}
