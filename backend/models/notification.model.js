const e = require('express');
const mongoose=require('mongoose');

const NotificationSchema = mongoose.Schema(
    { 
        Type: {
            type: String,
            required: true,
            enum: ['Medicine', 'Blood']
        },
        notification: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);
const Notification= mongoose.model('Notification', NotificationSchema);

module.exports = Notification;