import bcryptjs from 'bcryptjs'
import User from '../models/user.js'
import express, { application, request } from 'express'
let usersRouter = express.Router()

usersRouter.get('/', async (request, response) => {
    const usersFound = await User.find({})
    response.json(usersFound)
})

usersRouter.post('/', async (request, response) => {
    const { username, name, password} = request.body

    if (!username || !password) {
        return response.status(400).json({
            error: 'username or password were not given'
        })
    }

    if (password.length < 3) {
        return response.status(400).json({
            error: 'password must be at least 3 characters'
        })
    }

    if (await User.findOne({ username })) {
        return response.status(400).json({
            error: 'username must be unique'
        })
    }

    
    const passwordHash = await bcryptjs.hash(password, 13)
    const newUser = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await newUser.save()
    response.status(201).json(savedUser)
})

export default usersRouter