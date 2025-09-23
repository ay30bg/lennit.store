import React, { createContext, useState } from "react";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const addToWishlist = (product) => {
    setWishlist((prev) => {
      if (!prev.find((item) => item.id === product.id)) {
        return [...prev, { ...product, priority: false, note: "" }];
      }
      return prev;
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  const togglePriority = (id) => {
    setWishlist((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, priority: !item.priority } : item
      )
    );
  };

  const updateNote = (id, note) => {
    setWishlist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, note } : item))
    );
  };

  const moveAllToCart = (addToCartCallback) => {
    // Call addToCartCallback(item) for each item if needed
    alert("All wishlist items moved to cart!");
    setWishlist([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        togglePriority,
        updateNote,
        moveAllToCart,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
