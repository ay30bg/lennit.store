// // import React, { useState, useContext } from "react";
// // import { Link, useNavigate } from "react-router-dom";
// // import { FaHeart, FaThLarge, FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";
// // import { CartContext } from "../context/CartContext";
// // import productsData from "../data/products.json";
// // import "../styles/navbar.css";

// // export default function Navbar() {
// //   const [menuOpen, setMenuOpen] = useState(false);
// //   const [searchInput, setSearchInput] = useState("");
// //   const [showSuggestions, setShowSuggestions] = useState(false);

// //   const { cart } = useContext(CartContext);
// //   const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

// //   const wishlistCount = 2;
// //   const navigate = useNavigate();

// //   // Filter products for suggestions
// //   const suggestions = productsData.filter((p) =>
// //     p.name.toLowerCase().includes(searchInput.toLowerCase())
// //   );

// //   const handleSearch = () => {
// //     if (searchInput.trim()) {
// //       navigate(`/search?q=${searchInput}`);
// //       setShowSuggestions(false);
// //     }
// //   };

// //   return (
// //     <>
// //       {/* Fullscreen Overlay Menu */}
// //       <div
// //         className={`nav-overlay ${menuOpen ? "active" : ""}`}
// //         onClick={() => setMenuOpen(false)}
// //       ></div>

// //       <nav className="navbar">
// //         <div className="navbar-container">
// //           {/* Logo */}
// //           <div className="logo">
// //             <Link to="/">Lennit</Link>
// //           </div>

// //           {/* Search Bar */}
// //           <div className="search-bar">
// //             <input
// //               type="text"
// //               placeholder="Search products..."
// //               value={searchInput}
// //               onChange={(e) => {
// //                 setSearchInput(e.target.value);
// //                 setShowSuggestions(true);
// //               }}
// //               onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} // delay so click works
// //               onKeyDown={(e) => e.key === "Enter" && handleSearch()}
// //             />
// //             <button onClick={handleSearch}>
// //               <FaSearch className="search-icon" />
// //             </button>

// //             {/* Suggestions Dropdown */}
// //             {showSuggestions && searchInput && (
// //               <div className="search-suggestions">
// //                 {suggestions.length > 0 ? (
// //                   suggestions.slice(0, 6).map((item) => (
// //                     <Link
// //                       key={item.id}
// //                       to={`/product/${item.id}`}
// //                       className="suggestion-item"
// //                       onClick={() => setShowSuggestions(false)}
// //                     >
// //                       <img src={item.image} alt={item.name} />
// //                       <span>{item.name}</span>
// //                     </Link>
// //                   ))
// //                 ) : (
// //                   <p className="no-results">No results found</p>
// //                 )}
// //               </div>
// //             )}
// //           </div>

// //           {/* Navigation Links */}
// //           <ul className={`nav-links fullscreen ${menuOpen ? "active" : ""}`}>
// //             <li>
// //               <Link
// //                 to="/wishlist"
// //                 className="icon-link"
// //                 onClick={() => setMenuOpen(false)}
// //               >
// //                 <FaHeart /> <span>Wishlist</span>
// //                 {wishlistCount > 0 && (
// //                   <span className="count-badge">{wishlistCount}</span>
// //                 )}
// //               </Link>
// //             </li>
// //             <li>
// //               <Link to="/categories" onClick={() => setMenuOpen(false)}>
// //                 <FaThLarge /> <span>Categories</span>
// //               </Link>
// //             </li>
// //             <li>
// //               <Link
// //                 to="/cart"
// //                 className="icon-link"
// //                 onClick={() => setMenuOpen(false)}
// //               >
// //                 <FaShoppingCart /> <span>Cart</span>
// //                 {cartCount > 0 && (
// //                   <span className="count-badge">{cartCount}</span>
// //                 )}
// //               </Link>
// //             </li>
// //             <li>
// //               <Link to="/login" onClick={() => setMenuOpen(false)}>
// //                 <FaUser /> <span>Account</span>
// //               </Link>
// //             </li>
// //           </ul>

// //           {/* Hamburger Menu */}
// //           <div
// //             className={`hamburger ${menuOpen ? "active" : ""}`}
// //             onClick={() => setMenuOpen(!menuOpen)}
// //           >
// //             <span></span>
// //             <span></span>
// //             <span></span>
// //           </div>
// //         </div>
// //       </nav>
// //     </>
// //   );
// // }

// import React, { useState, useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FaHeart, FaThLarge, FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";
// import { CartContext } from "../context/CartContext";
// import productsData from "../data/products.json";
// import "../styles/navbar.css";

// export default function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [searchInput, setSearchInput] = useState("");
//   const [showSuggestions, setShowSuggestions] = useState(false);

//   const { cart } = useContext(CartContext);
//   const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

//   const wishlistCount = 2;
//   const navigate = useNavigate();

//   // Filter products for suggestions
//   const suggestions = productsData.filter((p) =>
//     p.name.toLowerCase().includes(searchInput.toLowerCase())
//   );

//   const handleSearch = () => {
//     if (searchInput.trim()) {
//       navigate(`/search?q=${searchInput}`);
//       setShowSuggestions(false);
//     }
//   };

//   return (
//     <>
//       {/* Fullscreen Overlay Menu */}
//       <div
//         className={`nav-overlay ${menuOpen ? "active" : ""}`}
//         onClick={() => setMenuOpen(false)}
//       ></div>

//       <nav className="navbar">
//         <div className="navbar-container">
//           {/* Hamburger Menu (before logo in mobile) */}
//           <div
//             className={`hamburger ${menuOpen ? "active" : ""}`}
//             onClick={() => setMenuOpen(!menuOpen)}
//           >
//             <span></span>
//             <span></span>
//             <span></span>
//           </div>

//           {/* Logo */}
//           <div className="logo">
//             <Link to="/">Lennit</Link>
//           </div>

//           {/* Search Bar */}
//           <div className="search-bar">
//             <input
//               type="text"
//               placeholder="Search products..."
//               value={searchInput}
//               onChange={(e) => {
//                 setSearchInput(e.target.value);
//                 setShowSuggestions(true);
//               }}
//               onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
//               onKeyDown={(e) => e.key === "Enter" && handleSearch()}
//             />
//             <button onClick={handleSearch}>
//               <FaSearch className="search-icon" />
//             </button>

//             {/* Suggestions Dropdown */}
//             {showSuggestions && searchInput && (
//               <div className="search-suggestions">
//                 {suggestions.length > 0 ? (
//                   suggestions.slice(0, 6).map((item) => (
//                     <Link
//                       key={item.id}
//                       to={`/product/${item.id}`}
//                       className="suggestion-item"
//                       onClick={() => setShowSuggestions(false)}
//                     >
//                       <img src={item.image} alt={item.name} />
//                       <span>{item.name}</span>
//                     </Link>
//                   ))
//                 ) : (
//                   <p className="no-results">No results found</p>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* Navigation Links */}
//           <ul className={`nav-links fullscreen ${menuOpen ? "active" : ""}`}>
//             <li>
//               <Link
//                 to="/wishlist"
//                 className="icon-link"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 <FaHeart /> <span>Wishlist</span>
//                 {wishlistCount > 0 && (
//                   <span className="count-badge">{wishlistCount}</span>
//                 )}
//               </Link>
//             </li>
//             <li>
//               <Link to="/categories" onClick={() => setMenuOpen(false)}>
//                 <FaThLarge /> <span>Categories</span>
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/cart"
//                 className="icon-link"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 <FaShoppingCart /> <span>Cart</span>
//                 {cartCount > 0 && (
//                   <span className="count-badge">{cartCount}</span>
//                 )}
//               </Link>
//             </li>
//             <li>
//               <Link to="/login" onClick={() => setMenuOpen(false)}>
//                 <FaUser /> <span>Account</span>
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </nav>
//     </>
//   );
// }


import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaThLarge, FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";
import { CartContext } from "../context/CartContext";
import productsData from "../data/products.json";
import "../styles/navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { cart } = useContext(CartContext);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const wishlistCount = 2;
  const navigate = useNavigate();

  // Filter products for suggestions
  const suggestions = productsData.filter((p) =>
    p.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleSearch = () => {
    if (searchInput.trim()) {
      navigate(`/search?q=${searchInput}`);
      setShowSuggestions(false);
    }
  };

  return (
    <>
      {/* Fullscreen Overlay Menu */}
      <div
        className={`nav-overlay ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(false)}
      ></div>

      <nav className="navbar">
        <div className="navbar-container">
          {/* Left: Hamburger */}
          <div
            className={`hamburger ${menuOpen ? "active" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>

          {/* Center: Logo */}
          <div className="logo">
            <Link to="/">Lennit</Link>
          </div>

          {/* Right: User + Cart (only in mobile) */}
          <div className="mobile-icons">
            <Link to="/cart" className="icon-link">
              <FaShoppingCart />
              {cartCount > 0 && <span className="count-badge">{cartCount}</span>}
            </Link>
            <Link to="/login" className="icon-link">
              <FaUser />
            </Link>
          </div>

          {/* Search Bar */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search products..."
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                setShowSuggestions(true);
              }}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button onClick={handleSearch}>
              <FaSearch className="search-icon" />
            </button>

            {/* Suggestions Dropdown */}
            {showSuggestions && searchInput && (
              <div className="search-suggestions">
                {suggestions.length > 0 ? (
                  suggestions.slice(0, 6).map((item) => (
                    <Link
                      key={item.id}
                      to={`/product/${item.id}`}
                      className="suggestion-item"
                      onClick={() => setShowSuggestions(false)}
                    >
                      <img src={item.image} alt={item.name} />
                      <span>{item.name}</span>
                    </Link>
                  ))
                ) : (
                  <p className="no-results">No results found</p>
                )}
              </div>
            )}
          </div>

          {/* Navigation Links (desktop + fullscreen menu) */}
          <ul className={`nav-links fullscreen ${menuOpen ? "active" : ""}`}>
            <li>
              <Link
                to="/wishlist"
                className="icon-link"
                onClick={() => setMenuOpen(false)}
              >
                <FaHeart /> <span>Wishlist</span>
                {wishlistCount > 0 && (
                  <span className="count-badge">{wishlistCount}</span>
                )}
              </Link>
            </li>
            <li>
              <Link to="/categories" onClick={() => setMenuOpen(false)}>
                <FaThLarge /> <span>Categories</span>
              </Link>
            </li>
            <li>
              <Link
                to="/cart"
                className="icon-link"
                onClick={() => setMenuOpen(false)}
              >
                <FaShoppingCart /> <span>Cart</span>
                {cartCount > 0 && (
                  <span className="count-badge">{cartCount}</span>
                )}
              </Link>
            </li>
            <li>
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                <FaUser /> <span>Account</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
