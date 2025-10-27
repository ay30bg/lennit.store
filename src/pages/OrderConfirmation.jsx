// import React, { useEffect, useState } from "react";
// import { useLocation, Link } from "react-router-dom";
// import "../styles/orderConfirmation.css";

// export default function OrderConfirmation() {
//   const location = useLocation();
//   const [order, setOrder] = useState(null);

//   useEffect(() => {
//     // 1️⃣ Get order data from navigation or sessionStorage
//     const stateOrder = location.state;
//     if (stateOrder) {
//       setOrder(stateOrder);
//       sessionStorage.setItem("lastOrder", JSON.stringify(stateOrder));
//     } else {
//       const savedOrder = sessionStorage.getItem("lastOrder");
//       if (savedOrder) setOrder(JSON.parse(savedOrder));
//     }
//   }, [location.state]);

//   if (!order) {
//     return (
//       <div className="order-empty">
//         <h2>No order found</h2>
//         <p>Looks like you haven’t placed an order yet.</p>
//         <Link to="/" className="btn-home">Back to Shop</Link>
//       </div>
//     );
//   }

//   const { shipping, items, totals } = order;

//   return (
//     <div className="order-confirmation-container">
//       <div className="order-success">
//         <h2>Order Confirmed!</h2>
//         <p>Thank you, <strong>{shipping.fullName}</strong>! Your order has been placed successfully.</p>
//         <p className="order-id">
//           (Your order reference: <strong>#{Math.floor(Math.random() * 100000)}</strong>)
//         </p>
//       </div>

//       <div className="order-summary-section">
//         {/* SHIPPING DETAILS */}
//         <div className="order-box">
//           <h3>Shipping Information</h3>
//           <ul>
//             <li><strong>Name:</strong> {shipping.fullName}</li>
//             <li><strong>Address:</strong> {shipping.address}, {shipping.city}</li>
//             {shipping.postalCode && <li><strong>Postal Code:</strong> {shipping.postalCode}</li>}
//             {shipping.phone && <li><strong>Phone:</strong> {shipping.phone}</li>}
//           </ul>
//         </div>

//         {/* ORDER ITEMS */}
//         <div className="order-box">
//           <h3>Items Ordered</h3>
//           <div className="order-items">
//             {items.map((item) => (
//               <div key={item.id} className="order-item">
//                 <div className="item-details">
//                   <span className="item-name">{item.name}</span>
//                   <span className="item-qty">Qty: {item.qty}</span>
//                 </div>
//                 <div className="item-price">
//                   ₦{(item.price * item.qty).toLocaleString()}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* TOTAL SUMMARY */}
//         <div className="order-box">
//           <h3>Payment Summary</h3>
//           <p>Items Total: <span>₦{totals.itemsTotal.toLocaleString()}</span></p>
//           <p>Delivery Fee: <span>₦{totals.delivery.toLocaleString()}</span></p>
//           <h3 className="total">
//             Order Total: <span>₦{totals.orderTotal.toLocaleString()}</span>
//           </h3>
//         </div>
//       </div>

//       <div className="order-actions">
//         <Link to="/" className="btn-home">Back to Shop</Link>
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

  useEffect(() => {
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
        <h2>Order Confirmed!</h2>
        <p>
          Thank you, <strong>{shipping.fullName}</strong>! Your order has been placed successfully.
        </p>
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
              <div key={`${item.id}-${item.variation || "default"}`} className="order-item">
                <div className="item-details">
                  <span className="item-name">
                    {item.name}
                    {item.variation && (
                      <span className="item-variation"> – {item.variation}</span>
                    )}
                  </span>
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

