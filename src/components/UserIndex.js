import React from 'react';
import { Link } from 'gatsby';
import useAPI from '../hooks/useAPI';
import url from '../url';

const UserIndex = () => {
  const { data, error } = useAPI({ url: `${url}/user` });
  return (
    (data || error) && (
      <div>
        <h1>User Index</h1>
        { error ? (
          <p>{error.message}</p>
        ) : (
          <ul>
            {data.map((user) => (
              <li key={user._id}>
                <Link to={`/user/${user._id}`}>
                  {user.familyName}, {user.firstName}
                </Link>
              </li>
            ))}
          </ul>
        )
        }
      </div>
    )
  );
};

export default UserIndex;
