import { useState } from "react";
import "./LogInForm.css";

// Mock API function to simulate user authentication
const mockLogin = (email, password) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock user database
      const users = [
        { email: "user@example.com", password: "Password123!" },
        { email: "music@arioso.com", password: "MusicLover@2025" },
      ];

      // Check if user exists
      const user = users.find((u) => u.email === email && u.password === password);

      if (user) {
        resolve({ success: true, message: "🎉 Login successful!" });
      } else {
        resolve({ success: false, message: "❌ Invalid email or password" });
      }
    }, 1500); // Simulate API delay (1.5s)
  });
};

const LogInForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loginStatus, setLoginStatus] = useState({ success: null, message: "" });
  const [loading, setLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate form after each input change
    validateForm({ ...formData, [name]: value });
  };

  // Email validation regex
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Form validation function
  const validateForm = (data) => {
    let newErrors = {};

    if (!validateEmail(data.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!data.password) {
      newErrors.password = "Password cannot be empty";
    }

    setErrors(newErrors);
    setIsButtonDisabled(Object.keys(newErrors).length > 0); // Disable button if there are errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isButtonDisabled) return; // Prevent submission if validation fails

    setLoading(true);
    setLoginStatus({ success: null, message: "" });

    const response = await mockLogin(formData.email, formData.password);

    setLoading(false);
    setLoginStatus(response);
  };

  return (
    <div className="login-container">
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {errors.password && <p className="error">{errors.password}</p>}

        {loading ? (
          <button type="submit" disabled className="loading-btn">
            Logging in...
          </button>
        ) : (
          <button type="submit" disabled={isButtonDisabled}>
            Log In
          </button>
        )}
      </form>

      {loginStatus.message && (
        <p className={loginStatus.success ? "success" : "error"}>{loginStatus.message}</p>
      )}

      <div className="login-links">
        <a href="/forgot-password">Forgot Password?</a>
        <p>
          Don't have an account? <a href="/signup">Register</a>
        </p>
      </div>
    </div>
  );
};

export default LogInForm;

