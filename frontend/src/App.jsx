import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './styles/global.css';
import SignUpPage from "./pages/SignUpPage";
import LogInPage from "./pages/LogInPage";
import ProfilePage from "./views/ProfilePage";
import EditProfilePage from "./views/EditProfilePage";
import HomePage from "./views/HomePage";
import MusicSearchPage from "./views/MusicSearchPage"; 
import MusicSuggestionsPage from "./views/MusicSuggestionsPage";
import SettingsPage from "./pages/SettingsPage";
import Navbar from "./components/Navbar/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { ProfileProvider } from "./context/ProfileContext";

function App() {
  return (
    <ProfileProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LogInPage />} /> {/* Landing Page */}
          <Route path="/login" element={<LogInPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          {/* Protected routes */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <HomePage />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <ProfilePage />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/edit"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <EditProfilePage />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <MusicSearchPage /> {}
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <SettingsPage /> {}
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/suggestions"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <MusicSuggestionsPage /> {}
                </>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </ProfileProvider>
  );
}

export default App;
