// // // src/pages/SearchPage.jsx
// // import React, { useState, useEffect } from "react";
// // import { useLocation, Link } from "react-router-dom";
// // import productsData from "../data/products.json";
// // import "../styles/search.css";

// // export default function SearchPage() {
// //   const location = useLocation();
// //   const params = new URLSearchParams(location.search);
// //   const initialQuery = params.get("q") || "";

// //   const [query, setQuery] = useState(initialQuery);
// //   const [results, setResults] = useState([]);

// //   useEffect(() => {
// //     if (query.trim() === "") {
// //       setResults(productsData);
// //     } else {
// //       const filtered = productsData.filter((product) =>
// //         product.name.toLowerCase().includes(query.toLowerCase())
// //       );
// //       setResults(filtered);
// //     }
// //   }, [query]);

// //   return (
// //     <div className="search-page">
// //       {/* Search Bar */}
// //       <div className="search-bar-container">
// //         <input
// //           type="text"
// //           placeholder="Search for products, brands and categories"
// //           value={query}
// //           onChange={(e) => setQuery(e.target.value)}
// //           className="search-input"
// //         />
// //       </div>

// //       {/* Results Count */}
// //       <div className="results-count">
// //         {results.length} items found
// //       </div>

// //       {/* Products Grid */}
// //       <div className="products-grid">
// //         {results.map((product) => (
// //           <Link
// //             to={`/product/${product.id}`}
// //             key={product.id}
// //             className="product-card"
// //           >
// //             <div className="product-image">
// //               <img src={product.image} alt={product.name} />
// //             </div>
// //             <div className="product-info">
// //               <h4 className="product-name">{product.name}</h4>
// //               <p className="product-price">₦{product.price}</p>
// //               {product.oldPrice && (
// //                 <p className="product-old-price">
// //                   ₦{product.oldPrice} <span className="discount">-{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%</span>
// //                 </p>
// //               )}
// //             </div>
// //           </Link>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // src/pages/SearchPage.jsx
// import React, { useState, useEffect } from "react";
// import { useLocation, Link } from "react-router-dom";
// import productsData from "../data/products.json";
// import "../styles/search.css";

// export default function SearchPage() {
//   const location = useLocation();
//   const params = new URLSearchParams(location.search);
//   const initialQuery = params.get("q") || "";

//   const [query, setQuery] = useState(initialQuery);
//   const [results, setResults] = useState([]);
//   const [sortOption, setSortOption] = useState("relevance");

//   useEffect(() => {
//     let filtered = [];

//     if (query.trim() === "") {
//       filtered = productsData;
//     } else {
//       filtered = productsData.filter((product) =>
//         product.name.toLowerCase().includes(query.toLowerCase())
//       );
//     }

//     // Apply sorting
//     if (sortOption === "priceLowHigh") {
//       filtered = [...filtered].sort((a, b) => a.price - b.price);
//     } else if (sortOption === "priceHighLow") {
//       filtered = [...filtered].sort((a, b) => b.price - a.price);
//     } else if (sortOption === "discount") {
//       filtered = [...filtered].sort((a, b) => {
//         const discountA = a.oldPrice
//           ? ((a.oldPrice - a.price) / a.oldPrice) * 100
//           : 0;
//         const discountB = b.oldPrice
//           ? ((b.oldPrice - b.price) / b.oldPrice) * 100
//           : 0;
//         return discountB - discountA;
//       });
//     }

//     setResults(filtered);
//   }, [query, sortOption]);

//   return (
//     <div className="search-page">
//       {/* Search Bar */}
//       <div className="search-bar-container">
//         <input
//           type="text"
//           placeholder="Search for products, brands and categories"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           className="search-input"
//         />
//       </div>

//       {/* Results Header */}
//       <div className="results-header">
//         <div className="results-count">{results.length} items found</div>

//         <div className="sort-container">
//           <label htmlFor="sort" className="sort-label">
//             Sort by:
//           </label>
//           <select
//             id="sort"
//             value={sortOption}
//             onChange={(e) => setSortOption(e.target.value)}
//             className="sort-select"
//           >
//             <option value="relevance">Relevance</option>
//             <option value="priceLowHigh">Price: Low to High</option>
//             <option value="priceHighLow">Price: High to Low</option>
//             <option value="discount">Biggest Discount</option>
//           </select>
//         </div>
//       </div>

//       {/* Products Grid */}
//       <div className="products-grid">
//         {results.map((product) => (
//           <Link
//             to={`/product/${product.id}`}
//             key={product.id}
//             className="product-card"
//           >
//             <div className="product-image">
//               <img src={product.image} alt={product.name} />
//             </div>
//             <div className="product-info">
//               <h4 className="product-name">{product.name}</h4>
//               <p className="product-price">₦{product.price.toLocaleString()}</p>
//               {product.oldPrice && (
//                 <p className="product-old-price">
//                   ₦{product.oldPrice.toLocaleString()}{" "}
//                   <span className="discount">
//                     -
//                     {Math.round(
//                       ((product.oldPrice - product.price) / product.oldPrice) *
//                         100
//                     )}
//                     %
//                   </span>
//                 </p>
//               )}
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }

// src/pages/SearchPage.jsx
import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import productsData from "../data/products.json";
import "../styles/search.css";

export default function SearchPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialQuery = params.get("q") || "";

  const [query] = useState(initialQuery);
  const [results, setResults] = useState([]);
  const [sortOption, setSortOption] = useState("relevance");

  useEffect(() => {
    let filtered = [];

    if (query.trim() === "") {
      filtered = productsData;
    } else {
      filtered = productsData.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Apply sorting
    if (sortOption === "priceLowHigh") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortOption === "priceHighLow") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    } else if (sortOption === "discount") {
      filtered = [...filtered].sort((a, b) => {
        const discountA = a.oldPrice
          ? ((a.oldPrice - a.price) / a.oldPrice) * 100
          : 0;
        const discountB = b.oldPrice
          ? ((b.oldPrice - b.price) / b.oldPrice) * 100
          : 0;
        return discountB - discountA;
      });
    }

    setResults(filtered);
  }, [query, sortOption]);

  return (
    <div className="search-page">
      {/* Results Header */}
      <div className="results-header">
        <div className="results-count">{results.length} items found</div>

        <div className="sort-container">
          <label htmlFor="sort" className="sort-label">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="sort-select"
          >
            <option value="relevance">Relevance</option>
            <option value="priceLowHigh">Price: Low to High</option>
            <option value="priceHighLow">Price: High to Low</option>
            <option value="discount">Biggest Discount</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="products-grid">
        {results.map((product) => (
          <Link
            to={`/product/${product.id}`}
            key={product.id}
            className="product-card"
          >
            <div className="product-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="product-info">
              <h4 className="product-name">{product.name}</h4>
              <p className="product-price">₦{product.price.toLocaleString()}</p>
              {product.oldPrice && (
                <p className="product-old-price">
                  ₦{product.oldPrice.toLocaleString()}{" "}
                  <span className="discount">
                    -
                    {Math.round(
                      ((product.oldPrice - product.price) / product.oldPrice) *
                        100
                    )}
                    %
                  </span>
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
