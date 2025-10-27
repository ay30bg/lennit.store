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

import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import "../styles/orderConfirmation.css";

export default function OrderConfirmation() {
  const location = useLocation();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // 1️⃣ Get order data from navigation or sessionStorage
    const stateOrder = location.state;
    if (stateOrder) {
      setOrder(stateOrder);
      sessionStorage.setItem("lastOrder", JSON.stringify(stateOrder));
    } else {
      const savedOrder = sessionStorage.getItem("lastOrder");
      if (savedOrder) setOrder(JSON.parse(savedOrder));
    }
  }, [location.state]);

  if (!order) {
    return (
      <div className="order-empty">
        <h2>No order found</h2>
        <p>Looks like you haven’t placed an order yet.</p>
        <Link to="/" className="btn-home">Back to Shop</Link>
      </div>
    );
  }

  const { shipping, items, totals } = order;

  return (
    <div className="order-confirmation-container">
      <div className="order-success">
        <div className="success-icon">✅</div>
        <h2>Order Confirmed!</h2>
        <p>Thank you, <strong>{shipping.fullName}</strong>! Your order has been placed successfully.</p>
        <p className="order-id">
          (Your order reference: <strong>#{Math.floor(Math.random() * 100000)}</strong>)
        </p>
      </div>

      <div className="order-summary-section">
        {/* SHIPPING DETAILS */}
        <div className="order-box">
          <h3>Shipping Information</h3>
          <ul>
            <li><strong>Name:</strong> {shipping.fullName}</li>
            <li><strong>Address:</strong> {shipping.address}, {shipping.city}</li>
            {shipping.postalCode && <li><strong>Postal Code:</strong> {shipping.postalCode}</li>}
            {shipping.phone && <li><strong>Phone:</strong> {shipping.phone}</li>}
          </ul>
        </div>

        {/* ORDER ITEMS */}
        <div className="order-box">
          <h3>Items Ordered</h3>
          <div className="order-items">
            {items.map((item) => (
              <div key={item.id} className="order-item">
                <div className="item-details">
                  <span className="item-name">{item.name}</span>
                  <span className="item-qty">Qty: {item.qty}</span>
                </div>
                <div className="item-price">
                  ₦{(item.price * item.qty).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TOTAL SUMMARY */}
        <div className="order-box">
          <h3>Payment Summary</h3>
          <p>Items Total: <span>₦{totals.itemsTotal.toLocaleString()}</span></p>
          <p>Delivery Fee: <span>₦{totals.delivery.toLocaleString()}</span></p>
          <h3 className="total">
            Order Total: <span>₦{totals.orderTotal.toLocaleString()}</span>
          </h3>
        </div>
      </div>

      <div className="order-actions">
        <Link to="/" className="btn-home">Back to Shop</Link>
      </div>
    </div>
  );
}
