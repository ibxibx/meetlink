import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NumberOfEvents from '../components/NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsComponent;
  const setCurrentNOE = jest.fn();
  const defaultNumber = 32;

  beforeEach(() => {
    NumberOfEventsComponent = render(<NumberOfEvents setCurrentNOE={setCurrentNOE} />);
  });

  test('renders number input', () => {
    const numberInput = NumberOfEventsComponent.getByRole('spinbutton');
    expect(numberInput).toBeInTheDocument();
  });

  test('default value of the input is 32', () => {
    const numberInput = NumberOfEventsComponent.getByRole('spinbutton');
    expect(numberInput).toHaveValue(defaultNumber);
  });

  test('value changes when user types in the input', () => {
    const numberInput = screen.getByRole('spinbutton');
    const expectedNumber = 10;
    fireEvent.change(numberInput, { target: { value: expectedNumber.toString() } });
    expect(numberInput).toHaveValue(expectedNumber);
  });

  test('setCurrentNOE is called when the input changes', () => {
    const numberInput = screen.getByRole('spinbutton');
    const expectedNumber = 10;
    fireEvent.change(numberInput, { target: { value: expectedNumber.toString() } });
    expect(setCurrentNOE).toHaveBeenCalledWith(expectedNumber);
  });
});