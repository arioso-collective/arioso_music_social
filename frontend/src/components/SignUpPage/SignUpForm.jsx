import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUpForm.css";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formStatus, setFormStatus] = useState({ success: null, message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "password") {
      checkPasswordStrength(value);
    }

    if (name === "name" || name === "email") {
      setFormStatus({ success: null, message: "" });
    }
  };

  // Password strength checker
  const checkPasswordStrength = (password) => {
    if (password.length < 6) {
      setPasswordStrength("Weak");
    } else if (password.length < 10) {
      setPasswordStrength("Medium");
    } else {
      setPasswordStrength("Strong");
    }
  };

  // Validate email format
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Validate password strength
  const validatePassword = (password) => {
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
  };

  // Validate form fields
  const validateForm = () => {
    let newErrors = {};

    if (!formData.name) {
      newErrors.name = "Username is required";
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!validatePassword(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters long and include a number and special character";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setFormStatus({ success: null, message: "" });

    try {
      const response = await fetch('http://localhost:5001/api/create_user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          username: formData.name, // Using name as username for now
          password: formData.password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create account');
      }

      setFormStatus({ success: true, message: "🎉 Account successfully created!" });
      // Clear form
      setFormData({ name: "", email: "", password: "", confirmPassword: "" });
      // Redirect to login page after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setFormStatus({ success: false, message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up for Arioso</h2>
      <form onSubmit={handleSubmit} autoComplete="on">
        <input
          type="text"
          name="name"
          placeholder="Username"
          value={formData.name}
          onChange={handleChange}
          autoComplete="username"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
          required
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"
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

        <div className={`password-strength ${passwordStrength.toLowerCase()}`}>
          {passwordStrength && <p>Password Strength: {passwordStrength}</p>}
        </div>

        <div className="password-container">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            autoComplete="new-password"
            required
          />
          <span
            className="toggle-password"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? "👁️" : "🙈"}
          </span>
        </div>
        {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

        {loading ? (
          <button type="submit" disabled className="loading-btn">
            Creating Account...
          </button>
        ) : (
          <button type="submit">Sign Up</button>
        )}
      </form>

      {formStatus.message && (
        <p className={formStatus.success ? "success" : "error"}>{formStatus.message}</p>
      )}

      <p>
        Already have an account? <a href="/login">Log in</a>
      </p>
    </div>
  );
};

export default SignUpForm;
