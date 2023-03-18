import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IProps {}

interface IState {
  activePage: string;
}

class Header extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      activePage: 'Main page',
    };
  }

  setPage(): void {
    const path = window.location.pathname;
    switch (path) {
      case '/':
        this.setState({
          activePage: 'Main page',
        });
        break;
      case '/about':
        this.setState({
          activePage: 'About page',
        });
        break;

      default:
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
          </div>
        </div>
        <Outlet />
      </>
    );
  }
}

export default Header;
