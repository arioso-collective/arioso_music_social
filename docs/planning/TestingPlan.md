# 🧪 Arioso Unit Test Plan

## Purpose  
This document defines the unit testing scope for key features of the Arioso application. Unit tests are designed to validate components, classes, and API interactions with structured logic and return values. Tests should cover props, context, routing, and response handling wherever applicable.

## Location in Repository  
This test file is located at '../docs/planning/TestingPlan.md'
Test Results are located at '../docs/planning/Frontend_TestResults.pdf' and  '..database/test/testresults/Backend_TestResults.pdf'

---

## 🎯 Frontend Unit Test Targets

### 🧩 UI Components

| Feature         | File                  | Test Description |
|-----------------|-----------------------|------------------|
| NavBar          | `NavBar.jsx`          | Validate rendering of navigation options depending on user login state. Includes checks for presence of correct links and dynamic content. |
| MusicPost       | `MusicPost.jsx`       | Ensure proper rendering of music post content, including audio playback component, metadata, and associated user actions such as likes or comments. |
| MusicSearchPage | `MusicSearchPage.jsx` |	Mocks the iTunes API call and verifies that the response is filtered correctly based on the search query
| HighlightMatch  | `MusicSearchPage.jsx` | Match-highlighting functionality Tests ensure debounce logic is respected and highlight rendering is accurate.
| Search Music    | `MusicSearchPage.jsx` | Verifies that `"Loading..."` is shown during the API fetch and that results are displayed afterward. 
| LoginForm       | `LoginForm.jsx`       | Tests for email validation and form behavior, verifying input validation, button states, and error message display in the login form component.

### 🔐 Routing Logic

| Feature         | File                | Test Description |
|-----------------|---------------------|------------------|
| ProtectedRoutes | `ProtectedRoute.jsx`| Verify access control functionality. Ensures unauthenticated users are redirected appropriately and that authorized access renders child components. |

---

## 🧩 Backend Unit Test Targets

### 📡 API Endpoints

| Endpoint / Function | File / Module       | Test Description |
|---------------------|---------------------|------------------|
| create_user          | `app.py`              | Uses MongoMock to verify user creation functionality, checking required fields, duplicate prevention, and JSON response formatting without modifying the actual database.

### 🔒 Utilities & Services

| Utility / Method     | File / Module       | Test Description |
|----------------------|---------------------|------------------|
| hash_password/compare_password| `password_util.py` | The tests verify password hashing functionality by ensuring unique hashes are generated, original passwords are not stored in plain text, and password comparison works correctly for both matching and non-matching cases.
---

## 🧩 Testing Guidelines

- Unit tests should validate individual components or methods in isolation.
- Return values, context usage, API interactions, and UI rendering logic must be covered.
- Testing frameworks:
  - **Frontend:** Vitest + React Testing Library + Jest DOM + Jest
  - **Backend:** Pytest 

