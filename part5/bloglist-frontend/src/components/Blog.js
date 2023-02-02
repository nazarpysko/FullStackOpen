import { useState } from "react"

const Blog = ({ blog, updateLikes }) => {
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

  const showWhenVisible = { display: visible ? '' : 'none' }

  return (
    <div style={blogStyle}>
      { blog.title } - { blog.author } <button onClick={() => setVisible(!visible)}> { visible ? 'hide' : 'view' } </button>
      <div style={ showWhenVisible }>
        {blog.url} <br/>
        likes {blog.likes} <button onClick={() => handleUpdateLikes(blog)}> like </button> <br/>
        {blog.user.name}
      </div>
    </div>  
  )
} 

export default Blog