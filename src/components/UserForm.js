import React from 'react';
import axios from 'axios';
import { navigate } from 'gatsby';
import useInput from '../hooks/useInput';
import url from '../url';

const UserForm = ({ location }) => {
  let firstName = useInput('');
  let familyName = useInput('');
  let requestMethod = 'post';
  let APIurl = `${url}/api/user`;

  if (location.state) {
    const { user } = location.state;
    firstName = useInput(user.firstName);
    familyName = useInput(user.familyName);
    requestMethod = 'put';
    APIurl = `${url}/api/user/${location.state.user._id}`;
  }

  const submitToApi = async (method, API) => {
    try {
      const response = await axios({
        method,
        url: API,
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
    submitToApi(requestMethod, APIurl);
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
