"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Caveat } from "next/font/google";
import styles from "./page.module.css";

const caveat = Caveat({ subsets: ["latin"], weight: ["400"], display: "swap" });

type Offset = { x: number; y: number };
type Star = {
  id: string;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
};

const STAR_COUNT = 14;

function getRandomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function WelcomePage() {
  const router = useRouter();
  const leftEyeRef = useRef<SVGSVGElement | null>(null);
  const rightEyeRef = useRef<SVGSVGElement | null>(null);
  const blinkTimeoutRef = useRef<number | null>(null);
  const blinkTimerRef = useRef<number | null>(null);
  const [pupilOffsets, setPupilOffsets] = useState<Offset[]>([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredEye, setHoveredEye] = useState<"left" | "right" | null>(null);
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generatedStars: Star[] = Array.from({ length: STAR_COUNT }, (_, index) => ({
      id: `star-${index}`,
      left: getRandomInRange(4, 92),
      top: getRandomInRange(6, 90),
      size: getRandomInRange(10, 22),
      duration: getRandomInRange(0.6, 1.4),
      delay: getRandomInRange(0, 0.8),
    }));

    setStars(generatedStars);
  }, []);

  useEffect(() => {
    const updatePupils = (event: MouseEvent) => {
      const eyes = [leftEyeRef.current, rightEyeRef.current].filter(Boolean) as SVGSVGElement[];
      if (eyes.length < 2) {
        return;
      }

      const nextOffsets = eyes.map((eye) => {
        const rect = eye.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = event.clientX - centerX;
        const dy = event.clientY - centerY;
        const angle = Math.atan2(dy, dx);
        const distance = clamp(Math.hypot(dx, dy), 0, 10);

        return {
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
        };
      });

      setPupilOffsets(nextOffsets);
    };

    const scheduleBlink = () => {
      const timeout = window.setTimeout(() => {
        setIsBlinking(true);
        blinkTimeoutRef.current = window.setTimeout(() => {
          setIsBlinking(false);
          scheduleBlink();
        }, 150);
      }, getRandomInRange(2000, 5000));

      blinkTimerRef.current = timeout;
    };

    window.addEventListener("mousemove", updatePupils);
    scheduleBlink();

    return () => {
      window.removeEventListener("mousemove", updatePupils);
      if (blinkTimerRef.current) {
        window.clearTimeout(blinkTimerRef.current);
      }
      if (blinkTimeoutRef.current) {
        window.clearTimeout(blinkTimeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setHoveredEye(null);
  }, []);

  const handleEyeMouseEnter = useCallback((eye: "left" | "right") => {
    setHoveredEye(eye);
  }, []);

  const handleEyeMouseLeave = useCallback(() => {
    setHoveredEye(null);
  }, []);

  const handleEnterClick = useCallback(() => {
    router.push("/journal");
  }, [router]);

  return (
    <div className={`${styles.container} ${caveat.className}`}>
    
      <div className={styles.starsContainer} aria-hidden="true">
        {stars.map((star) => (
          <span
            key={star.id}
            className={`${styles.star} ${isHovered ? styles.starActive : ""}`}
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              fontSize: `${star.size * 0.9}px`,
              animationDuration: `${star.duration}s`,
              animationDelay: `${star.delay}s`,
            }}
          >
            ✦
          </span>
        ))}
      </div>

      <main className={styles.card}>
        <h1 className={styles.title}>Seja Bem Vindo ao seu Diário inteligente!</h1>

        <div className={styles.faceArea}>
          <div className={styles.eyeWrapper}>
            <svg ref={leftEyeRef} viewBox="0 0 48 48" className={styles.eye}>
            <g
              className={styles.eyeGroup}
              style={{ transform: isBlinking ? "scaleY(0.1)" : "scaleY(1)" }}
            >
              <circle cx="24" cy="24" r="22" fill="white" stroke="#2D2640" strokeWidth="2.5" />
              <g
                className={styles.pupilGroup}
                style={{ transform: `translate(${pupilOffsets[0].x}px, ${pupilOffsets[0].y}px)` }}
              >
                <circle cx="24" cy="24" r="8" fill="#2D2640" />
              </g>
            </g>
          </svg>

          <svg ref={rightEyeRef} viewBox="0 0 48 48" className={styles.eye}>
            <g
              className={styles.eyeGroup}
              style={{ transform: isBlinking ? "scaleY(0.1)" : "scaleY(1)" }}
            >
              <circle cx="24" cy="24" r="22" fill="white" stroke="#2D2640" strokeWidth="2.5" />
              <g
                className={styles.pupilGroup}
                style={{ transform: `translate(${pupilOffsets[1].x}px, ${pupilOffsets[1].y}px)` }}
              >
                <circle cx="24" cy="24" r="8" fill="#2D2640" />
              </g>
            </g>
          </svg>
          </div>

          <svg
            viewBox="-30 0 60 30"
            className={`${styles.smile} ${isHovered ? styles.smileVisible : ""}`}
            aria-hidden="true"
          >
            <path
              d="M -25 0 Q 0 20 25 0"
              stroke="#2D2640"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
          </svg>

          <span className={`${styles.hand} ${styles.leftHand} ${isHovered ? styles.handVisible : ""}`} />
          <span className={`${styles.hand} ${styles.rightHand} ${isHovered ? styles.handVisible : ""}`} />
        </div>

        <button
          type="button"
          className={styles.actionButton}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleEnterClick}
        >
          ENTRAR
        </button>
      </main>
    </div>
  );
}
