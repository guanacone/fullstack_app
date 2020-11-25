import React, { useEffect } from 'react';
import { isLoggedIn, handleRefreshToken } from '../services/auth';

const Layout = ({ children }) => {
  useEffect(() => {
    if (isLoggedIn()) {
      handleRefreshToken();
      setInterval(handleRefreshToken, 119000);
    }
  }, []);

  return (
    <div>
      {children}
    </div>
  );
};

export default Layout;
