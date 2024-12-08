import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import { ToastProvider } from '../context/ToastContext';
import * as bookingApi from '../api/bookingApi';
import Reservations from './Reservations';

// Mock the API
vi.mock('../api/bookingApi', () => ({
  fetchAPI: vi.fn().mockResolvedValue(['17:00', '17:30', '18:00', '18:30']),
  submitAPI: vi.fn().mockResolvedValue(true),
}));

const renderWithProviders = (component) => {
  return render(
    <BrowserRouter>
      <ToastProvider>{component}</ToastProvider>
    </BrowserRouter>
  );
};

describe('Reservations', () => {
  it('renders reservation form initially', () => {
    renderWithProviders(<Reservations />);

    expect(screen.getByText('Reserve a Table')).toBeInTheDocument();
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument();
  });

  it('shows validation errors when submitting empty form', async () => {
    renderWithProviders(<Reservations />);

    const submitButton = screen.getByRole('button', {
      name: /confirm reservation/i,
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Please select a date')).toBeInTheDocument();
      expect(screen.getByText('Please select a time')).toBeInTheDocument();
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Phone number is required')).toBeInTheDocument();
    });
  });

  it('validates email format', async () => {
    renderWithProviders(<Reservations />);

    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

    const submitButton = screen.getByRole('button', {
      name: /confirm reservation/i,
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText('Please enter a valid email')
      ).toBeInTheDocument();
    });
  });

  it('shows reservation details after successful submission', async () => {
    const mockData = {
      date: '2024-03-25',
      time: '19:00',
      guests: '2',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
    };

    renderWithProviders(<Reservations />);

    // Fill form
    fireEvent.change(screen.getByLabelText(/date/i), {
      target: { value: mockData.date },
    });
    fireEvent.change(screen.getByLabelText(/time/i), {
      target: { value: mockData.time },
    });
    fireEvent.change(screen.getByLabelText(/number of guests/i), {
      target: { value: mockData.guests },
    });
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: mockData.name },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: mockData.email },
    });
    fireEvent.change(screen.getByLabelText(/phone/i), {
      target: { value: mockData.phone },
    });

    const submitButton = screen.getByRole('button', {
      name: /confirm reservation/i,
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(localStorage.getItem('littleLemonReservation')).toBeTruthy();
    });
  });
});

describe('Reservations API Integration', () => {
  it('loads available times on mount', async () => {
    renderWithProviders(<Reservations />);

    await waitFor(() => {
      expect(bookingApi.fetchAPI).toHaveBeenCalled();
    });

    expect(screen.getByText('17:00')).toBeInTheDocument();
    expect(screen.getByText('17:30')).toBeInTheDocument();
  });

  it('updates available times when date changes', async () => {
    renderWithProviders(<Reservations />);

    const dateInput = screen.getByLabelText(/date/i);
    fireEvent.change(dateInput, { target: { value: '2024-03-26' } });

    await waitFor(() => {
      expect(bookingApi.fetchAPI).toHaveBeenCalledWith('2024-03-26');
    });
  });

  it('calls submitAPI when form is submitted successfully', async () => {
    renderWithProviders(<Reservations />);

    // Fill form with valid data
    // ... código para llenar el formulario

    const submitButton = screen.getByRole('button', {
      name: /confirm reservation/i,
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(bookingApi.submitAPI).toHaveBeenCalled();
    });
  });
});
