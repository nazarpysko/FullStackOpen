import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { commentBlog, setBlogs } from '../reducers/blogsReducer';
import blogService from '../services/blogs';
import { showNotification } from '../reducers/notificationReducer';
import { useState } from 'react';

const BlogDetails = () => {
  const [newComment, setNewComment] = useState('')

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const blogId = useParams().id;
  
  const user = useSelector(state => state.user);
  const blogs = useSelector(state => state.blogs);

  if (!blogs.length) return null;

  const blog = blogs.find(blog => blog.id === blogId);

  const updateLikes = async blogToUpdate => {
    await blogService.addLike(blogToUpdate);
    dispatch(
      setBlogs(blogs.map(blog => (blog.id === blogToUpdate.id ? { ...blog, likes: blogToUpdate.likes + 1 } : blog)))
    );
  };

  const removeBlog = async blogToRemove => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) return;

    await blogService.remove(blogToRemove);
    navigate('/');
    dispatch(setBlogs(blogs.filter(blog => blog.id !== blogToRemove.id)));
    dispatch(showNotification('blog removed'));
  };

  const addComment = async event => {
    event.preventDefault();
    await blogService.comment(blog.id, newComment)
    dispatch(commentBlog(blog.id, newComment))
    setNewComment('')
  }
  
  if (!blog) return null;
  return (
    <div>
      <h1>{blog.title}</h1>
      <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes} likes <button onClick={() => updateLikes(blog)}>like</button>
      </p>
      <p>added by {blog.user.name}</p>
      {user.username === blog.user.username ? <button onClick={() => removeBlog(blog)}>remove</button> : null}

      <h2>comments</h2>
      <form onSubmit={addComment}>
        <input type="text" value={newComment} onChange={({ target }) => setNewComment(target.value)}></input>
        <button type="submit">add comment</button>
      </form>
      {!blog.comments || !blog.comments.length ? (
        'no comments :('
      ) : (
        <ul>
          {blog.comments.map((comment, i) => (
            <li key={comment + i}>{comment}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BlogDetails;
