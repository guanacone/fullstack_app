import React from 'react';
import { Link } from 'gatsby';
import useAPI from '../hooks/useAPI';
import url from '../../url';

const Home = () => {
  const data = useAPI({ url });
  return (
    data && (
    <div>
      <h1>Users</h1>
      <ul>
        {Object.values(data.users)
          .map((user) => (
            <Link to="/user" state={{ userID: user._id }}>
              <li key={user._id}>{user.first_name} {user.family_name}</li>
            </Link>
          ))}
      </ul>
    </div>
    )
  );
};
export default Home;
