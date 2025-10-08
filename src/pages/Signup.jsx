// import React, { useState } from "react";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import "../styles/auth.css";

// export default function Signup() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       alert("Passwords do not match");
//       return;
//     }
//     console.log("Email:", email, "Password:", password);
//     // Add API call here
//   };

//   return (
//     <div className="login-page">
//       <div className="login-card">
//         <h2>Create Account</h2>

//         <form onSubmit={handleSubmit}>
//           <label>Email or mobile phone number</label>
//           <input
//             type="text"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             placeholder="Enter email"
//           />

//           <label>Password</label>
//           <div className="password-wrapper">
//             <input
//               type={showPassword ? "text" : "password"}
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               placeholder="Enter password"
//             />
//             <span
//               className="password-toggle"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? <FaEyeSlash /> : <FaEye />}
//             </span>
//           </div>

//           <label>Confirm Password</label>
//           <div className="password-wrapper">
//             <input
//               type={showConfirmPassword ? "text" : "password"}
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//               placeholder="Confirm password"
//             />
//             <span
//               className="password-toggle"
//               onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//             >
//               {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
//             </span>
//           </div>

//           <button type="submit" className="login-btn">
//             Create Account
//           </button>
//         </form>

//         <div className="divider">
//           <span>or</span>
//         </div>

//         <a href="/login" className="forgot">
//           Already have an account? Sign In
//         </a>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Correct import
import axios from "axios";
import "../styles/auth.css";

export default function Signup() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Client-side validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/signup`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      const { token, user } = response.data;
      console.log("Signup response:", response.data); // Log for debugging
      login({ user, token }); // Store user and token in context

      // Reset form fields
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      // Redirect to the previous page or home
      const redirectTo = location.state?.from || "/";
      navigate(redirectTo, { replace: true });
    } catch (err) {
      console.error("Signup error:", err.response || err); // Detailed error logging
      const errorMessage = err.response?.data?.message;
      if (errorMessage === "Email already exists") {
        setError("This email is already registered. Please use a different email.");
      } else if (errorMessage === "Invalid email format") {
        setError("Please enter a valid email address.");
      } else if (errorMessage === "Password too weak") {
        setError("Password is too weak. Use at least 8 characters with numbers and symbols.");
      } else {
        setError(err.response?.data?.message || "Failed to sign up. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>Register</h1>

        {error && (
          <div className="error-message" style={{ color: "red", marginBottom: "15px" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Email or mobile phone number *</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group password-group">
            <label>Password *</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="form-group password-group">
            <label>Confirm Password *</label>
            <div className="password-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={loading}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={loading}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? <span className="spinner"></span> : "Register"}
          </button>
        </form>

        <div className="auth-links">
          <p>
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
