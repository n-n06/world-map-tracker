'use client';

import React from 'react';
import Header from './Header';
import Section from './Section';
import Footer from './Footer';
import styles from './HomePage.module.css';
import bg from '../../../public/world.svg';

const HomePage: React.FC = () => {
  const sectionsData = [
    {
      imageUrl: '/placeholder-image-1.jpg', 
      altText: 'sect1 img',
      title: 'View the World Map',
      text: 'Explore the world map, discover countries you love, and track your travel progress with clear and intuitive visualization.',
    },
    {
      imageUrl: '/placeholder-image-2.jpg',
      altText: 'sect2 img',
      title: 'Track Your Visited Countries',
      text: 'Easily mark the countries you have visited and keep memories of your adventures. Visualize your personal traveler\'s globe.',
    },
    {
      imageUrl: '/placeholder-image-3.jpg',
      altText: 'sect3 img',
      title: 'Get AI Travel Tips',
      text: 'Leverage AI-powered travel tips. Receive recommendations for destinations, attractions, and trip planning assistance.',
    },
    
  ];

  return (
    <div className={styles.homePageContainer}>
      <Header />
      <main className={styles.mainContent}>
        <div className={styles.titleContainer} style={{backgroundImage: `url(${bg.src})`}} >
          <section className={styles.title} >
            <h1 className={styles.projectName}>World Map Tracker</h1>
            <svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" fill="currentColor" className="bi bi-map" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M15.817.113A.5.5 0 0 1 16 .5v14a.5.5 0 0 1-.402.49l-5 1a.5.5 0 0 1-.196 0L5.5 15.01l-4.902.98A.5.5 0 0 1 0 15.5v-14a.5.5 0 0 1 .402-.49l5-1a.5.5 0 0 1 .196 0L10.5.99l4.902-.98a.5.5 0 0 1 .415.103M10 1.91l-4-.8v12.98l4 .8zm1 12.98 4-.8V1.11l-4 .8zm-6-.8V1.11l-4 .8v12.98z"/>
            </svg>
          </section>
        </div>
        {sectionsData.map((section, index) => (
          <Section key={index} index={index} {...section} />
        ))}
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;