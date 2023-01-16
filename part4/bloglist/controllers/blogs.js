import Blog from '../models/blog.js'
import express from 'express'
let blogsRouter = express.Router()

blogsRouter.get('/', async (request, response) => {
    const blogsFound = await Blog.find({})
    response.json(blogsFound)
})

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    
    const result = await blog.save()
    response.status(201).json(result)
})

export default blogsRouter