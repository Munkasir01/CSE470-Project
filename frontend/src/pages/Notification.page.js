import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../css/NotificationPage.css';

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { role } = useParams(); // role: Patient / Doctor / Staff

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(`http://localhost:3000/notifications`);
        const data = await response.json();

        // Filter notifications for this role
        const filtered = data.filter((notif) => notif.Whom.includes(role));
        setNotifications(filtered);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [role]);

  if (loading) return <p>Loading notifications...</p>;

  return (
    <div className="notification-page">
      <h1>Notifications</h1>
      {notifications.length === 0 ? (
        <p>No notifications available.</p>
      ) : (
        <div className="notification-list">
          {notifications.map((notif) => (
            <div key={notif._id} className="notification-card">
              <p className="notif-type">{notif.Type}</p>
              <p className="notif-message">{notif.notification}</p>
              <p className="notif-timestamp">
                {new Date(notif.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationPage;

