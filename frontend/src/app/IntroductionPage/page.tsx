"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import  styles  from "./page.module.css";



export default function IntroductionPage() {
  const [asciiIndex, setAsciiIndex] = useState(0);
  const router = useRouter();


  return (
    <main className="intro-page">
      <section className="hero-section">
        <div className={styles.heroContent}>
          <h1>Bem-vindo</h1>
          <span> H</span>
          <button className="hero-button" onClick={() => router.push("/journal")}>Iniciar</button>
        </div>
      </section>
    </main>
  );
}
