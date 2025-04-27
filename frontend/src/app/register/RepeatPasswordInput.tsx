import React from 'react';
import styles from './RegistrationPage.module.css';

interface RepeatPasswordInputProps {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const RepeatPasswordInput: React.FC<RepeatPasswordInputProps> = ({ value, onChange }) => (
  <label className={styles['reg-label']}>
    Password
    <input
      type="password"
      className={styles['reg-input']}
      name="password2"
      value={value}
      onChange={onChange}
      placeholder="Repeat Password"
      required
    />
  </label>
);

export default RepeatPasswordInput;