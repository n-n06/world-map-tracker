import React from 'react';
import styles from './HomePage.module.css';

interface FooterProps {}

const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <footer className={styles.footer}>
      <p>&copy; {new Date().getFullYear()}, n-n06</p>
    </footer>
  );
};

export default Footer;