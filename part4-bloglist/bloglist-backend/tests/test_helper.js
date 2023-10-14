const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'How to make a good cafe',
    author: 'Cafe Master',
    url: 'www.cafemaster.com',
    likes: 100
  },
  {
    title: 'How to make a good restaurant',
    author: 'Restaurant Master',
    url: 'www.restaurantmaster.com',
    likes: 200
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}
