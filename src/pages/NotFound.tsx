import React from 'react';
import './style.css';
import { NavLink } from 'react-router-dom';

function NotFound() {
  return (
    <div className="wrapper">
      <p className="title">Sorry, page not found(</p>
      <NavLink to="/" className="link">
        Return to Main page
      </NavLink>
    </div>
  );
}

export default NotFound;
