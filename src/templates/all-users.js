import React from 'react';
import { Link } from 'gatsby';

const userList = ({ pageContext: { users } }) => (
  <div style={{ width: 960, margin: '4rem auto' }}>
    <h1>Choose a User!</h1>
    <ul style={{ padding: 0 }}>
      {users.map((user) => (
        <li
          key={user._id}
          style={{
            textAlign: 'center',
            listStyle: 'none',
          }}
        >
          <Link to={`/app/user/${user._id}`}>
            <p>{user.familyName}, {user.firstName}</p>
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default userList;
