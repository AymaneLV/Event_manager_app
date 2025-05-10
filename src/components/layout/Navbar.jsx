import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Dummy auth state (will be replaced with real context)
  const isAuthenticated = false;
  const isAdmin = false;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar__container">
        {/* ✅ Logo as a clickable link */}
        <Link to="/" className="navbar__logo">
          <img 
            src="/assets/images/logo.svg" 
            alt="Eventify Logo" 
            className="navbar__logo-image"
          />
          <span className="navbar__logo-text">Eventify</span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="navbar__desktop-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/categories">Categories</Link></li>
          
          {/* Desktop Search */}
          <li className="navbar__search-container">
            <form onSubmit={handleSearch} className="navbar__search-form">
              <input 
                type="text" 
                placeholder="Search events..." 
                className="navbar__search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit" 
                className="navbar__search-btn"
                aria-label="Submit search"
              >
                <img 
                  src="/assets/images/icons/search.svg" 
                  alt="Search" 
                  className="navbar__search-icon"
                />
              </button>
            </form>
          </li>

          {/* Protected Desktop Links */}
          {isAuthenticated && (
            <>
              <li><Link to="/my-tickets">My Tickets</Link></li>
              <li><Link to="/create">Create Event</Link></li>
              {isAdmin && <li><Link to="/your-events">Your Events</Link></li>}
            </>
          )}
          <li>
            {isAuthenticated ? (
              <button className="navbar__logout-btn">Logout</button>
            ) : (
              <Link to="/login" className="navbar__auth-link">Login</Link>
            )}
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button 
          className="navbar__menu-toggle"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className={`navbar__menu-icon ${isMenuOpen ? 'open' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <ul className="navbar__mobile-menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/categories">Categories</Link></li>
          
          {/* Mobile Search */}
          <li className="navbar__search-container">
            <form onSubmit={handleSearch} className="navbar__search-form">
              <input 
                type="text" 
                placeholder="Search events..." 
                className="navbar__search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit" 
                className="navbar__search-btn"
                aria-label="Submit search"
              >
                <img 
                  src="/assets/images/icons/search.svg" 
                  alt="Search" 
                  className="navbar__search-icon"
                />
              </button>
            </form>
          </li>

          {/* Protected Mobile Links */}
          {isAuthenticated ? (
            <>
              <li><Link to="/my-tickets">My Tickets</Link></li>
              <li><Link to="/create">Create Event</Link></li>
              {isAdmin && <li><Link to="/your-events">Your Events</Link></li>}
              <li>
                <button className="navbar__logout-btn full-width">Logout</button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register" className="btn-primary">Sign Up</Link></li>
            </>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;