import React from 'react';
import UserForm from './UserForm';
import useInput from '../hooks/useInput';
import handleSubmit from '../utils/handleSubmit';

const UserNew = () => {
  const firstName = useInput('');
  const familyName = useInput('');
  const email = useInput('');
  const password = useInput('');

  return (
    <UserForm
      handleSubmit = {(evt) => handleSubmit({
        evt,
        method: 'post',
        endpoint: '/user',
        data: {
          firstName: firstName.value,
          familyName: familyName.value,
          email: email.value,
          password: password.value,
        },
        destination: '/activateAccount',
      })}
      firstName={firstName}
      familyName={familyName}
      email={email}
      password={password} />
  );
};

export default UserNew;
