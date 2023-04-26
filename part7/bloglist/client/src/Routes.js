import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Users from './pages/UsersList';
import Home from './pages/Home';
import Login from './pages/Login';
import Notification from './components/Notification';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './reducers/userReducer';

const AppRoutes = () => {
  const dispatch = useDispatch();
  const notificationMsg = useSelector(state => state.notification);
  const user = useSelector(state => state.user);

  return (
    <Router>
      <div style={{marginBottom: '2em'}}>
        <h2>blogs</h2>
        <Notification msg={notificationMsg} />
        {user.name} logged in{' '}
        <button
          onClick={() => {
            dispatch(logout());
            window.localStorage.clear();
          }}>
          logout
        </button>
      </div>
      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
