import blogsService from '../services/blogs'
import React, { useState, useEffect } from 'react'

const Blog = ( {blog, blogs, sortBlogsbyLikes} ) => {
  const [ visible, setVisible ] = useState(blog.show)
  const [ likes, setLikes ] = useState(blog.likes)

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
  const addLike = (id) => {
    var liked = blogs.find(x => x.id === id)
    liked.likes = liked.likes + 1
    setLikes(liked.likes)
    sortBlogsbyLikes()

    blogsService
    .replace(id, liked)
  }

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
        Likes: {likes} <button onClick={() => addLike(blog.id)}>like</button><br/>
     </div> 
      }
      <button onClick={() => toggleShow(blog.id)}>view</button><br/>
      </div></div>)
  }

export default Blog