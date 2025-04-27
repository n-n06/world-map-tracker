import React from 'react';
import styles from './RegistrationPage.module.css';

interface RegisterButtonProps {
  isLoading: boolean;
  onSubmit: React.FormEventHandler;
  disabled: boolean;
}

const RegisterButton: React.FC<RegisterButtonProps> = ({ isLoading, onSubmit, disabled }) => (
  <button className={styles['reg-button']} type="submit" disabled={disabled}>
    {!isLoading ? 'Register' : <span className={styles['spinner']}></span>}
  </button>
);

export default RegisterButton;