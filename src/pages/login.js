import React from 'react';
import { navigate } from 'gatsby';
import { handleLogin, isLoggedIn } from '../services/auth';
import useInput from '../hooks/useInput';

const handleSubmit = async (evt, { email, password }) => {
  evt.preventDefault();
  await handleLogin({ email, password });
  return isLoggedIn() ? navigate('/user') : alert('wrong email/password');
};

const Login = () => {
  const email = useInput('');
  const password = useInput('');

  if (isLoggedIn()) {
    navigate('/user');
  }

  return (
    <form onSubmit={(evt) => {
      handleSubmit(evt, { email: email.value, password: password.value });
    }}>
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
