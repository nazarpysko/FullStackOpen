import middleware from '../utils/middleware.js'
import jwt from 'jsonwebtoken'
import { isValidObjectId } from 'mongoose'
import Blog from '../models/blog.js'
import express from 'express'
import User from '../models/user.js'

let blogsRouter = express.Router()

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }

    return null
}

blogsRouter.get('/', async (request, response) => {
    const blogsFound = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
    response.json(blogsFound)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({
            error: 'token missing or invalid'
        })
    }

    
    if (!body.title || !body.url) {
        return response.status(400).json({
            error: 'body content missing'
        })
    }
    
    body.likes = body.likes ?? 0
    
    const user = await User.findById( decodedToken.id )
    body.user = user._id
    
    const blog = new Blog(body)
    const savedBlog = await blog.save()
    
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
    if (!isValidObjectId(request.params.id)) {
        return response.status(400).json({
            error: 'malformed id'
        })
    }

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({
            error: 'token missing or invalid'
        })
    }

    const blogToDelete = await Blog.findById(request.params.id)
    if (!blogToDelete) {
        response.status(404).end()
    } else if (blogToDelete.user.toString() !== decodedToken.id) {
        return response.status(401).end()
    }  

    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
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

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, { likes: likes }, { new: true })
    if (updatedBlog) {
        response.json(updatedBlog)
    } else {
        response.status(404).end()
    }
})

export default blogsRouter