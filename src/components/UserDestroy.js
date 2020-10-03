import React from 'react';
import { navigate } from 'gatsby';
import axios from 'axios';
import useAPI from '../hooks/useAPI';
import url from '../url';

const submitToApi = async (endpoint) => {
  try {
    const response = await axios.delete(
      endpoint,
    );
    console.log(response);
    navigate('/user');
  } catch (error) {
    console.log(error);
  }
};

const handleSubmit = (evt, endpoint) => {
  evt.preventDefault();
  if (confirm('Do you want to delete the user?')) {
    submitToApi(endpoint);
  }
};

const User = ({ location }) => {
  const userID = location.pathname.split('/')[2];
  const data = useAPI({ url: `${url}/api/user/${userID}` });
  return (
    data && (
    <div>
      <h3>User Profile: {data._id}</h3>
      <p>First Name: {data.firstName}</p>
      <p>Family Name: {data.familyName}</p>
      <form onSubmit={(evt) => handleSubmit(evt, `${url}/api/user/${userID}`)}>
        <input type="submit" value="Delete User" />
      </form>
    </div>
    )
  );
};

export default User;
