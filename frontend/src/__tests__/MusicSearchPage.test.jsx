import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MusicSearchPage from '../views/MusicSearchPage.jsx';
import '@testing-library/jest-dom';

beforeEach(() => {
  // Restore any previous mocks before each test
  vi.restoreAllMocks();
});

describe("MusicSearchPage Component", () => {
  it("mocks iTunes API and filters results by track name", async () => {
    // Mock fetch to return our test data.
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            results: [
              { trackId: 1, trackName: "Hello", artistName: "Adele", previewUrl: "https://audio1.mp3" },
              { trackId: 2, trackName: "Hey Jude", artistName: "The Beatles", previewUrl: "https://audio2.mp3" },
              { trackId: 3, trackName: "Goodbye", artistName: "Unknown", previewUrl: "https://audio3.mp3" },
            ],
          }),
      })
    );

    render(<MusicSearchPage />);
    const input = screen.getByPlaceholderText(/search for music by title/i);
    // Type "he" into the search box.
    await userEvent.type(input, "he");

    // Wait for results to show up.
    await waitFor(() => {
      // Instead of looking for "Hello" directly, query listitems and check their text.
      const listItems = screen.getAllByRole("listitem");
      expect(listItems.length).toBe(2); // "Hello" and "Hey Jude" should appear (filtered by "he")
      expect(listItems[0].textContent).toMatch(/Hello/);
      expect(listItems[1].textContent).toMatch(/Hey Jude/);
    });
  }, 10000);
  it("shows loading indicator while fetching results", async () => {
    global.fetch = vi.fn(() =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            json: () => Promise.resolve({ results: [] }),
          });
        }, 300); // simulate fetch delay
      })
    );

    render(<MusicSearchPage />);
    const input = screen.getByPlaceholderText(/search for music by title/i);
    await userEvent.type(input, "anything");

    expect(await screen.findByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });
  });

});
