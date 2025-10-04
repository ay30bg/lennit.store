import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ✅ add product with variation support
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) =>
          item.id === product.id &&
          item.variation === product.variation // check variation too
      );

      if (existing) {
        // increase qty if same variation exists
        return prev.map((item) =>
          item.id === product.id && item.variation === product.variation
            ? { ...item, qty: item.qty + (product.qty || 1) }
            : item
        );
      }

      // add as new item if variation is different
      return [...prev, { ...product, qty: product.qty || 1 }];
    });
  };

  const removeFromCart = (id, variation = null) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.id === id && item.variation === variation)
      )
    );
  };

  const updateQty = (id, variation, qty) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.variation === variation
          ? { ...item, qty: Math.max(qty, 1) }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // ✅ count all quantities
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
