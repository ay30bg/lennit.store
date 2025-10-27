// import React, { useEffect, useState } from "react";
// import { useLocation, Link } from "react-router-dom";
// import "../styles/orderConfirmation.css";

// export default function OrderConfirmation() {
//   const location = useLocation();
//   const [order, setOrder] = useState(null);

//   // ✅ Load order data: first from navigation, then from sessionStorage if missing
//   useEffect(() => {
//     const stateOrder = location.state;
//     if (stateOrder) {
//       setOrder(stateOrder);
//       sessionStorage.setItem("lastOrder", JSON.stringify(stateOrder));
//     } else {
//       const savedOrder = sessionStorage.getItem("lastOrder");
//       if (savedOrder) {
//         setOrder(JSON.parse(savedOrder));
//       }
//     }
//   }, [location.state]);

//   // 🚫 Prevent render errors
//   if (!order) {
//     return (
//       <div className="confirmation-container">
//         <div className="confirmation-card">
//           <h2>No order found 😕</h2>
//           <p>Please go back to the cart or checkout page to place an order.</p>
//           <Link to="/">
//             <button className="continue-btn">Go Home</button>
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   // ✅ Safe to destructure now
//   const DELIVERY_FEE = 7000;
//   const { shipping, total, items } = order;
//   const grandTotal = total + DELIVERY_FEE;

//   return (
//     <div className="confirmation-container">
//       <div className="confirmation-card">
//         <h2 className="success-title">✅ Order Placed Successfully!</h2>
//         <p className="success-subtext">
//           Thank you for shopping with us. Your order will be delivered soon.
//         </p>

//         {/* 📍 Shipping Section */}
//         <div className="confirmation-section">
//           <h3>📍 Shipping To</h3>
//           <p><strong>{shipping.fullName}</strong></p>
//           <p>{shipping.address}, {shipping.city}, {shipping.postalCode}</p>
//           {shipping.phone && <p>📞 {shipping.phone}</p>}
//         </div>

//         {/* 🛒 Order Summary */}
//         <div className="confirmation-section">
//           <h3>🛒 Order Summary</h3>
//           <ul className="order-items">
//             {items.map((item) => (
//               <li key={`${item.id}-${item.variation || "default"}`} className="order-item">
//                 <span>
//                   {item.name} {item.variation ? `(${item.variation})` : ""} × {item.qty}
//                 </span>
//                 <span className="item-price">
//                   ₦{(item.price * item.qty).toLocaleString()}
//                 </span>
//               </li>
//             ))}
//           </ul>

//           {/* 💰 Breakdown */}
//           <div className="order-breakdown">
//             <p>
//               Items Subtotal: <span>₦{total.toLocaleString()}</span>
//             </p>
//             <p>
//               Delivery Fee: <span>₦{DELIVERY_FEE.toLocaleString()}</span>
//             </p>
//             <h3 className="order-total">
//               Total: <span>₦{grandTotal.toLocaleString()}</span>
//             </h3>
//           </div>
//         </div>

//         <Link to="/">
//           <button className="continue-btn">Continue Shopping</button>
//         </Link>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import "../styles/orderConfirmation.css";

export default function OrderConfirmation() {
  const location = useLocation();
  const [order, setOrder] = useState(null);
  const DELIVERY_FEE = 7000;

  // ✅ Load order data (from navigation or sessionStorage)
  useEffect(() => {
    const stateOrder = location.state;
    console.log("🔍 location.state:", stateOrder);

    if (stateOrder) {
      setOrder(stateOrder);
      sessionStorage.setItem("lastOrder", JSON.stringify(stateOrder));
    } else {
      const savedOrder = sessionStorage.getItem("lastOrder");
      console.log("💾 sessionStorage order:", savedOrder);
      if (savedOrder) {
        setOrder(JSON.parse(savedOrder));
      }
    }
  }, [location.state]);

  // ✅ Handle no order found
  if (!order || !order.shipping || !order.items) {
    return (
      <div className="confirmation-container">
        <div className="confirmation-card">
          <h2>No order found 😕</h2>
          <p>Please go back to the cart or checkout page to place an order.</p>
          <Link to="/">
            <button className="continue-btn">Go Home</button>
          </Link>
        </div>
      </div>
    );
  }

  // ✅ Safe destructuring
  const { shipping, total, items } = order;
  const grandTotal = total + DELIVERY_FEE;

  return (
    <div className="confirmation-container">
      <div className="confirmation-card">
        <h2 className="success-title">✅ Order Placed Successfully!</h2>
        <p className="success-subtext">
          Thank you for shopping with us. Your order will be delivered soon.
        </p>

        {/* 📦 Shipping Info */}
        <div className="confirmation-section">
          <h3>📍 Shipping To</h3>
          <p><strong>{shipping.fullName}</strong></p>
          <p>{shipping.address}, {shipping.city}, {shipping.postalCode}</p>
          {shipping.phone && <p>📞 {shipping.phone}</p>}
        </div>

        {/* 🛍️ Order Summary */}
        <div className="confirmation-section">
          <h3>🛒 Order Summary</h3>
          <ul className="order-items">
            {items.map((item) => (
              <li key={`${item.id}-${item.variation || "default"}`} className="order-item">
                <span>
                  {item.name} {item.variation ? `(${item.variation})` : ""} × {item.qty}
                </span>
                <span className="item-price">
                  ₦{(item.price * item.qty).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>

          {/* 💰 Breakdown */}
          <div className="order-breakdown">
            <p>
              Items Subtotal: <span>₦{total.toLocaleString()}</span>
            </p>
            <p>
              Delivery Fee: <span>₦{DELIVERY_FEE.toLocaleString()}</span>
            </p>
            <h3 className="order-total">
              Total: <span>₦{grandTotal.toLocaleString()}</span>
            </h3>
          </div>
        </div>

        <Link to="/">
          <button className="continue-btn">Continue Shopping</button>
        </Link>
      </div>
    </div>
  );
}
