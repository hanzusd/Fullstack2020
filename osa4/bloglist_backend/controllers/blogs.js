const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }
  next()
}
blogsRouter.use(tokenExtractor)

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username:1, name: 1})

    response.json(blogs)
  })
  
blogsRouter.post('/', async (request, response) => {
    console.log('request:', request.body)
    const body = request.body

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: 0,
      user: user._id
    })

    const savingBlog = await blog.save()
    user.blogs = user.blogs.concat(savingBlog._id)
    await user.save()

    response.status(201).json(savingBlog)
  })

  blogsRouter.delete('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if(!blog.user) {
      return response.status(401).json({ error: 'you can only delete your own blogs' })
    } else if(blog.user.toString() === decodedToken.id) {
      await Blog.findByIdAndDelete(request.params.id) 
      response.status(204).end()
    } else {
    return response.status(401).json({ error: 'you can only delete your own blogs' })
    }
  })

  blogsRouter.put('/:id', async (request, response) => {
    const result = await Blog.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true }
    )
    if (!result) {
      response.status(404).end()
    } else {
      response.status(200).end()
    }
  })

  const errorHandler = (error, request, response, next) => {
    if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    } else if (error.name === 'JsonWebTokenError') {
      return response.status(401).json({
        error: 'invalid token'
      })
    } else if (error.name === 'TokenExpiredError') {
      return response.status(401).json({
        error: 'token expired'
      })
    }
    next(error)
  }

blogsRouter.use(errorHandler)
  
module.exports = blogsRouter