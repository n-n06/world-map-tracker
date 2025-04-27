'use client'

import dynamic from "next/dynamic";
import { JSX } from "react";

import styles from './Map.module.css';
import MapComponent from "./MapComponent";
import Header from "app/_home/Header";

const Map = dynamic(() => import("./MapComponent"), {
  ssr: false // No server side rendering bc of a 'use client' statement
});

export default function Page() : JSX.Element {
  return (
    <div>
      <Header></Header>
      <div className={styles.mapContainer}>
        <MapComponent />
      </div>
      
    </div>
  )
}