import React, { useEffect } from 'react';
import { navigate } from 'gatsby';
import UserForm from './UserForm';
import useInput from '../hooks/useInput';
import useFetchAPI from '../hooks/useFetchAPI';
import handleSubmit from '../utils/handleSubmit';
import { isLoggedIn, getUser } from '../services/auth';

const UserNew = ({ location }) => {
  if (!isLoggedIn()) {
    navigate('/login');
  }

  const user = getUser();
  const userID = location.pathname.split('/')[2];
  const { data, error } = useFetchAPI({ endpoint: `/user/${userID}`, token: user.token });
  const firstName = useInput('');
  const familyName = useInput('');
  const email = useInput('');

  useEffect(() => {
    if (!data) {
      return;
    }
    firstName.setValue(data.firstName);
    familyName.setValue(data.familyName);
    email.setValue(data.email);
  }, [data]);

  const getContent = (dataContent, errorContent) => {
    if (errorContent) {
      return (
        <p>{errorContent.message}</p>
      );
    }

    if (dataContent) {
      return (
        <UserForm
          handleSubmit = {
            async (evt) => {
              evt.preventDefault();
              try {
                await handleSubmit({
                  method: 'put',
                  endpoint: `user/${userID}`,
                  data: {
                    firstName: firstName.value,
                    familyName: familyName.value,
                    email: email.value,
                  },
                  token: user.token,
                });
                navigate(`/user/${userID}`);
              } catch (err) {
                const { response } = err;
                alert(response.data.message);
              }
            }}
          firstName={firstName}
          familyName={familyName}
          email={email} />
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
