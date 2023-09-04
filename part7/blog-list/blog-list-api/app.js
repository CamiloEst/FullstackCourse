const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const morgan = require('morgan')

const middleware = require('./utils/middlewares.util')
const database = require('./config/config.database')

const blogRouter = require('./routes/blog.routes')
const userRouter = require('./routes/user.routes')
const loginRouter = require('./routes/login.routes')

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(morgan('tiny'))

database.connect()

app.use('/api', blogRouter)
app.use('/api', userRouter)
app.use('/api', loginRouter)

if (process.env.NODE_ENV === 'test') {
  app.use('/api', require('./routes/testing.routes'))
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
