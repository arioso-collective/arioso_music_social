import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../utils/validation";
import "./LogInForm.css";

const LogInForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loginStatus, setLoginStatus] = useState({ success: null, message: "" });
  const [loading, setLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate form after each input change
    validateForm({ ...formData, [name]: value });
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
    setIsButtonDisabled(Object.keys(newErrors).length > 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isButtonDisabled) return;

    setLoading(true);
    setLoginStatus({ success: null, message: "" });

    try {
      const response = await fetch('http://localhost:5001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      setLoginStatus({ success: true, message: "🎉 Login successful!" });
      // Clear form
      setFormData({ email: "", password: "" });
      // Redirect to home page after successful login
      setTimeout(() => {
        navigate('/home');
      }, 1500);
    } catch (error) {
      setLoginStatus({ success: false, message: error.message });
    } finally {
      setLoading(false);
    }
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

        <div className="password-container">
          <label>Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <span
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "👁️" : "🙈"}
          </span>
        </div>
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
        <p className={loginStatus.success ? "success" : "error"}>
          {loginStatus.message}
        </p>
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

