import React from 'react';
import { Router } from '@reach/router';
import UserIndex from '../components/UserIndex';
import UserProfile from '../components/UserProfile';
import UserForm from '../components/UserForm';

const User = () => (
  <Router>
    <UserIndex path='/user' />
    <UserProfile path='/user/:id' />
    <UserForm path='/user/new' />
  </Router>
);

export default User;
