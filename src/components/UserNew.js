import React from 'react';
import axios from 'axios';
import { navigate } from 'gatsby';
import UserForm from './UserForm';
import useInput from '../hooks/useInput';
import url from '../url';

const UserNew = () => {
  const firstName = useInput('');
  const familyName = useInput('');

  const submitToApi = async () => {
    try {
      const response = await axios.post(
        `${url}/api/user`, {
          firstName: `${firstName.value}`,
          familyName: `${familyName.value}`,
        },
      );
      const id = response.data._id;
      navigate(`/user/${id}`);
      firstName.reset();
      familyName.reset();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    submitToApi('post');
  };

  return (
    <UserForm
    handleSubmit = {handleSubmit}
    firstName={firstName}
    familyName={familyName} />
  );
};

export default UserNew;
