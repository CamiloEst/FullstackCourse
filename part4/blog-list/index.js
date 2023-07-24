const app = require('./app')
const config = require('./config/config.init')
const logger = require('./utils/logger.util')
const database =  require('./config/config.database')

database.connect()

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
