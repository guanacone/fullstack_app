import React from 'react';
import { Link } from 'gatsby';
import useAPI from '../hooks/useAPI';
import url from '../url';

const UserIndex = () => {
  const data = useAPI({ url: `${url}/user` });
  return (
    data.content && (
      <div>
        <h1>User Index</h1>
        { data.content.isAxiosError ? (
          <div>{data.content.message}</div>
        ) : (
          <ul>
            {data.content.map((user) => (
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
