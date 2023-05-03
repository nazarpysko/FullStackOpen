import { useState } from 'react';
import Notification from '../components/Notification';
import { useDispatch, useSelector } from 'react-redux';

import loginService from '../services/login';
import blogService from '../services/blogs';

import { login } from '../reducers/userReducer';
import { showNotification } from '../reducers/notificationReducer';

import { TextField, Button, Alert } from '@mui/material';

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

      {notificationMsg && <Alert severity="error">{notificationMsg}</Alert>}

      <form id="login" onSubmit={handleLogin}>
        <div>
          <TextField
            id="username"
            label="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          <br />
          <TextField
            id="password"
            label="password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button id="login-button" variant="contained" color="primary" type="submit">
          login
        </Button>
      </form>
    </div>
  );
};

export default Login;
