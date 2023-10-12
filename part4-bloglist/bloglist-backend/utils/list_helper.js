const logger = require('./logger')
const lodash = require('lodash')

const dummy = (blogs) => {
  logger.info(blogs)
  return 1
}

// get the total number of likes for all blogs in the list
const totalLikes = (blogs) => {
  // the reducer function is applied to each element of the array, resulting in a single output value
  // here we take the likes and sum them up to the total number of likes of all blogs in the list
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  // return 0 if list of blogs is empty
  // otherwise return the total number of likes using the reducer function
  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

// get the blog with the most likes
const favoriteBlog = (blogs) => {
  // return empty object if list of blogs is empty
  if (blogs.length === 0) {
    return {}
  }

  // first lay out blogs to a list with blog.likes and find the max
  const maxLikes = Math.max(...blogs.map(blog => blog.likes))

  // then find the blog that has the max likes
  const favBlog = blogs.find(blog => blog.likes === maxLikes)

  // finally return object as specified
  return ({
    title: favBlog.title,
    author: favBlog.author,
    likes: favBlog.likes
  })
}

// get the author with the most blogs
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

// get the author with the most likes
const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }

  // get the list of blogs grouped by author (lodash.groupBy)
  // ==> { author1: [blog1, blog2, ...], author2: [blog1, blog2, ...], ... }
  const grouped = lodash.groupBy(blogs, 'author')
  logger.info('grouped: ', grouped)

  // map the grouped list to a list of { author, totalLikes } objects
  // use the totalLikes function to calculate the total likes for each author
  /*[
      { author: 'Michael Chan', totalLikes: 7 },
      { author: 'Edsger W. Dijkstra', totalLikes: 17 },
      { author: 'Robert C. Martin', totalLikes: 12 }
    ] */
  const likes = lodash.map(grouped, (group_by_author, author) => ({ author, totalLikes: totalLikes(group_by_author) }))
  logger.info('likes: ', likes)

  // finally get the author with the most likes = get from the likes list the entry with the max totalLikes
  const mostLikesEntry = lodash.maxBy(likes, 'totalLikes')

  // and return an object with the author and the totalLikes
  return {
    author: mostLikesEntry.author,
    likes: mostLikesEntry.totalLikes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
