
const blogsRouter = require('express').Router()
const Blog= require('../models/Blog')

blogsRouter.get('/',(request,response,next) => {
    console.log('from get')
  Blog 
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
    .catch(err=>next(err))
})

blogsRouter.post('/', (request, response,next) => {
    console.log('from post')
  const blog = new Blog(request.body)
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch(err=>next(err))
})

module.exports = blogsRouter