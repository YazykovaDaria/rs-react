import React from 'react';
import './style.css';
import { NavLink } from 'react-router-dom';

function NotFound() {
  return (
    <div className="wrapper">
      <h2 className="title">Sorry, page not found(</h2>
      <NavLink to="/" className="link">
        Return to Main page
      </NavLink>
    </div>
  );
}

export default NotFound;
