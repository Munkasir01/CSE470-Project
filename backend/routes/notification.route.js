const express = require('express');
const {
  getAllNotifications,
  createNotification,
  deleteNotification,
} = require('../controllers/notification.controller');

const router = express.Router();

router.get('/', getAllNotifications);          // GET all
router.post('/', createNotification);          // POST new
router.delete('/:id', deleteNotification);     // DELETE one

module.exports = router;
