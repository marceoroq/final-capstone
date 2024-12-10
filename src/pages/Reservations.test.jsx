import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
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
  // Clear mocks and localStorage before each test
  beforeEach(() => {
    vi.clearAllMocks();
    window.localStorage.clear();
  });

  it('renders reservation form initially', () => {
    renderWithProviders(<Reservations />);

    // Check for main form elements
    expect(screen.getByTestId('main-heading')).toHaveTextContent(
      /reserve a table/i
    );
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

    // Check for all required field errors
    await waitFor(() => {
      expect(screen.getByText(/please select a date/i)).toBeInTheDocument();
      expect(screen.getByText(/please select a time/i)).toBeInTheDocument();
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/phone number is required/i)).toBeInTheDocument();
    });
  });

  it('validates email format', async () => {
    renderWithProviders(<Reservations />);

    // Fill required fields to isolate email validation
    const mockData = {
      date: '2024-03-25',
      time: '17:00',
      guests: '2',
      name: 'John Doe',
      phone: '+1234567890',
    };

    // Fill other required fields
    Object.entries(mockData).forEach(([field, value]) => {
      const input = screen.getByLabelText(new RegExp(field, 'i'));
      fireEvent.change(input, { target: { value } });
    });

    // Test invalid email
    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

    const submitButton = screen.getByRole('button', {
      name: /confirm reservation/i,
    });
    fireEvent.click(submitButton);

    // Buscar el error en el campo de email
    await waitFor(() => {
      const emailField = screen.getByLabelText(/email/i);
      const emailError = emailField.parentElement.querySelector('.text-red-500');
      expect(emailError).toBeInTheDocument();
      expect(emailError).toHaveTextContent(/email/i);
    });
  });

  it('shows reservation details after successful submission', async () => {
    const mockData = {
      date: '2024-03-25',
      time: '17:00',
      guests: '2',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      seating: 'indoor',
      specialRequests: '',
      occasion: '',
    };

    renderWithProviders(<Reservations />);

    // Fill form fields
    Object.entries(mockData).forEach(([field, value]) => {
      if (field === 'seating') {
        const radio = screen.getByLabelText(/indoor/i);
        fireEvent.click(radio);
      } else if (field !== 'specialRequests' && field !== 'occasion') {
        const input = screen.getByLabelText(new RegExp(field, 'i'));
        fireEvent.change(input, { target: { value } });
      }
    });

    const submitButton = screen.getByRole('button', {
      name: /confirm reservation/i,
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const storedData = window.localStorage.getItem('littleLemonReservation');
      expect(storedData).toBeTruthy();
      const parsedData = JSON.parse(storedData);
      expect(parsedData).toEqual(expect.objectContaining(mockData));
    });
  });
});

describe('Reservations API Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('loads available times on mount', async () => {
    renderWithProviders(<Reservations />);

    await waitFor(() => {
      expect(bookingApi.fetchAPI).toHaveBeenCalled();
    });

    const times = ['17:00', '17:30', '18:00', '18:30'];
    times.forEach((time) => {
      expect(screen.getByText(time)).toBeInTheDocument();
    });
  });

  it('updates available times when date changes', async () => {
    renderWithProviders(<Reservations />);

    const dateInput = screen.getByLabelText(/date/i);
    const newDate = '2024-03-26';
    fireEvent.change(dateInput, { target: { value: newDate } });

    await waitFor(() => {
      expect(bookingApi.fetchAPI).toHaveBeenCalledWith(newDate);
    });
  });

  it('calls submitAPI when form is submitted successfully', async () => {
    const mockData = {
      date: '2024-03-25',
      time: '17:00',
      guests: '2',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      seating: 'indoor',
      specialRequests: '',
      occasion: '',
    };

    renderWithProviders(<Reservations />);

    // Fill form fields
    Object.entries(mockData).forEach(([field, value]) => {
      if (field === 'seating') {
        const radio = screen.getByLabelText(/indoor/i);
        fireEvent.click(radio);
      } else if (field !== 'specialRequests' && field !== 'occasion') {
        const input = screen.getByLabelText(new RegExp(field, 'i'));
        fireEvent.change(input, { target: { value } });
      }
    });

    const submitButton = screen.getByRole('button', {
      name: /confirm reservation/i,
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(bookingApi.submitAPI).toHaveBeenCalledWith(
        expect.objectContaining(mockData)
      );
    });
  });
});
