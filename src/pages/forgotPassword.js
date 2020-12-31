import React from 'react';
import useInput from '../hooks/useInput';
import handleSubmit from '../utils/handleSubmit';

const ForgotPassword = () => {
  const userEmail = useInput('');
  console.log('email: ', userEmail.value);
  return (
    <form onSubmit={(evt) => {
      evt.preventDefault();
      handleSubmit({
        evt,
        method: 'post',
        endpoint: '/user/send_reset_password_link',
        data: {
          email: userEmail.value,
        },
        destination: '/login',
      });
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
