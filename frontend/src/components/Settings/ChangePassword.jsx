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
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);


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
        const demoMode = true;
        if (!validate()) return;
      
        setStatus("Saving...");
      
        if (demoMode) {
          // Simulated delay + mock success
          setTimeout(() => {
            setStatus("✅ Password successfully changed! (demo)");
            setForm({ current: "", new: "", confirm: "" });
          }, 1000);
          return;
        }
      
        const token = localStorage.getItem("token");
      
        try {
          const response = await fetch("http://localhost:5001/api/users/change-password", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              currentPassword: form.current,
              newPassword: form.new,
            }),
          });
      
          const data = await response.json();
      
          if (!response.ok) {
            throw new Error(data.error || "Failed to update password.");
          }
      
          setStatus("✅ Password successfully changed!");
          setForm({ current: "", new: "", confirm: "" });
          setErrors({});
        } catch (err) {
          setStatus(`❌ ${err.message}`);
        }
            

  };

  return (
    <form className="change-password" onSubmit={handleSubmit}>
      <h3>Change Password</h3>

      <label>
        Current Password
        <div className="password-field">
          <input
            type={showCurrent ? "text" : "password"}
            name="current"
            value={form.current}
            onChange={handleChange}
          />
          <span onClick={() => setShowCurrent(!showCurrent)} className="toggle-password">
            {showCurrent ? "👁️" : "🙈"}
          </span>
        </div>
        {errors.current && <p className="error">{errors.current}</p>}
      </label>

      <label>
        New Password
        <div className="password-field">
          <input
            type={showNew ? "text" : "password"}
            name="new"
            value={form.new}
            onChange={handleChange}
          />
          <span onClick={() => setShowNew(!showNew)} className="toggle-password">
            {showNew ? "👁️" : "🙈"}
          </span>
        </div>
        {errors.new && <p className="error">{errors.new}</p>}
      </label>

      <label>
        Confirm New Password
        <div className="password-field">
          <input
            type={showConfirm ? "text" : "password"}
            name="confirm"
            value={form.confirm}
            onChange={handleChange}
          />
          <span onClick={() => setShowConfirm(!showConfirm)} className="toggle-password">
            {showConfirm ? "👁️" : "🙈"}
          </span>
        </div>
        {errors.confirm && <p className="error">{errors.confirm}</p>}
      </label>

      <button type="submit">Update Password</button>

      {status && <p className="status-msg">{status}</p>}
    </form>
  );
};

export default ChangePassword;
