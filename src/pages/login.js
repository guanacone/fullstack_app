import React from 'react';
import { Link, navigate } from 'gatsby';
import { handleLogin, isLoggedIn } from '../services/auth';
import useInput from '../hooks/useInput';

const Login = () => {
  const email = useInput('');
  const password = useInput('');

  if (isLoggedIn()) {
    navigate('/user');
  }

  return (
    <>
      <form onSubmit={(evt) => {
        evt.preventDefault();
        handleLogin({ email: email.value, password: password.value });
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
      <Link to='/forgotPassword'>Forgot your password?</Link>
    </>
  );
};

export default Login;
