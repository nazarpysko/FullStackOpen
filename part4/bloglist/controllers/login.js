import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'
import express, { response } from 'express'
const loginRouter = express.Router()
import User from '../models/user'

loginRouter.post('/', async (request, response) => {
    const { username, password } = request.body

    const user = await User.findOne({ username })
    const passwordCorrect = user === null 
        ? false 
        : await bcryptjs.compare(password, user.passwordHash)

    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }

    const userForToken = {
        username: user.username,
        id: user.id
    }

    const token = jwt.sign(userForToken, process.env.SECRET)
    response
        .status(200)
        .send({ token, username: user.username, name: user.name })
})

export default loginRouter