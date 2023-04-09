import React from 'react';
import { vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Search from './Search';

describe('Search component', () => {
  const onSubmit = vi.fn();
  const value = 'initial value';

  beforeEach(() => {
    localStorage.clear();
  });

  it('renders the search bar with initial value', () => {
    render(<Search value={value} onSubmit={onSubmit} />);
    expect(screen.getByTestId('search-bar')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search by names')).toHaveValue(value);
  });

  it('updates the search value when input changes', () => {
    render(<Search value={value} onSubmit={onSubmit} />);
    const input = screen.getByPlaceholderText('Search by names');
    fireEvent.change(input, { target: { value: 'new value' } });
    expect(input).toHaveValue('new value');
  });

  it('submits the search value and saves to local storage', () => {
    const searchValue = 'search query';
    render(<Search value={value} onSubmit={onSubmit} />);
    const form = screen.getByTestId('search-bar');
    const input = screen.getByPlaceholderText('Search by names');
    fireEvent.change(input, { target: { value: searchValue } });
    fireEvent.submit(form);
    expect(onSubmit).toHaveBeenCalledWith(searchValue);
    expect(localStorage.getItem('search')).toBe(searchValue);
  });
});
