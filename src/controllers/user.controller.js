const db = require('../config/db');

const getProfile = async (req, res) => {
  try {
    const result = await db.query(
      'SELECT id, name, email, role FROM users WHERE id = $1',
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    const result = await db.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING id, name, email, role',
      [name, email, req.user.id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getUserTickets = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT t.*, e.title, e.date, e.time, e.location 
       FROM tickets t 
       JOIN events e ON t.event_id = e.id 
       WHERE t.user_id = $1`,
      [req.user.id]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Get tickets error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const bookTicket = async (req, res) => {
  try {
    const { eventId } = req.params;

    // Check if event exists
    const eventCheck = await db.query(
      'SELECT * FROM events WHERE id = $1',
      [eventId]
    );

    if (eventCheck.rows.length === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if user already has a ticket
    const ticketCheck = await db.query(
      'SELECT * FROM tickets WHERE user_id = $1 AND event_id = $2',
      [req.user.id, eventId]
    );

    if (ticketCheck.rows.length > 0) {
      return res.status(400).json({ message: 'You already have a ticket for this event' });
    }

    // Book ticket
    const result = await db.query(
      'INSERT INTO tickets (user_id, event_id) VALUES ($1, $2) RETURNING *',
      [req.user.id, eventId]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Book ticket error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  getUserTickets,
  bookTicket
};