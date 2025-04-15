import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import styles from '../components/Navbar/Navbar.module.css';
import '@testing-library/jest-dom';

describe('Navbar', () => {
  it('renders the logo with correct link', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const logoLink = screen.getByText('Arioso');
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('renders all navigation links', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const homeLink = screen.getByText('Home');
    const profileLink = screen.getByText('Profile');

    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/home');
    
    expect(profileLink).toBeInTheDocument();
    expect(profileLink).toHaveAttribute('href', '/profile');
  });

  it('applies correct styling classes', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const navbar = screen.getByRole('navigation');
    expect(navbar).toHaveClass(styles.navbar);

    const logo = screen.getByText('Arioso').closest('div');
    expect(logo).toHaveClass(styles.logo);

    const navLinks = screen.getByText('Home').closest('div');
    expect(navLinks).toHaveClass(styles.navLinks);

    // Check that nav links have the correct class
    const homeLink = screen.getByText('Home');
    const profileLink = screen.getByText('Profile');
    expect(homeLink).toHaveClass(styles.navLink);
    expect(profileLink).toHaveClass(styles.navLink);
  });
}); 