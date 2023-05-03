import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { logout } from '../reducers/userReducer';

const Navbar = ({ user }) => {
  const dispatch = useDispatch();
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu"></IconButton>
        <Button color="inherit">
          <Link to="/blogs">blogs</Link>
        </Button>
        <Button color="inherit">
          <Link to="/users">users</Link>
        </Button>
        {user && (
          <div>
            <em>{user.username} logged in</em>
            <Button
              color="inherit"
              onClick={() => {
                dispatch(logout());
                window.localStorage.clear();
              }}>
              logout
            </Button>
          </div>
        )}
        {!user && <Link to="/login">login</Link>}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
