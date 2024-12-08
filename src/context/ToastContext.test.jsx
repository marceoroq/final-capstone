import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ToastProvider, useToast } from './ToastContext';

const TestComponent = () => {
  const { showToast } = useToast();
  return (
    <button onClick={() => showToast('Test message', 'success')}>
      Show Toast
    </button>
  );
};

describe('ToastContext', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('shows toast message when showToast is called', () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    screen.getByRole('button').click();
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('automatically hides toast after 5 seconds', async () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    screen.getByRole('button').click();
    expect(screen.getByText('Test message')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(screen.queryByText('Test message')).not.toBeInTheDocument();
  });

  it('shows different styles for success and error toasts', () => {
    const { rerender } = render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    // Test success toast
    screen.getByRole('button').click();
    expect(screen.getByRole('alert')).toHaveClass('bg-[#41cf56]');

    // Crear un nuevo componente de prueba para el toast de error
    const ErrorTestComponent = () => {
      const { showToast } = useToast();
      return (
        <button onClick={() => showToast('Error message', 'error')}>
          Show Error Toast
        </button>
      );
    };

    // Test error toast
    rerender(
      <ToastProvider>
        <ErrorTestComponent />
      </ToastProvider>
    );

    screen.getByRole('button').click();
    expect(screen.getByRole('alert')).toHaveClass('bg-red-500');
  });
});
