import { useState } from 'react'
import { Link } from 'react-router-dom'
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
    <div className="blog" style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} - {blog.author}
      </Link>
    </div>
  );
}

export default Blog;