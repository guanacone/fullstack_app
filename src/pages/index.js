import React from 'react';
import useFetchAPI from '../hooks/useFetchAPI';
import url from '../utils/url';

const Home = () => {
  console.log(url);
  const { data, error } = useFetchAPI({ endpoint: '' });
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
