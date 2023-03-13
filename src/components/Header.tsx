import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

function Header() {
  return (
    <>
      <div className="header">
        <NavLink to="/">Main</NavLink>
        <NavLink to="/about">About Us</NavLink>
      </div>
      <Outlet />
    </>
  );
}

export default Header;
