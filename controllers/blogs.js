
const blogsRouter = require('express').Router()
const Blog= require('../models/Blog')

blogsRouter.get('/', (request,response) => {
    console.log('from get')
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', (request, response) => {
    console.log('from post')
  const blog = new Blog(request.body)
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = blogsRouter