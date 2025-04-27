import React from 'react';
import styles from './RegistrationPage.module.css';

interface EmailInputProps {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const EmailInput: React.FC<EmailInputProps> = ({ value, onChange }) => (
  <label className={styles['reg-label']}>
    Email
    <input
      type="email"
      className={styles['reg-input']}
      name="email"
      value={value}
      onChange={onChange}
      placeholder="Email"
      required
    />
  </label>
);

export default EmailInput;