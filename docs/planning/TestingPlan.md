# 🧪 Arioso Unit Test Plan

## Purpose  
This document defines the unit testing scope for key features of the Arioso application. Unit tests are designed to validate components, classes, and API interactions with structured logic and return values. Tests should cover props, context, routing, and response handling wherever applicable.

## Location in Repository  
This test file is located at '../docs/planning/TestingPlan.md'

---

## 🎯 Frontend Unit Test Targets

### 🧩 UI Components

| Feature         | File                  | Test Description |
|-----------------|-----------------------|------------------|
| NavBar          | `NavBar.jsx`          | Validate rendering of navigation options depending on user login state. Includes checks for presence of correct links and dynamic content. |
| MusicPost       | `MusicPost.jsx`       | Ensure proper rendering of music post content, including audio playback component, metadata, and associated user actions such as likes or comments. |
| MusicSearchPage | 'MusicSearchPage.jsx' |	Mocks the iTunes API call and verifies that the response is filtered correctly based on the search query
| HighlightMatch  | 'MusicSearchPage.jsx' | Match-highlighting functionality Tests ensure debounce logic is respected and highlight rendering is accurate.
| Search Music    | 'MusicSearchPage.jxs' |  Verifies that `"Loading..."` is shown during the API fetch and that results are displayed afterward. 

### 🔐 Routing Logic

| Feature         | File                | Test Description |
|-----------------|---------------------|------------------|
| ProtectedRoutes | `ProtectedRoute.jsx`| Verify access control functionality. Ensures unauthenticated users are redirected appropriately and that authorized access renders child components. |

---

## 🧩 Backend Unit Test Targets

### 📡 API Endpoints

| Endpoint / Function | File / Module       | Test Description |
|---------------------|---------------------|------------------|
|                     |                     | _Add backend API targets here (e.g., user auth, comment submission, playlist creation, etc.)_ |

### 🔒 Utilities & Services

| Utility / Method     | File / Module       | Test Description |
|----------------------|---------------------|------------------|
|                      |                     | _Add backend logic targets here (e.g., token validation, password hashing, file upload parsing, etc.)_ |

---

## 🧩 Testing Guidelines

- Unit tests should validate individual components or methods in isolation.
- Return values, context usage, API interactions, and UI rendering logic must be covered.
- Testing frameworks:
  - **Frontend:** Vitest + React Testing Library + Jest DOM + Jest
  - **Backend:** Pytest 

