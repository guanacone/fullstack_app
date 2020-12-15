import React from 'react';
import useFetchAPI from '../hooks/useFetchAPI';
import { isBrowser } from '../services/auth';

const Home = () => {
  if (isBrowser()) console.log(`hostname: ${window.location.host}`);
  const { data, error } = useFetchAPI({ url: '' });
  const getContent = (dataContent, errorContent) => {
    if (errorContent) {
      return (
        <p>{errorContent.message}</p>
      );
    }

    if (dataContent) {
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
    </div>
  );
};

export default Home;
