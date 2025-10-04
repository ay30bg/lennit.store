
import React from "react";
import { Link } from "react-router-dom";
import "../styles/product.css";

export default function ProductCard({ product }) {
  const renderStock = () => {
    if (product.stock === 0) return <p className="product-stock out">Out of Stock</p>;
    if (product.stock <= 5) return <p className="product-stock low">Only {product.stock} left</p>;
    return <p className="product-stock in">In Stock</p>;
  };

  return (
      <div className="product-card">
        <Link to={`/product/${product.id}`} className="product-link">
          <img src={product.image} alt={product.name} />
        </Link>
        <div className="product-info">
          <Link to={`/product/${product.id}`} className="product-title">
            {product.name}
          </Link>

          {/* Ratings */}
          {product.rating && (
            <div className="product-rating">
              <span className="stars">★</span>
              <span>{product.rating}</span>
              {product.reviews && <span>({product.reviews})</span>}
            </div>
          )}

          {/* Price */}
          <div>
            <span className="product-price">₦{product.price}</span>
            {product.oldPrice && (
              <>
                <span className="old-price">₦{product.oldPrice}</span>
                <span className="discount-badge">
                  -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                </span>
              </>
            )}
          </div>

          {/* Stock Text */}
          {renderStock()}

          {/* Stock Meter */}
          {product.stock > 0 && (
            <div className="stock-meter">
              <meter
                value={product.stock}
                min="0"
                max={product.maxStock || 100} // fallback max if not provided
              ></meter>
              <p>{product.stock} items left</p>
            </div>
          )}
        </div>
      </div>
  );
}
