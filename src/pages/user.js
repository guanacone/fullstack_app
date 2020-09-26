import React from 'react';
import { Router } from '@reach/router';
import UserIndex from '../components/UserIndex';
import UserProfile from '../components/UserProfile';

const User = () => (
  <Router>
    <UserIndex path='/user' />
    <UserProfile path='/user/:id' />
  </Router>
);

export default User;
