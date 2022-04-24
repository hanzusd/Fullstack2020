const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
  })
  
blogsRouter.post('/', async (request, response) => {
    console.log('request:', request.body)
    request.body.likes = 0
    const blog = new Blog(request.body)    
  
    const savingBlog = await blog.save()
    response.status(201).json(savingBlog)
  })

  blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  })
  
  const errorHandler = (error, request, response, next) => {
    if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
      }
      next(error)
  }

blogsRouter.use(errorHandler)
  
  module.exports = blogsRouter