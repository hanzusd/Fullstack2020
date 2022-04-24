const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: "Minun Blogi",
        author: "MÄ",
        url: "osoite", 
        likes: 2
    },
    {
        title: "Sinun Blogi",
        author: "SÄ",
        url: "nettiosoite",
        likes: 3
    }
]
beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect('Content-Type', /application\/json/)
}, 100000)

test('there are two notes', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(2)
})

test('unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    
    expect(response.body[0].id).toBeDefined()
})

test('POST successfully creates a new blog post', async () => {
    const newBlog = {
        title: "Test Blog",
        author: "Tester",
        url: "testing url"
    }
    
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const contents = response.body.map(b => b.title)

    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(contents).toContain('Test Blog')
})

test('bad request without title or url', async () => {
    const newBlog = {
        author: "Bad Test"
    }

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

    const newBlogs = await api.get('/api/blogs')
    expect(newBlogs.body).toHaveLength(initialBlogs.length)

    const authors = newBlogs.body.map(a => a.author)
    expect(authors).not.toContain(newBlog.author)
})

test('blog created has 0 likes', async () => {
    const newBlog = {
        title: "Test Blog",
        author: "Tester",
        url: "testing url"
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/blogs')
      expect(response.body[2].likes).toEqual(0)
})

test('deleted note is deleted', async () => {
    const blogsAtStart = await api.get('/api/blogs')
    const blogToDelete = blogsAtStart.body[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
    
    const blogsAtEnd = await api.get('/api/blogs')

    expect(blogsAtEnd.body).toHaveLength(blogsAtStart.body.length-1)
} )

afterAll(() => {
  mongoose.connection.close()
})