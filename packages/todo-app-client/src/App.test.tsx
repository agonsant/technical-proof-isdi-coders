import { render } from '@testing-library/react';
import fetch from 'jest-fetch-mock';
import App from './App';

beforeEach(() => {
  fetch.resetMocks();
});
test('renders without crashing', () => {
  fetch.mockResponse(JSON.stringify([]));
  const { baseElement } = render(<App />);
  expect(baseElement).toBeDefined();
});
