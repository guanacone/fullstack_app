import React from 'react';
import useInput from '../hooks/useInput';
import handleSubmit from '../utils/handleSubmit';

const PasswordEdit = ({ location }) => {
  const userID = location.pathname.split('/')[2];
  const oldPassword = useInput('');
  const newPassword = useInput('');
  const confirmNewPassword = useInput('');

  return (
    <form onSubmit={(evt) => {
      evt.preventDefault();
      if (newPassword.value !== confirmNewPassword.value) {
        alert('new passwords do not match');
      } else {
        handleSubmit({
          evt,
          method: 'put',
          endpoint: `/user/update_password/${userID}`,
          data: {
            oldPassword: oldPassword.value,
            newPassword: newPassword.value,
          },
          destination: `/user/${userID}`,
        });
      }
    }}>
      <label>
        Old password:
        <input type='password' required {...oldPassword.bind}/>
      </label>
      <label>
        New password:
        <input type='password' required {...newPassword.bind} />
      </label>
      <label>
        Confirm new password:
        <input type='password' required {...confirmNewPassword.bind} />
      </label>
      <input type='submit' value='Submit' />
    </form>
  );
};

export default PasswordEdit;
