import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

const Account = () => {
  const [user, setUser] = useState({
    name: 'ED-DAOUDI Manal',
    email: 'manal@uir.ac.ma',
    club: 'Club A',
    position: 'President',
    notifications: [
      'Notification 1',
      'Notification 2',
      'Notification 3',
      'Notification 4',
      'Notification 5',
    ],
  });

  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    setUser(editedUser);
    setEditMode(false);
  };

  const handleNotificationsClick = () => {
    setShowNotifications(!showNotifications);
  };

  const notificationCount = user.notifications.length;

  return (
    <div className="account-container">
      <div className="header">
        <h1>Account</h1>
        <button className="notifications-button" onClick={handleNotificationsClick}>
          {notificationCount > 0 && <span className="notification-count">{notificationCount}</span>}
          <FontAwesomeIcon icon={faBell} />
        </button>
      </div>
      {showNotifications && (
        <div className="notifications-section">
          <button className="back-button" onClick={handleNotificationsClick}>
            Back
          </button>
          <div className="notifications-content">
            <h2>Notifications</h2>
            {user.notifications.map((notification, index) => (
              <div key={index} className="notification-section">
                <div className="notification-header">
                  <FontAwesomeIcon icon={faBell} />
                  <p>Notification {index + 1}</p>
                </div>
                <div className="notification-body">
                  <p>{notification}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {!showNotifications && (
        <div className="main-section">
          <div className="user-info">
            <h2>{user.name}</h2>
            <p>Email: {user.email}</p>
            <p>Club: {user.club}</p>
            <p>Position: {user.position}</p>
            <button className="edit-button" onClick={handleEditClick}>
              Edit
            </button>
          </div>
          {editMode && (
            <div className="edit-form">
              <label htmlFor="name">Name:</label>
              <input id="name" type="text" name="name" value={editedUser.name} onChange={handleInputChange} />
              <label htmlFor="email">Email:</label>
              <input id="email" type="email" name="email" value={editedUser.email} onChange={handleInputChange} />
              <label htmlFor="club">Club:</label>
              <input id="club" type="text" name="club" value={editedUser.club} onChange={handleInputChange} />
              <label htmlFor="position">Position:</label>
              <input id="position" type="text" name="position" value={editedUser.position} onChange={handleInputChange} />
              <label htmlFor="password">Password:</label>
              <input id="password" type="password" name="password" value={editedUser.password} onChange={handleInputChange} />
              <button className="save-button" onClick={handleSaveClick}>
                Save
              </button>
            </div>
          )}
        </div>
      )}
      <style jsx>{`
        .account-container {
          padding: 20px;
          text-align: left;
        }

        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        h1 {
          font-family: Montserrat, sans-serif;
          letter-spacing: 2px;
          font-size: 35px;
          font-weight: 400;
          margin-left: 470px;
        }

        .notifications-button {
          position: relative;
          width: 30px;
          height: 30px;
          background-color: transparent;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .notification-count {
          position: absolute;
          top: -8px;
          right: -8px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: #e53935;
          color: #fff;
          font-size: 12px;
          font-weight: bold;
        }

        .back-button {
          background-color: #4285f4;
          color: #fff;
          border: none;
          border-radius: 4px;
          font-size: 14px;
          cursor: pointer;
          position: absolute;
          top: 20px;
          left: 20px;
          font-family: Montserrat, sans-serif;
          font-weight: 500;
          padding: 10px 20px;
        }

        .notifications-section {
          text-align: left;
        }

        .notifications-content {
          padding: 20px;
        }

        .notifications-content h2 {
          font-family: Montserrat, sans-serif;
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 10px;
        }

        .notification-section {
          margin-bottom: 10px;
          background-color: #f5f5f5;
          padding: 10px;
          border-radius: 4px;
        }

        .notification-header {
          display: flex;
          align-items: center;
        }

        .notification-header svg {
          width: 16px;
          height: 16px;
          margin-right: 5px;
        }

        .notification-header p {
          font-size: 16px;
          font-weight: 600;
          margin: 0;
        }

        .notification-body {
          margin-top: 5px;
        }

        .notification-body p {
          font-size: 14px;
          margin: 0;
        }

        .main-section {
          margin-top: 20px;
        }

        .user-info {
          margin-bottom: 20px;
        }

        .user-info h2 {
          font-family: Montserrat, sans-serif;
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 10px;
        }

        .user-info p {
          font-size: 16px;
          margin-bottom: 5px;
        }

        .edit-button,
        .save-button {
          background-color: #4285f4;
          color: #fff;
          border: none;
          border-radius: 4px;
          padding: 10px 20px;
          font-size: 14px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .edit-button:hover,
        .save-button:hover {
          background-color: #1a73e8;
        }

        .edit-form {
          margin-top: 20px;
          background-color: #f5f5f5;
          padding: 20px;
          border-radius: 4px;
        }

        .edit-form label {
          display: block;
          margin-bottom: 10px;
          font-weight: bold;
        }

        .edit-form input {
          width: 100%;
          padding: 8px;
          border-radius: 4px;
          border: 1px solid #ccc;
          margin-bottom: 10px;
        }

        .save-button {
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
};

export default Account;
