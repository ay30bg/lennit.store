// import React, { useState, useEffect, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import Banner from "../assets/banner 2.png";
// import SecondBanner from "../assets/Banner.png";
// import ThirdBanner from "../assets/banner 3.png";
// import ProductCard from "../components/ProductCard";
// import productsData from "../data/products.json";
// import "../styles/home.css";

// // Utility: shuffle array
// function shuffleArray(array) {
//   const arr = [...array];
//   for (let i = arr.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [arr[i], arr[j]] = [arr[j], arr[i]];
//   }
//   return arr;
// }

// // Scroll helper
// function scrollGrid(section, offset) {
//   const el = document.getElementById(`${section}-grid`);
//   if (el) {
//     el.scrollBy({ left: offset, behavior: "smooth" });
//   }
// }

// // Category Card Component
// function CategoryCard({ name, img }) {
//   const navigate = useNavigate();
//   return (
//     <div
//       className="category-card"
//       onClick={() => navigate(`/products?category=${name}`)}
//     >
//       <img src={img} alt={name} />
//       <span>{name}</span>
//     </div>
//   );
// }

// // Reusable Product Section
// function ProductSection({ id, title, products, headerColor }) {
//   return (
//     <section className={`${id} container`}>
//       <div className={`${id}-header`} style={{ background: headerColor }}>
//         <h2>{title}</h2>
//       </div>

//       {/* Left / Right Arrows */}
//       <button
//         className="scroll-arrow left"
//         onClick={() => scrollGrid(id, -300)}
//       >
//         ‹
//       </button>
//       <button
//         className="scroll-arrow right"
//         onClick={() => scrollGrid(id, 300)}
//       >
//         ›
//       </button>

//       <div className="product-grid" id={`${id}-grid`}>
//         {products.map((p) => (
//           <ProductCard key={p.id} product={p} />
//         ))}
//       </div>
//     </section>
//   );
// }

// // ✅ Slides data OUTSIDE components
// const slides = [
//   {
//     img: Banner,
//     title: "Welcome to Your Store",
//     desc: "Shop the best deals, all in one place",
//     btn: "#featured",
//   },
//   {
//     img: SecondBanner,
//     title: "Big Savings",
//     desc: "Up to 50% Off Electronics",
//     btn: "#deals",
//   },
//   {
//     img: ThirdBanner,
//     title: "Latest Fashion",
//     desc: "Trendy looks for everyone",
//     btn: "#recommended",
//   },
// ];

// // ✅ HeroSlider component
// function HeroSlider() {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   // Auto slide
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % slides.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="hero-main">
//       {slides.map((slide, index) => (
//         <div
//           key={index}
//           className={`hero-slide ${index === currentSlide ? "active" : ""}`}
//         >
//           <img src={slide.img} alt={slide.title} />
//         </div>
//       ))}

//       {/* Arrows */}
//       <button
//         className="hero-arrow left"
//         onClick={() =>
//           setCurrentSlide((currentSlide - 1 + slides.length) % slides.length)
//         }
//       >
//         ‹
//       </button>
//       <button
//         className="hero-arrow right"
//         onClick={() =>
//           setCurrentSlide((currentSlide + 1) % slides.length)
//         }
//       >
//         ›
//       </button>

//       {/* Dots */}
//       <div className="hero-dots">
//         {slides.map((_, i) => (
//           <span
//             key={i}
//             className={`dot ${i === currentSlide ? "active" : ""}`}
//             onClick={() => setCurrentSlide(i)}
//           ></span>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default function Home() {
//   const navigate = useNavigate(); // ✅ added navigate here

//   // Shuffle products only once
//   const shuffled = useMemo(() => shuffleArray(productsData), []);
//   const featured = shuffled.slice(0, 10);
//   const recommended = shuffled.slice(10, 20);
//   const deals = shuffled.slice(20, 30);
//   const flash = shuffled.slice(30, 40);

//   const sidebarCategories = [
//     "Electronics",
//     "Kitchen",
//     "Fashion",
//     "Children",
//     "Accessories",
//     "Books",
//     "Cosmetics",
//     "Baby Products",
//   ];

//   return (
//     <div className="home">
//       {/* Hero with sidebar + right promos */}
//       <section className="hero container">
//         <div className="hero-layout">
//           <aside className="hero-sidebar">
//             <ul>
//               {sidebarCategories.map((category) => (
//                 <li
//                   key={category}
//                   onClick={() => navigate(`/products?category=${category}`)}
//                   style={{ cursor: "pointer" }}
//                 >
//                   {category}
//                 </li>
//               ))}
//             </ul>
//           </aside>

//           {/* ✅ Only this re-renders when slideshow changes */}
//           <HeroSlider />

//           <div className="hero-right">
//             <img
//               src="https://via.placeholder.com/200x250?text=Promo+1"
//               alt="Promo 1"
//             />
//             <img
//               src="https://via.placeholder.com/200x250?text=Promo+2"
//               alt="Promo 2"
//             />
//           </div>
//         </div>
//       </section>

//       {/* Product Sections */}
//       <ProductSection
//         id="flash"
//         title="Flash Sales"
//         products={flash}
//         headerColor="red"
//       />

//       {/* Categories */}
//       <section className="categories container">
//         <div className="category-grid">
//           <CategoryCard
//             name="Electronics"
//             img="https://blog.hignellrentals.com/hubfs/Imported_Blog_Media/Untitled%20design%20(1).png"
//           />
//           <CategoryCard
//             name="Fashion"
//             img="https://media.gettyimages.com/id/1676665264/photo/cheerful-friends-laughing-against-sky.jpg?s=612x612&w=0&k=20&c=vD3scifjFv8lgEGCO4475F1m7uFpCzBmLqY-Is90BIA="
//           />
//           <CategoryCard
//             name="Accessories"
//             img="https://media.gettyimages.com/id/2091553646/photo/set-of-fashion-collection-with-trendy-fashion-clothes-and-make-up-cosmetic-products-for-women.jpg?s=612x612&w=0&k=20&c=EhDGoneATuFlxph0okJIE3yam2EuuM0iq5LCudehhyY="
//           />
//           <CategoryCard
//             name="Kitchen"
//             img="https://media.gettyimages.com/id/1135086435/photo/a-serene-zero-waste-kitchen-scene-close-up.jpg?s=612x612&w=0&k=20&c=AtqHW8x7MzqGvP1sPos92BCnQzf1S54p_am0GtEQQPg="
//           />
//           <CategoryCard
//             name="Children"
//             img="https://images.unsplash.com/photo-1615085457637-425d9b184c99?w=600&auto=format&fit=crop&q=60"
//           />
//           <CategoryCard
//             name="Books"
//             img="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=60"
//           />
//           <CategoryCard
//             name="Cosmetics"
//             img="https://media.istockphoto.com/id/2173920020/photo/beauty-and-fashion.webp?a=1&b=1&s=612x612&w=0&k=20&c=bu-MxjvsHegsjB0-TUvdWTLWctGTvK4AbD7s6AAQSZI="
//           />
//           <CategoryCard
//             name="Baby Products"
//             img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTSzBCFm6li2q0zjD-BsOyrl6JVfjtcL7ycA&s"
//           />
//         </div>
//       </section>

//       <ProductSection
//         id="recommended"
//         title="Recommended for You"
//         products={recommended}
//         headerColor="orange"
//       />

//       <ProductSection
//         id="featured"
//         title="Featured Products"
//         products={featured}
//         headerColor="orange"
//       />

//       <ProductSection
//         id="deals"
//         title="Top Deals"
//         products={deals}
//         headerColor="orange"
//       />
//     </div>
//   );
// }

import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Banner from "../assets/banner 2.png";
import SecondBanner from "../assets/Banner.png";
import ThirdBanner from "../assets/banner 3.png";
import ProductCard from "../components/ProductCard";
import productsData from "../data/products.json";
import { FaLaptop, FaTshirt, FaBaby, FaBook, FaBlender } from "react-icons/fa";
import { GiLipstick } from "react-icons/gi";
import { MdWatch } from "react-icons/md";
import { FaChildDress } from "react-icons/fa6";
import "../styles/home.css";

// Utility: shuffle array
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Scroll helper
function scrollGrid(section, offset) {
  const el = document.getElementById(`${section}-grid`);
  if (el) {
    el.scrollBy({ left: offset, behavior: "smooth" });
  }
}

// Category Card Component
function CategoryCard({ name, img }) {
  const navigate = useNavigate();
  return (
    <div
      className="category-card"
      onClick={() => navigate(`/products?category=${name}`)}
    >
      <img src={img} alt={name} />
      <span>{name}</span>
    </div>
  );
}

// Reusable Product Section
function ProductSection({ id, title, products, headerColor }) {
  return (
    <section className={`${id} container`}>
      <div className={`${id}-header`} style={{ background: headerColor }}>
        <h2>{title}</h2>
      </div>

      {/* Left / Right Arrows */}
      <button
        className="scroll-arrow left"
        onClick={() => scrollGrid(id, -300)}
      >
        ‹
      </button>
      <button
        className="scroll-arrow right"
        onClick={() => scrollGrid(id, 300)}
      >
        ›
      </button>

      <div className="product-grid" id={`${id}-grid`}>
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}

// ✅ Slides data OUTSIDE components
const slides = [
  {
    img: Banner,
    title: "Welcome to Your Store",
    desc: "Shop the best deals, all in one place",
    btn: "#featured",
  },
  {
    img: SecondBanner,
    title: "Big Savings",
    desc: "Up to 50% Off Electronics",
    btn: "#deals",
  },
  {
    img: ThirdBanner,
    title: "Latest Fashion",
    desc: "Trendy looks for everyone",
    btn: "#recommended",
  },
];

// ✅ HeroSlider component
function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero-main">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`hero-slide ${index === currentSlide ? "active" : ""}`}
        >
          <img src={slide.img} alt={slide.title} />
        </div>
      ))}

      {/* Arrows */}
      <button
        className="hero-arrow left"
        onClick={() =>
          setCurrentSlide((currentSlide - 1 + slides.length) % slides.length)
        }
      >
        ‹
      </button>
      <button
        className="hero-arrow right"
        onClick={() =>
          setCurrentSlide((currentSlide + 1) % slides.length)
        }
      >
        ›
      </button>

      {/* Dots */}
      <div className="hero-dots">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === currentSlide ? "active" : ""}`}
            onClick={() => setCurrentSlide(i)}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();

  // Shuffle products only once
  const shuffled = useMemo(() => shuffleArray(productsData), []);
  const featured = shuffled.slice(0, 10);
  const recommended = shuffled.slice(10, 20);
  const deals = shuffled.slice(20, 30);
  const flash = shuffled.slice(30, 40);

  // ✅ Sidebar categories with icons
  const sidebarCategories = [
    { name: "Electronics", icon: <FaLaptop /> },
    { name: "Kitchen", icon: <FaBlender /> },
    { name: "Fashion", icon: <FaTshirt /> },
    { name: "Children", icon: <FaChildDress /> },
    { name: "Accessories", icon: <MdWatch /> },
    { name: "Books", icon: <FaBook /> },
    { name: "Cosmetics", icon: <GiLipstick /> },
    { name: "Baby Products", icon: <FaBaby /> },
  ];

  return (
    <div className="home">
      {/* Hero with sidebar + right promos */}
      <section className="hero container">
        <div className="hero-layout">
          <aside className="hero-sidebar">
            <ul>
              {sidebarCategories.map((category) => (
                <li
                  key={category.name}
                  onClick={() => navigate(`/products?category=${category.name}`)}
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  {category.icon}
                  <span>{category.name}</span>
                </li>
              ))}
            </ul>
          </aside>

          {/* ✅ Only this re-renders when slideshow changes */}
          <HeroSlider />

          <div className="hero-right">
            <img
              src="https://via.placeholder.com/200x250?text=Promo+1"
              alt="Promo 1"
            />
            <img
              src="https://via.placeholder.com/200x250?text=Promo+2"
              alt="Promo 2"
            />
          </div>
        </div>
      </section>

      {/* Product Sections */}
      <ProductSection
        id="flash"
        title="Flash Sales"
        products={flash}
        headerColor="red"
      />

      {/* Categories */}
      <section className="categories container">
        <div className="category-grid">
          <CategoryCard
            name="Electronics"
            img="https://blog.hignellrentals.com/hubfs/Imported_Blog_Media/Untitled%20design%20(1).png"
          />
          <CategoryCard
            name="Fashion"
            img="https://media.gettyimages.com/id/1676665264/photo/cheerful-friends-laughing-against-sky.jpg?s=612x612&w=0&k=20&c=vD3scifjFv8lgEGCO4475F1m7uFpCzBmLqY-Is90BIA="
          />
          <CategoryCard
            name="Accessories"
            img="https://media.gettyimages.com/id/2091553646/photo/set-of-fashion-collection-with-trendy-fashion-clothes-and-make-up-cosmetic-products-for-women.jpg?s=612x612&w=0&k=20&c=EhDGoneATuFlxph0okJIE3yam2EuuM0iq5LCudehhyY="
          />
          <CategoryCard
            name="Kitchen"
            img="https://media.gettyimages.com/id/1135086435/photo/a-serene-zero-waste-kitchen-scene-close-up.jpg?s=612x612&w=0&k=20&c=AtqHW8x7MzqGvP1sPos92BCnQzf1S54p_am0GtEQQPg="
          />
          {/* <CategoryCard
            name="Children"
            img="https://images.unsplash.com/photo-1615085457637-425d9b184c99?w=600&auto=format&fit=crop&q=60"
          />
          <CategoryCard
            name="Books"
            img="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=60"
          />
          <CategoryCard
            name="Cosmetics"
            img="https://media.istockphoto.com/id/2173920020/photo/beauty-and-fashion.webp?a=1&b=1&s=612x612&w=0&k=20&c=bu-MxjvsHegsjB0-TUvdWTLWctGTvK4AbD7s6AAQSZI="
          />
          <CategoryCard
            name="Baby Products"
            img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTSzBCFm6li2q0zjD-BsOyrl6JVfjtcL7ycA&s"
          /> */}
        </div>
      </section>

      <ProductSection
        id="recommended"
        title="Recommended for You"
        products={recommended}
        headerColor="orange"
      />

      <ProductSection
        id="featured"
        title="Featured Products"
        products={featured}
        headerColor="orange"
      />

      <ProductSection
        id="deals"
        title="Top Deals"
        products={deals}
        headerColor="orange"
      />
    </div>
  );
}
