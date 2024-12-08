import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Navbar from './Navbar';

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Navbar', () => {
  it('renders all navigation links', () => {
    renderWithRouter(<Navbar />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Menu')).toBeInTheDocument();
    expect(screen.getByText('Reservations')).toBeInTheDocument();
    expect(screen.getByText('Order Online')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('toggles mobile menu when hamburger button is clicked', () => {
    renderWithRouter(<Navbar />);

    const menuButton = screen.getByLabelText(/open menu/i);
    fireEvent.click(menuButton);

    expect(screen.getByLabelText(/close menu/i)).toBeInTheDocument();
  });

  it('closes mobile menu when a link is clicked', () => {
    renderWithRouter(<Navbar />);

    const menuButton = screen.getByLabelText(/open menu/i);
    fireEvent.click(menuButton);

    const homeLink = screen.getAllByText('Home')[1]; // mobile menu link
    fireEvent.click(homeLink);

    expect(screen.getByLabelText(/open menu/i)).toBeInTheDocument();
  });
});
