import React, { useState, useEffect } from 'react'
import blogsService from '../services/blogs'

const BlogForm = ( { blogs, setBlogs, setErrorMessage, setAddBlogVisible } ) => {
  const [ newTitle, setNewTitle ] = useState('')
  const [ newAuthor, setNewAuthor ] = useState('')
  const [ newURL, setNewURL ] = useState('')

  useEffect(() => {
    blogsService
      .getAll()
      .then(initialP => {
        initialP.sort((a, b) => {
          return b.likes-a.likes
        })
        setBlogs(initialP)
      })
  }, [])

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleURLChange = (event) => {
    setNewURL(event.target.value)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newURL,
      likes: 0,
      show: false
    }

    const returnBlog = await blogsService.create(blogObject)
    setBlogs(blogs.concat(returnBlog))
    const updateBlogs = await blogsService.getAll()
    setBlogs(updateBlogs)
    setErrorMessage({ msg: 'a new blog ' + newTitle + ' by ' + newAuthor + ' added', error:false })
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
    setNewTitle('')
    setNewAuthor('')
    setNewURL('')
  }

  return (
    <form onSubmit={addBlog}>
      <div>Title:  <input
        value={newTitle}
        onChange={handleTitleChange}
      /></div><div>
      Author: <input
          value={newAuthor}
          onChange={handleAuthorChange}
        /></div><div>
      Blog URL: <input
          value={newURL}
          onChange={handleURLChange}
        />
      </div>
      <button type="submit" onClick={() => setAddBlogVisible(false)}>save</button>
    </form>
  )
}


export default BlogForm