// import React, { useContext } from "react";
// import { Link } from "react-router-dom";
// import { CartContext } from "../context/CartContext";
// import "../styles/cart.css";

// export default function Cart() {
//   const { cart, removeFromCart, updateQty, clearCart } = useContext(CartContext);

//   const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

//   return (
//     <div className="cart-container">
//       {/* Cart Items */}
//       <div className="cart-items">
//         <h2>Cart</h2>
//         {cart.length === 0 ? (
//           <p>Your Cart is empty.</p>
//         ) : (
//           <>
//             {cart.map((item) => (
//               <div key={item.id} className="cart-item">
//                 <div className="cart-item-info">
//                   <span className="cart-item-name">{item.name}</span>
//                   <span className="cart-item-price">₦{item.price}</span>
//                 </div>
//                 <div className="cart-item-actions">
//                   <input
//                     type="number"
//                     value={item.qty}
//                     min="1"
//                     onChange={(e) => updateQty(item.id, Number(e.target.value))}
//                   />
//                   <button onClick={() => removeFromCart(item.id)}>Remove</button>
//                 </div>
//               </div>
//             ))}

//             {/* ✅ Clear Cart Button */}
//             <button className="clear-cart-btn" onClick={clearCart}>
//               Clear Cart
//             </button>
//           </>
//         )}
//       </div>

//       {/* Cart Summary */}
//       {cart.length > 0 && (
//         <div className="cart-summary">
//           <h3>
//             Subtotal ({cart.reduce((sum, item) => sum + item.qty, 0)} items):{" "}
//             <span className="summary-price">₦{subtotal.toLocaleString()}</span>
//           </h3>

//           {/* ✅ Cost Breakdown */}
//           <div className="cost-breakdown">
//             <p>
//               Shipping: <span>Calculated at checkout</span>
//             </p>
//             <p>
//               Taxes (VAT): <span>Included</span>
//             </p>
//             <p className="total-line">
//               Order Total: <strong>₦{subtotal.toLocaleString()}</strong>
//             </p>
//           </div>

//           {/* ✅ Coupon Code */}
//           <div className="coupon-section">
//             <input type="text" placeholder="Enter promo code" />
//             <button className="apply-btn">Apply</button>
//           </div>

//           {/* ✅ Gift Option */}
//           <div className="gift-option">
//             <input type="checkbox" id="gift" />
//             <label htmlFor="gift">This order contains a gift</label>
//           </div>

//           {/* ✅ Estimated Delivery */}
//           <div className="delivery-info">
//             <p>
//               Estimated delivery: <strong>2 – 5 business days</strong>
//             </p>
//             <p className="shipping-note">
//               Exact shipping fees calculated at checkout
//             </p>
//           </div>

//           {/* ✅ Checkout Button */}
//           <Link to="/checkout">
//             <button className="checkout-btn">Proceed to Checkout</button>
//           </Link>

//           {/* ✅ Secure Checkout */}
//           <div className="secure-checkout">
//             <span className="lock-icon">🔒</span> Secure checkout guaranteed
//           </div>

//           {/* ✅ Return & Trust Section */}
//           <div className="return-policy">
//             <p>✅ 30-day free returns</p>
//             <p>💳 100% money-back guarantee</p>
//             <p>🔒 Payments secured by SSL</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "../styles/cart.css";

export default function Cart() {
  const { cart, removeFromCart, updateQty, clearCart } = useContext(CartContext);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="cart-container">
      {/* Cart Items */}
      <div className="cart-items">
        <h2>Cart</h2>
        {cart.length === 0 ? (
          <p>Your Cart is empty.</p>
        ) : (
          <>
            {cart.map((item, index) => (
              <div
                key={`${item.id}-${item.variation || "default"}-${index}`}
                className="cart-item"
              >
                <div className="cart-item-info">
                  <span className="cart-item-name">
                    {item.name}
                    {item.variation && (
                      <span className="cart-item-variation">
                        {" "}
                        – {item.variation}
                      </span>
                    )}
                  </span>
                  <span className="cart-item-price">₦{item.price}</span>
                </div>

                <div className="cart-item-actions">
                  <input
                    type="number"
                    value={item.qty}
                    min="1"
                    onChange={(e) =>
                      updateQty(item.id, item.variation, Number(e.target.value))
                    }
                  />
                  <button
                    onClick={() => removeFromCart(item.id, item.variation)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            {/* ✅ Clear Cart Button */}
            <button className="clear-cart-btn" onClick={clearCart}>
              Clear Cart
            </button>
          </>
        )}
      </div>

      {/* Cart Summary */}
      {cart.length > 0 && (
        <div className="cart-summary">
          <h3>
            Subtotal ({cart.reduce((sum, item) => sum + item.qty, 0)} items):{" "}
            <span className="summary-price">₦{subtotal.toLocaleString()}</span>
          </h3>

          {/* ✅ Cost Breakdown */}
          <div className="cost-breakdown">
            <p>
              Shipping: <span>Calculated at checkout</span>
            </p>
            <p>
              Taxes (VAT): <span>Included</span>
            </p>
            <p className="total-line">
              Order Total: <strong>₦{subtotal.toLocaleString()}</strong>
            </p>
          </div>

          {/* ✅ Coupon Code */}
          <div className="coupon-section">
            <input type="text" placeholder="Enter promo code" />
            <button className="apply-btn">Apply</button>
          </div>

          {/* ✅ Gift Option */}
          <div className="gift-option">
            <input type="checkbox" id="gift" />
            <label htmlFor="gift">This order contains a gift</label>
          </div>

          {/* ✅ Estimated Delivery */}
          <div className="delivery-info">
            <p>
              Estimated delivery: <strong>2 – 5 business days</strong>
            </p>
            <p className="shipping-note">
              Exact shipping fees calculated at checkout
            </p>
          </div>

          {/* ✅ Checkout Button */}
          <Link to="/checkout">
            <button className="checkout-btn">Proceed to Checkout</button>
          </Link>

          {/* ✅ Secure Checkout */}
          <div className="secure-checkout">
            <span className="lock-icon">🔒</span> Secure checkout guaranteed
          </div>

          {/* ✅ Return & Trust Section */}
          <div className="return-policy">
            <p>✅ 30-day free returns</p>
            <p>💳 100% money-back guarantee</p>
            <p>🔒 Payments secured by SSL</p>
          </div>
        </div>
      )}
    </div>
  );
}
