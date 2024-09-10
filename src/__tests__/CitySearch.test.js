import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CitySearch from '../components/CitySearch';
import { extractLocations, getEvents } from '../api';

describe('<CitySearch /> component', () => {
  let allLocations;

 beforeEach(async () => {
    const allEvents = await getEvents();
    allLocations = extractLocations(allEvents);
  });

  test('renders the suggestion text in the textbox upon clicking on the suggestion', async () => {
    render(<CitySearch allLocations={allLocations} />);
    
    const cityTextBox = screen.getByRole('textbox');
    fireEvent.change(cityTextBox, { target: { value: "Berlin" } });
    
    // Force the suggestions to show
    fireEvent.focus(cityTextBox);
    
    // the suggestion's textContent look like this: "Berlin, Germany"
    const suggestionList = screen.getByRole('list');
    const BerlinGermanySuggestion = within(suggestionList).getAllByRole('listitem')[0];
    fireEvent.click(BerlinGermanySuggestion);
    
    expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
  });

  test('renders text input', () => {
    render(<CitySearch allLocations={allLocations} />);
    const cityTextBox = screen.getByRole('textbox');
    expect(cityTextBox).toBeInTheDocument();
    expect(cityTextBox).toHaveClass('city');
  });

  test('suggestions list is hidden by default', () => {
    render(<CitySearch allLocations={allLocations} />);
    const suggestionList = screen.queryByRole('list');
    expect(suggestionList).not.toBeInTheDocument();
  });

  test('renders a list of suggestions when city textbox gains focus', () => {
    render(<CitySearch allLocations={allLocations} />);
    const cityTextBox = screen.getByRole('textbox');
    fireEvent.change(cityTextBox, { target: { value: 'Berlin' } });
    fireEvent.focus(cityTextBox);
    const suggestionList = screen.getByRole('list');
    expect(suggestionList).toBeInTheDocument();
    expect(suggestionList).toHaveClass('suggestions');
  });

  test('updates list of suggestions correctly when user types in city textbox', () => {
    render(<CitySearch allLocations={allLocations} />);
    const cityTextBox = screen.getByRole('textbox');
    fireEvent.change(cityTextBox, { target: { value: 'Berlin' } });
    fireEvent.focus(cityTextBox);
    const suggestionList = screen.getByRole('list');
    expect(suggestionList).toBeInTheDocument();
    const suggestions = allLocations.filter((location) =>
      location.toUpperCase().includes("BERLIN")
    );
    const suggestionListItems = within(suggestionList).getAllByRole('listitem');
    expect(suggestionListItems).toHaveLength(suggestions.length + 1);
    for (let i = 0; i < suggestions.length; i++) {
      expect(suggestionListItems[i]).toHaveTextContent(suggestions[i]);
    }
  });
});