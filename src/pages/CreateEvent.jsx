import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CreateEvent.css';
// Dummy auth state
const isAuthenticated = false;
const isAdmin = false;

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    price: 0,
    category: "",
    imageUrl: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle event creation logic
    console.log("Event created:", formData);
  };

  if (!isAuthenticated) {
    return (
      <div className="create-event">
        <div className="create-event__auth">
          <h2>Create Your First Event</h2>
          <p>Please log in or register to create an event.</p>
          <div className="create-event__auth-buttons">
            <Link to="/login" className="btn-primary">Login</Link>
            <Link to="/register" className="btn-outline">Register</Link>
          </div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="create-event">
        <div className="create-event__no-access">
          <h2>Access Denied</h2>
          <p>You need to be an organizer to create events.</p>
          <Link to="/onboarding" className="btn-primary">Become an Organizer</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="create-event">
      <div className="create-event__form-container">
        <h2>Create a New Event</h2>
        <form onSubmit={handleSubmit} className="create-event__form">
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-row">
            <div className="form-group half">
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group half">
              <label>Time</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group half">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group half">
              <label>Price ($)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group half">
              <label>Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select category</option>
                <option value="Music">Music</option>
                <option value="Tech">Tech</option>
                <option value="Art">Art</option>
                <option value="Sports">Sports</option>
                <option value="Food">Food</option>
              </select>
            </div>
            <div className="form-group half">
              <label>Image URL</label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <button type="submit" className="btn-primary">Create Event</button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;