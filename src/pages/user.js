import React from 'react';
import { Router } from '@reach/router';
import UserIndex from '../components/UserIndex';
import UserProfile from '../components/UserProfile';
import UserNew from '../components/UserNew';
import UserEdit from '../components/UserEdit';
import UserActivation from '../components/UserActivation';

const User = () => (
  <Router basepath='/user'>
    <UserIndex path='/' />
    <UserProfile path='/:id' />
    <UserNew path='/new' />
    <UserEdit path='/:id/edit' />
    <UserActivation path='/activation' />
  </Router>
);

export default User;
