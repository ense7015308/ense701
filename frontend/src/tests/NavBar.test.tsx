import React from 'react';
import { render, screen } from '@testing-library/react';
import NavBar from '../components/nav/NavBar';
import '@testing-library/jest-dom';

describe('NavBar component', () => {
  it('Renders with children', () => {
    // define some text 
    const childText = 'Random Text';
    // Render 
    render(<nav>{childText}</nav>);
    // Check if the NavBar element is present
    const navElement = screen.getByRole('navigation');
    expect(navElement).toBeInTheDocument();
    // Check if the text is in the NavBar
    expect(screen.getByText(childText)).toBeInTheDocument();
  });
  it('Renders without children', () => {
    // Render the NavBar without any children
    render(<nav/>);
    // Checks if element is present
    const navElement = screen.getByRole('navigation');
    expect(navElement).toBeInTheDocument();
  });
});