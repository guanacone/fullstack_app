import React from 'react';
import { Link } from 'gatsby';
import useFetchAPI from '../hooks/useFetchAPI';

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
      <Link to={'/login'}>Log In!</Link>
      <br/>
      <Link to={'/user/new'}>Sign Up! </Link>
    </div>
  );
};

export default Home;
