import React from 'react';
import styles from './LoginPage.module.css'; 

interface LoginButtonProps {
  isLoading: boolean;
  onSubmit: React.FormEventHandler;
  disabled: boolean;
}

const LoginButton: React.FC<LoginButtonProps> = ({ isLoading, onSubmit, disabled }) => (
  <button className={styles['login-button']} type="submit" disabled={disabled}>
    {!isLoading ? 'Login' : <span className={styles['spinner']}></span>}
  </button>
);

export default LoginButton;