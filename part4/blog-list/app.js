const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const middleware = require('./utils/middlewares.util')

const blogRouter = require('./routes/blog.routes')

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(morgan('tiny'))

app.use('/api', blogRouter)

app.use(middleware.unknownEndpoint)


module.exports = app