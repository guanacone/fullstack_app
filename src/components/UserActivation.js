import React from 'react';
import { Link, navigate } from 'gatsby';
import get from 'lodash.get';
import { useQueryParam, StringParam } from 'use-query-params';
import { isLoggedIn } from '../services/auth';
import useFetchAPI from '../hooks/useFetchAPI';

const UserActivation = () => {
  if (isLoggedIn()) {
    navigate('/user');
  }
  const [activationToken] = useQueryParam('activationToken', StringParam);
  const { data, error } = useFetchAPI({ endpoint: '/user/activate_account', token: activationToken });
  const getContent = (dataContent, errorContent) => {
    if (errorContent) {
      const axiosMsg = get(errorContent, ['response', 'data', 'message']);
      if (axiosMsg) {
        return <p>Your token has expired. Please <Link to={'/user/new'}>sign up</Link> again</p>;
      }
      return (
        <p>{errorContent.message}</p>
      );
    }

    if (dataContent) {
      return (
        <>
          <p>Your account has been activated. Please <Link to={'/login'}>log in</Link></p>
        </>
      );
    }
    return (
      <p>loading...</p>
    );
  };

  return (
    <div>
      <h1>Account activated</h1>
      {getContent(data, error)}
    </div>
  );
};

export default UserActivation;
