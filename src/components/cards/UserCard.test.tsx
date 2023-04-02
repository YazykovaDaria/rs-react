import React from 'react';
import { render, screen } from '@testing-library/react';
import { User } from 'src/types/card';
import UserCard from './UserCard';

describe('UserCard component', () => {
  const testUser: User = {
    name: 'John Doe',
    date: '1990-01-01',
    img: 'https://example.com/avatar.jpg',
    pets: 'cats',
    language: 'JavaScript',
    members: ['Alice', 'Bob', 'Charlie'],
  };

  it('renders user information correctly', () => {
    render(<UserCard {...testUser} />);

    expect(screen.getByText(testUser.name)).toBeInTheDocument();
    expect(screen.getByAltText('')).toHaveAttribute('src', testUser.img);
    expect(screen.getByText(`Date of birth: ${testUser.date}`)).toBeInTheDocument();
    expect(
      screen.getByText(`Cats are ${testUser.pets.toUpperCase()} beautiful`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`My favorite language is ${testUser.language.toUpperCase()}`)
    ).toBeInTheDocument();
    expect(screen.getByText('Best girls in the world are:')).toBeInTheDocument();

    testUser.members.forEach((member) => {
      expect(screen.getByText(member)).toBeInTheDocument();
    });
  });
});
