const express = require('express');
const userController = require('../controllers/user.controller');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.get('/profile', auth, userController.getProfile);
router.put('/profile', auth, userController.updateProfile);
router.get('/tickets', auth, userController.getUserTickets);
router.post('/tickets/:eventId', auth, userController.bookTicket);

module.exports = router;