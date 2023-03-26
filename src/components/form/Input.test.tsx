import React from 'react';
import { render, screen } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  it('renders the label and input correctly', () => {
    const labelText = 'Test Label';
    const inputType = 'text';
    const ref = React.createRef<HTMLInputElement>();

    render(<Input label={labelText} type={inputType} error="" ref={ref} />);

    const labelElement = screen.getByText(labelText);
    expect(labelElement).toBeInTheDocument();

    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('type', inputType);

    const errorElement = screen.queryByText('Test Error');
    expect(errorElement).not.toBeInTheDocument();
  });

  it('renders the error message correctly', () => {
    const labelText = 'Test Label';
    const inputType = 'text';
    const ref = React.createRef<HTMLInputElement>();
    const errorMessage = 'Test Error';

    render(<Input label={labelText} type={inputType} ref={ref} error={errorMessage} />);

    const errorElement = screen.getByText(errorMessage);
    expect(errorElement).toBeInTheDocument();

    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveClass('err');
  });
});
