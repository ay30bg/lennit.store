// // import React from "react";
// // import { useLocation, Link } from "react-router-dom";
// // import "../styles/orderConfirmation.css";

// // export default function OrderConfirmation() {
// //   const location = useLocation();
// //   const { shipping, total, items } = location.state || {};

// //   if (!shipping) {
// //     return <p>No order found.</p>;
// //   }

// //   return (
// //     <div className="confirmation-container">
// //       <div className="confirmation-card">
// //         <h2 className="success-title">Order Placed Successfully!</h2>
// //         <p className="success-subtext">
// //           Thank you for shopping with us. Your order will be delivered soon.
// //         </p>

// //         <div className="confirmation-section">
// //           <h3>📍 Shipping To</h3>
// //           <p><strong>{shipping.fullName}</strong></p>
// //           <p>{shipping.address}, {shipping.city}, {shipping.postalCode}</p>
// //           <p>📞 {shipping.phone}</p>
// //         </div>

// //         <div className="confirmation-section">
// //           <h3>🛒 Order Summary</h3>
// //           <ul>
// //             {items.map((item) => (
// //               <li key={item.id}>
// //                 {item.name} (x{item.qty})  
// //                 <span className="item-price">
// //                   ₦{(item.price * item.qty).toLocaleString()}
// //                 </span>
// //               </li>
// //             ))}
// //           </ul>
// //           <h3 className="order-total">
// //             Total: ₦{total.toLocaleString()}
// //           </h3>
// //         </div>

// //         <Link to="/">
// //           <button className="continue-btn">Continue Shopping</button>
// //         </Link>
// //       </div>
// //     </div>
// //   );
// // }

// import React, { useEffect, useState } from "react";
// import { useLocation, Link } from "react-router-dom";
// import "../styles/orderConfirmation.css";

// export default function OrderConfirmation() {
//   const location = useLocation();
//   const [order, setOrder] = useState(location.state);

//   // ✅ Load from sessionStorage if no state (after refresh)
//   useEffect(() => {
//     if (!order) {
//       const savedOrder = sessionStorage.getItem("lastOrder");
//       if (savedOrder) {
//         setOrder(JSON.parse(savedOrder));
//       }
//     }
//   }, [order]);

//   if (!order) {
//     return <p>No order found.</p>;
//   }

//   const { shipping, total, items } = order;

//   return (
//     <div className="confirmation-container">
//       <div className="confirmation-card">
//         <h2 className="success-title">Order Placed Successfully!</h2>
//         <p className="success-subtext">
//           Thank you for shopping with us. Your order will be delivered soon.
//         </p>

//         <div className="confirmation-section">
//           <h3>📍 Shipping To</h3>
//           <p><strong>{shipping.fullName}</strong></p>
//           <p>{shipping.address}, {shipping.city}, {shipping.postalCode}</p>
//           <p>📞 {shipping.phone}</p>
//         </div>

//         <div className="confirmation-section">
//           <h3>🛒 Order Summary</h3>
//           <ul>
//             {items.map((item) => (
//               <li key={`${item.id}-${item.variation || "default"}`}>
//                 {item.name} {item.variation ? `(${item.variation})` : ""} (x{item.qty})
//                 <span className="item-price">
//                   ₦{(item.price * item.qty).toLocaleString()}
//                 </span>
//               </li>
//             ))}
//           </ul>
//           <h3 className="order-total">
//             Total: ₦{total.toLocaleString()}
//           </h3>
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
  const [order, setOrder] = useState(location.state || null);

  // Save to sessionStorage
  useEffect(() => {
    if (order) sessionStorage.setItem("lastOrder", JSON.stringify(order));
  }, [order]);

  // Recover from sessionStorage
  useEffect(() => {
    if (!order) {
      const saved = sessionStorage.getItem("lastOrder");
      if (saved) setOrder(JSON.parse(saved));
    }
  }, [order]);

  if (!order) {
    return (
      <div className="confirmation-fallback">
        <p>No order found.</p>
        <Link to="/">
          <button className="continue-btn">Go Back Home</button>
        </Link>
      </div>
    );
  }

  const { shipping, items, totals, orderId, date } = order;

  return (
    <div className="confirmation-page">
      <div className="confirmation-card">
        <div className="success-icon">✅</div>
        <h2 className="success-title">Order Placed Successfully!</h2>
        <p className="success-subtext">
          Thank you for your purchase! Your order will be delivered soon.
        </p>

        {/* Order Details */}
        <div className="confirmation-details">
          <div className="detail-block">
            <h3>📦 Order Details</h3>
            <p><strong>Order ID:</strong> {orderId || "N/A"}</p>
            <p><strong>Date:</strong> {date ? new Date(date).toLocaleString() : "Today"}</p>
          </div>

          <div className="detail-block">
            <h3>📍 Shipping Information</h3>
            <p><strong>{shipping?.fullName}</strong></p>
            <p>{shipping?.address}</p>
            <p>{shipping?.city}, {shipping?.postalCode}</p>
            <p>📞 {shipping?.phone || "Not provided"}</p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="confirmation-summary">
          <h3>🛒 Items Ordered</h3>
          <ul className="item-list">
            {items?.map((item, i) => (
              <li key={i} className="item-row">
                <div className="item-info">
                  <span className="item-name">{item.name}</span>
                  {item.variation && (
                    <span className="item-variation">({item.variation})</span>
                  )}
                  <span className="item-qty">x{item.qty}</span>
                </div>
                <span className="item-price">
                  ₦{(item.price * item.qty).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>

          <div className="price-summary">
            <p>
              <span>Subtotal</span>
              <span>₦{totals?.itemsTotal?.toLocaleString()}</span>
            </p>
            <p>
              <span>Delivery Fee</span>
              <span>₦{totals?.delivery?.toLocaleString()}</span>
            </p>
            <h3 className="order-total">
              <span>Total</span>
              <span>₦{totals?.orderTotal?.toLocaleString()}</span>
            </h3>
          </div>
        </div>

        <div className="confirmation-actions">
          <Link to="/">
            <button className="continue-btn">Continue Shopping</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

