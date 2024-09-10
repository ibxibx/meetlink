import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NumberOfEvents from '../components/NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsComponent;
  const setCurrentNOE = jest.fn();

  beforeEach(() => {
    NumberOfEventsComponent = render(<NumberOfEvents setCurrentNOE={setCurrentNOE} />);
  });

  test('renders number input', () => {
    const numberInput = NumberOfEventsComponent.getByRole('spinbutton');
    expect(numberInput).toBeInTheDocument();
  });

  test('default value of the input is 32', () => {
    const numberInput = NumberOfEventsComponent.getByRole('spinbutton');
    expect(numberInput).toHaveValue(32);
  });

  test('value changes when user types in the input', () => {
    const numberInput = screen.getByRole('spinbutton');
    fireEvent.change(numberInput, { target: { value: '10' } });
    expect(numberInput).toHaveValue(10);
  });

  test('setCurrentNOE is called when the input changes', () => {
    const numberInput = screen.getByRole('spinbutton');
    fireEvent.change(numberInput, { target: { value: '10' } });
    expect(setCurrentNOE).toHaveBeenCalledWith(10);
  });
});