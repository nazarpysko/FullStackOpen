import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { login } from './reducers/userReducer';
import blogService from './services/blogs';

import Login from './pages/Login';

import AppRoutes from './Routes';
import { initializeBlogs } from './reducers/blogsReducer';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      dispatch(login(loggedUser));
      blogService.setToken(loggedUser.token);
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch]);

  if (user === null) {
    return <Login />;
  } else {
    return <AppRoutes />;
  }
};

export default App;
