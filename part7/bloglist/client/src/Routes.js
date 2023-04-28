import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Notification from './components/Notification';
import Home from './pages/Home';
import Login from './pages/Login';
import UserDetails from './pages/UserDetails';
import Users from './pages/UsersList';
import { logout } from './reducers/userReducer';

const AppRoutes = () => {
  const dispatch = useDispatch();
  const notificationMsg = useSelector(state => state.notification);
  const user = useSelector(state => state.user);

  return (
    <div>
      <div style={{ marginBottom: '2em' }}>
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
        <Route path="/users/:id" element={<UserDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
