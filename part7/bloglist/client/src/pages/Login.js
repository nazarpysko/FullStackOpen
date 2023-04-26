import { useState } from 'react';
import Notification from '../components/Notification';
import { useDispatch, useSelector } from 'react-redux';

import loginService from '../services/login';
import blogService from '../services/blogs';

import { login } from '../reducers/userReducer';
import { showNotification } from '../reducers/notificationReducer';

const Login = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const notificationMsg = useSelector(state => state.notification);

  const handleLogin = async event => {
    event.preventDefault();

    try {
      const loggedUser = await loginService.login({ username, password });
      window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser));

      blogService.setToken(loggedUser.token);
      dispatch(login(loggedUser));
      setUsername('');
      setPassword('');
    } catch (exception) {
      console.log(exception);
      dispatch(showNotification('wrong username or password'));
    }
  };

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
          login
        </button>
      </form>
    </div>
  );
};

export default Login;
