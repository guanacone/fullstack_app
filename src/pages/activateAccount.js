import { Link } from 'gatsby';
import React from 'react';

const activateAccount = () => {
  return (
    <>
      <h2>Please activate your account.</h2>
      <p>If you provided a valid email it has been sent there. Otherwise please <Link to={'/user/new'}>sign up</Link> again.</p>
    </>
  );
};

export default activateAccount;
