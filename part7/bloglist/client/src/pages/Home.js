import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import blogService from '../services/blogs';

import { setBlogs } from '../reducers/blogsReducer';
import { showNotification } from '../reducers/notificationReducer';

import Blog from '../components/Blog';
import BlogForm from '../components/BlogForm';
import Togglable from '../components/Togglable';

const Home = () => {
  const dispatch = useDispatch();
  
  const user = useSelector(state => state.user);
  const blogs = useSelector(state => state.blogs);
  
  const blogFormRef = useRef();

  const sortBlogsByLikes = blogs => {
    dispatch(setBlogs(blogs.sort((a, b) => (a.likes > b.likes ? -1 : 1))));
  };

  const createBlog = async newBlog => {
    blogFormRef.current.toggleVisibility();

    try {
      const newBlogAdded = await blogService.create(newBlog);
      const updatedBlogs = await blogService.getAll();
      
      sortBlogsByLikes(updatedBlogs);
      dispatch(showNotification(`a new blog ${newBlogAdded.title} by ${newBlogAdded.author} added`));
    } catch (exception) {
      dispatch(showNotification('empty fields of new blog'));
    }
  };

  const updateLikes = async blogToUpdate => {
    sortBlogsByLikes(
      blogs.map(blog => (blog.id === blogToUpdate.id ? { ...blog, likes: blogToUpdate.likes + 1 } : blog))
    );
    await blogService.addLike(blogToUpdate);
  };

  const removeBlog = async blogToRemove => {
    await blogService.remove(blogToRemove);

    sortBlogsByLikes(blogs.filter(blog => blog.id !== blogToRemove.id));
    dispatch(showNotification('blog removed'));
  };

  return (
    <div>
      <Togglable buttonLabel={'new blog'} ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
      {blogs.map(blog => (
        <Blog key={blog.id} user={user} blog={blog} updateLikes={updateLikes} removeBlog={removeBlog} />
      ))}
    </div>
  );
};

export default Home;
