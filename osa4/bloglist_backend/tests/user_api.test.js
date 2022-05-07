const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')
const Blog = require('../models/blog')

const initialUsers = [
    {
        username: "minä",
        name: "Minä Itse",
        password: "salainen"
    }
]
beforeEach(async () => {
    await User.deleteMany({})
    let userObject = new User(initialUsers[0])
    await userObject.save()
})

test('bad request without username or password', async () => {
    const newUser = {
        username: "BadTest"
    }

    await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

    const newUsers = await api.get('/api/users')
    expect(newUsers.body).toHaveLength(initialUsers.length)

    const usernames = newUsers.body.map(u => u.username)
    expect(usernames).not.toContain(newUser.username)
})

test('bad request with a password too short', async () => {
    const newUser = {
        username: "badtest",
        user: "Bad Tester",
        password: "sa"
    }

    await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('{"error":"password should be at least 3 characters long"}')

    const newUsers = await api.get('/api/users')
    expect(newUsers.body).toHaveLength(initialUsers.length)

    const usernames = newUsers.body.map(u => u.username)
    expect(usernames).not.toContain(newUser.username)
})

test('bad request with a username too short', async () => {
    const newUser = {
        username: "ba",
        user: "Bad Tester",
        password: "onsalasana"
    }

    await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('{"error":"User validation failed: username: Path `username` (`ba`) is shorter than the minimum allowed length (3)."}')

    const newUsers = await api.get('/api/users')
    expect(newUsers.body).toHaveLength(initialUsers.length)

    const usernames = newUsers.body.map(u => u.username)
    expect(usernames).not.toContain(newUser.username)
})

test('bad request with a username already in use', async () => {
    const newUser = {
        username: "minä",
        user: "Bad Tester",
        password: "onsalasana"
    }

    await api
    .post('/api/users')
    .send(newUser)
    .expect(409)
    .expect('{"error":"user already exists"}')

    const newUsers = await api.get('/api/users')
    expect(newUsers.body).toHaveLength(initialUsers.length)
})