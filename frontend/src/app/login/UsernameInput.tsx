import React from 'react';
import styles from './LoginPage.module.css'; 

interface UsernameInputProps {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const UsernameInput: React.FC<UsernameInputProps> = ({ value, onChange }) => (
  <label className={styles['login-label']}>
    Username
    <input
      type="text"
      className={styles['login-input']}
      name="username"
      value={value}
      onChange={onChange}
      placeholder="Username"
      required
    />
  </label>
);

export default UsernameInput;