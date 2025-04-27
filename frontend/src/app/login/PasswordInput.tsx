import React from 'react';
import styles from './LoginPage.module.css'; 
interface PasswordInputProps {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ value, onChange }) => (
  <label className={styles['login-label']}>
    Password
    <input
      type="password"
      className={styles['login-input']}
      name="password"
      value={value}
      onChange={onChange}
      placeholder="Password"
      required
    />
  </label>
);

export default PasswordInput;