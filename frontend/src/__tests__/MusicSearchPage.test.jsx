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
    await userEvent.type(input, "he");

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
        }, 300); // simulate a 300ms delay
      })
    );

    render(<MusicSearchPage />);
    const input = screen.getByPlaceholderText(/search for music by title/i);
    await userEvent.type(input, "anything");

    const loadingIndicator = await screen.findByText(/loading/i);
    expect(loadingIndicator).toBeTruthy();
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).toBeNull();
    });
  });

  it("highlights matching query text inside track titles", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            results: [
              { trackId: 1, trackName: "Hello", artistName: "Adele", previewUrl: "https://audio.mp3" },
            ],
          }),
      })
    );

    render(<MusicSearchPage />);
    const input = screen.getByPlaceholderText(/search for music by title/i);
    await userEvent.type(input, "he");


    await waitFor(() => {
      const highlightedEls = screen.getAllByText("He", { selector: ".highlight" });
      expect(highlightedEls.length).toBeGreaterThan(0);
      highlightedEls.forEach(el => {
        expect(el.textContent).toMatch(/he/i);
      });
    });
  });
});

