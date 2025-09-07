const NotificationModel = require('../models/notification.model');

// Get all notifications
const getAllNotifications = async (req, res) => {
  try {
    const notifications = await NotificationModel.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new notification
const createNotification = async (req, res) => {
  try {
    const { Type, notification, Whom } = req.body;

    if (!Type || !notification || !Whom || !Array.isArray(Whom)) {
      return res.status(400).json({ error: 'Type, notification, and Whom (array) are required' });
    }

    const newNotification = new NotificationModel({
      Type,
      notification,
      Whom,
    });

    await newNotification.save();
    res.status(201).json(newNotification);
  } catch (error) {
    console.error('Error creating notification:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a notification
const deleteNotification = async (req, res) => {
  try {
    const deleted = await NotificationModel.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Notification not found' });
    }
    res.status(200).json({ message: 'Notification deleted successfully' });
  } catch (error) {
    console.error('Error deleting notification:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllNotifications,
  createNotification,
  deleteNotification,
};
