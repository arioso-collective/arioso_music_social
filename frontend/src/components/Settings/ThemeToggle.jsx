import { useEffect, useState } from "react";
import "./ThemeToggle.css";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleToggle = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className="theme-toggle-box">
      <h3>Theme</h3>
      <label className="switch">
        <input type="checkbox" onChange={handleToggle} checked={theme === "dark"} />
        <span className="slider" />
      </label>
      <p className="theme-label">{theme === "dark" ? "Dark Mode" : "Light Mode"}</p>
    </div>
  );
};

export default ThemeToggle;
