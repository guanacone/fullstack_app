import React from 'react';
import useAPI from '../hooks/useAPI';
import url from '../url';

const Home = () => {
  const data = useAPI({ url: `${url}/api` });
  return (
    data && (
    <div>
      <h1>{data.msg}</h1>
    </div>
    )
  );
};
export default Home;
