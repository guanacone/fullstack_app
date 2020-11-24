import React, { useEffect } from 'react';
import { isLoggedIn, handleRefreshToken } from '../services/auth';

const Layout = ({ children }) => {
  useEffect(() => {
    if (isLoggedIn()) {
      handleRefreshToken();
      setInterval(handleRefreshToken, 119000);
    }
  });

  return (
    <div style={{ color: 'red', margin: '0 auto', maxWidth: 650, padding: '0 1rem' }}>
      {children}
    </div>
  );
};

export default Layout;
