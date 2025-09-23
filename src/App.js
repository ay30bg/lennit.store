// import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
// import Home from "./pages/Home";
// import ProductDetails from "./pages/ProductDetails";
// import Wishlist from "./pages/Wishlist"; // new import
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import Cart from "./pages/Cart";
// import Checkout from "./pages/Checkout";
// import OrderConfirmation from "./pages/OrderConfirmation";  
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import ForgotPassword from "./pages/forgot-password";
// import { CartProvider } from "./context/CartContext"; 
// import { WishlistProvider } from "./context/WishlistContext"; 

// function App() {
//   function AppContent() {
//     const location = useLocation();
//     const isLoginPage = location.pathname === "/login";

//     return (
//       <div className="app-wrapper"> 
//         {!isLoginPage && <Navbar />}
//         <main>
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/product/:id" element={<ProductDetails />} />
//             <Route path="/wishlist" element={<Wishlist />} /> {/* new route */}
//             <Route path="/cart" element={<Cart />} />
//             <Route path="/checkout" element={<Checkout />} />
//             <Route path="/order-confirmation" element={<OrderConfirmation />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/signup" element={<Signup />} />
//             <Route path="/forgot-password" element={<ForgotPassword />} />
//           </Routes>
//         </main>
//         {!isLoginPage && <Footer />}
//       </div>
//     );
//   }

//   return (
//     <CartProvider>
//       <WishlistProvider> {/* wrap app with WishlistProvider */}
//         <Router>
//           <AppContent />
//         </Router>
//       </WishlistProvider>
//     </CartProvider>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from "./pages/Wishlist";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";  
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ProductsPage from "./pages/ProductsPage";
import { CartProvider } from "./context/CartContext"; 
import { WishlistProvider } from "./context/WishlistContext"; 

function App() {
  function AppContent() {
    const location = useLocation();
    // Include /signup and /forgot-password in the condition
    const isAuthPage = ["/login", "/signup", "/forgot-password"].includes(location.pathname);

    return (
      <div className="app-wrapper"> 
        {!isAuthPage && <Navbar />}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/products" element={<ProductsPage />} />
          </Routes>
        </main>
        {!isAuthPage && <Footer />}
      </div>
    );
  }

  return (
    <CartProvider>
      <WishlistProvider>
        <Router>
          <AppContent />
        </Router>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;