import React from 'react';
import styles from './RegistrationPage.module.css'; 

interface UsernameInputProps {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const UsernameInput: React.FC<UsernameInputProps> = ({ value, onChange }) => (
  <label className={styles['reg-label']}>
    Username
    <input
      type="text"
      className={styles['reg-input']}
      name="username"
      value={value}
      onChange={onChange}
      placeholder="Username"
      required
    />
  </label>
);

export default UsernameInput;