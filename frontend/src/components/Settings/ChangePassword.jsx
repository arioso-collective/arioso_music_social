import { useState } from "react";
import "./ChangePassword.css";

const ChangePassword = () => {
  const [form, setForm] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setStatus("");
  };

  const validate = () => {
    const newErrors = {};
    if (!form.current) newErrors.current = "Current password is required";
    if (form.new.length < 8)
      newErrors.new = "New password must be at least 8 characters";
    if (!/\W/.test(form.new))
      newErrors.new = "New password must contain a special character";
    if (form.new !== form.confirm)
      newErrors.confirm = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Simulate password update API
    setStatus("Saving...");
    setTimeout(() => {
      setStatus("✅ Password successfully changed!");
      setForm({ current: "", new: "", confirm: "" });
    }, 1000);
  };

  return (
    <form className="change-password" onSubmit={handleSubmit}>
      <h3>Change Password</h3>

      <label>
        Current Password
        <input
          type="password"
          name="current"
          value={form.current}
          onChange={handleChange}
        />
        {errors.current && <p className="error">{errors.current}</p>}
      </label>

      <label>
        New Password
        <input
          type="password"
          name="new"
          value={form.new}
          onChange={handleChange}
        />
        {errors.new && <p className="error">{errors.new}</p>}
      </label>

      <label>
        Confirm New Password
        <input
          type="password"
          name="confirm"
          value={form.confirm}
          onChange={handleChange}
        />
        {errors.confirm && <p className="error">{errors.confirm}</p>}
      </label>

      <button type="submit">Update Password</button>

      {status && <p className="status-msg">{status}</p>}
    </form>
  );
};

export default ChangePassword;
