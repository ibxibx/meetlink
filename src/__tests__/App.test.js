import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('<App /> component', () => {
  beforeEach(() => {
    render(<App />);
  });

  test('render CitySearch', () => {
    expect(screen.getByPlaceholderText("Search for a city")).toBeInTheDocument();
  });

  test('renders list of events', () => {
    expect(screen.getByTestId("event-list")).toBeInTheDocument();
  });

  test('render NumberOfEvents', () => {
    expect(screen.getByTestId("number-of-events")).toBeInTheDocument();
  });
});