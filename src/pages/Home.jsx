// src/pages/Home.jsx
import React from 'react';
import WelcomeBanner from '../components/home/WelcomeBanner';
import CategoriesSection from '../components/home/CategoriesSection';
import BrowsingTabs from '../components/home/BrowsingTabs';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <WelcomeBanner />
      <CategoriesSection viewAllTo="/categories" />
      <BrowsingTabs />
    </div>
  );
};

export default Home;