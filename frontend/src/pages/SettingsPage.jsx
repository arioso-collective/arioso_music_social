import React from "react";
import { useNavigate } from "react-router-dom";
import "./SettingsPage.css";

const SettingsPage = () => {
    const navigate = useNavigate();
  return (
    <div className="settings-page">
      <button
        className="back-button"
        onClick={() => navigate("/profile")}
      >
        Save Changes
      </button>
      <h2>Settings</h2>
      <p>This is where you’ll be able to update your profile, preferences, and more!</p>
    </div>
  );
};

export default SettingsPage;
