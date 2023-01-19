import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app.js'
import Blog from '../models/blog.js'
import { blogsInDb, initialBlogs, loginInitialUser } from './test_helper.js'

const api = supertest(app)

const resetTestSuit = () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
    
        const blogObjects = initialBlogs.map(blog => new Blog(blog))
        const promiseArray = blogObjects.map(blog => blog.save())
    
        await Promise.all(promiseArray)
    })    
}

describe('when there is initially some blogs saved', () => {
    resetTestSuit()

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    
    test('correct amount of blogs are returned', async () => {
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

describe('when adding new blog', () => {
    resetTestSuit()

    test('correct amount of blogs after creating new one', async () => {
        const newBlog = {
            title: 'New blog test',
            author: 'Nazar Pysko',
            url: 'invented url',
            likes: 42
        }

        await api
            .post('/api/blogs')
            .set({ 'authorization': 'bearer ' + await loginInitialUser() })
            .send(newBlog)
  
        const result = await blogsInDb() 
        expect(result).toHaveLength(initialBlogs.length + 1)
    })
    
    test('correct content of the blog saved', async () => {
        const newBlog = {
            title: 'New blog test',
            author: 'Nazar Pysko',
            url: 'invented url',
            likes: 42
        }
    
        const result = await api
            .post('/api/blogs')
            .set({ 'authorization': 'bearer ' + await loginInitialUser() })
            .send(newBlog)
        
        const newBlogUploaded = result.body
        expect(newBlogUploaded.id).toBeDefined()
        expect(newBlogUploaded.user).toBeDefined()

        delete newBlogUploaded.user
        delete newBlogUploaded.id

        expect(newBlogUploaded).toEqual(newBlog)
    })
    
    test('if likes property is missing, set it to 0', async () => {
        const newBlog = {
            title: 'New blog test',
            author: 'Nazar Pysko',
            url: 'invented url',
        }
        
        const result = await api
            .post('/api/blogs')
            .set({ 'authorization': 'bearer ' + await loginInitialUser() })
            .send(newBlog)

        const newBlogUploaded = result.body
        expect(newBlogUploaded.likes).toBeDefined()
        expect(newBlogUploaded.likes).toEqual(0)
    })
    
    test('if title or url are missing, respond with 400 status code', async () => {
        const newMalformedBlog = {
            author: 'Nazar Pysko',
            url: 'invented url'
        }
    
        await api
            .post('/api/blogs')
            .set({ 'authorization': 'bearer ' + await loginInitialUser() })
            .send(newMalformedBlog)
            .expect(400)
    })
})

describe('when deleting a blog', () => {
    resetTestSuit()
    
    test('correct amount of blogs after deleting a blog', async () => {
        const firstBlog = (await blogsInDb())[0]
        await api.delete('/api/blogs/' + firstBlog.id)
    
        expect((await blogsInDb())).toHaveLength(initialBlogs.length - 1)
    })

    test('blog is not present after removing', async () => {
        const firstBlog = (await blogsInDb())[0]
        await api.delete('/api/blogs/' + firstBlog.id)
    
        expect((await blogsInDb())).not.toContainEqual(firstBlog)
    })

    test('if a valid id is not found, 404 status code is returned', async () => {
        await api
            .delete('/api/blogs/63be8321b5c72b1998deb2f7')
            .expect(404)
    })

    test('if malformed id is passed, error is returned', async () => {
        const malformedId = 'abc123'
        await api
            .delete('/api/blogs/' + malformedId)
            .expect(400)
    })

    test('no id is passed', async () => {
        await api
            .delete('/api/blogs/')
            .expect(404)
    })
})

describe('when updating likes from a blog', () => {
    resetTestSuit()

    test('blogs likes are updated', async () => {
        const firstBlog = (await blogsInDb())[0]
        const newLikes = 58
        const updatedBlog = await api.put('/api/blogs/' + firstBlog.id).send({ likes: newLikes })

        expect(updatedBlog.body.likes).toBe(newLikes)
    })

    test('no other blogs are updated', async () => {
        const blogs = await blogsInDb()
        const firstBlog = blogs[0]
        const newLikes = 58
        const updatedBlog = await api.put('/api/blogs/' + firstBlog.id).send({ likes: newLikes })
        blogs[0] = updatedBlog.body

        const blogsAfterUpdatingOneBlog = await blogsInDb()
        expect(blogsAfterUpdatingOneBlog).toEqual(blogs) 
    })

    test('no id is passed', async () => {
        await api
            .put('/api/blogs/').send({ likes: 88 })
            .expect(404)
    })

    test('no likes are passed', async () => {
        await api
            .put('/api/blogs/63be8321b5c72b1998deb2f7')
            .expect(400)
    })

    test('non existing id is passed', async () => {
        await api
            .put('/api/blogs/63fe8321b5c72b1998deb2f7')
            .send({ likes: 88 })
            .expect(404)
    })

    test('non valid id is passed', async () => {
        await api
        .put('/api/blogs/abc123')
        .send({ likes: 88 })
        .expect(400)
    })
})


afterAll(() => {
    mongoose.connection.close()
})