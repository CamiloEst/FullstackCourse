const app = require('./app')
const config = require('./config/config.init')
const logger = require('./utils/logger.util')


app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
