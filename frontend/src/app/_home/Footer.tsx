import React from 'react';
import styles from './HomePage.module.css';


const Footer: React.FC<any> = ({}) => {
  return (
    <footer className={styles.footer}>
      <p>&copy; {new Date().getFullYear()}, n-n06</p>
    </footer>
  );
};

export default Footer;