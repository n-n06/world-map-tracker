'use client';

import React from 'react';
import LoginForm from './LoginForm';
import styles from './LoginPage.module.css'; 
import Header from 'app/_home/Header';
import Footer from 'app/_home/Footer';

interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = ({}) => (
  <>  
  <Header />
  <section id="login-page-section" className={styles['login-page-section']}>
    <LoginForm />
  </section>
  <Footer />
  </>
);

export default LoginPage;