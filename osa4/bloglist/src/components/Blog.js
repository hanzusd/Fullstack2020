import React, { useState } from 'react'
import blogsService from '../services/blogs'

const Blog = ( { blog, blogs, user, sortBlogsbyLikes, setErrorMessage, toggleShow } ) => {
  const [ visible, setVisible ] = useState(blog.show)
  const [ likes, setLikes ] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  /* const toggleShow = async (id) => {
    var toggled= blogs.find(x => x.id === id)
    toggled.show = !toggled.show
    setVisible(toggled.show)

    await blogsService.replace(id, toggled)

    const updateBlogs = await blogsService.getAll()
    sortBlogsbyLikes(updateBlogs)
  } */

  const addLike = async (id) => {
    var liked = blogs.find(x => x.id === id)
    liked.likes = liked.likes + 1
    setLikes(liked.likes)

    await blogsService.replace(id, liked)

    const updateBlogs = await blogsService.getAll()
    sortBlogsbyLikes(updateBlogs)
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
        Title: {blog.title} <button buttonLabel='view' onClick={() => {
              toggleShow(blog.id)
              setVisible(!visible)}}>view</button> <br/>
          </div> :
          <div>
        Title: {blog.title} <button onClick={() => {
              toggleShow(blog.id)
              setVisible(!visible)}}>hide</button> <br/>
        Author: {blog.author}<br/>
        URL: {blog.url} <br/>
        Likes: {likes} <button onClick={() => addLike(blog.id)}>like</button><br/>
            {blog.user.username === user.username ?
              <button className="button2" onClick={() => deleteBlog(blog.id)}>delete blog</button>:
              <div></div>
            }
          </div>
        }
      </div></div>
  )
}

export default Blog