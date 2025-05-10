import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        {/* About Section */}
        <div className="footer__section">
          <div className="footer__logo">
            <img 
              src="/assets/images/logo.svg" 
              alt="Eventify Logo" 
              className="footer__logo-image"
            />
            <span className="footer__logo-text">Eventify</span>
          </div>
          <p className="footer__description">
            Discover and organize amazing events. Connect with people who share your interests.
          </p>
          <div className="footer__socials">
            <a href="#!" aria-label="Facebook">
              <img src="/assets/images/icons/facebook.svg" alt="Facebook" />
            </a>
            <a href="#!" aria-label="Twitter">
              <img src="/assets/images/icons/twitter.svg" alt="Twitter" />
            </a>
            <a href="#!" aria-label="Instagram">
              <img src="/assets/images/icons/instagram.svg" alt="Instagram" />
            </a>
            <a href="#!" aria-label="LinkedIn">
              <img src="/assets/images/icons/linkedin.svg" alt="LinkedIn" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer__section">
          <h4 className="footer__title">Quick Links</h4>
          <ul className="footer__links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/all-events">Browse Events</Link></li>
            <li><Link to="/create">Create Event</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/contactUS">Contact Us</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="footer__section">
          <h4 className="footer__title">Newsletter</h4>
          <p className="footer__newsletter-desc">
            Subscribe to our newsletter for event updates and tips.
          </p>
          <form className="footer__newsletter-form">
            <input 
              type="email" 
              placeholder="Enter your email" 
              required 
              className="footer__newsletter-input"
            />
            <button 
              type="submit" 
              className="footer__newsletter-btn"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer__bottom">
        <p>&copy; {new Date().getFullYear()} Eventify. All rights reserved.</p>
        <div className="footer__legal">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;