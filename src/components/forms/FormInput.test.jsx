import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FormInput from './FormInput';

describe('FormInput', () => {
  it('renders label and input correctly', () => {
    render(
      <FormInput
        label="Test Label"
        name="test"
        value=""
        onChange={() => {}}
        required
      />
    );

    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('shows required asterisk when required prop is true', () => {
    render(
      <FormInput
        label="Test Label"
        name="test"
        value=""
        onChange={() => {}}
        required
      />
    );

    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('displays error message when error prop is provided', () => {
    const errorMessage = 'This field is required';
    render(
      <FormInput
        label="Test Label"
        name="test"
        value=""
        onChange={() => {}}
        error={errorMessage}
      />
    );

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('calls onChange handler when input value changes', () => {
    const handleChange = vi.fn();
    render(
      <FormInput
        label="Test Label"
        name="test"
        value=""
        onChange={handleChange}
      />
    );

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'test value' },
    });

    expect(handleChange).toHaveBeenCalled();
  });
});
