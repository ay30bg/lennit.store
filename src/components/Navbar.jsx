import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaThLarge, FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";
import { CartContext } from "../context/CartContext"; 
import "../styles/navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { cart } = useContext(CartContext);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const wishlistCount = 2;

  return (
    <>
      {/* Fullscreen Overlay Menu */}
      <div className={`nav-overlay ${menuOpen ? "active" : ""}`} onClick={() => setMenuOpen(false)}></div>

      <nav className="navbar">
        <div className="navbar-container">
          {/* Logo */}
          <div className="logo">
            <Link to="/">Lennit Stores</Link>
          </div>

          {/* Search Bar */}
          <div className="search-bar">
            <input type="text" placeholder="Search products..." />
            <button><FaSearch className="search-icon" /></button>
          </div>

          {/* Navigation Links */}
          <ul className={`nav-links fullscreen ${menuOpen ? "active" : ""}`}>
            <li>
              <Link to="/wishlist" className="icon-link" onClick={() => setMenuOpen(false)}>
                <FaHeart /> <span>Wishlist</span>
                {wishlistCount > 0 && <span className="count-badge">{wishlistCount}</span>}
              </Link>
            </li>
            <li>
              <Link to="/categories" onClick={() => setMenuOpen(false)}>
                <FaThLarge /> <span>Categories</span>
              </Link>
            </li>
            <li>
              <Link to="/cart" className="icon-link" onClick={() => setMenuOpen(false)}>
                <FaShoppingCart /> <span>Cart</span>
                {cartCount > 0 && <span className="count-badge">{cartCount}</span>}
              </Link>
            </li>
            <li>
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                <FaUser /> <span>Account</span>
              </Link>
            </li>
          </ul>

          {/* Hamburger Menu */}
          <div className={`hamburger ${menuOpen ? "active" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>
    </>
  );
}
