const blogsRouter = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/User')

blogsRouter.get('/', async(request, response) => {
    //console.log('from get')
    const blogs = await Blog
    .find({}).populate('user',{username:1,name:1})
    response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async(request, response, next) => {
    const body = request.body
    const user = await User.findById(body.userId)
    const blogg = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })
    try {
        const blogSaved = await blogg.save()
        user.blogs = user.blogs.concat(blogSaved._id)
        await user.save()
        response.json(blogSaved.toJSON())
    } catch (err) {
        next(err)
    }
})
blogsRouter.delete('/:id', async(req, resp, next) => {
    try {
        await Blog.findByIdAndRemove(req.params.id)
        resp.status(204).end()
    } catch (exception) {
        next(exception)
    }
})
blogsRouter.put('/:id', async(req, resp, next) => {
    const body = req.body
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }
    console.log('from put')
    try {
        const updateblog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
        console.log('inside ', updateblog)
        resp.json(updateblog.toJSON())

    } catch (excep) { next(excep) }
})

module.exports = blogsRouter