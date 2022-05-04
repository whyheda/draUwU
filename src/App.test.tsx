import React from 'react';
import { render, screen } from '@testing-library/react';
import { Canvas } from './components/Canvas';

test('renders learn react link', () => {
  render(<Canvas />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
