import React from 'react';
import UserForm from './UserForm';
import useInput from '../hooks/useInput';
import handleSubmit from '../utils/handleSubmit';

const UserNew = () => {
  const firstName = useInput('');
  const familyName = useInput('');

  return (
    <UserForm
    handleSubmit = {(evt) => handleSubmit({
      evt,
      method: 'post',
      endpoint: 'user',
      data: { firstName: firstName.value, familyName: familyName.value },
    })}
    firstName={firstName}
    familyName={familyName} />
  );
};

export default UserNew;
