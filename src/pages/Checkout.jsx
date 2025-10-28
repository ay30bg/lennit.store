// // import React, { useContext, useState } from "react";
// // import { CartContext } from "../context/CartContext";
// // import { useNavigate } from "react-router-dom";
// // import "../styles/checkout.css";

// // export default function Checkout() {
// //   const { cart, clearCart } = useContext(CartContext);
// //   const [shipping, setShipping] = useState({
// //     fullName: "",
// //     address: "",
// //     city: "",
// //     postalCode: "",
// //     phone: "",
// //   });

// //   const DELIVERY_FEE = 7000;
// //   const itemsTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
// //   const orderTotal = itemsTotal + DELIVERY_FEE;
// //   const navigate = useNavigate();

// //   const handleInputChange = (e) => {
// //     setShipping({ ...shipping, [e.target.name]: e.target.value });
// //   };

// //   const handlePlaceOrder = () => {
// //     if (!shipping.fullName || !shipping.address || !shipping.city) {
// //       alert("Please fill in all required shipping details.");
// //       return;
// //     }

// //     const orderData = {
// //       shipping,
// //       items: cart, // ✅ includes variation
// //       totals: {
// //         itemsTotal,
// //         delivery: DELIVERY_FEE,
// //         orderTotal,
// //       },
// //     };

// //     // ✅ Save order to sessionStorage
// //     sessionStorage.setItem("lastOrder", JSON.stringify(orderData));

// //     // ✅ Clear cart
// //     clearCart();

// //     // Redirect to confirmation page
// //     navigate("/order-confirmation", { state: orderData });
// //   };

// //   return (
// //     <div className="checkout-container">
// //       {cart.length === 0 ? (
// //         <p>Your cart is empty.</p>
// //       ) : (
// //         <>
// //           {/* LEFT SECTION */}
// //           <div className="checkout-left">
// //             {/* SHIPPING FORM */}
// //             <div className="checkout-box">
// //               <h2>Shipping Details</h2>
// //               <form className="shipping-form">
// //                 <input
// //                   type="text"
// //                   name="fullName"
// //                   placeholder="Full Name"
// //                   value={shipping.fullName}
// //                   onChange={handleInputChange}
// //                   required
// //                 />
// //                 <input
// //                   type="text"
// //                   name="address"
// //                   placeholder="Street Address"
// //                   value={shipping.address}
// //                   onChange={handleInputChange}
// //                   required
// //                 />
// //                 <input
// //                   type="text"
// //                   name="city"
// //                   placeholder="City"
// //                   value={shipping.city}
// //                   onChange={handleInputChange}
// //                   required
// //                 />
// //                 <input
// //                   type="text"
// //                   name="postalCode"
// //                   placeholder="Postal Code"
// //                   value={shipping.postalCode}
// //                   onChange={handleInputChange}
// //                 />
// //                 <input
// //                   type="text"
// //                   name="phone"
// //                   placeholder="Phone Number"
// //                   value={shipping.phone}
// //                   onChange={handleInputChange}
// //                 />
// //               </form>
// //             </div>

// //             {/* REVIEW ORDER */}
// //             <div className="checkout-box">
// //               <h2>Review Your Order</h2>
// //               <div className="checkout-items">
// //                 {cart.map((item) => (
// //                   <div
// //                     key={`${item.id}-${item.variation || "default"}`}
// //                     className="checkout-item"
// //                   >
// //                     <div className="checkout-item-info">
// //                       <span className="item-name">
// //                         {item.name}
// //                         {item.variation && (
// //                           <span className="item-variation"> – {item.variation}</span>
// //                         )}
// //                       </span>
// //                       <span className="item-qty">Qty: {item.qty}</span>
// //                     </div>
// //                     <span className="item-price">
// //                       ₦{(item.price * item.qty).toLocaleString()}
// //                     </span>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //           </div>

// //           {/* RIGHT SECTION */}
// //           <div className="checkout-summary">
// //             <h3>Order Summary</h3>
// //             <p>
// //               Items: <span>₦{itemsTotal.toLocaleString()}</span>
// //             </p>
// //             <p>
// //               Delivery: <span>₦{DELIVERY_FEE.toLocaleString()}</span>
// //             </p>
// //             <h3 className="summary-total">
// //               Order Total: <span>₦{orderTotal.toLocaleString()}</span>
// //             </h3>
// //             <button className="place-order-btn" onClick={handlePlaceOrder}>
// //               Place your order
// //             </button>
// //             <div className="secure-checkout">🔒 Secure checkout guaranteed</div>
// //           </div>
// //         </>
// //       )}
// //     </div>
// //   );
// // }

// import React, { useContext, useState } from "react";
// import { CartContext } from "../context/CartContext";
// import { useNavigate } from "react-router-dom";
// import PaystackPop from "@paystack/inline-js";   // <-- Paystack SDK
// import "../styles/checkout.css";

// export default function Checkout() {
//   const { cart, clearCart } = useContext(CartContext);
//   const navigate = useNavigate();

//   const [shipping, setShipping] = useState({
//     fullName: "",
//     address: "",
//     city: "",
//     postalCode: "",
//     phone: "",
//   });

//   const DELIVERY_FEE = 7000;
//   const itemsTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
//   const orderTotal = itemsTotal + DELIVERY_FEE; // in NGN

//   // ---- INPUT HANDLER -------------------------------------------------
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setShipping({ ...shipping, [e.target.name]: e.target.value });
//   };

//   // ---- FORM VALIDATION -----------------------------------------------
//   const validateForm = () => {
//     const required = ["fullName", "address", "city"];
//     for (const field of required) {
//       if (!shipping[field as keyof typeof shipping]) {
//         alert(`Please fill in ${field.replace(/([A-Z])/g, " $1").toLowerCase()}.`);
//         return false;
//       }
//     }
//     // simple phone validation (10-11 digits)
//     if (!/^\d{10,11}$/.test(shipping.phone.replace(/\D/g, ""))) {
//       alert("Please enter a valid phone number (10-11 digits).");
//       return false;
//     }
//     return true;
//   };

//   // ---- PAYSTACK PAYMENT ----------------------------------------------
//   const initiatePaystack = () => {
//     if (!validateForm()) return;

//     const orderData = {
//       shipping,
//       items: cart,
//       totals: { itemsTotal, delivery: DELIVERY_FEE, orderTotal },
//     };

//     // ---- 1. Save order early (so we have it even if payment fails) ----
//     sessionStorage.setItem("lastOrder", JSON.stringify(orderData));

//     // ---- 2. Open Paystack ------------------------------------------------
//     const paystack = new PaystackPop();

//     paystack.newTransaction({
//       key: "pk_live_15b47c33f91d11f55a5fb4e68652bddda6cb44a6",           // <-- replace
//       email: shipping.fullName.split(" ")[0] + "@example.com", // you can collect real email
//       amount: orderTotal * 100,                     // Paystack expects kobo
//       currency: "NGN",
//       ref: `order_${Date.now()}`,                   // unique reference
//       metadata: { orderData: JSON.stringify(orderData) },

//       // ---- SUCCESS -------------------------------------------------------
//       onSuccess: (transaction: any) => {
//         // transaction.reference contains the Paystack reference
//         // You can verify on your backend here if you want

//         clearCart();                                 // empty cart
//         navigate("/order-confirmation", { state: { ...orderData, paymentRef: transaction.reference } });
//       },

//       // ---- USER CLOSES POPUP --------------------------------------------
//       onClose: () => {
//         alert("Payment was cancelled. You can try again.");
//         // stay on checkout page
//       },
//     });
//   };

//   // ------------------------------------------------------------------------
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
//               <form className="shipping-form" onSubmit={(e) => e.preventDefault()}>
//                 <input
//                   type="text"
//                   name="fullName"
//                   placeholder="Full Name *"
//                   value={shipping.fullName}
//                   onChange={handleInputChange}
//                   required
//                 />
//                 <input
//                   type="text"
//                   name="address"
//                   placeholder="Street Address *"
//                   value={shipping.address}
//                   onChange={handleInputChange}
//                   required
//                 />
//                 <input
//                   type="text"
//                   name="city"
//                   placeholder="City *"
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
//                   placeholder="Phone Number *"
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
//                   <div
//                     key={`${item.id}-${item.variation || "default"}`}
//                     className="checkout-item"
//                   >
//                     <div className="checkout-item-info">
//                       <span className="item-name">
//                         {item.name}
//                         {item.variation && (
//                           <span className="item-variation"> – {item.variation}</span>
//                         )}
//                       </span>
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
//               Items: <span>₦{itemsTotal.toLocaleString()}</span>
//             </p>
//             <p>
//               Delivery: <span>₦{DELIVERY_FEE.toLocaleString()}</span>
//             </p>
//             <h3 className="summary-total">
//               Order Total: <span>₦{orderTotal.toLocaleString()}</span>
//             </h3>

//             {/* PAYSTACK BUTTON */}
//             <button className="place-order-btn" onClick={initiatePaystack}>
//               Pay with Paystack
//             </button>

//             <div className="secure-checkout">Secure checkout guaranteed</div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import PaystackPop from "@paystack/inline-js"; // ✅ Ensure this is installed: npm i @paystack/inline-js
import "../styles/checkout.css";

interface ShippingDetails {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
}

export default function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [shipping, setShipping] = useState<ShippingDetails>({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
  });

  const DELIVERY_FEE = 7000;
  const itemsTotal = cart.reduce(
    (sum: number, item: any) => sum + item.price * item.qty,
    0
  );
  const orderTotal = itemsTotal + DELIVERY_FEE; // NGN

  // ---- INPUT HANDLER -------------------------------------------------
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  // ---- FORM VALIDATION -----------------------------------------------
  const validateForm = () => {
    const requiredFields = ["fullName", "address", "city"] as const;
    for (const field of requiredFields) {
      if (!shipping[field]) {
        alert(`Please fill in your ${field.replace(/([A-Z])/g, " $1").toLowerCase()}.`);
        return false;
      }
    }

    // simple phone validation (10–11 digits)
    const cleanedPhone = shipping.phone.replace(/\D/g, "");
    if (!/^\d{10,11}$/.test(cleanedPhone)) {
      alert("Please enter a valid phone number (10–11 digits).");
      return false;
    }

    return true;
  };

  // ---- PAYSTACK PAYMENT ----------------------------------------------
  const initiatePaystack = () => {
    if (!validateForm()) return;

    const orderData = {
      shipping,
      items: cart,
      totals: { itemsTotal, delivery: DELIVERY_FEE, orderTotal },
    };

    // Save order locally before payment attempt
    sessionStorage.setItem("lastOrder", JSON.stringify(orderData));

    const paystack = new PaystackPop();

    paystack.newTransaction({
      key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || "pk_test_xxxxxxxxxxxxxxxx", // ✅ Use .env
      email: `${shipping.fullName.split(" ")[0] || "customer"}@example.com`,
      amount: orderTotal * 100, // Paystack expects amount in kobo
      currency: "NGN",
      ref: `order_${Date.now()}`,
      metadata: { orderData },

      // ---- SUCCESS ---------------------------------------------------
      onSuccess: (transaction: any) => {
        clearCart();

        navigate("/order-confirmation", {
          state: { ...orderData, paymentRef: transaction.reference },
        });
      },

      // ---- USER CLOSES POPUP ----------------------------------------
      onCancel: () => {
        alert("Payment was cancelled. You can try again.");
      },
    });
  };

  // ------------------------------------------------------------------------
  return (
    <div className="checkout-container">
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="checkout-content">
          {/* LEFT SECTION */}
          <div className="checkout-left">
            {/* SHIPPING FORM */}
            <div className="checkout-box">
              <h2>Shipping Details</h2>
              <form className="shipping-form" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name *"
                  value={shipping.fullName}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Street Address *"
                  value={shipping.address}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City *"
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
                  placeholder="Phone Number *"
                  value={shipping.phone}
                  onChange={handleInputChange}
                  required
                />
              </form>
            </div>

            {/* REVIEW ORDER */}
            <div className="checkout-box">
              <h2>Review Your Order</h2>
              <div className="checkout-items">
                {cart.map((item: any) => (
                  <div
                    key={`${item.id}-${item.variation || "default"}`}
                    className="checkout-item"
                  >
                    <div className="checkout-item-info">
                      <span className="item-name">
                        {item.name}
                        {item.variation && (
                          <span className="item-variation"> – {item.variation}</span>
                        )}
                      </span>
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
              Items: <span>₦{itemsTotal.toLocaleString()}</span>
            </p>
            <p>
              Delivery: <span>₦{DELIVERY_FEE.toLocaleString()}</span>
            </p>
            <h3 className="summary-total">
              Order Total: <span>₦{orderTotal.toLocaleString()}</span>
            </h3>

            {/* PAYSTACK BUTTON */}
            <button className="place-order-btn" onClick={initiatePaystack}>
              Pay with Paystack
            </button>

            <div className="secure-checkout">Secure checkout guaranteed</div>
          </div>
        </div>
      )}
    </div>
  );
}
