import { Link, navigate } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import { isLoggedIn, logout } from '../services/auth';

const handleLogout = async (evt) => {
  evt.preventDefault();
  await logout();
  navigate('/login');
};

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  border-bottom: black solid 1px;

  > a{
    padding: 10px;
  }
`;

const NavBar = () => {
  return (
    <Header>
      <Link to={'/'}>Home</Link>
      {isLoggedIn()
        ? <>
          <Link to={'/user'}>User Index</Link>
          <Link to={'#'} onClick={(evt) => { handleLogout(evt); }}>Log Out</Link>
        </>
        : <>
          <Link to={'/login'}>Log In!</Link>
          <Link to={'/user/new'}>Sign Up! </Link>
        </>
      }
    </Header>
  );
};

export default NavBar;
