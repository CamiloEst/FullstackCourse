const _ = require('lodash')

const dummy = () => 1

const totalLikes = (blogs) =>
  blogs.reduce((total, index) => total + index.likes, 0)

const favoriteBlog = (blogs) =>
  blogs.length !== 0
    ? blogs.reduce((favorite, current) =>
        current.likes > favorite.likes ? current : favorite
      )
    : {}

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
]

const blogsPerAuthor = (blogs, author) =>
  blogs.reduce(
    (total, actual) => (actual.author === author ? ++total : total),
    0
  )

const likesPerAuthor = (blogs, author) =>
  blogs.reduce(
    (total, actual) =>
      actual.author === author ? (total += actual.likes) : total,
    0
  )

const getAuthors = (blogs) => {
  return [...new Set(blogs.map((blog) => blog.author))]
}

const mostBlogs = (blogs) =>
  blogs.length !== 0
    ? getAuthors(blogs)
        .map((author) => ({ author, blogs: blogsPerAuthor(blogs, author) }))
        .reduce((max, next) => (next.blogs > max.blogs ? next : max))
    : {}

const mostLikes = (blogs) =>
  blogs.length !== 0
    ? getAuthors(blogs)
        .map((author) => ({ author, likes: likesPerAuthor(blogs, author) }))
        .reduce((max, next) => (next.likes > max.likes ? next : max))
    : {}

console.log(mostLikes(blogs))
console.log(mostBlogs(blogs))

//console.log(_.maxBy(blogs, blog => blog.likes))
//console.log(_.sumBy(blogs, b => b.likes));

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostLikes,
  mostBlogs,
}
