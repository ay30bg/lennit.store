import React from "react";
import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Lennit Stores — All rights reserved.</p>
      <div className="footer-links">
        <a href="/">Privacy Policy</a>
        <a href="/">Terms of Service</a>
        <a href="/">Support</a>
      </div>
    </footer>
  );
}
