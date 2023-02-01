import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  const [notificationMsg, setNotificationMsg] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const loggedUser = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser))
      
      blogService.setToken(loggedUser.token)
      setUser(loggedUser)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
      showNotification('wrong username or password')
    }
  }

  const createBlog = async newBlog => {
    blogFormRef.current.toggleVisibility()

    try {
      console.log(`Sending`, newBlog);
      const newBlogAdded = await blogService.create(newBlog)
      console.log({newBlogAdded});

      setBlogs(blogs.concat(newBlogAdded))
      showNotification(`a new blog ${newBlogAdded.title} by ${newBlogAdded.author} added`)
    } catch (exception) {
      showNotification(`empty fields of new blog`)
    }
  }
  
  const showNotification = msg => {
    setNotificationMsg(msg)
    setTimeout(() => setNotificationMsg(null), 3000)
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>

        <Notification msg={notificationMsg}/>
        
        <form onSubmit={ handleLogin }>
          <div>
            username
              <input 
                type='text'
                value={username}
                name='Username'
                onChange={({ target }) => setUsername(target.value)}
              />
              
            <br/>

            password 
              <input
                type='password'
                value={password}
                name='Password'
                onChange={({ target }) => setPassword(target.value)}
              />
          </div>
          <button type='submit'> login </button>
        </form>
      </div>
    )
  } else {
    return (
      <div>
        <h2> blogs </h2>

        <Notification msg={notificationMsg}/>

        { user.name } logged in <button onClick={ () => {setUser(null); window.localStorage.clear()} }> logout </button>
        
        <br/>

        <Togglable buttonLabel={'new blog'} ref={blogFormRef}>
          <BlogForm 
            createBlog={ createBlog }
          />
        </Togglable>
        
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }
}

export default App