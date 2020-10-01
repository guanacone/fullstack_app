import React from 'react';
import axios from 'axios';
import { navigate } from 'gatsby';
import UserForm from './UserForm';
import useInput from '../hooks/useInput';
import useAPI from '../hooks/useAPI';
import url from '../url';

const submitToApi = async (firstName, familyName) => {
  try {
    const response = await axios.post(
      `${url}/api/user`, {
        firstName: `${firstName.value}`,
        familyName: `${familyName.value}`,
      },
    );
    const id = response.data._id;
    navigate(`/user/${id}`);
  } catch (error) {
    console.log(error);
  }
};

const handleSubmit = (evt, value1, value2) => {
  evt.preventDefault();
  submitToApi(value1, value2);
};

const UserNew = ({ location }) => {
  const userID = location.pathname.split('/')[2];
  const data = useAPI({ url: `${url}/api/user/${userID}` });
  console.log(data);
  const firstName = useInput('');
  const familyName = useInput('');
  return (
    data && (
      <UserForm
    handleSubmit = {(evt) => {
      handleSubmit(evt, firstName, familyName);
    }}
    firstName={firstName}
    familyName={familyName} />
    )
  );
};

export default UserNew;
