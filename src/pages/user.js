import React from 'react';
import { Router } from '@reach/router';
import UserIndex from '../components/UserIndex';
import UserProfile from '../components/UserProfile';
import UserNew from '../components/UserNew';

const User = () => (
  <Router>
    <UserIndex path='/user' />
    <UserProfile path='/user/:id' />
    <UserNew path='/user/new' />
  </Router>
);

export default User;
