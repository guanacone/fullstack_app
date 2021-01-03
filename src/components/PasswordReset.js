import React from 'react';
import { StringParam, useQueryParam } from 'use-query-params';
import jwt from 'jsonwebtoken';
import { navigate } from 'gatsby';
import useInput from '../hooks/useInput';
import handleSubmit from '../utils/handleSubmit';

const PasswordReset = () => {
  const [resetToken] = useQueryParam('resetToken', StringParam);
  const { user: { _id } } = jwt.decode(resetToken);
  const newPassword = useInput('');
  const confirmNewPassword = useInput('');

  return (
    <>
      <p>Rest your password</p>
      <form onSubmit={
        async (evt) => {
          evt.preventDefault();
          if (newPassword.value !== confirmNewPassword.value) {
            alert('new passwords do not match');
          } else {
            try {
              await handleSubmit({
                method: 'post',
                endpoint: `/user/reset_password/${_id}`,
                data: {
                  newPassword: newPassword.value,
                },
                token: resetToken,
              });
              navigate('/login');
            } catch (err) {
              const { response } = err;
              alert(response.data.message);
            }
          }
        }}>
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
    </>
  );
};

export default PasswordReset;
