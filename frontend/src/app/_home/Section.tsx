import React, { useRef, useEffect, useState } from 'react';
import styles from './HomePage.module.css';

interface SectionProps {
  imageUrl: string;
  altText: string;
  title: string;
  text: string;
  index: number; 
}

const Section: React.FC<SectionProps> = ({ imageUrl, altText, title, text, index }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target); 
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className={`${styles.section} ${isVisible ? styles.sectionVisible : ''}`}>
      <div className={styles.imagePlaceholder}>
        <img src={imageUrl} alt={altText} loading="lazy" />
      </div>
      <div className={styles.textContainer}>
        <h2 className={styles.sectionHeader}>{title}</h2>
        <p className={styles.fadeInText}>{text}</p>
      </div>
    </section>
  );
};

export default Section;