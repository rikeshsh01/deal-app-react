import React from 'react';
import Logo from './Logo';
import Navigation from './Navigation';
import UserProfile from './UserProfile';

const Sidebar = () => {
  return (
    <>
    <div className="sidebar">
      <Logo />
      <Navigation />
      <UserProfile />
    </div>
    </>
  );
};

export default Sidebar;
