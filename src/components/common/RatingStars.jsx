import React from 'react';
import './RatingStars.css';

const RatingStars = ({ rating = 0 }) => {
  const stars = [];
  
  for (let i = 1; i <= 5; i++) {
    const filled = i <= Math.floor(rating);
    const halfFilled = !filled && i - 0.5 <= rating;
    
    stars.push(
      <span 
        key={i} 
        className={`rating-star ${
          filled ? 'rating-star--filled' : 
          halfFilled ? 'rating-star--half' : ''
        }`}
      >
        {filled ? '★' : halfFilled ? '½' : '☆'}
      </span>
    );
  }

  return (
    <div className="rating-stars">
      {stars}
      <span className="rating-stars__value">{rating.toFixed(1)}</span>
    </div>
  );
};

export default RatingStars;