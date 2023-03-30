import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import EmptyProps from 'src/types/props';

interface Routes {
  [key: string]: string;
}

const routes: Routes = {
  '/about': 'About page',
  '/': 'Main page',
  '/form': 'Form page',
};

const Header: React.FC<EmptyProps> = () => {
  const location = useLocation();
  const [activePage, setActivePage] = useState(routes[location.pathname]);

  useEffect(() => {
    const path = location.pathname;
    const page = routes[path];
    if (page) {
      setActivePage(page);
    } else {
      setActivePage('Page 404');
    }
  }, [location]);

  return (
    <>
      <div className="header">
        <div className="title">{activePage}</div>
        <div className="header header-links">
          <NavLink to="/" className="link">
            Main
          </NavLink>
          <NavLink to="/about" className="link">
            About Us
          </NavLink>
          <NavLink to="/form" className="link">
            Form
          </NavLink>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Header;
