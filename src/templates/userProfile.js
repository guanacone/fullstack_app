import React from 'react';

const userProfile = ({ pageContext: { user } }) => (
  <div style={{ width: 960, margin: '4rem auto' }}>
    <h1>User Details for user: {user._id}</h1>
    <h3>{user.firstName}</h3>
    <h3>{user.familyName}</h3>
  </div>
);

export default userProfile;
