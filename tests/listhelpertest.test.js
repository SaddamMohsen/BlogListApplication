const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const listHelper = require('../utils/list_helper')
const Blog = require('../models/Blog')

describe('when there is initially some Blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = listHelper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  })
    test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(listHelper.initialBlogs.length)
  })
  afterAll(() => {
  mongoose.connection.close()
})
})
describe('total likes', () => {
  const listWithOneBlog = [
    { id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]
test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    console.log(result)
    expect(result).toBe(5)
  })
test('when list has many blogs',async()=>{
  const response = await api.get('/api/blogs')
  const result=listHelper.totalLikes(response.body)
  console.log(result)
   expect(result).toBe(36)
})
test('when lis has 0 blogs',()=>{
  const result=listHelper.totalLikes([])
  console.log(result)
   expect(result).toBe(0)
})
afterAll(() => {
  mongoose.connection.close()
})
})