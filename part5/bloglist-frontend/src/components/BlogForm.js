import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  const addBlog = event => {
    event.preventDefault()
    createBlog(newBlog)

    setNewBlog({ title: '', author: '', url: '' })
  }

  return (
    <div>
      <h2> create a new blog </h2>
      <form onSubmit={ addBlog }>
          title:
        <input
          type='text'
          value={ newBlog.title }
          name='Title'
          onChange={ ({ target }) => setNewBlog({ ...newBlog, title: target.value }) }
          id='blog-title-input'
        />

        <br/>

          author:
        <input
          type='text'
          value={ newBlog.author }
          name='Author'
          onChange={ ({ target }) => setNewBlog({ ...newBlog, author: target.value }) }
          id='blog-author-input'
        />

        <br/>

          url:
        <input
          type='text'
          value={ newBlog.url }
          name='URL'
          onChange={ ({ target }) => setNewBlog({ ...newBlog, url: target.value }) }
          id='blog-url-input'
        />

        <br/>

        <button type='submit'> create </button>
      </form>

    </div>
  )
}

export default BlogForm