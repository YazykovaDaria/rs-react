import React from 'react';
import { render } from '@testing-library/react';
import store from 'src/redux/store';
import { Provider } from 'react-redux';
import FormPage from './Form';

describe('FormPage component', () => {
  test('renders AddCardForm and UserCards', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <FormPage />
      </Provider>
    );
    expect(getByTestId('add-card-form')).toBeInTheDocument();
    expect(getByTestId('user-card')).toBeInTheDocument();
  });
});
