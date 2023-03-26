import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import EmptyProps from 'src/types/props';

interface IState {
  activePage: string;
}

interface Routes {
  [key: string]: string;
}

const routes: Routes = {
  '/about': 'About page',
  '/': 'Main page',
  '/form': 'Form page',
};

class Header extends React.Component<EmptyProps, IState> {
  constructor(props: EmptyProps) {
    super(props);
    this.state = {
      activePage: routes[window.location.pathname],
    };
  }

  setPage(): void {
    const path = window.location.pathname;
    const page = routes[path];
    if (page) {
      this.setState({
        activePage: page,
      });
    } else {
      throw new Error(`unknown path - ${path}`);
    }
  }

  render() {
    const { activePage } = this.state;
    return (
      <>
        <div className="header">
          <div className="title">{activePage}</div>
          <div onClick={() => this.setPage()} className="header header-links">
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
  }
}

export default Header;
