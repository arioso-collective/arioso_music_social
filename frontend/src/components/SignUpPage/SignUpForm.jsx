import { useState } from "react";
import "./SignUpForm.css";

// Mock API function to simulate username/email validation
const mockCheckAvailability = (username, email) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const takenUsernames = ["user123", "musiclover", "rockstar"];
      const takenEmails = ["test@example.com", "hello@music.com"];

      if (takenUsernames.includes(username)) {
        resolve({ available: false, message: "Username is already taken" });
      } else if (takenEmails.includes(email)) {
        resolve({ available: false, message: "Email is already registered" });
      } else {
        resolve({ available: true });
      }
    }, 1500); // Simulating a delay of 1.5 seconds
  });
};

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const [formStatus, setFormStatus] = useState({ success: null, message: "" });
  const [loading, setLoading] = useState(false); // Loading state for API call

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "name" || name === "email") {
      setUsernameAvailable(null);
      setFormStatus({ success: null, message: "" });
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

    // Simulating an API call for username/email availability
    const response = await mockCheckAvailability(formData.name, formData.email);

    setLoading(false);

    if (!response.available) {
      setFormStatus({ success: false, message: response.message });
    } else {
      setFormStatus({ success: true, message: "🎉 Account successfully created!" });
      setFormData({ name: "", email: "", password: "", confirmPassword: "" });
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up for Arioso</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Username"
          value={formData.name}
          onChange={handleChange}
          disabled={loading}
        />
        {errors.name && <p className="error">{errors.name}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          disabled={loading}
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          disabled={loading}
        />
        {errors.password && <p className="error">{errors.password}</p>}

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          disabled={loading}
        />
        {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

        {loading ? (
          <button type="submit" disabled className="loading-btn">
            Checking...
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

export default SignupForm;
