// src/components/home/CategoriesSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './CategoriesSection.css';

// Sample categories
const categories = [
  { id: 1, name: 'Music', icon: '/assets/images/icons/music.svg', count: 120 },
  { id: 2, name: 'Tech', icon: '/assets/images/icons/tech.svg', count: 85 },
  { id: 3, name: 'Art', icon: '/assets/images/icons/art.svg', count: 67 },
  { id: 4, name: 'Sports', icon: '/assets/images/icons/sports.svg', count: 92 },
  { id: 5, name: 'Food', icon: '/assets/images/icons/food.svg', count: 110 },
  { id: 6, name: 'Education', icon: '/assets/images/icons/education.svg', count: 78 }
];

const CategoriesSection = ({ viewAllTo }) => {
  return (
    <section className="categories-section">
      <div className="categories-section__container">
        <div className="categories-section__header">
          <h2 className="categories-section__title">Browse by Category</h2>
          <Link to={viewAllTo || '/categories'} className="categories-section__view-all">
            View All <span className="arrow">→</span>
          </Link>
        </div>

        <div className="categories-section__grid">
          {categories.map(category => (
            <Link 
              key={category.id} 
              to={`/events?category=${category.name.toLowerCase()}`} 
              className="category-card"
            >
              <img 
                src={category.icon} 
                alt={category.name} 
                className="category-card__icon" 
              />
              <h3 className="category-card__name">{category.name}</h3>
              <span className="category-card__count">{category.count} events</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;