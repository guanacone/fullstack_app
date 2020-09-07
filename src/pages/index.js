import React from 'react';
import { Link } from 'gatsby';
import useAPI from '../hooks/useAPI';
import url from '../../url';

const Home = () => {
  const data = useAPI({ url: `${url}/api/user` });
  return (
    data && (
    <div>
      <h1>Users</h1>
      <ul>
        {Object.values(data.users)
          .map((user) => (
            <Link key={user._id}to="/user" state={{ userID: user._id }}>
              <li>{user.firstName} {user.familyName}</li>
            </Link>
          ))}
      </ul>
      <Link to="/newUser">New User</Link>
    </div>
    )
  );
};
export default Home;
