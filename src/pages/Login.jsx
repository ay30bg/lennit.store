import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc"; // Google icon
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
    navigate("/"); // redirect to home page
  };

  const handleGoogleLogin = () => {
    console.log("Continue with Google clicked");
    // Add Google OAuth logic here
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Sign In</h2>

        <form onSubmit={handleSubmit}>
          <label>Email or mobile phone number</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter email"
          />

          <label>Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter password"
            />
            <span
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit" className="login-btn">Sign In</button>
        </form>

        <a href="/forgot-password" className="forgot">Forgot Password?</a>

        <div className="divider">
          <span>or</span>
        </div>

        {/* Continue with Google Button */}
        <button className="google-btn" onClick={handleGoogleLogin}>
          <FcGoogle className="google-icon" />
          Continue with Google
        </button>

        <Link to="/signup">
          <button className="create-account-btn">Create Your Account</button>
        </Link>
      </div>
    </div>
  );
}
