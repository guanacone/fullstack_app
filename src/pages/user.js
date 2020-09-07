import React from 'react';
import useAPI from '../hooks/useAPI';
import url from '../../url';

const User = ({ location }) => {
  const data = useAPI({ url: `${url}/api/user/${location.state.userID}` });
  return (
    data && (
      <div>
        <h3>First name: {data.userinstance.firstName}</h3>
        <h3>Last name: {data.userinstance.familyName}</h3>
        <h3>ID: {data.userinstance._id}</h3>
      </div>
    )
  );
};

export default User;
