import React from 'react';
import styles from './RegistrationPage.module.css'; // Или общий файл стилей

interface ErrorMessageProps {
  messages: string[];
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ messages }) => (
  messages.length > 0 && (
    <div className={styles['reg-msg-red']}>
      {messages.map((message, index) => (
        <span key={index}>{message}</span>
      ))}
    </div>
  )
);

export default ErrorMessage;