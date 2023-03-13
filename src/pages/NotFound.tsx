import React from 'react';
import { NavLink } from 'react-router-dom';

function NotFound() {
  return (
    <div>
      <p>Sorry, page not found(</p>
      <NavLink to="/">Return to main page</NavLink>
    </div>
  );
}

export default NotFound;
