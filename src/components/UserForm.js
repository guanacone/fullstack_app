import React from 'react';

const UserForm = ({
  firstName,
  familyName,
  email,
  password,
  handleSubmit,
}) => (
  <form onSubmit={handleSubmit}>
    <label>
      First Name:
      <input type='text' {...firstName.bind}/>
    </label>
    <label>
      Last Name:
      <input type='text' {...familyName.bind} />
    </label>
    <label>
      Email:
      <input type='text' {...email.bind} />
    </label>
    <label>
      Password:
      <input type='password' {...password.bind} />
    </label>
    <input type='submit' value='Submit' />
  </form>
);

export default UserForm;
