import { describe, it, expect } from 'vitest';
import { validateEmail } from '../utils/validation.js';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LogInForm from '../components/LogInPage/LogInForm.jsx';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

describe("validateEmail()", () => {
  it("should return true for valid email formats", () => {
    expect(validateEmail("test@example.com")).toBe(true);
    expect(validateEmail("user.name+filter@domain.co")).toBe(true);
    expect(validateEmail("email@sub.domain.com")).toBe(true);
  });

  it("should return false for invalid email formats", () => {
    expect(validateEmail("bademail")).toBe(false);
    expect(validateEmail("missing@domain")).toBe(false);
    expect(validateEmail("@nope.com")).toBe(false);
  });
});

describe("LogInForm Component", () => {
    it("disables the submit button with invalid inputs", async () => {
      render(
        <MemoryRouter>
          <LogInForm />
        </MemoryRouter>
      );      
  
      const emailInput = screen.getByPlaceholderText(/enter your email/i);
      const passwordInput = screen.getByPlaceholderText(/enter your password/i);
      const loginButton = screen.getByRole("button", { name: /log in/i });
  
      await userEvent.clear(emailInput);
      await userEvent.type(emailInput, "invalid-email");
  
      await userEvent.clear(passwordInput);
      await userEvent.type(passwordInput, "short");
  
      expect(loginButton).toBeDisabled();
    });
  
    it("enables the submit button with valid inputs", async () => {
      render(
        <MemoryRouter>
          <LogInForm />
        </MemoryRouter>
      );      
  
      const emailInput = screen.getByPlaceholderText(/enter your email/i);
      const passwordInput = screen.getByPlaceholderText(/enter your password/i);
      const loginButton = screen.getByRole("button", { name: /log in/i });
  
      await userEvent.type(emailInput, "valid@email.com");
      await userEvent.type(passwordInput, "validPassword123");
  
      expect(loginButton).not.toBeDisabled();
    });

    it("shows error messages for invalid email and empty password", async () => {
      render(
        <MemoryRouter>
          <LogInForm />
        </MemoryRouter>
      );
    
      const emailInput = screen.getByPlaceholderText(/enter your email/i);
      const passwordInput = screen.getByPlaceholderText(/enter your password/i);
    
      await userEvent.clear(emailInput);
      await userEvent.type(emailInput, "not-an-email");
    
      await userEvent.clear(passwordInput);
    
      // Move focus to trigger validation (blur event)
      await userEvent.tab();
    
      expect(await screen.findByText(/invalid email format/i)).toBeInTheDocument();
      expect(await screen.findByText(/password cannot be empty/i)).toBeInTheDocument();
    });
    
  });  
