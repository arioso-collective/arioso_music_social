import React from "react";
import { useNavigate } from "react-router-dom";
import "./SettingsPage.css";
import ChangePassword from "../components/Settings/ChangePassword";
import ThemeToggle from "../components/Settings/ThemeToggle";

const SettingsPage = () => {
    const navigate = useNavigate();
  return (
    <div className="settings-page">
      <button
        className="save-button"
        onClick={() => navigate("/profile")}
      >
        Save Changes
      </button>
      <h2>Settings</h2>

      <div className="settings-flex">
        <ChangePassword />
        <ThemeToggle />
      </div>
    </div>
  );
};

export default SettingsPage;
