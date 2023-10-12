const logger = require('./logger')
const lodash = require('lodash')

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

const mostBlogs = (blogs) => {
  // return empty object if list of blogs is empty
  if (blogs.length === 0) {
    return {}
  }

  // get the list of blogs grouped by author (lodash.groupBy)
  // ==> { author1: [blog1, blog2, ...], author2: [blog1, blog2, ...], ... }
  const grouped = lodash.groupBy(blogs, 'author')
  logger.info('grouped: ', grouped)

  /* map the grouped list to a list of { author, count } objects
  The "map" method from the Lodash library takes an object or array and a callback function as arguments
  and returns a new object or array where each element is the result of applying the callback function
  to the corresponding element of the original object or array.
  Here, the "map" method is taking the grouped object and a callback function that takes each group and
  its corresponding author name as arguments and returns an object with the author name and the length
  of the group array as properties
    counts:  [
      { author: 'Michael Chan', count: 1 },
      { author: 'Edsger W. Dijkstra', count: 2 },
      { author: 'Robert C. Martin', count: 3 }
    ] */
  const counts = lodash.map(grouped, (group_by_author, author) => ({ author, count: group_by_author.length }))
  logger.info('counts: ', counts)

  // finally get the author with the most blogs = get from the counts list the entry with the max count
  const maxEntry = lodash.maxBy(counts, 'count')
  logger.info('maxEntry: ', maxEntry)

  // and return an object with the author and the count
  return {
    author: maxEntry.author,
    blogs: maxEntry.count
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
