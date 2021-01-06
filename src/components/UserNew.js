import React from 'react';
import { navigate } from 'gatsby';
import Axios from 'axios';
import UserForm from './UserForm';
import useInput from '../hooks/useInput';

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
            await Axios({
              method: 'post',
              url: '/user',
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
