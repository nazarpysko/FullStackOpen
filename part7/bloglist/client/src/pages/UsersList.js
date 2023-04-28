import { useEffect, useState } from 'react';

import { getUsersInfo } from '../services/users';

const UsersList = () => {
  const [usersInfo, setUsersInfo] = useState([]);

  const getAllUsersInfo = async () => {
    const usersInfo = await getUsersInfo();
    setUsersInfo(usersInfo);
  }

  useEffect(() => {
    getAllUsersInfo()
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th> </th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {usersInfo.map(userInfo => {
            return (
              <tr key={userInfo.id}>
                <td>{userInfo.name}</td>
                <td>{userInfo.blogs.length}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
