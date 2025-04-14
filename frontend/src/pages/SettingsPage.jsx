import React from "react";
import { useNavigate } from "react-router-dom";
import "./SettingsPage.css";
import ChangePassword from "../components/Settings/ChangePassword";

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
      <ChangePassword />
    </div>
  );
};

export default SettingsPage;
