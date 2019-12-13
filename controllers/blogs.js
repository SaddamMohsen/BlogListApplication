
const blogsRouter = require('express').Router()
const Blog= require('../models/Blog')

blogsRouter.get('/',async(request,response) => {
    console.log('from get')
  const blogs= await Blog.find({})
    
      response.json(blogs.map(blog =>blog.toJSON()))
})

blogsRouter.post('/', async(request, response,next) => {
  
  const blogg = new Blog(request.body)
   try{
      const blogSaved = await blogg.save()
     response.json(blogSaved.toJSON())
   }catch(err){next(err)}
})
blogsRouter.delete('/:id',async(req,resp,next)=>{
   try{
     await Blog.findByIdAndRemove(req.params.id)
     resp.status(204).end()
  }catch (exception) {
    next(exception)
  }
})
blogsRouter.put('/:id',async(req,resp,next)=>{
  const body= req.body
  const blog={
    title:body.title,
    author:body.author,
    url:body.url,
    likes:body.likes
  }
  console.log('from put')
  try{
  const updateblog=await Blog.findByIdAndUpdate(req.params.id,blog,{new:true})
         console.log('inside ',updateblog)
         resp.json(updateblog.toJSON())

  }catch(excep)
     {next(excep)}
})

module.exports = blogsRouter