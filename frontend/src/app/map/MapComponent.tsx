'use client'

import React, { useLayoutEffect, useState, useRef, useEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import  Cookies from "js-cookie";

import styles from "./Map.module.css";
import CountryList from "app/country-list/CountryList";


interface CountryInfo {
  isoCode: string;
  name: string;
}

const API_URL = 'http://127.0.0.1:8000/countries/';

export default function MapComponent() {
  const [selectedCountry, setSelectedCountry] = useState<CountryInfo | null>(null);
  const [countryStatuses, setCountryStatuses] = useState<{ [code: string]: 'visited' | 'want_to_visit' | 'not_visited' }>({});

  const chartRef = useRef<am5map.MapChart | null>(null);
  const router = useRouter();
  
 

  useEffect(() => {
    const accessToken = Cookies.get('accessToken');

    if (!accessToken) {
      console.error('No access token found');
      router.push('/login');  
    }
  }, [router]);


  useEffect(() => {
    const fetchCountryStatuses = async () => {
      try {
        const token = Cookies.get('accessToken');
  
        if (!token) {
          console.error("No access token found");
          return;
        }
  
        const res = await fetch(API_URL, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
  
        if (!res.ok) {
          throw new Error('Failed to fetch countries');
        }
  
        const data = await res.json();
  
        const statusMap: { [code: string]: 'visited' | 'want_to_visit' | 'not_visited' } = {};
        data.forEach((country: { country_code: string; status: 'visited' | 'want_to_visit' | 'not_visited' }) => {
          statusMap[country.country_code] = country.status;
        });
  
        setCountryStatuses(statusMap);
  
      } catch (error) {
        console.error('Error fetching country statuses:', error);
      }
    };
  
    fetchCountryStatuses();
  }, []);

  useLayoutEffect(() => {
    let mounted = true;
    let root = am5.Root.new("world-map");
    if (!mounted) return;
    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "rotateX",
        wheelY: "none",
        projection: am5map.geoNaturalEarth1()
      })
    );
    chartRef.current = chart;


    chart.events.on("wheel", function (ev) {
      if (ev.originalEvent.ctrlKey) {
        ev.originalEvent.preventDefault();
        chart.set("wheelY", "zoom");
      } else {
        chart.set("wheelY", "none");
      }
    });


    let polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
        exclude: ["AQ"],
        interactive: true
      })
    );

    polygonSeries.mapPolygons.template.setAll({
      tooltipText: "{name}",
      interactive: true,
      cursorOverStyle: 'pointer',
      stroke: am5.color(0x000000),
      strokeWidth: 0.5,
    });



    polygonSeries.mapPolygons.template.events.on('click', (ev) => {
      console.log("CLICK EVENT FIRED", ev);
    
      const polygon = ev.target;
      if (polygon) {
        //@ts-ignore
        const isoCode = polygon.dataItem?.dataContext['id'];
        //@ts-ignore
        const countryName = polygon.dataItem?.dataContext['name'];
        console.log("Clicked country:", isoCode, countryName);
        if (isoCode && countryName) {
          setSelectedCountry({ isoCode, name: countryName });
          zoomToCountry(isoCode);
        }
      }
    });
    

    polygonSeries.mapPolygons.template.states.create("hover", {
      fill: am5.color(0x677935)
    });

    polygonSeries.mapPolygons.template.adapters.add('fill', (fill, target) => {
      //@ts-ignore
      const isoCode = target.dataItem?.dataContext['id'];
    
      if (isoCode && countryStatuses[isoCode]) {
        const status = countryStatuses[isoCode];
        if (status === 'visited') {
          return am5.color(0x4CAF50); 
        } else if (status === 'want_to_visit') {
          return am5.color(0x2196F3); 
        }
      }
    
      return am5.color(0xE0E0E0); 
    });

    return () => {
      mounted = false;
      root.dispose();
      chartRef.current = null;
    };


  }, []);



  const zoomToCountry = (isoCode: string) => {
    const chart = chartRef.current;
    if (!chart) return;

    const polygonSeries = chart.series.getIndex(0) as am5map.MapPolygonSeries;
    if (!polygonSeries) return;

    let polygon: am5map.MapPolygon | undefined; 
    polygonSeries.mapPolygons.each((p) => {
      //@ts-ignore
      if (p.dataItem?.get('id') === isoCode) {
        polygon = p;
      }
    });

    if (polygon) {
      //@ts-ignore
      const centroid = polygon.dataItem?.get('polygon')?.centroid();
      if (centroid) {
        chart.animate({
          key: 'rotationX',
          to: -centroid.longitude,
          duration: 1000,
          easing: am5.ease.out(am5.ease.cubic),
        });
        chart.animate({
          key: 'rotationY',
          to: centroid.latitude,
          duration: 1000,
          easing: am5.ease.out(am5.ease.cubic),
        });
      }
    }
  };

  const handlePlanToVisit = async () => {
    if (selectedCountry) {
      console.log(`plan to visit ${selectedCountry.name}`);
      const accessToken = Cookies.get('accessToken');
  
      if (!accessToken) {
        console.error('No access token available');
        return;
      }
  
      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            country_code: selectedCountry.isoCode,
            status: 'want_to_visit',
          }),
        });
  
        if (!response.ok) {
          const error = await response.json();
          console.error('Failed to plan to visit:', error);
        } else {
          console.log('Successfully planned to visit');
        }
      } catch (error) {
        console.error('Error planning to visit:', error);
      }
    }
  };
  
  const handleVisited = async () => {
    if (selectedCountry) {
      console.log(`visited ${selectedCountry.name}`);
      const accessToken = Cookies.get('accessToken');
  
      if (!accessToken) {
        console.error('No access token available');
        return;
      }
  
      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            country_code: selectedCountry.isoCode,
            status: 'visited',
          }),
        });
  
        if (!response.ok) {
          const error = await response.json();
          console.error('Failed to mark as visited:', error);
        } else {
          console.log('Successfully marked as visited');
        }
      } catch (error) {
        console.error('Error marking as visited:', error);
      }
    }
  };




  return (
      <div className={styles.mapPage}>
        <div className={styles.mapArea}>
          <div className={styles.mapWrapper}>
            <div id="world-map" className={styles.map}></div>
          </div>
  
          <AnimatePresence>
            {selectedCountry && (
              <motion.div
                initial={{ x: '100%', opacity: 0 }}
                animate={{ x: 10, opacity: 1 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className={styles.taskbar}
              >
                <h2 className={styles.countryName}>{selectedCountry.name}</h2>
                <div className={styles.buttonContainer}>
                  <button onClick={handlePlanToVisit} className={styles.button}>
                    Plan to Visit
                  </button>
                  <button onClick={handleVisited} className={styles.button}>
                    Visited
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
  
        <CountryList />
      </div>
  )
};




