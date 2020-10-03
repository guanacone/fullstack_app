import React, { useEffect } from 'react';
import axios from 'axios';
import { navigate } from 'gatsby';
import UserForm from './UserForm';
import useInput from '../hooks/useInput';
import useAPI from '../hooks/useAPI';
import url from '../url';

const submitToApi = async (endpoint, firstName, familyName) => {
  try {
    const response = await axios.put(
      endpoint, {
        firstName: firstName.value,
        familyName: familyName.value,
      },
    );
    const id = response.data._id;
    navigate(`/user/${id}`);
  } catch (error) {
    console.log(error);
  }
};

const handleSubmit = (evt, endpoint, value1, value2) => {
  evt.preventDefault();
  submitToApi(endpoint, value1, value2);
};

const UserNew = ({ location }) => {
  const userID = location.pathname.split('/')[2];
  const data = useAPI({ url: `${url}/user/${userID}` });
  const firstName = useInput('');
  const familyName = useInput('');
  useEffect(() => {
    if (!data) {
      return;
    }
    firstName.setValue(data.firstName);
    familyName.setValue(data.familyName);
  }, [data]);

  return (
    data && (
      <UserForm
    handleSubmit = {(evt) => handleSubmit(evt, `${url}/user/${userID}`, firstName, familyName)}
    firstName={firstName}
    familyName={familyName} />
    )
  );
};

export default UserNew;
