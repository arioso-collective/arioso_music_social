import LogInForm from "../components/LogInPage/LogInForm.jsx";
import logo from "../assets/Arioso_Logo-03.png";
import "./LogInPage.css"; // Import styles

const LogInPage = () => {
  return (
    <div className="login-page">
      {/* Left Section: Logo */}
      <div className="left-section">
        <img src={logo} alt="Arioso Logo" className="logo" />
      </div>

      {/* Right Section: Login Form */}
      <div className="right-section">
        <LogInForm />
      </div>
    </div>
  );
};

export default LogInPage;
