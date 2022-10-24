import { render, screen } from '@testing-library/react';
import App from './App';


test('renders Welcome Back', () => {
  render(<App />);
  const welcomeElement = screen.getByText('Welcome');
  const backElement = screen.getByText('Back');
  expect(welcomeElement).toBeInTheDocument();
  expect(backElement).toBeInTheDocument();
});
