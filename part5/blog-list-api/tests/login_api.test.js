const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user.schema')
const helper = require('./helpers/user.helper')
const auth = require('../utils/auth.util')


const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  await helper.fillPassword()
  const userObjects = helper.initialUsers.map((user) => new User(user))

  const promiseArray = userObjects.map((user) => user.save())
  await Promise.all(promiseArray)
}, 100000)

describe('When an user is try to login', () => {

  test('Return the token with the user id', async () => {

    const response = await api
      .post('/api/login')
      .send(helper.userToLogin)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.token).toBeDefined()
    const user = User.findById(response.body.token.id)

    expect(response.body.token.id).toEqual(user._id)
  })

  test('Return 400 when information is incompleted', async () =>{
      await api
      .post('/api/login')
      .send(helper.incompleteUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('Return 401 when username or password is incorrect', async () =>{
      await api
      .post('/api/login')
      .send(helper.userToLoginWithIncorrectUserName)
      .expect(401)
      .expect('Content-Type', /application\/json/)

      await api
      .post('/api/login')
      .send(helper.userToLoginWithIncorrectPassword)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })

})

afterAll(async () => {
  await mongoose.connection.close()
}, 100000)
