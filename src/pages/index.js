import React from 'react';
import { Link } from 'gatsby';
import useAPI from '../hooks/useAPI';
import url from '../url';

const Home = () => {
  const data = useAPI({ url: `${url}/api` });
  return (
    data && (
      <div>
        <h1>Message: {data.msg}</h1>
        <Link to={'/user'}>User List</Link>
      </div>
    )
  );
};

export default Home;
