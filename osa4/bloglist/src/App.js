import React, { useState, useEffect } from 'react'
import BlogForm from './components/BlogForm'
import AllBlogs from './components/AllBlogs'
import LoginForm from './components/LoginForm'
import blogsService from './services/blogs'

const App = () => {
  const [ blogs, setBlogs ] = useState([])
  const [ user, setUser ] = useState(null)

  const [ errorMessage, setErrorMessage ] = useState(null)
  const [ addBlogVisible, setAddBlogVisible ] = useState(false)

  const hideWhenVisible = { display: addBlogVisible ? 'none' : '' }
  const showWhenVisible = { display: addBlogVisible ? '' : 'none' }

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

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogsService.setToken(user.token)
    }
  }, [])

  const createBlog = async ({ title, author, url }) => {
    const blogObject = {
      title: title,
      author: author,
      url: url,
      likes: 0,
      show: false
    }

    const returnBlog = await blogsService.create(blogObject)
    setBlogs(blogs.concat(returnBlog))
    const updateBlogs = await blogsService.getAll()
    setBlogs(updateBlogs)
    setErrorMessage({ msg: 'a new blog ' + title + ' by ' + author + ' added', error:false })
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  return (
    <div>
      <Notification message={errorMessage} />

      {user === null ?
        <div>
          <h1>Login</h1>
          <LoginForm user={user} setUser={setUser} setErrorMessage={setErrorMessage}/></div> :
        <div>
          You are logged in as {user.name} <button onClick={() => {
            window.localStorage.removeItem('loggedAppUser')
            setUser(null)
          }}>logout </button>

          <div style={hideWhenVisible}>
            <button onClick={() => setAddBlogVisible(true)}>add new blog</button>
          </div>

          <div style={showWhenVisible}>
            <h1>Add a blog</h1>
            <BlogForm blogs={blogs} setBlogs={setBlogs}
              setAddBlogVisible={setAddBlogVisible} createBlog={createBlog}/>
            <button onClick={() => setAddBlogVisible(false)}>cancel</button>
          </div>
          <h1>Plokit</h1>
          <AllBlogs blogs={blogs} setBlogs={setBlogs} setErrorMessage={setErrorMessage} user={user}/>
        </div>
      }
    </div>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  if (message.error) {
    return (
      <div className="error">
        {message.msg}
      </div>
    )
  } else {
    return (
      <div className="success">
        {message.msg}
      </div>)}
}

export default App