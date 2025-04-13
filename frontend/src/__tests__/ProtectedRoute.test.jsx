import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import '@testing-library/jest-dom';
import React from 'react';

// Mock the Navigate component while preserving other exports
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    Navigate: ({ to }) => <div data-testid="mock-navigate">Redirecting to {to}...</div>
  };
});

describe('ProtectedRoute', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('renders children when authenticated', () => {
    // Set auth token in localStorage
    localStorage.setItem('authToken', 'test-token');

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <div data-testid="protected-content">Protected Content</div>
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.getByTestId('protected-content')).toBeInTheDocument();
    expect(screen.queryByTestId('mock-navigate')).not.toBeInTheDocument();
  });

  it('redirects when not authenticated', () => {
    // Ensure no auth token is present
    expect(localStorage.getItem('authToken')).toBeNull();

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <div data-testid="protected-content">Protected Content</div>
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.getByTestId('mock-navigate')).toBeInTheDocument();
    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
  });

  it('handles nested components correctly when authenticated', () => {
    // Set auth token in localStorage
    localStorage.setItem('authToken', 'test-token');

    const NestedComponent = () => (
      <div data-testid="nested-content">
        <h1>Nested Header</h1>
        <p>Nested Content</p>
      </div>
    );

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <div data-testid="parent">
            <NestedComponent />
          </div>
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.getByTestId('parent')).toBeInTheDocument();
    expect(screen.getByTestId('nested-content')).toBeInTheDocument();
    expect(screen.getByText('Nested Header')).toBeInTheDocument();
    expect(screen.getByText('Nested Content')).toBeInTheDocument();
  });

  // Cleanup after each test
  afterEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });
});