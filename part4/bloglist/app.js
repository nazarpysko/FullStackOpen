import { MONGODB_URI } from './utils/config.js'

import express from 'express'
import 'express-async-errors'
const app = express()

import cors from 'cors'
import blogsRouter from './controllers/blogs.js'
import logger from './utils/logger.js'
import mongoose from 'mongoose'
import middleware from './utils/middleware.js'
import usersRouter from './controllers/users.js'
import loginRouter from './controllers/login.js'
import testingRouter from './controllers/testing.js'


logger.info('connecting to', MONGODB_URI)
mongoose.connect(MONGODB_URI)
    .then(() => logger.info('connected successfully to MongoDB'))
    .catch(err => logger.error('failed to connect to MongoDB', err.message))

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.getTokenAndSetRequest)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === "test") {
    app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export default app