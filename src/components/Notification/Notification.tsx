import React from 'react';
import styles from './Notification.module.css';

const Notification: React.FC = () => {
  return (
    <p className={styles.message}>No feedback yet</p>
  );
};

export default Notification;
