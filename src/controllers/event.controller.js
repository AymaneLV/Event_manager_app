const { validationResult } = require('express-validator');
const db = require('../config/db');

const getAllEvents = async (req, res) => {
  try {
    const result = await db.query(
      'SELECT e.*, u.name as organizer_name FROM events e JOIN users u ON e.organizer_id = u.id ORDER BY e.created_at DESC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(
      'SELECT e.*, u.name as organizer_name FROM events e JOIN users u ON e.organizer_id = u.id WHERE e.id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Get event error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getEventsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const result = await db.query(
      'SELECT e.*, u.name as organizer_name FROM events e JOIN users u ON e.organizer_id = u.id WHERE e.category = $1',
      [category]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Get events by category error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const searchEvents = async (req, res) => {
  try {
    const { query } = req.params;
    const result = await db.query(
      `SELECT e.*, u.name as organizer_name 
       FROM events e 
       JOIN users u ON e.organizer_id = u.id 
       WHERE e.title ILIKE $1 
       OR e.description ILIKE $1 
       OR e.category ILIKE $1`,
      [`%${query}%`]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Search events error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const createEvent = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, date, time, location, price, category, image } = req.body;
    const organizerId = req.user.id;

    const result = await db.query(
      `INSERT INTO events (
        title, description, date, time, location, price, 
        category, image, organizer_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [title, description, date, time, location, price, category, image, organizerId]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Create event error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, date, time, location, price, category, image } = req.body;

    // Check if event exists and user is the organizer
    const eventCheck = await db.query(
      'SELECT * FROM events WHERE id = $1 AND organizer_id = $2',
      [id, req.user.id]
    );

    if (eventCheck.rows.length === 0) {
      return res.status(404).json({ message: 'Event not found or unauthorized' });
    }

    const result = await db.query(
      `UPDATE events 
       SET title = $1, description = $2, date = $3, time = $4,
           location = $5, price = $6, category = $7, image = $8
       WHERE id = $9 RETURNING *`,
      [title, description, date, time, location, price, category, image, id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Update event error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if event exists and user is the organizer
    const eventCheck = await db.query(
      'SELECT * FROM events WHERE id = $1 AND organizer_id = $2',
      [id, req.user.id]
    );

    if (eventCheck.rows.length === 0) {
      return res.status(404).json({ message: 'Event not found or unauthorized' });
    }

    await db.query('DELETE FROM events WHERE id = $1', [id]);
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Delete event error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllEvents,
  getEventById,
  getEventsByCategory,
  searchEvents,
  createEvent,
  updateEvent,
  deleteEvent
};