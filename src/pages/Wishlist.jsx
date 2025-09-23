import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";
import "../styles/wishlist.css";

export default function Wishlist() {
    const { wishlist, removeFromWishlist, } = useContext(WishlistContext);
    const { addToCart } = useContext(CartContext);

    const [selectedItems, setSelectedItems] = useState([]);

    const subtotal = wishlist.reduce((sum, item) => sum + item.price, 0);
    const inStockCount = wishlist.filter((item) => item.stock > 0).length;
    const outOfStockCount = wishlist.length - inStockCount;

    const handleSelect = (id) => {
        setSelectedItems((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    // Move selected wishlist items to cart
    const handleMoveSelectedToCart = () => {
        if (selectedItems.length === 0) return alert("Select at least one item.");
        selectedItems.forEach((id) => {
            const item = wishlist.find((i) => i.id === id);
            if (item) {
                addToCart({ ...item, qty: 1 });
                removeFromWishlist(item.id);
            }
        });
        setSelectedItems([]); // Clear selection
    };

    // Move all wishlist items to cart
    const handleMoveAllToCart = () => {
        wishlist.forEach((item) => {
            addToCart({ ...item, qty: 1 });
            removeFromWishlist(item.id);
        });
        setSelectedItems([]);
    };

    return (
        <div className="wishlist-container">
            {/* Left: Wishlist Items */}
            <div className="wishlist-items">
                <h2>My Wishlist</h2>
                {wishlist.length === 0 ? (
                    <p className="empty-msg">Your wishlist is empty.</p>
                ) : (
                    wishlist.map((item) => (
                        <div key={item.id} className="wishlist-item">
                            <input
                                type="checkbox"
                                className="select-item"
                                checked={selectedItems.includes(item.id)}
                                onChange={() => handleSelect(item.id)}
                            />
                            <div className="wishlist-item-info">
                                <span className="wishlist-item-name">{item.name}</span>
                                <span className="wishlist-item-price">
                                    ₦{item.price.toLocaleString()}
                                </span>
            
                            </div>
                            <div className="wishlist-item-actions">
                                <Link to={`/product/${item.id}`} className="view-product-btn">
                                    View Product
                                </Link>
                                <button
                                    className="remove-btn"
                                    onClick={() => removeFromWishlist(item.id)}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Right: Sidebar */}
            {wishlist.length > 0 && (
                <div className="wishlist-sidebar">
                    <h3>Wishlist Summary</h3>
                    <div className="summary-details">
                        <p>
                            <strong>Total Items:</strong> {wishlist.length}
                        </p>
                        <p>
                            <strong>Estimated Value:</strong> ₦{subtotal.toLocaleString()}
                        </p>
                        <p>
                            <strong>Stock:</strong> {inStockCount} In Stock | {outOfStockCount} Out of Stock
                        </p>
                    </div>

                    {/* Bulk Actions */}
                    <div className="sidebar-section">
                        <button
                            className="sidebar-btn"
                            onClick={handleMoveSelectedToCart}
                        >
                            Move Selected to Cart
                        </button>
                        <button
                            className="sidebar-btn move-cart-btn"
                            onClick={handleMoveAllToCart}
                        >
                            Move All to Cart
                        </button>
                    </div>

                    {/* Price Alerts */}
                    <div className="sidebar-section">
                        <h4>Price Alerts</h4>
                        <p>Track price drops for items in your wishlist.</p>
                    </div>

                    {/* Share Wishlist */}
                    <div className="sidebar-section">
                        <h4>Share Wishlist</h4>
                        <div className="share-buttons">
                            <button>Copy Link</button>
                            <button>Email</button>
                            <button>Social Share</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
