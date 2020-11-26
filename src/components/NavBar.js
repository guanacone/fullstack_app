import { Link, navigate } from 'gatsby';
import React from 'react';
import { isLoggedIn, logout } from '../services/auth';

const handleLogout = async (evt) => {
  evt.preventDefault();
  await logout();
  navigate('/login');
};

const NavBar = () => {
  console.log('NavBar');
  return (
    <div>
      <Link to={'/'}>Home</Link>
      <br/>
      {isLoggedIn()
        ? <>
          <Link to={'/user'}>User Index</Link>
          <br/>
          <Link to={'#'} onClick={(evt) => { handleLogout(evt); }}>Log Out</Link>
        </>
        : <>
          <Link to={'/login'}>Log In!</Link>
          <br/>
          <Link to={'/user/new'}>Sign Up! </Link>
        </>
      }
    </div>
  );
};

export default NavBar;
