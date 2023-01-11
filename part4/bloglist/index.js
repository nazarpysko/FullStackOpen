import { PORT, MONGODB_URI } from './utils/config.js'
import logger from './utils/logger.js'

import http from 'http'
import cors from 'cors'

import mongoose from 'mongoose'

import blogsRouter from './controllers/blogs.js'

import express from 'express'
const app = express()

mongoose.connect(MONGODB_URI)
    .then(result => logger.info('connected successfully to MongoDB'))
    .catch(err => logger.error('failed to connect to MongoDB', err.message))

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})