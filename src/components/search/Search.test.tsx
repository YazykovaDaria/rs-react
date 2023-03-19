import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Search from './Search';

describe('Search', () => {
  const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => (store[key] = value.toString()),
      removeItem: (key: string) => delete store[key],
      clear: () => (store = {}),
    };
  })();
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
  });

  const mockProps = {
    value: '',
  };

  it('renders the input field and search button', () => {
    render(<Search {...mockProps} />);
    const inputElement = screen.getByRole('searchbox');
    expect(inputElement).toBeInTheDocument();
    const buttonElement = screen.getByRole('button', { name: 'Search' });
    expect(buttonElement).toBeInTheDocument();
  });

  it('updates the value state when typing in the input field', () => {
    render(<Search {...mockProps} />);
    const inputElement = screen.getByRole('searchbox');
    fireEvent.change(inputElement, { target: { value: 'test' } });
    expect(inputElement).toHaveValue('test');
  });

  it('saves the search value to local storage when unmounting', () => {
    render(<Search {...mockProps} />);
    const inputElement = screen.getByRole('searchbox');
    fireEvent.change(inputElement, { target: { value: 'test' } });
    render(<Search {...mockProps} />);
    expect(localStorage.getItem('search')).toBe('test');
  });
});
