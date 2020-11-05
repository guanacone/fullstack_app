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
      <input type='text' required {...firstName.bind}/>
    </label>
    <label>
      Last Name:
      <input type='text' required {...familyName.bind} />
    </label>
    <label>
      Email:
      <input type='email' required {...email.bind} />
    </label>
    <label>
      Password:
      <input type='password' required minLength='6' {...password.bind} />
    </label>
    <input type='submit' value='Submit' />
  </form>
);

export default UserForm;
