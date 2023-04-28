import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const UserDetails = () => {
  const userId = useParams().id;
  const users = useSelector(state => state.users);
  if (!users.length) return null;
  const user = users.find(user => user.id === userId);

  return (
    <>
      <h1>{user.name}</h1>
      <h2>added blogs</h2>
      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  );
};

export default UserDetails;
