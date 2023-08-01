const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user.schema')
const helper = require('./helpers/user.helper')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  await helper.fillPassword()
  const userObjects = helper.initialUsers.map((user) => new User(user))

  const promiseArray = userObjects.map((user) => user.save())
  await Promise.all(promiseArray)
}, 100000)

describe('When an user is post', () => {
  test('return the new user if the information is correct', async () => {
    await api
      .post('/api/users')
      .send(helper.newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length + 1)

    const users = usersAtEnd.map((u) => u.username)
    expect(users).toContain(helper.newUser.username)
  })

  test('return 400 if username already exist', async () => {
    const res = await api
      .post('/api/users')
      .send(helper.existingUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(res.body.error).toBe(
      'User validation failed: username: Error, expected `username` to be unique. Value: `milksea`'
    )
  })

  test('return 400 if username lenght is less than 3', async () => {
    const res = await api
      .post('/api/users')
      .send(helper.shortUsername)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(res.body.error).toBe(
      'User validation failed: username: Path `username` (`mi`) is shorter than the minimum allowed length (3).'
    )
  })

  test('return 400 if password lenght is less than 3', async () => {
    const res = await api
      .post('/api/users')
      .send(helper.shortPassword)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(res.body.error).toBe(
      'Password is shorter than the minimum allowed length (3).'
    )
  })
})

afterAll(async () => {
  await mongoose.connection.close()
}, 100000)
