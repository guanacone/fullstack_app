import React from 'react';
import { Link, navigate } from 'gatsby';
import axios from 'axios';
import styled from 'styled-components';
import useAPI from '../hooks/useAPI';
import url from '../url';

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
      <DeleteButton
        type='button'
        onClick={() => deleteUser(`${url}/api/user/${id}`)}>Delete User</DeleteButton>

    </div>
    )
  );
};

export default User;
