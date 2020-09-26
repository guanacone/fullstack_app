import React from 'react';
import { Link } from 'gatsby';
import useAPI from '../hooks/useAPI';
import url from '../url';

const UserIndex = () => {
  const data = useAPI({ url: `${url}/api/user` });
  return (
    data && (
      <div>
        <h1>User Index</h1>
        <ul>
          {data.map((user) => (
            <li key={user._id}>
              <Link to={`/user/${user._id}`}>
                {user.familyName}, {user.firstName}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

export default UserIndex;
