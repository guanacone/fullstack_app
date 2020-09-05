import React from 'react';
import useAPI from '../hooks/useAPI';
import url from '../../url';

const User = ({ location }) => {
  const data = useAPI({ url: `${url}/${location.state.userID}` });
  return (
    data && (
      <div>
        <h3>First name: {data.userinstance.first_name}</h3>
        <h3>Last name: {data.userinstance.family_name}</h3>
        <h3>ID: {data.userinstance._id}</h3>
      </div>
    )
  );
};

export default User;
