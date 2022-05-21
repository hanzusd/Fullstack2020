import React, { useState } from 'react'
import blogsService from '../services/blogs'

const Blog = ( { blog, user, sortBlogsbyLikes, setErrorMessage, toggleShow, addLike } ) => {
  const [ visible, setVisible ] = useState(blog.show)
  const [ likes, setLikes ] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const deleteBlog = async (id) => {
    var result = window.confirm('are you sure you want to delete ' + blog.title + 'by '+ blog.author +'?')
    if (result === true) {
      try {
        await blogsService.exterminate(id)
      } catch (error) {
        setErrorMessage({ msg: blog.title + ' has already been removed', error:true })
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
      const initialB = await blogsService.getAll()
      setErrorMessage({ msg: blog.title + ' has been deleted', error:false })
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      sortBlogsbyLikes(initialB)
    }
  }

  return (
    <div style={blogStyle} className='blog'>
      <div >
        { !visible ?
          <div>
        Title: {blog.title} <button id='view-button' buttonLabel='view' onClick={async () => {
              await toggleShow(blog.id)
              setVisible(!visible)}}>view</button> <br/>
          </div> :
          <div>
        Title: {blog.title} <button onClick={async () => {
              await toggleShow(blog.id)
              setVisible(!visible)}}>hide</button> <br/>
        Author: {blog.author}<br/>
        URL: {blog.url} <br/>
        Likes: {likes} <button id='like-button' buttonLabel='like' onClick={() => {
              addLike(blog.id)
              setLikes(blog.likes)}}>like</button><br/>
            {blog.user.username === user.username ?
              <button id='delete-button' className="button2" onClick={() => deleteBlog(blog.id)}>delete blog</button>:
              <div></div>
            }
          </div>
        }
      </div></div>
  )
}

export default Blog