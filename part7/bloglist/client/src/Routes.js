import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, Routes } from 'react-router-dom';
import Notification from './components/Notification';
import BlogsList from './pages/BlogsList';
import Login from './pages/Login';
import UserDetails from './pages/UserDetails';
import Users from './pages/UsersList';
import BlogDetails from './pages/BlogDetails';
import { logout } from './reducers/userReducer';

const AppRoutes = () => {
  const dispatch = useDispatch();
  const notificationMsg = useSelector(state => state.notification);
  const user = useSelector(state => state.user);

  return (
    <div>
      <nav style={{ backgroundColor: 'grey', 'padding': '0.5em' }}>
        <Link style={{ marginRight: '0.5em' }} to={'/blogs'}>
          blogs
        </Link>
        <Link style={{ marginRight: '0.5em' }} to={'/users'}>
          users
        </Link>
        {user.name} logged in{' '}
        <button
          onClick={() => {
            dispatch(logout());
            window.localStorage.clear();
          }}>
          logout
        </button>
      </nav>
      <Notification msg={notificationMsg} />
      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<BlogsList />} />
        <Route path="/blogs" element={<BlogsList />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
