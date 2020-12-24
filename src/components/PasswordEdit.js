import React from 'react';
import UserForm from './UserForm';
import useInput from '../hooks/useInput';
import handleSubmit from '../utils/handleSubmit';

const UserNew = () => {
  const oldPassword = useInput('');
  const newPassword = useInput('');
  const confirmNewPassword = useInput('');

  return (
    <UserForm
      handleSubmit = {(evt) => handleSubmit({
        evt,
        method: 'post',
        endpoint: '/user',
        data: {
          oldPassword: oldPassword.value,
          newPassword: newPassword.value,
        },
        destination: '/activateAccount',
      })}
      oldPassword={oldPassword}
      newPassword={newPassword}
      confirmNewPassword={confirmNewPassword} />
  );
};

export default UserNew;
