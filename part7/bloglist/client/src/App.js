import { useState, useEffect, useRef } from 'react';

import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

import blogService from './services/blogs';
import loginService from './services/login';
import { useDispatch, useSelector } from 'react-redux';

import { clearNotificationMessage, setNotificationMessage } from './reducers/notificationReducer'

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const blogFormRef = useRef();

  const dispatch = useDispatch();
  const notificationMsg = useSelector(state => state.notification);

  const sortBlogsByLikes = blogs => {
    setBlogs(blogs.sort((a, b) => (a.likes > b.likes ? -1 : 1)));
  };

  useEffect(() => {
    blogService.getAll().then(blogs => sortBlogsByLikes(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      setUser(loggedUser);
      blogService.setToken(loggedUser.token);
    }
  }, []);

  const showNotification = msg => {
    dispatch(setNotificationMessage(msg));
    setTimeout(() => dispatch(clearNotificationMessage()), 2000);
  };

  const handleLogin = async event => {
    event.preventDefault();

    try {
      const loggedUser = await loginService.login({ username, password });
      window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser));

      blogService.setToken(loggedUser.token);
      setUser(loggedUser);
      setUsername('');
      setPassword('');
    } catch (exception) {
      console.log(exception);
      showNotification('wrong username or password');
    }
  };

  const createBlog = async newBlog => {
    blogFormRef.current.toggleVisibility();

    try {
      const newBlogAdded = await blogService.create(newBlog);

      const updatedBlogs = await blogService.getAll();
      sortBlogsByLikes(updatedBlogs);

      showNotification(`a new blog ${newBlogAdded.title} by ${newBlogAdded.author} added`);
    } catch (exception) {
      showNotification('empty fields of new blog');
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
    showNotification('blog removed');
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>

        <Notification msg={notificationMsg} />

        <form id="login" onSubmit={handleLogin}>
          <div>
            username
            <input
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
            <br />
            password
            <input
              id="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id="login-button" type="submit">
            {' '}
            login{' '}
          </button>
        </form>
      </div>
    );
  } else {
    return (
      <div>
        <h2> blogs </h2>
        <Notification msg={notificationMsg} />
        {user.name} logged in{' '}
        <button
          onClick={() => {
            setUser(null);
            window.localStorage.clear();
          }}>
          {' '}
          logout{' '}
        </button>
        <br />
        <Togglable buttonLabel={'new blog'} ref={blogFormRef}>
          <BlogForm createBlog={createBlog} />
        </Togglable>
        {blogs.map(blog => (
          <Blog key={blog.id} user={user} blog={blog} updateLikes={updateLikes} removeBlog={removeBlog} />
        ))}
      </div>
    );
  }
};

export default App;
