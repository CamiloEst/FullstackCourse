const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog.schema')
const helper = require('./helpers/blog.helper')
const auth = require('../utils/auth.util')
const api = supertest(app)
const User = require('../models/user.schema')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog))
  const promiseArray = blogObjects.map((blog) => blog.save())

  await Promise.all(promiseArray)

}, 100000)

describe('When there is some blogs saved', () => {
  test(`Return the correct amount of blogs: ${helper.initialBlogs.length}`, async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  }, 100000)
})



describe('When a blog is added', () => {
  

  test('check if blog has id property', async () => {
    const blog = new Blog(helper.blog)
    expect(blog.id).toBeDefined()
  }, 100000)

  test('a new blog is created successfully', async () => {

    const user = await User.findOne({username: 'milksea'})
    const token = auth.createToken({id: user._id})

    await api
      .post('/api/blogs')
      .send(helper.blog)
      .set({authorization: `bearer ${token}`})
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const blogs = blogsAtEnd.map((b) => b.title)
    expect(blogs).toContain(helper.blog.title)
  })


  test('check if the default value of likes is 0', async () => {
    const user = await User.findOne({username: 'milksea'})
    const token = auth.createToken({id: user._id})

    const res = await api
      .post('/api/blogs')
      .send(helper.blog)
      .set({authorization: `bearer ${token}`})
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(res.body.likes).toBe(0)
  })

  test('check if a new blog does not contain a title and return status 400', async () => {

    const user = await User.findOne({username: 'milksea'})
    const token = auth.createToken({id: user._id})

    const res = await api
      .post('/api/blogs')
      .send(helper.blogWithoutTitle)
      .set({authorization: `bearer ${token}`})
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(res.body.error).toBe(
      'Blog validation failed: title: Path `title` is required.'
    )
  })

  test('check if a new blog does not contain an url and return status 400', async () => {
    const user = await User.findOne({username: 'milksea'})
    const token = auth.createToken({id: user._id})

    const res = await api
      .post('/api/blogs')
      .send(helper.blogWithoutUrl)
      .set({authorization: `bearer ${token}`})
      .expect(400)
      .expect('Content-Type', /application\/json/)
  
      expect(res.body.error).toBe('Blog validation failed: url: Path `url` is required.') 
  })

  test('If no token is provided return  401', async () => {

    const res = await api
      .post('/api/blogs')
      .send(helper.blogWithoutUrl)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  
      expect(res.body.error).toBe('jwt must be provided') 
  })

})


describe('Deletion of a blog', () => {

  test('succeeds with status code 204 if id is valid', async () => {
    const blogToDelete = helper.initialBlogs[0]

    const user = await User.findOne({username: 'test'})
    const token = auth.createToken({id: user._id})

    const a =  await api.delete(`/api/blogs/${blogToDelete.id}`)
    .set({authorization: `bearer ${token}`})
    //.expect(204)

    expect(a.body).toBe('asd')

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const contents = blogsAtEnd.map((b) => b.title)
    expect(contents).not.toContain(blogToDelete.title)

  }, 10000)

  test('fail if id is malformatted with status code 400', async () => {
    const malformattedId = '5a422b891b54a676234d17fa85484645'

    const user = await User.findOne({username: 'test'})
    const token = auth.createToken({id: user._id})

    await api.delete(`/api/blogs/${malformattedId}`)
          .set({authorization: `bearer ${token}`})
          .expect(400)
          
  }, 10000)
})

describe('Modify a blog', () => {
  test('succeeds with vaild data', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToModify = blogsAtStart[1]

    const blog = {
      author: 'Modified author',
      title: 'modified title',
      url: 'modified.com',
      likes: 30,
      id: blogToModify.id,
      user: blogToModify.user
    }

    const res = await api
      .put(`/api/blogs/${blog.id}`)
      .send(blog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(res.body).toEqual(blog)
  })

  test('fail if id is malformatted with status code 400', async () => {
    const malformattedId = '5a422b891b54a676234d17fa85484645'
    await api.put(`/api/blogs/${malformattedId}`).expect(400)
  }, 10000)
})

afterAll(async () => {
  await mongoose.connection.close()
}, 100000)
