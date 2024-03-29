import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import blogService from '../services/blogs';

import { setBlogs } from '../reducers/blogsReducer';
import { showNotification } from '../reducers/notificationReducer';

import Blog from '../components/Blog';
import BlogForm from '../components/BlogForm';
import Togglable from '../components/Togglable';

import { Link } from 'react-router-dom';

import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';

const BlogsList = () => {
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

  return (
    <div>
      <h1>blogs</h1>
      <Togglable buttonLabel={'new blog'} ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {blogs.map(blog => (
              <TableRow key={blog.id}>
                <TableCell>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </TableCell>
                <TableCell>{blog.author}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* {blogs.map(blog => (
        <Blog key={blog.id} user={user} blog={blog} />
      ))} */}
    </div>
  );
};

export default BlogsList;
