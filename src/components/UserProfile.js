import React from 'react';
import { Link } from 'gatsby';
import useAPI from '../hooks/useAPI';
import url from '../url';

const User = ({ id }) => {
  const data = useAPI({ url: `${url}/api/user/${id}` });
  return (
    data && (
    <div>
      <h3>User Profile: {data._id}</h3>
      <p>First Name: {data.firstName}</p>
      <p>Family Name: {data.familyName}</p>
      <Link
        to={`/user/${data._id}/edit`}
      >
        Edit
      </Link>
      <Link
        to={`/user/${data._id}/delete`}
      >
        Delete
      </Link>
    </div>
    )
  );
};

export default User;
