import React from 'react';
import useAPI from '../hooks/useAPI';

const Home = () => {
  const data = useAPI({ url: 'http://localhost:1337/api' });
  return (
    data && (
      <div>
        <h1>Message: {data.msg}</h1>
      </div>
    )
  );
};

export default Home;
