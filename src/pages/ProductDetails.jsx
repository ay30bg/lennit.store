import React, { useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import productsData from "../data/products.json";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";
import Rating from "../components/Rating"; 
import "../styles/productDetails.css";

export default function ProductDetails() {
  const { id } = useParams();
  const product = productsData.find((p) => p.id === parseInt(id));
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("specs");

  // ✅ Handle variations (e.g., colors)
  const [selectedVariation, setSelectedVariation] = useState(
    product?.variations?.colors?.[0] || null
  );

  const [mainImage, setMainImage] = useState(
    selectedVariation?.image || product?.images?.[0] || product?.image || ""
  );

  const { addToWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  const [loadingCart, setLoadingCart] = useState(false);
  const [loadingWishlist, setLoadingWishlist] = useState(false);

  // ✅ Review state
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(0);

  if (!product) {
    return <h2 style={{ textAlign: "center" }}>Product not found</h2>;
  }

  const relatedProducts = productsData.filter(
    (p) => p.id !== product.id && p.category === product.category
  );

  const handleAddToCart = () => {
    setLoadingCart(true);
    setTimeout(() => {
      addToCart({
        ...product,
        qty: quantity,
        variation: selectedVariation ? selectedVariation.name : null,
      });
      setLoadingCart(false);
    }, 2000);
  };

  const handleWishlist = () => {
    setLoadingWishlist(true);
    setTimeout(() => {
      addToWishlist({
        ...product,
        variation: selectedVariation ? selectedVariation.name : null,
      });
      setLoadingWishlist(false);
    }, 2000);
  };

  // ✅ Handle new review submission
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewText.trim() || reviewRating === 0) return;

    const newReview = {
      id: Date.now(),
      text: reviewText,
      rating: reviewRating,
    };

    setReviews([newReview, ...reviews]); // add new review at top
    setReviewText("");
    setReviewRating(0);
  };

  return (
    <div className="product-details container">
      <nav className="breadcrumb">
        <Link to="/">Home</Link> / <span>{product.name}</span>
      </nav>

      {/* Product Images + Info */}
      <div className="details-wrapper">
        <div className="details-img">
          <img src={mainImage} alt={product.name} className="main-image" />

          {/* ✅ Show thumbnails only if NO variations */}
          {!product.variations?.colors && (
            <div className="thumbnails">
              {(product.images || [product.image]).map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${product.name} ${i}`}
                  className={`thumbnail ${mainImage === img ? "active" : ""}`}
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="details-info">
          <h2>{product.name}</h2>

          {/* ✅ Rating Component */}
          <Rating
            average={product.rating?.average || 0}
            reviews={product.rating?.reviews || 0}
            onRate={(value) => console.log("User rated:", value)}
          />

          <p className="price">₦{product.price.toLocaleString()}</p>
          <p
            className={`stock ${
              product.stock > 10 ? "in" : product.stock > 0 ? "low" : "out"
            }`}
          >
            {product.stock > 10
              ? "In Stock"
              : product.stock > 0
              ? `Low Stock (${product.stock})`
              : "Out of Stock"}
          </p>

          {/* ✅ Purchase Panel */}
          <div className="purchase-panel">
            <div className="quantity">
              <label>Qty:</label>
              <input
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              />
            </div>

            {/* ✅ Variations moved here */}
            {product.variations?.colors && (
              <div className="variations">
                <p>Select Color:</p>
                <div className="variation-options">
                  {product.variations.colors.map((color, i) => (
                    <div
                      key={i}
                      className={`variation-option ${
                        selectedVariation?.name === color.name ? "active" : ""
                      }`}
                      onClick={() => {
                        setSelectedVariation(color);
                        setMainImage(color.image);
                      }}
                    >
                      <img src={color.image} alt={color.name} />
                      <span>{color.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              className="add-to-cart"
              disabled={product.stock === 0 || loadingCart}
              onClick={handleAddToCart}
            >
              {loadingCart ? <span className="spinner"></span> : "Add to Cart"}
            </button>

            <button
              className="wishlist-btn"
              onClick={handleWishlist}
              disabled={loadingWishlist}
            >
              {loadingWishlist ? (
                <span className="spinner"></span>
              ) : (
                "♡ Add to Wishlist"
              )}
            </button>
          </div>

          {/* Tabs */}
          <div className="tabs">
            <button
              className={activeTab === "specs" ? "active" : ""}
              onClick={() => setActiveTab("specs")}
            >
              Specs
            </button>
            <button
              className={activeTab === "reviews" ? "active" : ""}
              onClick={() => setActiveTab("reviews")}
            >
              Reviews
            </button>
          </div>

          <div className="tab-content">
            {activeTab === "specs" && <p>Specifications coming soon.</p>}

            {activeTab === "reviews" && (
              <div className="reviews-section">
                <h4>Customer Reviews</h4>

                {/* ✅ Review Form */}
                <form onSubmit={handleReviewSubmit} className="review-form">
                  <label>Rate this product:</label>
                  <Rating
                    average={reviewRating}
                    reviews={0}
                    onRate={(value) => setReviewRating(value)}
                  />

                  <textarea
                    placeholder="Write your review..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                  ></textarea>

                  <button type="submit" className="submit-review">
                    Submit Review
                  </button>
                </form>

                {/* ✅ Show submitted reviews */}
                {reviews.length > 0 ? (
                  <ul className="review-list">
                    {reviews.map((r) => (
                      <li key={r.id} className="review-item">
                        <Rating average={r.rating} reviews={0} />
                        <p>{r.text}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No reviews yet. Be the first to review!</p>
                )}
              </div>
            )}
          </div>

          <Link to="/" className="back-link">
            ← Back to Shop
          </Link>
        </div>
      </div>

      {/* Description under wrapper */}
      <div className="description-section">
        <h3>Product Description</h3>
        <p>{product.desc}</p>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="related-products">
          <h3>Frequently Bought Together</h3>
          <div className="related-grid">
            {relatedProducts.slice(0, 4).map((p) => (
              <Link key={p.id} to={`/product/${p.id}`} className="related-card">
                <img src={p.images?.[0] || p.image} alt={p.name} />
                <p>{p.name}</p>
                <p className="price">₦{p.price.toLocaleString()}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
