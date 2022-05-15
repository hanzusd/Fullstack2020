import blogsService from '../services/blogs'
import React, { useState, useEffect } from 'react'

const Blog = ( {blog, blogs} ) => {
  const [ visible, setVisible ] = useState(blog.show)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleShow = (id) => {
    var toggled= blogs.find(x => x.id === id)
    toggled.show = !toggled.show
    setVisible(toggled.show)

    blogsService
    .replace(id, toggled)
    console.log('importance of ' + toggled.title + ' needs to be toggled')
  }
    /* const addLike = (id) => {
      var liked = blogs.find(x => x.id === id)
      console.log(liked)
      blogsService
      .replace(liked.likes, 4)
      .then(() => blogsService
      .getAll()
      )
    } */
    return (
    <div style={blogStyle}>
      <div>
      { visible ? 
      <div>
        Title: {blog.title} <br/>
      </div> :
      <div > 
        Title: {blog.title} <br/> 
        Author: {blog.author}<br/> 
        URL: {blog.url} <br/> 
        Likes: {blog.likes} <button>like</button><br/>
     </div> 
      }
      <button onClick={() => toggleShow(blog.id)}>view</button><br/>
      </div></div>)
  }

export default Blog