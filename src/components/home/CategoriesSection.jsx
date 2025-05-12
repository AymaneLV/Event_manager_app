import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMusic, 
  faLaptopCode, 
  faPalette, 
  faRunning, 
  faUtensils, 
  faGraduationCap 
} from '@fortawesome/free-solid-svg-icons';
import './CategoriesSection.css';

// Updated categories with Font Awesome icons
const categories = [
  { id: 1, name: 'Music', icon: faMusic, count: 120 },
  { id: 2, name: 'Tech', icon: faLaptopCode, count: 85 },
  { id: 3, name: 'Art', icon: faPalette, count: 67 },
  { id: 4, name: 'Sports', icon: faRunning, count: 92 },
  { id: 5, name: 'Food', icon: faUtensils, count: 110 },
  { id: 6, name: 'Education', icon: faGraduationCap, count: 78 }
];

const CategoriesSection = ({ viewAllTo }) => {
  const scrollContainerRef = useRef(null);
  const scrollIntervalRef = useRef(null);

  // Auto-scroll functionality
  useEffect(() => {
    const startAutoScroll = () => {
      scrollIntervalRef.current = setInterval(() => {
        if (scrollContainerRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
          const maxScroll = scrollWidth - clientWidth;
          const nextScroll = scrollLeft + 200 >= maxScroll ? 0 : scrollLeft + 200;
          
          scrollContainerRef.current.scrollTo({
            left: nextScroll,
            behavior: 'smooth'
          });
        }
      }, 3000);
    };

    const stopAutoScroll = () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
        scrollIntervalRef.current = null;
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('mouseenter', stopAutoScroll);
      container.addEventListener('mouseleave', startAutoScroll);
      startAutoScroll();
    }

    return () => {
      stopAutoScroll();
      if (container) {
        container.removeEventListener('mouseenter', stopAutoScroll);
        container.removeEventListener('mouseleave', startAutoScroll);
      }
    };
  }, []);

  return (
    <section className="categories-section">
      <div className="categories-section__container">
        <div className="categories-section__header">
          <h2 className="categories-section__title">Browse by Category</h2>
          <Link to={viewAllTo || '/categories'} className="categories-section__view-all">
            View All <span className="arrow">→</span>
          </Link>
        </div>

        <div className="categories-section__grid" ref={scrollContainerRef}>
          {categories.map(category => (
            <Link 
              key={category.id} 
              to={`/events?category=${category.name.toLowerCase()}`} 
              className="category-card"
            >
              <div className="category-card__icon-container">
                <FontAwesomeIcon 
                  icon={category.icon} 
                  className="category-card__icon" 
                />
              </div>
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