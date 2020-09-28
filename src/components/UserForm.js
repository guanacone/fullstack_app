import React from 'react';
import axios from 'axios';
import { navigate } from 'gatsby';
import useInput from '../hooks/useInput';
import url from '../url';

const UserForm = () => {
  const firstName = useInput('');
  const familyName = useInput('');

  const submitToApi = async (method) => {
    try {
      const response = await axios({
        method,
        url: `${url}/api/user`,
        data: {
          firstName: `${firstName.value}`,
          familyName: `${familyName.value}`,
        } });
      const id = response.data._id;
      navigate(`/user/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    submitToApi('post');
    firstName.reset();
    familyName.reset();
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input type="text" {...firstName.bind} />
      </label>
      <label>
        Last Name:
        <input type="text" {...familyName.bind} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default UserForm;
