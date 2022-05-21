import React, { useState } from 'react'

const BlogForm = ( { setAddBlogVisible, createBlog } ) => {
  const [ newTitle, setNewTitle ] = useState('')
  const [ newAuthor, setNewAuthor ] = useState('')
  const [ newURL, setNewURL ] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleURLChange = (event) => {
    setNewURL(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newURL
    })
    setNewTitle('')
    setNewAuthor('')
    setNewURL('')
  }

  return (
    <form onSubmit={addBlog}>
      <div>Title:  <input
        id='title'
        value={newTitle}
        onChange={handleTitleChange}
        placeholder='this is title'
      /></div><div>
      Author: <input
          id='author'
          value={newAuthor}
          onChange={handleAuthorChange}
          placeholder='this is author'
        /></div><div>
      Blog URL: <input
          id='url'
          value={newURL}
          onChange={handleURLChange}
          placeholder='this is url'
        />
      </div>
      <button id="submit-button" type="submit" onClick={() => setAddBlogVisible(false)}>save</button>
    </form>
  )
}


export default BlogForm