import { MONGODB_URI } from './utils/config.js'

import express from 'express'
const app = express()

import cors from 'cors'
import blogsRouter from './controllers/blogs.js'
import logger from './utils/logger.js'
import mongoose from 'mongoose'


logger.info('connecting to', MONGODB_URI)
mongoose.connect(MONGODB_URI)
    .then(result => logger.info('connected successfully to MongoDB'))
    .catch(err => logger.error('failed to connect to MongoDB', err.message))

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

export default app
