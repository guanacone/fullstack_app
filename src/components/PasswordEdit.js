import React from 'react';
import { navigate } from 'gatsby';
import useInput from '../hooks/useInput';
import handleSubmit from '../utils/handleSubmit';
import { getUser } from '../services/auth';

const PasswordEdit = ({ location }) => {
  const userID = location.pathname.split('/')[2];
  const oldPassword = useInput('');
  const newPassword = useInput('');
  const confirmNewPassword = useInput('');
  const user = getUser();

  return (
    <form onSubmit={
      async (evt) => {
        evt.preventDefault();
        if (newPassword.value !== confirmNewPassword.value) {
          alert('new passwords do not match');
        } else {
          try {
            await handleSubmit({
              method: 'put',
              endpoint: `/user/update_password/${userID}`,
              data: {
                oldPassword: oldPassword.value,
                newPassword: newPassword.value,
              },
              token: user.token,
            });
            navigate(`/user/${userID}`);
          } catch (err) {
            const { response } = err;
            alert(response.data.message);
          }
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
