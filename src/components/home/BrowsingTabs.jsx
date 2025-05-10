import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EventCard from '../common/EventCard';
import './BrowsingTabs.css';

// Sample tab content (will be fetched from API)
const tabContent = {
  all: [
    { id: 1, title: 'Summer Music Festival', date: 'July 25, 2024', price: 49.99, tag: 'Music' },
    { id: 2, title: 'AI Conference 2024', date: 'August 10, 2024', price: 149.99, tag: 'Tech' },
    { id: 3, title: 'Modern Art Exhibition', date: 'September 5, 2024', price: 25.00, tag: 'Art' }
  ],
  forYou: [
    { id: 4, title: 'Startup Pitch Night', date: 'July 30, 2024', price: 0, tag: 'Business' },
    { id: 5, title: 'UX Design Workshop', date: 'August 15, 2024', price: 35.00, tag: 'Design' }
  ],
  online: [
    { id: 6, title: 'Remote Work Summit', date: 'August 1, 2024', price: 0, tag: 'Technology' }
  ],
  today: [
    { id: 7, title: 'Local Food Market', date: 'Today, 10AM', price: 0, tag: 'Food' }
  ],
  weekend: [
    { id: 8, title: 'City Marathon', date: 'This Weekend', price: 40.00, tag: 'Sports' }
  ],
  free: [
    { id: 9, title: 'Community Clean-Up Day', date: 'July 28, 2024', price: 0, tag: 'Community' }
  ]
};

const BrowsingTabs = () => {
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'All Events' },
    { id: 'forYou', label: 'For You' },
    { id: 'online', label: 'Online' },
    { id: 'today', label: 'Today' },
    { id: 'weekend', label: 'This Weekend' },
    { id: 'free', label: 'Free' }
  ];

  return (
    <section className="browsing-tabs">
      <div className="browsing-tabs__container">
        <h2 className="browsing-tabs__title">Explore Events</h2>
        
        <div className="browsing-tabs__nav">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`browsing-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="browsing-tabs__content">
          <div className="events-grid">
            {tabContent[activeTab].map(event => (
              <EventCard
                key={event.id}
                eventId={event.id}
                title={event.title}
                date={event.date}
                price={event.price}
                tag={event.tag}
                image="/assets/images/event-placeholder.jpg"
                host="Organizer Name"
                followers={Math.floor(Math.random() * 500)}
              />
            ))}
          </div>
          
          <div className="browsing-tabs__footer">
          <Link to="/all-events" className="btn-explore">Explore Events <span className="arrow">→</span></Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrowsingTabs;