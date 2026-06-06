"use client";

import { useEffect, useRef, useState } from "react";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const duration = 2000;
          const stepTime = Math.max(Math.floor(duration / target), 16);
          const timer = setInterval(() => {
            start += Math.ceil(target / (duration / stepTime));
            if (start >= target) {
              start = target;
              clearInterval(timer);
            }
            setCount(start);
          }, stepTime);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <h4 ref={ref} className="stat-number">
      {count.toLocaleString("id-ID")}
      {suffix}
    </h4>
  );
}

export default function VisionSection() {
  return (
    <section id="vision" className="vision">
      <div className="vision-flex">
        <div className="vision-text">
          <span className="hero-tagline">Tentang Kami</span>
          <h2 className="vision-heading">
            Nikmati <span className="text-gradient">Cita Rasa Nusantara</span>
          </h2>
          <p className="vision-desc">
            Resto Nusantara hadir dengan aneka hidangan khas yang autentik, pelayanan yang ramah, dan
            suasana yang hangat untuk pengalaman bersantap yang tak terlupakan bersama keluarga Anda.
          </p>
          <div className="stats-row">
            <div className="stat">
              <AnimatedCounter target={50} suffix="+" />
              <span className="stat-label">Menu Pilihan</span>
            </div>
            <div className="stat">
              <AnimatedCounter target={12} suffix="+" />
              <span className="stat-label">Koki Profesional</span>
            </div>
            <div className="stat">
              <AnimatedCounter target={100} suffix="%" />
              <span className="stat-label">Bahan Segar</span>
            </div>
          </div>
        </div>
        <div className="vision-visual">
          <div className="about-image-collage">
            <img 
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=600&auto=format&fit=crop" 
              alt="Interior Restoran" 
              className="collage-img collage-img--1" 
            />
            <img 
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=600&auto=format&fit=crop" 
              alt="Hidangan Lezat" 
              className="collage-img collage-img--2" 
            />
            <img 
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=600&auto=format&fit=crop" 
              alt="Dapur Bersih" 
              className="collage-img collage-img--3" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
