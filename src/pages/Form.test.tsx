import React from 'react';
import { render } from '@testing-library/react';
import FormPage from './Form';

describe('FormPage component', () => {
  test('renders AddCardForm and UserCards', () => {
    const { getByTestId } = render(<FormPage />);
    expect(getByTestId('add-card-form')).toBeInTheDocument();
    expect(getByTestId('user-card')).toBeInTheDocument();
  });
});
