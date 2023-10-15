const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('all blogs are returned and blogs are returned as json', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('unique identifier of blog posts is named id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added', async () => {
  const newBlog = {
    author: 'Michael Chan',
    likes: 7,
    title: 'React patterns',
    url: 'https://reactpatterns.com/',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect (blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(n => n.title)
  expect(titles).toContain('React patterns')
  const authors = blogsAtEnd.map(n => n.author)
  expect(authors).toContain('Michael Chan')
  const urls = blogsAtEnd.map(n => n.url)
  expect(urls).toContain('https://reactpatterns.com/')
})

test('missing likes defaults to zero', async () => {
  const newBlog = {
    author: 'Michael Chan',
    title: 'React patterns',
    url: 'https://reactpatterns.com/',
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const savedBlog = response.body
  expect(savedBlog.likes).toBe(0)
})

test('missing title results in error 400', async () => {
  const newBlog = {
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 2,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('missing url results in error 400', async () => {
  const newBlog = {
    author: 'Michael Chan',
    title: 'React patterns',
    likes: 2,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('missing title and url resulting in error 400', async () => {
  const newBlog = {
    author: 'Michael Chan',
    likes: 2,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('a non existing blog returns 404', async () => {
  const validNonexistingId = await helper.nonExistingId()
  await api
    .get(`/api/blogs/${validNonexistingId}`)
    .expect(404)
})

test('a non existing route returns 404', async () => {
  await api
    .get('/api/foobar')
    .expect(404)
})

afterAll(async () => {
  await mongoose.connection.close()
})
