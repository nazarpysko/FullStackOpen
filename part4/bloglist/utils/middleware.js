import User from '../models/user.js';
import logger from './logger.js';

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:', request.path)
    logger.info('Body:', request.body)
    logger.info('---')

    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({error: 'unknown endpoint'})
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === 'ValidationError') {
        return response.status(400).json({
            error: error.message
        })
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({
            error: 'invalid token'
        })
    }

    next(error)
}

const getTokenAndSetRequest = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.substring(7)
    }

    next()
}

const userExtractor = (request, response, next) => {
    const user = User.findById(request.token.id)
    if (user) {
        request.user = user
    }

    next()
}

export default {
    requestLogger,
    unknownEndpoint, 
    errorHandler,
    getTokenAndSetRequest,
    userExtractor
}