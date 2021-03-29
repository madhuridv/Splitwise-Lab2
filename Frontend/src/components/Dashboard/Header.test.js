import { render, screen } from '@testing-library/react';
import Header from './DashboardHeader';

test('renders learn react link', () => {
  render(<Header />);
  const linkElement = screen.getByText(/Dashboard/i);
  expect(linkElement);
});