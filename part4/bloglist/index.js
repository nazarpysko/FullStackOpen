import { PORT, MONGODB_URI } from './utils/config.js'
import logger from './utils/logger.js'

import http from 'http'
import cors from 'cors'

import mongoose from 'mongoose'
import Blog from './models/blog.js'

import express from 'express'
const app = express()

mongoose.connect(MONGODB_URI)
    .then(result => logger.info('connected successfully to MongoDB'))
    .catch(err => logger.error('failed to connect to MongoDB', err.message))

app.use(cors())
app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})