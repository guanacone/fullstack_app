import React from 'react';
import { navigate } from 'gatsby';
import { handleLogin, isLoggedIn } from '../services/auth';
import useInput from '../hooks/useInput';

const Login = () => {
  const email = useInput('');
  const password = useInput('');

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    handleLogin({ email: email.value, password: password.value });
    console.log(isLoggedIn());
  };

  if (isLoggedIn()) {
    navigate('/user');
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type='text' {...email.bind} />
      </label>
      <label>
        Password:
        <input type='password' {...password.bind} />
      </label>
      <input type='submit' value='Submit' />
    </form>
  );
};

export default Login;
