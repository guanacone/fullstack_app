import React from 'react';
import { Link, navigate } from 'gatsby';
import axios from 'axios';
import styled from 'styled-components';
import useFetchAPI from '../hooks/useFetchAPI';
import url from '../utils/url';

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
const deleteUser = (endpoint) => {
  if (window.confirm('Do you want to delete the user?')) {
    submitToApi(endpoint);
  }
};

const User = ({ id }) => {
  const { data, error } = useFetchAPI({ url: `${url}/user/${id}` });
  const getContent = (dataContent, errorContent) => {
    if (errorContent) {
      return (
        <p>{errorContent.message}</p>
      );
    } if (dataContent) {
      return (
        <>
          <p>User ID: {dataContent._id}</p>
          <p>First Name: {dataContent.firstName}</p>
          <p>Family Name: {dataContent.familyName}</p>
          <Link
                to={`/user/${dataContent._id}/edit`}
              >
            Edit
          </Link>
          <DeleteButton
                type='button'
                onClick={() => deleteUser(`${url}/user/${id}`)}
              >
            Delete User
          </DeleteButton>
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
