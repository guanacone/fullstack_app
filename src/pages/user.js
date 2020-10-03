import React from 'react';
import { Router } from '@reach/router';
import UserIndex from '../components/UserIndex';
import UserProfile from '../components/UserProfile';
import UserNew from '../components/UserNew';
import UserEdit from '../components/UserEdit';
import UserDestroy from '../components/UserDestroy';

const User = () => (
  <Router>
    <UserIndex path='/user' />
    <UserProfile path='/user/:id' />
    <UserNew path='/user/new' />
    <UserEdit path='/user/:id/edit' />
    <UserDestroy path='/user/:id/delete'/>
  </Router>
);

export default User;
