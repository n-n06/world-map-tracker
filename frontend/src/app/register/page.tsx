import React from 'react';
import RegistrationForm from './RegistrationForm';
import styles from './RegistrationPage.module.css'; // Предполагается, что LoginPage.module.css содержит стили
import Header from 'app/_home/Header';
import Footer from 'app/_home/Footer';

interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = ({}) => (
  <>
  <Header />
  <section id="reg-page-section" className={styles['reg-page-section']}>
    <RegistrationForm />
  </section>
  <Footer></Footer>
  </>
);

export default LoginPage;