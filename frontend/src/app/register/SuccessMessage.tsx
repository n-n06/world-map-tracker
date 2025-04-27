import React from 'react';
import styles from './RegistrationPage.module.css';

interface SuccessMessageProps {
  message: string;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ message }) => (
  message && (
    <div className={styles['reg-msg-green']}>
      {message}
    </div>
  )
);

export default SuccessMessage;