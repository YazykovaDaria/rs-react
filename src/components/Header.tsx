import React from 'react';
import { NavLink, Outlet, RoutesProps } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IProps {}

interface IState {
  activePage: string;
}

const routes = {
  '/about': 'About page',
  '/': 'Main page',
  '/form': 'Form page',
} as const;

class Header extends React.Component<IProps, IState> {
  constructor(props: IProps) {
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
