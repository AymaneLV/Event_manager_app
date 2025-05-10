import React from 'react';
import { Link } from 'react-router-dom';
import './Onboarding.css';

const Onboarding = () => {
  return (
    <div className="onboarding">
      <div className="onboarding__container">
        <h1>Let’s Get Started</h1>
        <p>Choose your role to begin your Eventify journey</p>
        
        <div className="onboarding__options">
          <Link to="/register?role=user" className="onboarding-card">
            <h2>Find an Experience</h2>
            <p>Explore events, connect with organizers, and discover new experiences.</p>
          </Link>
          
          <Link to="/register?role=admin" className="onboarding-card">
            <h2>Organize an Event</h2>
            <p>Create, manage, and promote your events to a global audience.</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;