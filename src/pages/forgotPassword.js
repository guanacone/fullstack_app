import { navigate } from '@reach/router';
import React from 'react';
import useInput from '../hooks/useInput';
import handleSubmit from '../utils/handleSubmit';

const ForgotPassword = () => {
  const userEmail = useInput('');
  return (
    <form onSubmit={
      async (evt) => {
        evt.preventDefault();
        try {
          await handleSubmit({
            evt,
            method: 'post',
            endpoint: '/user/send_reset_password_link',
            data: {
              email: userEmail.value,
            },
          });
          navigate('/login');
        } catch (err) {
          const { response } = err;
          alert(response.data.message);
        }
      }
    }>
      <label>
        Your email:
        <input type='email' required {...userEmail.bind}/>
      </label>
      <input type='submit' value='Submit' />
    </form>
  );
};

export default ForgotPassword;
