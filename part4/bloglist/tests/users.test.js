import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app";
import User from "../models/user";
import Blog from "../models/blog";
import { initialUsers, usersInDb, loginInitialUser } from "./test_helper"; 
import bcryptjs from 'bcryptjs'

const api = supertest(app)

const resetTestSuit = () => {
    beforeEach(async () => {
        await User.deleteMany({})
        await Blog.deleteMany({})

        const passwordHash = await bcryptjs.hash('easypassword123', 13)
        const user = new User({username: 'root', name: 'superuser', passwordHash})

        await user.save()
    })
}
describe('when there is initially one user in db', () => {
    resetTestSuit()

    test('get the initial user', async () => {
        const response = await api.get('/api/users').expect(200).expect('Content-Type', /application\/json/)
        expect(response.body).toHaveLength(1)
    })

    test('creation succeed with a fresh username', async () => {
        const usersAtStart = await usersInDb()

        const newUser = {
            username: 'mano',
            name: 'Manolito',
            password: '12345678'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        const usersAtEnd = await usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(user => user.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creation fails with a taken username', async () => {
        const newUser = {
            username: 'root',
            name: 'Manolito',
            password: '12345678'
        }

        const error = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)       
            
        expect(error.body).toEqual({ error: 'username must be unique' })
    })

    test('creation fails with an invalid password length', async () => {
        const newUser = {
            username: 'mano',
            name: 'Manolito',
            password: '12'
        }

        const error = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
        
        expect(error.body).toEqual({ error: 'password must be at least 3 characters' })
    })

    test('creation fails with invalid username length', async () => {
        const newUser = {
            username: 'ma',
            name: 'Manolito',
            password: '1234'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
    })

    test('creation succeed with no name given', async () => {
        const newUser = {
            username: 'manolito',
            password: '1234'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
    })

    test('new blog get assigned an user and users blogs are updated after creating a blog', async () => {
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
            .expect(201)
        
        expect(result.body.user).toBeDefined()

        const user = (await User.find({}))[0]
        expect(user.blogs).toHaveLength(1)
    })

    test('new blogs get populated with user info', async () => {
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
            .expect(201)
        
        const user = (await api
            .get('/api/blogs')
            .expect(200)).body[0].user
            
        expect(user.username).toBeDefined()
        expect(user.name).toBeDefined()
        expect(user.id).toBeDefined()
        expect(user.passwordHash).not.toBeDefined()
    })

    test('existing user can log in', async () => {
        const result = await api
            .post('/api/login')
            .send({ username: 'root', password: 'easypassword123'})
            .expect(200)
        
        expect(result.body.token).toBeDefined()
        expect(result.body).toHaveProperty('username')
        expect(result.body).toHaveProperty('name')
    })

    test('existing user with wrong password can not log in', async () => {
        const result = await api
            .post('/api/login')
            .send({ username: 'root', password: 'wrongPassword'})
            .expect(401)
    })

    test('non existing user can not log in', async () => {
        const result = await api
            .post('/api/login')
            .send({ username: 'pedro', password: '12345678'})
            .expect(401)
    })

    test('new user can register and log in', async () => {
        const newUser = {
            username: 'pedro',
            name: 'Pedro Fernandez',
            password: '12345678'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
        
        const result = await api
            .post('/api/login')
            .send({ username: newUser.username, password: newUser.password})
            .expect(200)
        
        expect(result.body.token).toBeDefined()
        expect(result.body).toHaveProperty('username')
        expect(result.body).toHaveProperty('name')
    })
})