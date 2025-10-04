import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import "../styles/rating.css";

export default function Rating({ average, reviews, onRate }) {
  const [hover, setHover] = useState(null);
  const [selected, setSelected] = useState(0);

  const handleClick = (rating) => {
    setSelected(rating);
    if (onRate) onRate(rating); // callback to parent if needed
  };

  return (
    <div className="rating-section">
      <div className="stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            size={22}
            className={
              (hover || selected || average) >= star ? "star filled" : "star"
            }
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(null)}
            onClick={() => handleClick(star)}
          />
        ))}
      </div>
      <p className="reviews">
        {average.toFixed(1)} / 5 ({reviews} reviews)
      </p>
    </div>
  );
}
