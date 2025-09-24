import React from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import productsData from "../data/products.json";
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

export default function Home() {
  // Shuffle and split products into 3 groups of 10
  const shuffled = shuffleArray(productsData);
  const featured = shuffled.slice(0, 10);
  const recommended = shuffled.slice(10, 20);
  const deals = shuffled.slice(20, 30);

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero-overlay">
          <h1>Welcome to Your Store</h1>
          <p>Shop the best deals, all in one place.</p>
          <a href="#featured" className="hero-btn">
            Shop Now
          </a>
        </div> 
      </section>

      {/* Categories */}
      <section className="categories container">
        <h2>Shop by Category</h2>
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
          <CategoryCard
            name="Children"
            img="https://images.unsplash.com/photo-1615085457637-425d9b184c99?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGtpZHMlMjBhbmQlMjB0b3lzfGVufDB8fDB8fHww"
          />
          <CategoryCard
            name="Books"
            img="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Ym9va3N8ZW58MHx8MHx8fDA%3D"
          />
          {/* <CategoryCard
            name="Baby Products"
            img="https://plus.unsplash.com/premium_photo-1661425708655-f36618f20fa8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzN8fGJhYnklMjBwcm9kdWN0c3xlbnwwfHwwfHx8MA%3D%3D"
          />
          <CategoryCard
            name="Health & Beauty"
            img=""
          /> */}
        </div>
      </section>

      {/* Sections with arrows */}
      <ProductSection
        id="featured"
        title="Featured Products"
        products={featured}
        headerColor="orange"
      />
      <ProductSection
        id="recommended"
        title="Recommended for You"
        products={recommended}
        headerColor="orange"
      />
      <ProductSection
        id="deals"
        title="Top Deals"
        products={deals}
        headerColor="red"
      />
    </div>
  );
}

