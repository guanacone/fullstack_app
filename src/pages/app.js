import React from 'react';
import { Router } from '@reach/router';
import UserProfile from '../components/UserProfile';

const User = () => (
  <Router>
    <UserProfile path='app/user/:id' />
  </Router>
);

export default User;
