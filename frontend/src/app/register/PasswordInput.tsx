import React from 'react';
import styles from './RegistrationPage.module.css'; 

interface PasswordInputProps {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ value, onChange }) => (
  <label className={styles['reg-label']}>
    Password
    <input
      type="password"
      className={styles['reg-input']}
      name="password"
      value={value}
      onChange={onChange}
      placeholder="Password"
      required
    />
  </label>
);

export default PasswordInput;