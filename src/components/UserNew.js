import React from 'react';
import UserForm from './UserForm';
import useInput from '../hooks/useInput';
import submitToAPI from '../utils/submitToAPI';

const handleSubmit = (evt, method, endpoint, data) => {
  evt.preventDefault();
  submitToAPI(method, endpoint, data);
};

const UserNew = () => {
  const firstName = useInput('');
  const familyName = useInput('');

  return (
    <UserForm
    handleSubmit = {(evt) => handleSubmit(evt, 'post', 'user', { firstName: firstName.value, familyName: familyName.value })}
    firstName={firstName}
    familyName={familyName} />
  );
};

export default UserNew;
