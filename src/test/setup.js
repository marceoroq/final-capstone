import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Create a simple in-memory storage
const store = new Map();

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn((key) => store.get(key) || null),
  setItem: vi.fn((key, value) => store.set(key, value)),
  removeItem: vi.fn((key) => store.delete(key)),
  clear: vi.fn(() => store.clear()),
};

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock window.matchMedia
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };
