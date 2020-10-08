import React, { useEffect } from 'react';
import UserForm from './UserForm';
import useInput from '../hooks/useInput';
import useFetchAPI from '../hooks/useFetchAPI';
import url from '../utils/url';
import submitToAPI from '../utils/submitToAPI';

const handleSubmit = (evt, method, endpoint, data) => {
  evt.preventDefault();
  submitToAPI(method, endpoint, data);
};

const UserNew = ({ location }) => {
  const userID = location.pathname.split('/')[2];
  const { data, error } = useFetchAPI({ url: `${url}/user/${userID}` });
  const firstName = useInput('');
  const familyName = useInput('');
  useEffect(() => {
    if (!data) {
      return;
    }
    firstName.setValue(data.firstName);
    familyName.setValue(data.familyName);
  }, [data]);
  const getContent = (dataContent, errorContent) => {
    if (errorContent) {
      return (
        <p>{errorContent.message}</p>
      );
    } if (dataContent) {
      return (
        <UserForm
    handleSubmit = {(evt) => handleSubmit(evt, 'put', `user/${userID}`, { firstName: firstName.value, familyName: familyName.value })}
    firstName={firstName}
    familyName={familyName} />
      );
    }
    return (
      <p>loading...</p>
    );
  };

  return (
    <div>
      <h1>Edit User</h1>
      {getContent(data, error)}
    </div>
  );
};

export default UserNew;
