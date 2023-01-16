import Blog from '../models/blog.js'
import express from 'express'
import logger from '../utils/logger.js'
let blogsRouter = express.Router()

blogsRouter.get('/', async (request, response) => {
    const blogsFound = await Blog.find({})
    response.json(blogsFound)
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body
    if (!body.title || !body.url) {
        return response.status(400).end()    
    }
    
    body.likes = body.likes ?? 0
    const blog = new Blog(body)
    
    const result = await blog.save()
    response.status(201).json(result)
})

export default blogsRouter