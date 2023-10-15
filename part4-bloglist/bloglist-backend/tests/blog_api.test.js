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

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('unique identifier of blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
    const titles = response.body.map(n => n.title)
    expect(titles).toContain('How to make a good cafe')
  })
})

describe('addition of a new blog', () => {
  test('succeeds with valid data', async () => {
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

  test('succeeds with missing likes defaults to zero', async () => {
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

  test('fails with status code 400 if title is missing', async () => {
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

  test('fails with status code 400 if url is missing', async () => {
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

  test('fails with statuscode 400 if title and url are missing', async () => {
    const newBlog = {
      author: 'Michael Chan',
      likes: 2,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
})

describe('viewing a specific blog', () => {
  test('succeeds with status code 200 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToView = blogsAtStart[0]

    await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const returnedBlog = await api.get(`/api/blogs/${blogToView.id}`)
    expect(returnedBlog.body).toEqual(blogToView)
  })

  test('fails with statuscode 404 if a blog does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()
    await api
      .get(`/api/blogs/${validNonexistingId}`)
      .expect(404)
  })

  test('fails with statuscode 400 if id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'
    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
  })

  test('fails with status code 400 if the route does not exist', async () => {
    await api
      .get('/api/foobar')
      .expect(404)
  })
})

describe ('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const titles = blogsAtEnd.map(n => n.title)
    expect(titles).not.toContain(blogToDelete.title)
  })

  test('fails with status code 400 if id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'
    await api
      .delete(`/api/blogs/${invalidId}`)
      .expect(400)
  })
})

describe ('updating a blog', () => {
  test('succeeds with status code 200 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = { ...blogsAtStart[0], likes: blogsAtStart[0].likes + 1 }

    const updatedBlog = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(updatedBlog.body.likes).toBe(blogToUpdate.likes)
    expect(updatedBlog.body.title).toBe(blogToUpdate.title)
    expect(updatedBlog.body.author).toBe(blogToUpdate.author)
    expect(updatedBlog.body.url).toBe(blogToUpdate.url)
    expect(updatedBlog.body.id).toBe(blogToUpdate.id)
  })

  test('fails with status code 400 if id is invalid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const invalidId = '5a3d5da59070081a82a3445'
    await api
      .put(`/api/blogs/${invalidId}`)
      .send(blogToUpdate)
      .expect(400)
  })

  test('fails with status code 404 if a blog does not exist', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const validNonexistingId = await helper.nonExistingId()
    await api
      .put(`/api/blogs/${validNonexistingId}`)
      .send(blogToUpdate)
      .expect(404)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
