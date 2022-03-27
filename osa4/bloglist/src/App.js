import React, { useState, useEffect } from 'react'
import BlogForm from './components/BlogForm'
import AllBlogs from './components/AllBlogs'

const App = () => {
  const [ blogs, setBlogs ] = useState([])

    return (
        <div>
          <h1>Add a blog</h1>
          <BlogForm blogs={blogs} setBlogs={setBlogs}/>
          <h1>Plokit</h1>
          <AllBlogs blogs={blogs} setBlogs={setBlogs}/>
        </div>
      )
}

export default App