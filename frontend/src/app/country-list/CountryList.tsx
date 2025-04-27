'use client';

import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import styles from './CountryList.module.css'; 

interface Country {
  id: number;
  country_code: string;
  status: 'visited' | 'want_to_visit' | 'other';
}

export default function CountryList() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const token = Cookies.get('accessToken');

        if (!token) {
          console.error("No access token found");
          return;
        }

        const res = await fetch('http://127.0.0.1:8000/countries/', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          throw new Error('Failed to fetch countries');
        }

        const data = await res.json();
        setCountries(data);
      } catch (error: any) {
        console.error('Error fetching countries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const visited = countries.filter(c => c.status === 'visited');
  const wantToVisit = countries.filter(c => c.status === 'want_to_visit');
  const others = countries.filter(c => c.status !== 'visited' && c.status !== 'want_to_visit');

  return (
    <div className={styles.countryLists}>
      {loading ? (
        <p>Loading countries...</p>
      ) : (
        <>
          <div className={styles.countryList}>
            <h3>Visited</h3>
            {visited.map(country => (
              <div key={country.id}>{country.country_code}</div>
            ))}
          </div>

          <div className={styles.countryList}>
            <h3>Want to Visit</h3>
            {wantToVisit.map(country => (
              <div key={country.id}>{country.country_code}</div>
            ))}
          </div>

          <div className={styles.countryList}>
            <h3>Other</h3>
            {others.map(country => (
              <div key={country.id}>{country.country_code}</div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
