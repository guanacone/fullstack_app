import React from 'react';

const UserForm = ({ firstName, familyName, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <label>
      First Name:
      <input type="text" {...firstName.bind}/>
    </label>
    <label>
      Last Name:
      <input type="text" {...familyName.bind} />
    </label>
    <input type="submit" value="Submit" />
  </form>
);

export default UserForm;
