import { render, screen } from '@testing-library/react';
import Input from './Input';
import React from 'react';

describe('Input component', () => {
  const mockRegister = () => {};
  const mockRules = { required: true };
  const mockError = { message: 'This field is required' };

  it('renders label and input element', () => {
    render(<Input label="Username" name="username" register={mockRegister} />);
    const labelElement = screen.getByLabelText('Username');
    const inputElement = screen.getByRole('textbox', { name: 'Username' });
    expect(labelElement).toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();
  });

  it('renders error message when error prop is passed', () => {
    render(
      <Input
        label="Username"
        name="username"
        type="text"
        register={mockRegister}
        rules={mockRules}
        error={mockError}
      />
    );
    const errorElement = screen.getByText('This field is required');
    expect(errorElement).toBeInTheDocument();
  });

  it('renders checkbox input and label elements', () => {
    render(
      <Input
        label="Agree to terms"
        name="terms"
        type="checkbox"
        register={mockRegister}
        value="yes"
      />
    );
    const checkboxElement = screen.getByRole('checkbox', { name: 'yes' });
    const labelElement = screen.getByLabelText('yes');
    expect(checkboxElement).toBeInTheDocument();
    expect(labelElement).toBeInTheDocument();
  });

  it('renders radio input and label elements', () => {
    render(
      <Input label="Gender" name="gender" type="radio" register={mockRegister} value="male" />
    );
    const radioElement = screen.getByRole('radio', { name: 'male' });
    const labelElement = screen.getByLabelText('male');
    expect(radioElement).toBeInTheDocument();
    expect(labelElement).toBeInTheDocument();
  });
});
