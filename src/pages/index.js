import React from 'react';
import { Link } from 'gatsby';
import useFetchAPI from '../hooks/useFetchAPI';
import { isLoggedIn, logout } from '../services/auth';

const Home = () => {
  const { data, error } = useFetchAPI({ url: '' });
  const getContent = (dataContent, errorContent) => {
    if (errorContent) {
      return (
        <p>{errorContent.message}</p>
      );
    } if (dataContent) {
      return (
        <p>{dataContent.msg}</p>
      );
    }
    return (
      <p>loading...</p>
    );
  };

  return (
    <div>
      <h1>Message:{getContent(data, error)}</h1>
      {isLoggedIn()
        ? <>
          <Link to={'/user'}>User Index</Link>
          <br/>
          <Link to={'#'} onClick={() => { logout(); }}>Log Out</Link>
        </>
        : <>
          <Link to={'/login'}>Log In!</Link>
          <br/>
          <Link to={'/user/new'}>Sign Up! </Link>
        </>
      }
    </div>
  );
};

export default Home;
