import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProviders } from 'src/tests/test-utils';
import FormPage from './Form';

describe('FormPage component', () => {
  test('renders AddCardForm and UserCards', () => {
    renderWithProviders(<FormPage></FormPage>);
    expect(screen.getByTestId('add-card-form')).toBeInTheDocument();
    expect(screen.getByTestId('user-card')).toBeInTheDocument();
  });
});
