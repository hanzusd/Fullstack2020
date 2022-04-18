const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
  })
  
blogsRouter.post('/', async (request, response) => {
    console.log('request:', request.body)
    const blog = new Blog(request.body)
  
    const savingBlog = await blog.save()
    response.status(201).json(savingBlog)
    console.log(savingBlog)
  })
  
  module.exports = blogsRouter