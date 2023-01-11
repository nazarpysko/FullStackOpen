import { PORT } from './utils/config.js'
import http from 'http'
import logger from './utils/logger.js'
import app from './app.js'

const server = http.createServer(app)

server.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`)
})