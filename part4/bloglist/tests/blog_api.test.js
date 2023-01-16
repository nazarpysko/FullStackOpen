import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app.js'
import Blog from '../models/blog.js'
import { blogsInDb, initialBlogs } from './test_helper.js'

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())

    await Promise.all(promiseArray)
})

describe('when there is initially some blogs saved', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    
    test('correct amount of notes are returned', async () => {
        const response = await api.get('/api/blogs')
    
        expect(response.body).toHaveLength(initialBlogs.length)
    })
    
    test('verify id property name', async () => {
        const response = await api.get('/api/blogs')
        response.body.forEach(blog => {
            expect(blog.id).toBeDefined()
        })
    })
})

describe('when adding new note', () => {
    test('correct amount of blogs after creating new one', async () => {
        const newBlog = {
            title: 'New blog test',
            author: 'Nazar Pysko',
            url: 'invented url',
            likes: 42
        }
    
        await api.post('/api/blogs').send(newBlog)
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(initialBlogs.length + 1)
    })
    
    test('correct content of the blog saved', async () => {
        const newBlog = {
            title: 'New blog test',
            author: 'Nazar Pysko',
            url: 'invented url',
            likes: 42
        }
    
        const newBlogUploaded = (await api.post('/api/blogs').send(newBlog)).body
    
        const response = await api.get('/api/blogs')
        expect(response.body).toContainEqual(newBlogUploaded)
    })
    
    test('if likes property is missing, set it to 0', async () => {
        const newBlog = {
            title: 'New blog test',
            author: 'Nazar Pysko',
            url: 'invented url',
        }
    
        const newBlogUploaded = (await api.post('/api/blogs').send(newBlog)).body
        expect(newBlogUploaded.likes).toBeDefined()
        
        const response = await api.get('/api/blogs')
        expect(response.body).toContainEqual(newBlogUploaded)
    })
    
    test('if title or url are missing, respond with 400 status code', async () => {
        const newMalformedBlog = {
            author: 'Nazar Pysko',
            url: 'invented url'
        }
    
        await api
            .post('/api/blogs')
            .send(newMalformedBlog)
            .expect(400)
    })    
})


afterAll(() => {
    mongoose.connection.close()
})