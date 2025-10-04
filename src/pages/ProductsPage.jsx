// // import React, { useState } from "react";
// // import { useLocation } from "react-router-dom";
// // import { FaTimes } from "react-icons/fa";
// // import ProductCard from "../components/ProductCard";
// // import productsData from "../data/products.json";
// // import "../styles/products.css";

// // export default function ProductsPage() {
// //   const useQuery = () => new URLSearchParams(useLocation().search);
// //   const query = useQuery();
// //   const category = query.get("category");

// //   // Filters
// //   const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
// //   const [brands, setBrands] = useState([]);
// //   const [inStock, setInStock] = useState(false);
// //   const [selectedShippingRanges, setSelectedShippingRanges] = useState([]);
// //   const [showMobileFilters, setShowMobileFilters] = useState(false);

// //   const priceRanges = [
// //     { label: "Under 1101", min: 0, max: 1100 },
// //     { label: "1101 - 2612", min: 1101, max: 2612 },
// //     { label: "2612 - 7312", min: 2612, max: 7312 },
// //     { label: "7312 - 13391", min: 7312, max: 13391 },
// //     { label: "13391 & Over", min: 13391, max: Infinity },
// //   ];
// //   const shippingRanges = [...priceRanges];
// //   const uniqueBrands = [...new Set(productsData.map((p) => p.brand))];

// //   const toggleSelection = (value, setter, stateArray) => {
// //     if (stateArray.includes(value)) {
// //       setter(stateArray.filter((v) => v !== value));
// //     } else {
// //       setter([...stateArray, value]);
// //     }
// //   };

// //   // Filter products
// //   const filteredProducts = productsData.filter((p) => {
// //     const matchesCategory = category
// //       ? p.category && p.category.toLowerCase() === category.toLowerCase()
// //       : true;

// //     const matchesPrice =
// //       selectedPriceRanges.length === 0 ||
// //       selectedPriceRanges.some((rangeLabel) => {
// //         const range = priceRanges.find((r) => r.label === rangeLabel);
// //         return p.price >= range.min && p.price <= range.max;
// //       });

// //     const matchesShipping =
// //       selectedShippingRanges.length === 0 ||
// //       selectedShippingRanges.some((rangeLabel) => {
// //         const range = shippingRanges.find((r) => r.label === rangeLabel);
// //         return p.shipping >= range.min && p.shipping <= range.max;
// //       });

// //     const matchesBrand = brands.length === 0 ? true : brands.includes(p.brand);
// //     const matchesStock = inStock ? p.stock > 0 : true;

// //     return (
// //       matchesCategory &&
// //       matchesPrice &&
// //       matchesShipping &&
// //       matchesBrand &&
// //       matchesStock
// //     );
// //   });

// //   // Pagination
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const productsPerPage = 12;
// //   const indexOfLast = currentPage * productsPerPage;
// //   const indexOfFirst = indexOfLast - productsPerPage;
// //   const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
// //   const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

// //   return (
// //     <div className="products-page container">
// //       <div className="products-layout">
// //         {/* Main Grid */}
// //         <div className="products-grid-container">
// //           <h1>{category ? `${category} ` : "All Products"}</h1>
// //           <hr />

// //           {/* Product Grid */}
// //           <div className="products-grid">
// //             {currentProducts.length > 0 ? ( 
// //               currentProducts.map((p) => <ProductCard key={p.id} product={p} />)
// //             ) : (
// //               <p>No products found.</p>
// //             )}
// //           </div>

// //           {/* Pagination Controls */}
// //           {totalPages > 1 && (
// //             <div className="pagination">
// //               <button
// //                 disabled={currentPage === 1}
// //                 onClick={() => setCurrentPage(currentPage - 1)}
// //               >
// //                 Prev
// //               </button>
// //               {Array.from({ length: totalPages }, (_, i) => (
// //                 <button
// //                   key={i}
// //                   className={currentPage === i + 1 ? "active" : ""}
// //                   onClick={() => setCurrentPage(i + 1)}
// //                 >
// //                   {i + 1}
// //                 </button>
// //               ))}
// //               <button
// //                 disabled={currentPage === totalPages}
// //                 onClick={() => setCurrentPage(currentPage + 1)}
// //               >
// //                 Next
// //               </button>
// //             </div>
// //           )}
// //         </div>

// //         {/* Mobile Filter Button */}
// //         <div className="mobile-filter-wrapper">
// //           <button
// //             className="mobile-filter-btn"
// //             onClick={() => setShowMobileFilters(true)}
// //           >
// //             Filter
// //           </button>
// //         </div>

// //         {/* Sidebar for desktop */}
// //         <aside className="filter-sidebar">
// //           <h3>Filter</h3>

// //           {/* Price Range */}
// //           <div className="filter-group">
// //             <label>Price Range (NGN)</label>
// //             {priceRanges.map((range) => (
// //               <label key={range.label}>
// //                 <input
// //                   type="checkbox"
// //                   checked={selectedPriceRanges.includes(range.label)}
// //                   onChange={() =>
// //                     toggleSelection(
// //                       range.label,
// //                       setSelectedPriceRanges,
// //                       selectedPriceRanges
// //                     )
// //                   }
// //                 />
// //                 {range.label}
// //               </label>
// //             ))}
// //           </div>

// //           {/* Shipping */}
// //           <div className="filter-group">
// //             <label>Shipping Price (NGN)</label>
// //             {shippingRanges.map((range) => (
// //               <label key={range.label}>
// //                 <input
// //                   type="checkbox"
// //                   checked={selectedShippingRanges.includes(range.label)}
// //                   onChange={() =>
// //                     toggleSelection(
// //                       range.label,
// //                       setSelectedShippingRanges,
// //                       selectedShippingRanges
// //                     )
// //                   }
// //                 />
// //                 {range.label}
// //               </label>
// //             ))}
// //           </div>

// //           {/* Brand */}
// //           <div className="filter-group">
// //             <label>Brand</label>
// //             {uniqueBrands.map((brand) => (
// //               <label key={brand}>
// //                 <input
// //                   type="checkbox"
// //                   checked={brands.includes(brand)}
// //                   onChange={() => toggleSelection(brand, setBrands, brands)}
// //                 />
// //                 {brand}
// //               </label>
// //             ))}
// //           </div>

// //           {/* Availability */}
// //           <div className="filter-group">
// //             <label>
// //               <input
// //                 type="checkbox"
// //                 checked={inStock}
// //                 onChange={(e) => setInStock(e.target.checked)}
// //               />
// //               In Stock Only
// //             </label>
// //           </div>
// //         </aside>
// //       </div>

// //       {/* Mobile Filter Overlay */}
// //       {showMobileFilters && (
// //         <div className="mobile-filters-overlay">
// //           <div className="mobile-filters-header">
// //             <h3>Filters</h3>
// //             <button className="filter-btn" onClick={() => setShowMobileFilters(false)}><FaTimes size={20} /></button>
// //           </div>
// //           <div className="mobile-filters-body">
// //             {/* Price Range */}
// //             <div className="filter-group">
// //               <label>Price Range (NGN)</label>
// //               {priceRanges.map((range) => (
// //                 <label key={range.label}>
// //                   <input
// //                     type="checkbox"
// //                     checked={selectedPriceRanges.includes(range.label)}
// //                     onChange={() =>
// //                       toggleSelection(
// //                         range.label,
// //                         setSelectedPriceRanges,
// //                         selectedPriceRanges
// //                       )
// //                     }
// //                   />
// //                   {range.label}
// //                 </label>
// //               ))}
// //             </div>

// //             {/* Shipping */}
// //             <div className="filter-group">
// //               <label>Shipping Price (NGN)</label>
// //               {shippingRanges.map((range) => (
// //                 <label key={range.label}>
// //                   <input
// //                     type="checkbox"
// //                     checked={selectedShippingRanges.includes(range.label)}
// //                     onChange={() =>
// //                       toggleSelection(
// //                         range.label,
// //                         setSelectedShippingRanges,
// //                         selectedShippingRanges
// //                       )
// //                     }
// //                   />
// //                   {range.label}
// //                 </label>
// //               ))}
// //             </div>

// //             {/* Brand */}
// //             <div className="filter-group">
// //               <label>Brand</label>
// //               {uniqueBrands.map((brand) => (
// //                 <label key={brand}>
// //                   <input
// //                     type="checkbox"
// //                     checked={brands.includes(brand)}
// //                     onChange={() =>
// //                       toggleSelection(brand, setBrands, brands)
// //                     }
// //                   />
// //                   {brand}
// //                 </label>
// //               ))}
// //             </div>

// //             {/* Availability */}
// //             <div className="filter-group">
// //               <label>
// //                 <input
// //                   type="checkbox"
// //                   checked={inStock}
// //                   onChange={(e) => setInStock(e.target.checked)}
// //                 />
// //                 In Stock Only
// //               </label>
// //             </div>

// //             <button
// //               className="apply-filters-btn"
// //               onClick={() => setShowMobileFilters(false)}
// //             >
// //               Apply Filters
// //             </button>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }


// // import React, { useState } from "react";
// // import { useLocation, Link } from "react-router-dom";
// // import { FaTimes, FaStar } from "react-icons/fa";
// // import productsData from "../data/products.json";
// // import "../styles/products.css";

// // export default function ProductsPage() {
// //   const useQuery = () => new URLSearchParams(useLocation().search);
// //   const query = useQuery();
// //   const category = query.get("category");

// //   // Filters
// //   const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
// //   const [brands, setBrands] = useState([]);
// //   const [inStock, setInStock] = useState(false);
// //   const [selectedShippingRanges, setSelectedShippingRanges] = useState([]);
// //   const [showMobileFilters, setShowMobileFilters] = useState(false);

// //   const priceRanges = [
// //     { label: "Under 1101", min: 0, max: 1100 },
// //     { label: "1101 - 2612", min: 1101, max: 2612 },
// //     { label: "2612 - 7312", min: 2612, max: 7312 },
// //     { label: "7312 - 13391", min: 7312, max: 13391 },
// //     { label: "13391 & Over", min: 13391, max: Infinity },
// //   ];
// //   const shippingRanges = [...priceRanges];
// //   const uniqueBrands = [...new Set(productsData.map((p) => p.brand))];

// //   const toggleSelection = (value, setter, stateArray) => {
// //     if (stateArray.includes(value)) {
// //       setter(stateArray.filter((v) => v !== value));
// //     } else {
// //       setter([...stateArray, value]);
// //     }
// //   };

// //   // Filter products
// //   const filteredProducts = productsData.filter((p) => {
// //     const matchesCategory = category
// //       ? p.category && p.category.toLowerCase() === category.toLowerCase()
// //       : true;

// //     const matchesPrice =
// //       selectedPriceRanges.length === 0 ||
// //       selectedPriceRanges.some((rangeLabel) => {
// //         const range = priceRanges.find((r) => r.label === rangeLabel);
// //         return p.price >= range.min && p.price <= range.max;
// //       });

// //     const matchesShipping =
// //       selectedShippingRanges.length === 0 ||
// //       selectedShippingRanges.some((rangeLabel) => {
// //         const range = shippingRanges.find((r) => r.label === rangeLabel);
// //         return p.shipping >= range.min && p.shipping <= range.max;
// //       });

// //     const matchesBrand = brands.length === 0 ? true : brands.includes(p.brand);
// //     const matchesStock = inStock ? p.stock > 0 : true;

// //     return (
// //       matchesCategory &&
// //       matchesPrice &&
// //       matchesShipping &&
// //       matchesBrand &&
// //       matchesStock
// //     );
// //   });

// //   // Pagination
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const productsPerPage = 12;
// //   const indexOfLast = currentPage * productsPerPage;
// //   const indexOfFirst = indexOfLast - productsPerPage;
// //   const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
// //   const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

// //   // Helper for stock status
// //   const renderStock = (product) => {
// //     if (product.stock === 0) return <p className="product-stock out">Out of Stock</p>;
// //     if (product.stock <= 5) return <p className="product-stock low">Only {product.stock} left</p>;
// //     return <p className="product-stock in">In Stock</p>;
// //   };

// //   return (
// //     <div className="products-page container">
// //       <div className="products-layout">
// //         {/* Main Grid */}
// //         <div className="products-grid-container">
// //           <h1>{category ? `${category}` : "All Products"}</h1>
// //           <hr />

// //           {/* Product Grid */}
// //           <div className="products-grid">
// //             {currentProducts.length > 0 ? (
// //               currentProducts.map((product) => (
// //                 <div key={product.id} className="product-card">
// //                   <Link to={`/product/${product.id}`} className="product-link">
// //                     {/* Discount badge */}
// //                     {product.oldPrice && (
// //                       <span className="discount-top">
// //                         -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
// //                       </span>
// //                     )}
// //                     <img src={product.image} alt={product.name} />
// //                   </Link>

// //                   <div className="product-info">
// //                     <Link to={`/product/${product.id}`} className="product-title">
// //                       {product.name}
// //                     </Link>

// //                     {/* Ratings */}
// //                     {product.rating && (
// //                       <div className="product-rating">
// //                         <FaStar className="star" />
// //                         <span>{product.rating}</span>
// //                         {product.reviews && <span>({product.reviews})</span>}
// //                       </div>
// //                     )}

// //                     {/* Price */}
// //                     <div className="product-price-row">
// //                       <span className="product-price">₦{product.price}</span>
// //                       {product.oldPrice && (
// //                         <span className="old-price">₦{product.oldPrice}</span>
// //                       )}
// //                     </div>

// //                     {renderStock(product)}
// //                   </div>
// //                 </div>
// //               ))
// //             ) : (
// //               <p>No products found.</p>
// //             )}
// //           </div>

// //           {/* Pagination Controls */}
// //           {totalPages > 1 && (
// //             <div className="pagination">
// //               <button
// //                 disabled={currentPage === 1}
// //                 onClick={() => setCurrentPage(currentPage - 1)}
// //               >
// //                 Prev
// //               </button>
// //               {Array.from({ length: totalPages }, (_, i) => (
// //                 <button
// //                   key={i}
// //                   className={currentPage === i + 1 ? "active" : ""}
// //                   onClick={() => setCurrentPage(i + 1)}
// //                 >
// //                   {i + 1}
// //                 </button>
// //               ))}
// //               <button
// //                 disabled={currentPage === totalPages}
// //                 onClick={() => setCurrentPage(currentPage + 1)}
// //               >
// //                 Next
// //               </button>
// //             </div>
// //           )}
// //         </div>

// //         {/* Mobile Filter Button */}
// //         <div className="mobile-filter-wrapper">
// //           <button
// //             className="mobile-filter-btn"
// //             onClick={() => setShowMobileFilters(true)}
// //           >
// //             Filter
// //           </button>
// //         </div>

// //         {/* Sidebar for desktop */}
// //         <aside className="filter-sidebar">
// //           <h3>Filter</h3>

// //           {/* Price Range */}
// //           <div className="filter-group">
// //             <label>Price Range (NGN)</label>
// //             {priceRanges.map((range) => (
// //               <label key={range.label}>
// //                 <input
// //                   type="checkbox"
// //                   checked={selectedPriceRanges.includes(range.label)}
// //                   onChange={() =>
// //                     toggleSelection(range.label, setSelectedPriceRanges, selectedPriceRanges)
// //                   }
// //                 />
// //                 {range.label}
// //               </label>
// //             ))}
// //           </div>

// //           {/* Shipping */}
// //           <div className="filter-group">
// //             <label>Shipping Price (NGN)</label>
// //             {shippingRanges.map((range) => (
// //               <label key={range.label}>
// //                 <input
// //                   type="checkbox"
// //                   checked={selectedShippingRanges.includes(range.label)}
// //                   onChange={() =>
// //                     toggleSelection(range.label, setSelectedShippingRanges, selectedShippingRanges)
// //                   }
// //                 />
// //                 {range.label}
// //               </label>
// //             ))}
// //           </div>

// //           {/* Brand */}
// //           <div className="filter-group">
// //             <label>Brand</label>
// //             {uniqueBrands.map((brand) => (
// //               <label key={brand}>
// //                 <input
// //                   type="checkbox"
// //                   checked={brands.includes(brand)}
// //                   onChange={() => toggleSelection(brand, setBrands, brands)}
// //                 />
// //                 {brand}
// //               </label>
// //             ))}
// //           </div>

// //           {/* Availability */}
// //           <div className="filter-group">
// //             <label>
// //               <input
// //                 type="checkbox"
// //                 checked={inStock}
// //                 onChange={(e) => setInStock(e.target.checked)}
// //               />
// //               In Stock Only
// //             </label>
// //           </div>
// //         </aside>
// //       </div>

// //       {/* Mobile Filter Overlay */}
// //       {showMobileFilters && (
// //         <div className="mobile-filters-overlay">
// //           <div className="mobile-filters-header">
// //             <h3>Filters</h3>
// //             <button className="filter-btn" onClick={() => setShowMobileFilters(false)}>
// //               <FaTimes size={20} />
// //             </button>
// //           </div>
// //           <div className="mobile-filters-body">
// //             {/* Reuse filter content for mobile */}
// //             <div className="filter-group">
// //               <label>Price Range (NGN)</label>
// //               {priceRanges.map((range) => (
// //                 <label key={range.label}>
// //                   <input
// //                     type="checkbox"
// //                     checked={selectedPriceRanges.includes(range.label)}
// //                     onChange={() =>
// //                       toggleSelection(range.label, setSelectedPriceRanges, selectedPriceRanges)
// //                     }
// //                   />
// //                   {range.label}
// //                 </label>
// //               ))}
// //             </div>

// //             <div className="filter-group">
// //               <label>Shipping Price (NGN)</label>
// //               {shippingRanges.map((range) => (
// //                 <label key={range.label}>
// //                   <input
// //                     type="checkbox"
// //                     checked={selectedShippingRanges.includes(range.label)}
// //                     onChange={() =>
// //                       toggleSelection(range.label, setSelectedShippingRanges, selectedShippingRanges)
// //                     }
// //                   />
// //                   {range.label}
// //                 </label>
// //               ))}
// //             </div>

// //             <div className="filter-group">
// //               <label>Brand</label>
// //               {uniqueBrands.map((brand) => (
// //                 <label key={brand}>
// //                   <input
// //                     type="checkbox"
// //                     checked={brands.includes(brand)}
// //                     onChange={() => toggleSelection(brand, setBrands, brands)}
// //                   />
// //                   {brand}
// //                 </label>
// //               ))}
// //             </div>

// //             <div className="filter-group">
// //               <label>
// //                 <input
// //                   type="checkbox"
// //                   checked={inStock}
// //                   onChange={(e) => setInStock(e.target.checked)}
// //                 />
// //                 In Stock Only
// //               </label>
// //             </div>

// //             <button
// //               className="apply-filters-btn"
// //               onClick={() => setShowMobileFilters(false)}
// //             >
// //               Apply Filters
// //             </button>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// import React, { useState } from "react";
// import { useLocation, Link } from "react-router-dom";
// import { FaTimes, FaStar } from "react-icons/fa";
// import productsData from "../data/products.json";
// import "../styles/products.css";

// export default function ProductsPage() {
//   const useQuery = () => new URLSearchParams(useLocation().search);
//   const query = useQuery();
//   const category = query.get("category");

//   // Filters
//   const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
//   const [brands, setBrands] = useState([]);
//   const [inStock, setInStock] = useState(false);
//   const [selectedShippingRanges, setSelectedShippingRanges] = useState([]);
//   const [showMobileFilters, setShowMobileFilters] = useState(false);

//   const priceRanges = [
//     { label: "Under 1101", min: 0, max: 1100 },
//     { label: "1101 - 2612", min: 1101, max: 2612 },
//     { label: "2612 - 7312", min: 2612, max: 7312 },
//     { label: "7312 - 13391", min: 7312, max: 13391 },
//     { label: "13391 & Over", min: 13391, max: Infinity },
//   ];
//   const shippingRanges = [...priceRanges];
//   const uniqueBrands = [...new Set(productsData.map((p) => p.brand))];

//   const toggleSelection = (value, setter, stateArray) => {
//     if (stateArray.includes(value)) {
//       setter(stateArray.filter((v) => v !== value));
//     } else {
//       setter([...stateArray, value]);
//     }
//   };

//   // Filter products
//   const filteredProducts = productsData.filter((p) => {
//     const matchesCategory = category
//       ? p.category && p.category.toLowerCase() === category.toLowerCase()
//       : true;

//     const matchesPrice =
//       selectedPriceRanges.length === 0 ||
//       selectedPriceRanges.some((rangeLabel) => {
//         const range = priceRanges.find((r) => r.label === rangeLabel);
//         return p.price >= range.min && p.price <= range.max;
//       });

//     const matchesShipping =
//       selectedShippingRanges.length === 0 ||
//       selectedShippingRanges.some((rangeLabel) => {
//         const range = shippingRanges.find((r) => r.label === rangeLabel);
//         return p.shipping >= range.min && p.shipping <= range.max;
//       });

//     const matchesBrand = brands.length === 0 ? true : brands.includes(p.brand);
//     const matchesStock = inStock ? p.stock > 0 : true;

//     return (
//       matchesCategory &&
//       matchesPrice &&
//       matchesShipping &&
//       matchesBrand &&
//       matchesStock
//     );
//   });

//   // Pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const productsPerPage = 12;
//   const indexOfLast = currentPage * productsPerPage;
//   const indexOfFirst = indexOfLast - productsPerPage;
//   const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

//   // Helper for stock status
//   const renderStock = (product) => {
//     if (product.stock === 0) return <p className="card-stock-out">Out of Stock</p>;
//     if (product.stock <= 5) return <p className="card-stock-low">Only {product.stock} left</p>;
//     return <p className="card-stock-in">In Stock</p>;
//   };

//   return (
//     <div className="products-page container">
//       <div className="products-layout">
//         {/* Main Grid */}
//         <div className="products-grid-container">
//           <h1>{category ? `${category}` : "All Products"}</h1>
//           <hr />

//           {/* Product Grid */}
//           <div className="products-grid">
//             {currentProducts.length > 0 ? (
//               currentProducts.map((product) => (
//                 <div key={product.id} className="card-wrapper">
//                   <Link to={`/product/${product.id}`} className="card-link">
//                     {/* Discount badge */}
//                     {product.oldPrice && (
//                       <span className="card-discount-badge">
//                         -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
//                       </span>
//                     )}
//                     <img src={product.image} alt={product.name} className="card-image" />
//                   </Link>

//                   <div className="card-details">
//                     <Link to={`/product/${product.id}`} className="card-title">
//                       {product.name}
//                     </Link>

//                     {/* Ratings */}
//                     {product.rating && (
//                       <div className="card-rating">
//                         <FaStar className="card-star" />
//                         <span>{product.rating}</span>
//                         {product.reviews && <span>({product.reviews})</span>}
//                       </div>
//                     )}

//                     {/* Price */}
//                     <div className="card-price-section">
//                       <span className="card-price">₦{product.price}</span>
//                       {product.oldPrice && (
//                         <span className="card-old-price">₦{product.oldPrice}</span>
//                       )}
//                     </div>

//                     {renderStock(product)}
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p>No products found.</p>
//             )}
//           </div>

//           {/* Pagination Controls */}
//           {totalPages > 1 && (
//             <div className="pagination">
//               <button
//                 disabled={currentPage === 1}
//                 onClick={() => setCurrentPage(currentPage - 1)}
//               >
//                 Prev
//               </button>
//               {Array.from({ length: totalPages }, (_, i) => (
//                 <button
//                   key={i}
//                   className={currentPage === i + 1 ? "active" : ""}
//                   onClick={() => setCurrentPage(i + 1)}
//                 >
//                   {i + 1}
//                 </button>
//               ))}
//               <button
//                 disabled={currentPage === totalPages}
//                 onClick={() => setCurrentPage(currentPage + 1)}
//               >
//                 Next
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Mobile Filter Button */}
//         <div className="mobile-filter-wrapper">
//           <button
//             className="mobile-filter-btn"
//             onClick={() => setShowMobileFilters(true)}
//           >
//             Filter
//           </button>
//         </div>

//         {/* Sidebar for desktop */}
//         <aside className="filter-sidebar">
//           <h3>Filter</h3>

//           {/* Price Range */}
//           <div className="filter-group">
//             <label>Price Range (NGN)</label>
//             {priceRanges.map((range) => (
//               <label key={range.label}>
//                 <input
//                   type="checkbox"
//                   checked={selectedPriceRanges.includes(range.label)}
//                   onChange={() =>
//                     toggleSelection(range.label, setSelectedPriceRanges, selectedPriceRanges)
//                   }
//                 />
//                 {range.label}
//               </label>
//             ))}
//           </div>

//           {/* Shipping */}
//           <div className="filter-group">
//             <label>Shipping Price (NGN)</label>
//             {shippingRanges.map((range) => (
//               <label key={range.label}>
//                 <input
//                   type="checkbox"
//                   checked={selectedShippingRanges.includes(range.label)}
//                   onChange={() =>
//                     toggleSelection(range.label, setSelectedShippingRanges, selectedShippingRanges)
//                   }
//                 />
//                 {range.label}
//               </label>
//             ))}
//           </div>

//           {/* Brand */}
//           <div className="filter-group">
//             <label>Brand</label>
//             {uniqueBrands.map((brand) => (
//               <label key={brand}>
//                 <input
//                   type="checkbox"
//                   checked={brands.includes(brand)}
//                   onChange={() => toggleSelection(brand, setBrands, brands)}
//                 />
//                 {brand}
//               </label>
//             ))}
//           </div>

//           {/* Availability */}
//           <div className="filter-group">
//             <label>
//               <input
//                 type="checkbox"
//                 checked={inStock}
//                 onChange={(e) => setInStock(e.target.checked)}
//               />
//               In Stock Only
//             </label>
//           </div>
//         </aside>
//       </div>

//       {/* Mobile Filter Overlay */}
//       {showMobileFilters && (
//         <div className="mobile-filters-overlay">
//           <div className="mobile-filters-header">
//             <h3>Filters</h3>
//             <button className="filter-btn" onClick={() => setShowMobileFilters(false)}>
//               <FaTimes size={20} />
//             </button>
//           </div>
//           <div className="mobile-filters-body">
//             {/* Reuse filter content for mobile */}
//             <div className="filter-group">
//               <label>Price Range (NGN)</label>
//               {priceRanges.map((range) => (
//                 <label key={range.label}>
//                   <input
//                     type="checkbox"
//                     checked={selectedPriceRanges.includes(range.label)}
//                     onChange={() =>
//                       toggleSelection(range.label, setSelectedPriceRanges, selectedPriceRanges)
//                     }
//                   />
//                   {range.label}
//                 </label>
//               ))}
//             </div>

//             <div className="filter-group">
//               <label>Shipping Price (NGN)</label>
//               {shippingRanges.map((range) => (
//                 <label key={range.label}>
//                   <input
//                     type="checkbox"
//                     checked={selectedShippingRanges.includes(range.label)}
//                     onChange={() =>
//                       toggleSelection(range.label, setSelectedShippingRanges, selectedShippingRanges)
//                     }
//                   />
//                   {range.label}
//                 </label>
//               ))}
//             </div>

//             <div className="filter-group">
//               <label>Brand</label>
//               {uniqueBrands.map((brand) => (
//                 <label key={brand}>
//                   <input
//                     type="checkbox"
//                     checked={brands.includes(brand)}
//                     onChange={() => toggleSelection(brand, setBrands, brands)}
//                   />
//                   {brand}
//                 </label>
//               ))}
//             </div>

//             <div className="filter-group">
//               <label>
//                 <input
//                   type="checkbox"
//                   checked={inStock}
//                   onChange={(e) => setInStock(e.target.checked)}
//                 />
//                 In Stock Only
//               </label>
//             </div>

//             <button
//               className="apply-filters-btn"
//               onClick={() => setShowMobileFilters(false)}
//             >
//               Apply Filters
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { FaTimes, FaStar } from "react-icons/fa";
import productsData from "../data/products.json";
import "../styles/products.css";

export default function ProductsPage() {
  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();
  const category = query.get("category");

  // Filters
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [brands, setBrands] = useState([]);
  const [inStock, setInStock] = useState(false);
  const [selectedShippingRanges, setSelectedShippingRanges] = useState([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const priceRanges = [
    { label: "Under 1101", min: 0, max: 1100 },
    { label: "1101 - 2612", min: 1101, max: 2612 },
    { label: "2612 - 7312", min: 2612, max: 7312 },
    { label: "7312 - 13391", min: 7312, max: 13391 },
    { label: "13391 & Over", min: 13391, max: Infinity },
  ];
  const shippingRanges = [...priceRanges];
  const uniqueBrands = [...new Set(productsData.map((p) => p.brand))];

  const toggleSelection = (value, setter, stateArray) => {
    if (stateArray.includes(value)) {
      setter(stateArray.filter((v) => v !== value));
    } else {
      setter([...stateArray, value]);
    }
  };

  // Filter products
  const filteredProducts = productsData.filter((p) => {
    const matchesCategory = category
      ? p.category && p.category.toLowerCase() === category.toLowerCase()
      : true;

    const matchesPrice =
      selectedPriceRanges.length === 0 ||
      selectedPriceRanges.some((rangeLabel) => {
        const range = priceRanges.find((r) => r.label === rangeLabel);
        return p.price >= range.min && p.price <= range.max;
      });

    const matchesShipping =
      selectedShippingRanges.length === 0 ||
      selectedShippingRanges.some((rangeLabel) => {
        const range = shippingRanges.find((r) => r.label === rangeLabel);
        return p.shipping >= range.min && p.shipping <= range.max;
      });

    const matchesBrand = brands.length === 0 ? true : brands.includes(p.brand);
    const matchesStock = inStock ? p.stock > 0 : true;

    return (
      matchesCategory &&
      matchesPrice &&
      matchesShipping &&
      matchesBrand &&
      matchesStock
    );
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Helper for stock status
  const renderStock = (product) => {
    if (product.stock === 0) return <p className="card-stock-out">Out of Stock</p>;
    if (product.stock <= 5) return <p className="card-stock-low">Only {product.stock} left</p>;
    return <p className="card-stock-in">In Stock</p>;
  };

  return (
    <div className="products-page container">
      <div className="products-layout">
        {/* Main Grid */}
        <div className="products-grid-container">
          <h1>{category ? `${category}` : "All Products"}</h1>
          <hr />

          {/* Product Grid */}
          <div className="products-grid">
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <div key={product.id} className="card-wrapper">
                  <Link to={`/product/${product.id}`} className="card-link">
                    {/* Discount badge */}
                    {product.oldPrice && (
                      <span className="card-discount-badge">
                        -
                        {Math.round(
                          ((product.oldPrice - product.price) / product.oldPrice) * 100
                        )}
                        %
                      </span>
                    )}
                    <img src={product.image} alt={product.name} className="card-image" />
                  </Link>

                  <div className="card-details">
                    <Link to={`/product/${product.id}`} className="card-title">
                      {product.name}
                    </Link>

                    {/* Ratings */}
                    {product.rating && (
                      <div className="card-rating">
                        <FaStar className="card-star" />
                        <span>{product.rating}</span>
                        {product.reviews && <span>({product.reviews})</span>}
                      </div>
                    )}

                    {/* Price */}
                    <div className="card-price-section">
                      <span className="card-price">₦{product.price}</span>
                      {product.oldPrice && (
                        <span className="card-old-price">₦{product.oldPrice}</span>
                      )}
                    </div>

                    {/* Stock Text */}
                    {renderStock(product)}

                    {/* Stock Meter */}
                    {product.stock > 0 && (
                      <div className="stock-meter">
                        <meter
                          value={product.stock}
                          min="0"
                          max={product.maxStock || 100}
                        ></meter>
                        <p>{product.stock} items left</p>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p>No products found.</p>
            )}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  className={currentPage === i + 1 ? "active" : ""}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </button>
            </div>
          )}
        </div>

        {/* Mobile Filter Button */}
        <div className="mobile-filter-wrapper">
          <button
            className="mobile-filter-btn"
            onClick={() => setShowMobileFilters(true)}
          >
            Filter
          </button>
        </div>

        {/* Sidebar for desktop */}
        <aside className="filter-sidebar">
          <h3>Filter</h3>

          {/* Price Range */}
          <div className="filter-group">
            <label>Price Range (NGN)</label>
            {priceRanges.map((range) => (
              <label key={range.label}>
                <input
                  type="checkbox"
                  checked={selectedPriceRanges.includes(range.label)}
                  onChange={() =>
                    toggleSelection(range.label, setSelectedPriceRanges, selectedPriceRanges)
                  }
                />
                {range.label}
              </label>
            ))}
          </div>

          {/* Shipping */}
          <div className="filter-group">
            <label>Shipping Price (NGN)</label>
            {shippingRanges.map((range) => (
              <label key={range.label}>
                <input
                  type="checkbox"
                  checked={selectedShippingRanges.includes(range.label)}
                  onChange={() =>
                    toggleSelection(
                      range.label,
                      setSelectedShippingRanges,
                      selectedShippingRanges
                    )
                  }
                />
                {range.label}
              </label>
            ))}
          </div>

          {/* Brand */}
          <div className="filter-group">
            <label>Brand</label>
            {uniqueBrands.map((brand) => (
              <label key={brand}>
                <input
                  type="checkbox"
                  checked={brands.includes(brand)}
                  onChange={() => toggleSelection(brand, setBrands, brands)}
                />
                {brand}
              </label>
            ))}
          </div>

          {/* Availability */}
          <div className="filter-group">
            <label>
              <input
                type="checkbox"
                checked={inStock}
                onChange={(e) => setInStock(e.target.checked)}
              />
              In Stock Only
            </label>
          </div>
        </aside>
      </div>

      {/* Mobile Filter Overlay */}
      {showMobileFilters && (
        <div className="mobile-filters-overlay">
          <div className="mobile-filters-header">
            <h3>Filters</h3>
            <button className="filter-btn" onClick={() => setShowMobileFilters(false)}>
              <FaTimes size={20} />
            </button>
          </div>
          <div className="mobile-filters-body">
            {/* Reuse filter content for mobile */}
            <div className="filter-group">
              <label>Price Range (NGN)</label>
              {priceRanges.map((range) => (
                <label key={range.label}>
                  <input
                    type="checkbox"
                    checked={selectedPriceRanges.includes(range.label)}
                    onChange={() =>
                      toggleSelection(range.label, setSelectedPriceRanges, selectedPriceRanges)
                    }
                  />
                  {range.label}
                </label>
              ))}
            </div>

            <div className="filter-group">
              <label>Shipping Price (NGN)</label>
              {shippingRanges.map((range) => (
                <label key={range.label}>
                  <input
                    type="checkbox"
                    checked={selectedShippingRanges.includes(range.label)}
                    onChange={() =>
                      toggleSelection(
                        range.label,
                        setSelectedShippingRanges,
                        selectedShippingRanges
                      )
                    }
                  />
                  {range.label}
                </label>
              ))}
            </div>

            <div className="filter-group">
              <label>Brand</label>
              {uniqueBrands.map((brand) => (
                <label key={brand}>
                  <input
                    type="checkbox"
                    checked={brands.includes(brand)}
                    onChange={() => toggleSelection(brand, setBrands, brands)}
                  />
                  {brand}
                </label>
              ))}
            </div>

            <div className="filter-group">
              <label>
                <input
                  type="checkbox"
                  checked={inStock}
                  onChange={(e) => setInStock(e.target.checked)}
                />
                In Stock Only
              </label>
            </div>

            <button
              className="apply-filters-btn"
              onClick={() => setShowMobileFilters(false)}
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
