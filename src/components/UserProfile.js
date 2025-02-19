import React from 'react';
import { Link, navigate } from 'gatsby';
import axios from 'axios';
import styled from 'styled-components';
import jwt from 'jsonwebtoken';
import useFetchAPI from '../hooks/useFetchAPI';
import { isLoggedIn, getUser } from '../services/auth';

const DeleteButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  color: #007bff;
  cursor: pointer;

  &:hover{
  color: #0056b3;
  text-decoration: underline;
  }

  &:focus{
    outline: none;
  }
`;

const deleteUser = async (endpoint) => {
  if (window.confirm('Do you want to delete the user?')) {
    const user = getUser();
    await axios({
      method: 'delete',
      url: endpoint,
      headers: { Authorization: `Bearer ${user.token}` },
    });
    navigate('/user');
  }
};

const User = ({ id }) => {
  if (!isLoggedIn()) {
    navigate('/login');
  }

  const user = getUser();
  const { user: loggedInUser } = jwt.decode(user.token);
  const { data, error } = useFetchAPI({ endpoint: `/user/${id}`, token: user.token });
  const getContent = (dataContent, errorContent) => {
    if (errorContent) {
      return (
        <p>{errorContent.message}</p>
      );
    }

    if (dataContent) {
      return (
        <>
          <p>User ID: {id}</p>
          <p>First Name: {dataContent.firstName}</p>
          <p>Family Name: {dataContent.familyName}</p>
          { loggedInUser._id === id || loggedInUser.roles.find((role) => role === 'admin')
            ? <>
              <Link to={`/user/${id}/edit`}>Edit Details</Link><br></br>
              <Link to={`user/${id}/password_edit`}>Edit Password</Link><br></br>
            </>
            : null
          }
          {loggedInUser.roles && loggedInUser.roles.find((role) => role === 'admin')
            ? <>
              <DeleteButton type='button' onClick={
                () => deleteUser(`user/${id}`)}
              >Delete User</DeleteButton>
            </>
            : null
          }
        </>
      );
    }
    return (
      <p>loading...</p>
    );
  };

  return (
    <div>
      <h1>User Profile</h1>
      {getContent(data, error)}
    </div>
  );
};

export default User;
