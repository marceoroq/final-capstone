import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ToastProvider } from '../context/ToastContext';
import Reservations from './Reservations';

// Mock the API with both success and failure scenarios
vi.mock('../api/bookingApi', () => ({
  fetchAPI: vi.fn().mockImplementation(async () => {
    if (Math.random() > 0.7) {
      throw new Error('Failed to fetch available times');
    }
    return ['17:00', '17:30', '18:00', '18:30'];
  }),
  submitAPI: vi.fn().mockImplementation(async (formData) => {
    if (Math.random() > 0.7) {
      throw new Error('Failed to submit reservation');
    }
    return true;
  }),
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

    // Check HTML5 validation
    expect(emailInput).toBeInvalid();
    expect(emailInput.validity.typeMismatch).toBe(true);
  });
});
