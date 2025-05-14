const express = require('express');
const { body } = require('express-validator');
const eventController = require('../controllers/event.controller');
const { auth, isAdmin } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);
router.get('/category/:category', eventController.getEventsByCategory);
router.get('/search/:query', eventController.searchEvents);

// Protected routes
router.post('/', [auth, isAdmin], [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('date').isISO8601().withMessage('Valid date is required'),
  body('location').trim().notEmpty().withMessage('Location is required'),
  body('price').isNumeric().withMessage('Valid price is required'),
  body('category').trim().notEmpty().withMessage('Category is required')
], eventController.createEvent);

router.put('/:id', [auth, isAdmin], eventController.updateEvent);
router.delete('/:id', [auth, isAdmin], eventController.deleteEvent);

module.exports = router;