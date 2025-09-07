const mongoose = require('mongoose');

const NotificationSchema = mongoose.Schema(
  {
    Type: { type: String, required: true },
    notification: { type: String, required: true },
    Whom: [{ type: String, enum: ['Patient', 'Doctor', 'Staff'], required: true }],
    createdAt: { type: Date, default: Date.now, index: true },
  },
  { timestamps: true }
);

NotificationSchema.index({ createdAt: 1 }, { expireAfterSeconds: 7200 });

const NotificationModel = mongoose.model('Notification', NotificationSchema);

module.exports = NotificationModel;
