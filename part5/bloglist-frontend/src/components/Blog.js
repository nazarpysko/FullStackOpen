import { useState } from 'react'

const Blog = ({ user, blog, updateLikes, removeBlog }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleUpdateLikes = async blog => {
    await updateLikes(blog)
  }

  const handleRemoveBlog = async blog => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await removeBlog(blog)
    }
  }

  const showWhenVisible = { display: visible ? '' : 'none' }

  return (
    <div className='blog' style={blogStyle}>
      { blog.title } - { blog.author } <button onClick={() => setVisible(!visible)}> { visible ? 'hide' : 'view' } </button>
      <div className='info' style={ showWhenVisible }>
        {blog.url} <br/>
        <span>likes {blog.likes}</span> <button className='like' onClick={() => handleUpdateLikes(blog)}> like </button> <br/>
        {blog.user.name} <br/>
        {user.username === blog.user.username ? (
          <button
            onClick={() => handleRemoveBlog(blog)}>
          remove
          </button>
        ) : null}

        {/* <button
          style={{ display: user.username === blog.user.username ? '' : 'none' }}
          onClick={() => handleRemoveBlog(blog)}>
            remove
        </button> */}
      </div>
    </div>
  )
}

export default Blog