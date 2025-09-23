// // import React, { useState, useContext } from "react";
// // import { useParams, Link } from "react-router-dom";
// // import productsData from "../data/products.json";
// // import { WishlistContext } from "../context/WishlistContext";
// // import "../styles/productDetails.css";

// // export default function ProductDetails() {
// //   const { id } = useParams();
// //   const product = productsData.find((p) => p.id === parseInt(id));
// //   const [quantity, setQuantity] = useState(1);
// //   const [activeTab, setActiveTab] = useState("description");

// //   // Safely set mainImage to first in images array or fallback to product.image or empty string
// //   const [mainImage, setMainImage] = useState(
// //     product?.images?.[0] || product?.image || ""
// //   );

// //   const { addToWishlist } = useContext(WishlistContext);

// //   if (!product) {
// //     return <h2 style={{ textAlign: "center" }}>Product not found</h2>;
// //   }

// //   // Related products: same category, excluding current product
// //   const relatedProducts = productsData.filter(
// //     (p) => p.id !== product.id && p.category === product.category
// //   );

// //   const handleWishlist = () => {
// //     addToWishlist(product);
// //     alert(`${product.name} added to wishlist!`);
// //   };

// //   return (
// //     <div className="product-details container">
// //       {/* Breadcrumb */}
// //       <nav className="breadcrumb">
// //         <Link to="/">Home</Link> / <span>{product.name}</span>
// //       </nav>

// //       <div className="details-wrapper">
// //         {/* Product Images */}
// //         <div className="details-img">
// //           <img src={mainImage} alt={product.name} className="main-image" />

// //           <div className="thumbnails">
// //             {(product.images || [product.image]).map((img, i) => (
// //               <img
// //                 key={i}
// //                 src={img}
// //                 alt={`${product.name} ${i}`}
// //                 className={`thumbnail ${mainImage === img ? "active" : ""}`}
// //                 onClick={() => setMainImage(img)}
// //               />
// //             ))}
// //           </div>
// //         </div>

// //         {/* Product Info */}
// //         <div className="details-info">
// //           <h2>{product.name}</h2>

// //           <p className="rating">⭐⭐⭐⭐☆ (24 reviews)</p>

// //           <p className="price">₦{product.price.toLocaleString()}</p>

// //           <p
// //             className={`stock ${
// //               product.stock > 10 ? "in" : product.stock > 0 ? "low" : "out"
// //             }`}
// //           >
// //             {product.stock > 10
// //               ? "In Stock"
// //               : product.stock > 0
// //               ? `Low Stock (${product.stock})`
// //               : "Out of Stock"}
// //           </p>

// //           <div className="purchase-panel">
// //             <div className="quantity">
// //               <label>Qty:</label>
// //               <input
// //                 type="number"
// //                 min="1"
// //                 max={product.stock}
// //                 value={quantity}
// //                 onChange={(e) => setQuantity(parseInt(e.target.value))}
// //               />
// //             </div>
// //             <button className="add-to-cart" disabled={product.stock === 0}>
// //               Add to Cart
// //             </button>
// //             <button className="wishlist-btn" onClick={handleWishlist}>
// //               ♡ Add to Wishlist
// //             </button>
// //           </div>

// //           {/* Tabs */}
// //           <div className="tabs">
// //             <button
// //               className={activeTab === "description" ? "active" : ""}
// //               onClick={() => setActiveTab("description")}
// //             >
// //               Description
// //             </button>
// //             <button
// //               className={activeTab === "specs" ? "active" : ""}
// //               onClick={() => setActiveTab("specs")}
// //             >
// //               Specs
// //             </button>
// //             <button
// //               className={activeTab === "reviews" ? "active" : ""}
// //               onClick={() => setActiveTab("reviews")}
// //             >
// //               Reviews
// //             </button>
// //           </div>

// //           <div className="tab-content">
// //             {activeTab === "description" && <p>{product.desc}</p>}
// //             {activeTab === "specs" && <p>Specifications coming soon.</p>}
// //             {activeTab === "reviews" && <p>Reviews coming soon.</p>}
// //           </div>

// //           <Link to="/" className="back-link">
// //             ← Back to Shop
// //           </Link>
// //         </div>
// //       </div>

// //       {/* Related Products */}
// //       {relatedProducts.length > 0 && (
// //         <div className="related-products">
// //           <h3>Frequently Bought Together</h3>
// //           <div className="related-grid">
// //             {relatedProducts.slice(0, 4).map((p) => (
// //               <Link key={p.id} to={`/product/${p.id}`} className="related-card">
// //                 <img src={p.images?.[0] || p.image} alt={p.name} />
// //                 <p>{p.name}</p>
// //                 <p className="price">₦{p.price.toLocaleString()}</p>
// //               </Link>
// //             ))}
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// import React, { useState, useContext } from "react";
// import { useParams, Link } from "react-router-dom";
// import productsData from "../data/products.json";
// import { WishlistContext } from "../context/WishlistContext";
// import { CartContext } from "../context/CartContext";
// import "../styles/productDetails.css";

// export default function ProductDetails() {
//   const { id } = useParams();
//   const product = productsData.find((p) => p.id === parseInt(id));
//   const [quantity, setQuantity] = useState(1);
//   const [activeTab, setActiveTab] = useState("description");
//   const [mainImage, setMainImage] = useState(
//     product?.images?.[0] || product?.image || ""
//   );

//   const { addToWishlist } = useContext(WishlistContext);
//   const { addToCart } = useContext(CartContext);

//   if (!product) {
//     return <h2 style={{ textAlign: "center" }}>Product not found</h2>;
//   }

//   // Related products: same category, excluding current product
//   const relatedProducts = productsData.filter(
//     (p) => p.id !== product.id && p.category === product.category
//   );

//   const handleWishlist = () => {
//     addToWishlist(product);
//     alert(`${product.name} added to wishlist!`);
//   };

//   const handleAddToCart = () => {
//     addToCart({ ...product, qty: quantity });
//     alert(`${quantity} x ${product.name} added to cart!`);
//   };

//   return (
//     <div className="product-details container">
//       {/* Breadcrumb */}
//       <nav className="breadcrumb">
//         <Link to="/">Home</Link> / <span>{product.name}</span>
//       </nav>

//       <div className="details-wrapper">
//         {/* Product Images */}
//         <div className="details-img">
//           <img src={mainImage} alt={product.name} className="main-image" />
//           <div className="thumbnails">
//             {(product.images || [product.image]).map((img, i) => (
//               <img
//                 key={i}
//                 src={img}
//                 alt={`${product.name} ${i}`}
//                 className={`thumbnail ${mainImage === img ? "active" : ""}`}
//                 onClick={() => setMainImage(img)}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Product Info */}
//         <div className="details-info">
//           <h2>{product.name}</h2>

//           {/* Ratings */}
//           <p className="rating">⭐⭐⭐⭐☆ (24 reviews)</p>

//           {/* Price */}
//           <p className="price">₦{product.price.toLocaleString()}</p>

//           {/* Stock */}
//           <p
//             className={`stock ${
//               product.stock > 10 ? "in" : product.stock > 0 ? "low" : "out"
//             }`}
//           >
//             {product.stock > 10
//               ? "In Stock"
//               : product.stock > 0
//               ? `Low Stock (${product.stock})`
//               : "Out of Stock"}
//           </p>

//           {/* Quantity & Add to Cart */}
//           <div className="purchase-panel">
//             <div className="quantity">
//               <label>Qty:</label>
//               <input
//                 type="number"
//                 min="1"
//                 max={product.stock}
//                 value={quantity}
//                 onChange={(e) => setQuantity(parseInt(e.target.value))}
//               />
//             </div>
//             <button
//               className="add-to-cart"
//               disabled={product.stock === 0}
//               onClick={handleAddToCart}
//             >
//               Add to Cart
//             </button>
//             <button className="wishlist-btn" onClick={handleWishlist}>
//               ♡ Add to Wishlist
//             </button>
//           </div>

//           {/* Tabs */}
//           <div className="tabs">
//             <button
//               className={activeTab === "description" ? "active" : ""}
//               onClick={() => setActiveTab("description")}
//             >
//               Description
//             </button>
//             <button
//               className={activeTab === "specs" ? "active" : ""}
//               onClick={() => setActiveTab("specs")}
//             >
//               Specs
//             </button>
//             <button
//               className={activeTab === "reviews" ? "active" : ""}
//               onClick={() => setActiveTab("reviews")}
//             >
//               Reviews
//             </button>
//           </div>

//           <div className="tab-content">
//             {activeTab === "description" && <p>{product.desc}</p>}
//             {activeTab === "specs" && <p>Specifications coming soon.</p>}
//             {activeTab === "reviews" && <p>Reviews coming soon.</p>}
//           </div>

//           <Link to="/" className="back-link">
//             ← Back to Shop
//           </Link>
//         </div>
//       </div>

//       {/* Related Products */}
//       {relatedProducts.length > 0 && (
//         <div className="related-products">
//           <h3>Frequently Bought Together</h3>
//           <div className="related-grid">
//             {relatedProducts.slice(0, 4).map((p) => (
//               <Link key={p.id} to={`/product/${p.id}`} className="related-card">
//                 <img src={p.images?.[0] || p.image} alt={p.name} />
//                 <p>{p.name}</p>
//                 <p className="price">₦{p.price.toLocaleString()}</p>
//               </Link>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import productsData from "../data/products.json";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";
import "../styles/productDetails.css";

export default function ProductDetails() {
  const { id } = useParams();
  const product = productsData.find((p) => p.id === parseInt(id));
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [mainImage, setMainImage] = useState(
    product?.images?.[0] || product?.image || ""
  );

  const { addToWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  const [loadingCart, setLoadingCart] = useState(false);
  const [loadingWishlist, setLoadingWishlist] = useState(false);

  if (!product) {
    return <h2 style={{ textAlign: "center" }}>Product not found</h2>;
  }

  const relatedProducts = productsData.filter(
    (p) => p.id !== product.id && p.category === product.category
  );

  const handleAddToCart = () => {
    setLoadingCart(true);
    setTimeout(() => {
      addToCart({ ...product, qty: quantity });
      setLoadingCart(false);
    }, 2000); // simulate loading
  };

  const handleWishlist = () => {
    setLoadingWishlist(true);
    setTimeout(() => {
      addToWishlist(product);
      setLoadingWishlist(false);
    }, 2000); // simulate loading
  };

  return (
    <div className="product-details container">
      <nav className="breadcrumb">
        <Link to="/">Home</Link> / <span>{product.name}</span>
      </nav>

      <div className="details-wrapper">
        <div className="details-img">
          <img src={mainImage} alt={product.name} className="main-image" />
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
        </div>

        <div className="details-info">
          <h2>{product.name}</h2>
          <p className="rating">⭐⭐⭐⭐☆ (24 reviews)</p>
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

            <button
              className="add-to-cart"
              disabled={product.stock === 0 || loadingCart}
              onClick={handleAddToCart}
            >
              {loadingCart ? (
                <span className="spinner"></span>
              ) : (
                "Add to Cart"
              )}
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

          <div className="tabs">
            <button
              className={activeTab === "description" ? "active" : ""}
              onClick={() => setActiveTab("description")}
            >
              Description
            </button>
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
            {activeTab === "description" && <p>{product.desc}</p>}
            {activeTab === "specs" && <p>Specifications coming soon.</p>}
            {activeTab === "reviews" && <p>Reviews coming soon.</p>}
          </div>

          <Link to="/" className="back-link">
            ← Back to Shop
          </Link>
        </div>
      </div>

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
