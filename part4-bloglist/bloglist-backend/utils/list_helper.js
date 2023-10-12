const logger = require('./logger')

const dummy = (blogs) => {
  logger.info(blogs)
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  // return empty object if list of blogs is empty
  if (blogs.length === 0) {
    return {}
  }

  // lay out blogs to a list with blog.likes and find the max
  const maxLikes = Math.max(...blogs.map(blog => blog.likes))
  // find the blog that has the max likes
  const favBlog = blogs.find(blog => blog.likes === maxLikes)
  // return object as specified
  return ({
    title: favBlog.title,
    author: favBlog.author,
    likes: favBlog.likes
  })
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
