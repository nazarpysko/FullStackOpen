import { isValidObjectId } from 'mongoose'
import Blog from '../models/blog.js'
import express from 'express'
let blogsRouter = express.Router()

blogsRouter.get('/', async (request, response) => {
    const blogsFound = await Blog.find({})
    response.json(blogsFound)
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body
    if (!body.title || !body.url) {
        return response.status(400).json({
            error: 'body content missing'
          })
    }
    
    body.likes = body.likes ?? 0
    const blog = new Blog(body)
    
    const result = await blog.save()
    response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
    if (!isValidObjectId(request.params.id)) {
        return response.status(400).json({
            error: 'malformed id'
        })
    }

    const result = await Blog.findByIdAndRemove(request.params.id)
    if (result) {
        response.status(204).end()
    } else {
        response.status(404).end()
    }
})

blogsRouter.put('/:id', async (request, response) => {
    if (!isValidObjectId(request.params.id)) {
        return response.status(400).json({
            error: 'malformed id'
        })
    }

    const likes = Number(request.body.likes)
    if (!likes) {
        return response.status(400).json({
            error: 'likes are missing'
        })
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id,{ likes: likes }, { new: true })
    if (updatedBlog) {
        response.json(updatedBlog)
    } else {
        response.status(404).end()
    }
})

export default blogsRouter