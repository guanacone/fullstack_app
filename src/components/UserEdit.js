import React, { useEffect } from 'react';
import UserForm from './UserForm';
import useInput from '../hooks/useInput';
import useFetchAPI from '../hooks/useFetchAPI';
import handleSubmit from '../utils/handleSubmit';

const UserNew = ({ location }) => {
  const userID = location.pathname.split('/')[2];
  const { data, error } = useFetchAPI({ endpoint: `/user/${userID}` });
  const firstName = useInput('');
  const familyName = useInput('');
  useEffect(() => {
    if (!data) {
      return;
    }
    firstName.setValue(data.firstName);
    familyName.setValue(data.familyName);
  }, [data]);
  const getContent = (dataContent, errorContent) => {
    if (errorContent) {
      return (
        <p>{errorContent.message}</p>
      );
    } if (dataContent) {
      return (
        <UserForm
    handleSubmit = {(evt) => handleSubmit({
      evt,
      method: 'put',
      endpoint: `user/${userID}`,
      data: { firstName: firstName.value, familyName: familyName.value },
    })}
    firstName={firstName}
    familyName={familyName} />
      );
    }
    return (
      <p>loading...</p>
    );
  };

  return (
    <div>
      <h1>Edit User</h1>
      {getContent(data, error)}
    </div>
  );
};

export default UserNew;
