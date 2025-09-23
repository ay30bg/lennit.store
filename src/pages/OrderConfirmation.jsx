import React from "react";
import { useLocation, Link } from "react-router-dom";
import "../styles/orderConfirmation.css";

export default function OrderConfirmation() {
  const location = useLocation();
  const { shipping, total, items } = location.state || {};

  if (!shipping) {
    return <p>No order found.</p>;
  }

  return (
    <div className="confirmation-container">
      <div className="confirmation-card">
        <h2 className="success-title">✅ Order Placed Successfully!</h2>
        <p className="success-subtext">
          Thank you for shopping with us. Your order will be delivered soon.
        </p>

        <div className="confirmation-section">
          <h3>📍 Shipping To</h3>
          <p><strong>{shipping.fullName}</strong></p>
          <p>{shipping.address}, {shipping.city}, {shipping.postalCode}</p>
          <p>📞 {shipping.phone}</p>
        </div>

        <div className="confirmation-section">
          <h3>🛒 Order Summary</h3>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                {item.name} (x{item.qty})  
                <span className="item-price">
                  ₦{(item.price * item.qty).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
          <h3 className="order-total">
            Total: ₦{total.toLocaleString()}
          </h3>
        </div>

        <Link to="/">
          <button className="continue-btn">Continue Shopping</button>
        </Link>
      </div>
    </div>
  );
}
