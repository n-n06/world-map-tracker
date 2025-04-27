import React from 'react';
import Link from 'next/link';
import styles from './HomePage.module.css';

import Cookies from 'js-cookie';
import { logout } from 'app/auth/auth.service';



const Header: React.FC<any> = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.logoAndMapContainer}>
          <div className={styles.logoAndMap}>
            <Link href="/" className={styles.headerHomeButton}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-map" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M15.817.113A.5.5 0 0 1 16 .5v14a.5.5 0 0 1-.402.49l-5 1a.5.5 0 0 1-.196 0L5.5 15.01l-4.902.98A.5.5 0 0 1 0 15.5v-14a.5.5 0 0 1 .402-.49l5-1a.5.5 0 0 1 .196 0L10.5.99l4.902-.98a.5.5 0 0 1 .415.103M10 1.91l-4-.8v12.98l4 .8zm1 12.98 4-.8V1.11l-4 .8zm-6-.8V1.11l-4 .8v12.98z"/>
              </svg>
            </Link>
            <Link href="/map" className={styles.mapButton}>
                View Map
            </Link>
          </div>
        </div>
        {
          Cookies.get('accessToken') ? (
            <div className={styles.authButtons}>
            <button onClick={(e) => { e.preventDefault(); logout(); }} className={styles.loginButton}>
              Logout
            </button>
            </div>
          ) : (
            <div className={styles.authButtons}>
            <Link href="/login" className={styles.loginButton}>
              Login
            </Link>
            <Link href="/register" className={styles.registerButton}>
              Register
            </Link>
            </div>
          )
        }

        
      </div>
    </header>
  );
};

export default Header;