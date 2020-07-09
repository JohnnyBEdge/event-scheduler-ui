import React from 'react';
import { render } from '@testing-library/react';
// import App from './App';
import Main from './Main';

test('renders learn react link', () => {
  const { getByText } = render(<Main />);
  // const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
