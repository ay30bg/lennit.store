// import React, { useContext, useState } from "react";
// import { CartContext } from "../context/CartContext";
// import { useNavigate } from "react-router-dom";
// import "../styles/checkout.css";

// export default function Checkout() {
//   const { cart } = useContext(CartContext);
//   const [shipping, setShipping] = useState({
//     fullName: "",
//     address: "",
//     city: "",
//     postalCode: "",
//     phone: "",
//   });

//   const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
//   const navigate = useNavigate();

//   const handleInputChange = (e) => {
//     setShipping({ ...shipping, [e.target.name]: e.target.value });
//   };

//   const handlePlaceOrder = () => {
//     if (!shipping.fullName || !shipping.address || !shipping.city) {
//       alert("Please fill in all required shipping details.");
//       return;
//     }

//     // Redirect to confirmation page with order details
//     navigate("/order-confirmation", {
//       state: {
//         shipping,
//         total,
//         items: cart,
//       },
//     });
//   };

//   return (
//     <div className="checkout-container">
//       {cart.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <>
//           {/* LEFT SECTION */}
//           <div className="checkout-left">
//             {/* SHIPPING FORM */}
//             <div className="checkout-box">
//               <h2>Shipping Details</h2>
//               <form className="shipping-form">
//                 <input
//                   type="text"
//                   name="fullName"
//                   placeholder="Full Name"
//                   value={shipping.fullName}
//                   onChange={handleInputChange}
//                   required
//                 />
//                 <input
//                   type="text"
//                   name="address"
//                   placeholder="Street Address"
//                   value={shipping.address}
//                   onChange={handleInputChange}
//                   required
//                 />
//                 <input
//                   type="text"
//                   name="city"
//                   placeholder="City"
//                   value={shipping.city}
//                   onChange={handleInputChange}
//                   required
//                 />
//                 <input
//                   type="text"
//                   name="postalCode"
//                   placeholder="Postal Code"
//                   value={shipping.postalCode}
//                   onChange={handleInputChange}
//                 />
//                 <input
//                   type="text"
//                   name="phone"
//                   placeholder="Phone Number"
//                   value={shipping.phone}
//                   onChange={handleInputChange}
//                 />
//               </form>
//             </div>

//             {/* REVIEW ORDER */}
//             <div className="checkout-box">
//               <h2>Review Your Order</h2>
//               <div className="checkout-items">
//                 {cart.map((item) => (
//                   <div key={item.id} className="checkout-item">
//                     <div className="checkout-item-info">
//                       <span className="item-name">{item.name}</span>
//                       <span className="item-qty">Qty: {item.qty}</span>
//                     </div>
//                     <span className="item-price">
//                       ₦{(item.price * item.qty).toLocaleString()}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* RIGHT SECTION */}
//           <div className="checkout-summary">
//             <h3>Order Summary</h3>
//             <p>
//               Items: <span>₦{total.toLocaleString()}</span>
//             </p>
//             <p>
//               Delivery: <span>₦7000.00</span>
//             </p>
//             <h3 className="summary-total">
//               Order Total: <span>₦{total.toLocaleString()}</span>
//             </h3>
//             <button className="place-order-btn" onClick={handlePlaceOrder}>
//               Place your order
//             </button>
//             <div className="secure-checkout">🔒 Secure checkout guaranteed</div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }


import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "../styles/checkout.css";

export default function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const [shipping, setShipping] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    if (!shipping.fullName || !shipping.address || !shipping.city) {
      alert("Please fill in all required shipping details.");
      return;
    }

    const orderData = {
      shipping,
      total,
      items: cart,
    };

    // ✅ Save order to sessionStorage
    sessionStorage.setItem("lastOrder", JSON.stringify(orderData));

    // ✅ Clear cart (state + localStorage handled in context)
    clearCart();

    // Redirect to confirmation page
    navigate("/order-confirmation", { state: orderData });
  };

  return (
    <div className="checkout-container">
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {/* LEFT SECTION */}
          <div className="checkout-left">
            {/* SHIPPING FORM */}
            <div className="checkout-box">
              <h2>Shipping Details</h2>
              <form className="shipping-form">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={shipping.fullName}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Street Address"
                  value={shipping.address}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={shipping.city}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="postalCode"
                  placeholder="Postal Code"
                  value={shipping.postalCode}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={shipping.phone}
                  onChange={handleInputChange}
                />
              </form>
            </div>

            {/* REVIEW ORDER */}
            <div className="checkout-box">
              <h2>Review Your Order</h2>
              <div className="checkout-items">
                {cart.map((item) => (
                  <div key={item.id} className="checkout-item">
                    <div className="checkout-item-info">
                      <span className="item-name">{item.name}</span>
                      <span className="item-qty">Qty: {item.qty}</span>
                    </div>
                    <span className="item-price">
                      ₦{(item.price * item.qty).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="checkout-summary">
            <h3>Order Summary</h3>
            <p>
              Items: <span>₦{total.toLocaleString()}</span>
            </p>
            <p>
              Delivery: <span>₦7000.00</span>
            </p>
            <h3 className="summary-total">
              Order Total: <span>₦{total.toLocaleString()}</span>
            </h3>
            <button className="place-order-btn" onClick={handlePlaceOrder}>
              Place your order
            </button>
            <div className="secure-checkout">🔒 Secure checkout guaranteed</div>
          </div>
        </>
      )}
    </div>
  );
}
