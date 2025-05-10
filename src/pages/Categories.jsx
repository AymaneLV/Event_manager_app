// src/pages/Categories.jsx
import React from 'react';
import CategoriesSection from '../components/home/CategoriesSection';
import './Categories.css';

const Categories = () => {
  return (
    <div className="categories-page">
      <div className="page-header">
        <h1>All Event Categories</h1>
        <p>Explore events by category — from Music to Food and beyond</p>
      </div>
      <CategoriesSection viewAllTo="/all-events" />
    </div>
  );
};

export default Categories;