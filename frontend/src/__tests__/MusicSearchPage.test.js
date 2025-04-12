import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MusicSearchPage from "./MusicSearchPage";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        results: [
          { trackId: 1, trackName: "Hello", artistName: "Adele", previewUrl: "" },
          { trackId: 2, trackName: "Hell", artistName: "Foo", previewUrl: "" },
          { trackId: 3, trackName: "Goodbye", artistName: "Someone", previewUrl: "" },
        ],
      }),
  })
);

