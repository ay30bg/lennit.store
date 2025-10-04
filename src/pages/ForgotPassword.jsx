import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/auth.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reset password request for:", email);

    // Normally call API to send reset link
    alert("If an account exists, a reset link has been sent.");
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Forgot Password</h2>
        <p className="subtitle">
          Enter your email or mobile number and we’ll send you a password reset link.
        </p>

        <form onSubmit={handleSubmit}>
          <label>Email or mobile phone number</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter email"
          />

          <button type="submit" className="login-btn">
            Continue
          </button>
        </form>

        <div className="divider">
          <span>or</span>
        </div>

        <Link to="/login">
          <button className="create-account-btn">Back to Sign In</button>
        </Link>
      </div>
    </div>
  );
}
