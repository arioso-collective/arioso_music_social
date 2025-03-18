import { useState } from "react";
import "./SignupForm.css";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    genre: "",
  });

  const [errors, setErrors] = useState({});
  const [usernameAvailable, setUsernameAvailable] = useState(null);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "name") {
      checkUsernameAvailability(value);
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

  // Check username availability (mock API call)
  const checkUsernameAvailability = async (username) => {
    if (username.length < 3) {
      setUsernameAvailable(null);
      return;
    }

    try {
      const response = await fetch(`https://api.arioso.com/check-username?name=${username}`);
      const data = await response.json();
      setUsernameAvailable(data.available);
    } catch (error) {
      console.error("Error checking username:", error);
    }
  };

  // Validate form fields
  const validateForm = () => {
    let newErrors = {};

    if (!formData.name) {
      newErrors.name = "Username is required";
    } else if (usernameAvailable === false) {
      newErrors.name = "Username is already taken";
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!validatePassword(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters long and include a number and special character";
    }

    if (!formData.genre) {
      newErrors.genre = "Please select a genre";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("User signed up:", formData);
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
        />
        {errors.name && <p className="error">{errors.name}</p>}
        {usernameAvailable === false && <p className="error">Username is taken</p>}
        {usernameAvailable === true && <p className="success">Username is available ✅</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <p className="error">{errors.password}</p>}

        <select name="genre" value={formData.genre} onChange={handleChange}>
          <option value="">Select a Genre</option>
          <option value="rock">Rock</option>
          <option value="pop">Pop</option>
          <option value="hiphop">Hip-Hop</option>
          <option value="jazz">Jazz</option>
        </select>
        {errors.genre && <p className="error">{errors.genre}</p>}

        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <a href="/login">Log in</a>
      </p>
    </div>
  );
};

export default SignupForm;