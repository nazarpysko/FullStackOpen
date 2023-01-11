import { PORT, MONGODB_URI } from './utils/config.js'
import logger from './utils/logger.js'

import http from 'http'
import cors from 'cors'

import mongoose from 'mongoose'
mongoose.set('strictQuery', false)

import express from 'express'
const app = express()

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

mongoose.connect(MONGODB_URI)

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