import React from 'react';
import styles from './LoginPage.module.css'; 
interface ErrorMessageProps {
  messages: string[];
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ messages }) => (
  messages.length > 0 && (
    <div className={styles['login-msg-red']}>
      {messages.map((message, index) => (
        <span key={index}>{message}</span>
      ))}
    </div>
  )
);

export default ErrorMessage;