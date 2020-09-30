import React from 'react';
// import axios from 'axios';
// import { navigate } from 'gatsby';
// import useInput from '../hooks/useInput';
// import url from '../url';

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
