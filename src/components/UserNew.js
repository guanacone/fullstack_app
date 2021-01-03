import React from 'react';
import { navigate } from 'gatsby';
import UserForm from './UserForm';
import useInput from '../hooks/useInput';
import handleSubmit from '../utils/handleSubmit';

const UserNew = () => {
  const firstName = useInput('');
  const familyName = useInput('');
  const email = useInput('');
  const password = useInput('');

  return (
    <UserForm
      handleSubmit = {
        async (evt) => {
          evt.preventDefault();
          try {
            await handleSubmit({
              method: 'post',
              endpoint: '/user',
              data: {
                firstName: firstName.value,
                familyName: familyName.value,
                email: email.value,
                password: password.value,
              },
            });
            navigate('/login');
          } catch (err) {
            const { response } = err;
            alert(response.data.message);
          }
        }}
      firstName={firstName}
      familyName={familyName}
      email={email}
      password={password} />
  );
};

export default UserNew;
