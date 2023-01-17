import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app";
import User from "../models/user";
import { initialUsers, usersInDb } from "./test_helper"; 
import bcryptjs from 'bcryptjs'

const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcryptjs.hash('easypassword123', 13)
    const user = new User({username: 'root', name: 'superuser', passwordHash})

    await user.save()
})

describe('when there is initially one user in db', () => {
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

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)        
    })
})