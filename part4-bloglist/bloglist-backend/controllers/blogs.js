const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.statusMessage = `Blog with id ${request.params.id} not found`
    response.status(404).end()
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    author: body.author,
    likes: body.likes,
    title: body.title,
    url: body.url,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  if (!updatedBlog) {
    response.statusMessage = `Blog with id ${request.params.id} not found`
    response.status(404).end()
  }
  response.json(updatedBlog)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  if (!blog.likes) {
    blog.likes = 0
  }

  if (!blog.title || !blog.url) {
    response.statusMessage = 'Title and url are required'
    response.status(400).end()
  }

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

module .exports = blogsRouter