import React, { useState, useEffect } from 'react'
import BlogForm from './components/BlogForm'
import AllBlogs from './components/AllBlogs'
import LoginForm from './components/LoginForm'
import blogsService from './services/blogs'

const App = () => {
  const [ blogs, setBlogs ] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogsService.setToken(user.token)
    }
  }, [])

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
          <h1>Add a blog</h1>
          <BlogForm blogs={blogs} setBlogs={setBlogs} setErrorMessage={setErrorMessage}/>
          <h1>Plokit</h1>
          <AllBlogs blogs={blogs} setBlogs={setBlogs}/>
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
      </div>
  )}
}

export default App