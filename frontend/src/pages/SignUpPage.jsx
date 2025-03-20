import SignUpForm from "../components/SignUpPage/SignUpForm.jsx";
import logo from "../assets/Arioso_Logo-03.png"
import "../pages/SignUpPage.css"; // Import global styles

const SignUpPage = () => {
  return (
    <div className="signup-page">
      <div className="left-section">
        <img src={logo} alt="Arioso Logo" className="logo" />
      </div>
      <div className="right-section">
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUpPage;
