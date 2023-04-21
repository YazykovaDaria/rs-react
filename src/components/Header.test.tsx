import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';

describe('Header component', () => {
  it('displays the correct active page based on the current location', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText('About page')).toBeInTheDocument();
  });

  it('displays "Page 404" if the current location is not in the routes object', () => {
    render(
      <MemoryRouter initialEntries={['/unknown']}>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText('Page 404')).toBeInTheDocument();
  });

  it('renders the correct links in the header', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText('Main')).toBeInTheDocument();
    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('Form')).toBeInTheDocument();
  });
});
