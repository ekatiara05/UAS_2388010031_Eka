"use client";

import { useEffect, useRef } from "react";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add("hero--visible");
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="hero" className="hero hero-split" ref={sectionRef}>
      <div className="floating-accent" style={{ top: "10%", left: "5%" }} />
      <div className="floating-accent floating-accent--alt" style={{ bottom: "20%", right: "10%" }} />

      <div className="hero-container">
        <div className="hero-content-left">
          <span className="hero-tagline">Restoran Keluarga Terbaik di Kota Anda</span>
          <h1 className="hero-title">
            Selamat Datang di
            <br />
            <span className="hero-title--gradient">Resto Nusantara</span>
          </h1>
          <p className="hero-description">
            Nikmati kelezatan berbagai hidangan khas Indonesia yang dimasak dengan rempah-rempah pilihan terbaik, resep warisan leluhur, dan disajikan dengan cinta.
          </p>
          <div className="hero-buttons">
            <a href="#services" className="cta-button cta-button--primary">
              Lihat Menu
            </a>
            <a href="#contact" className="cta-button cta-button--secondary">
              Reservasi Meja
            </a>
          </div>
        </div>

        <div className="hero-content-right">
          <div className="hero-image-wrapper">
            <div className="hero-glow-ring" />
            <img 
              src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop" 
              alt="Signature Dish Resto Nusantara" 
              className="hero-featured-image"
            />
            <div className="hero-badge hero-badge--top">
              <span className="hero-badge-icon">⭐</span>
              <div>
                <div className="hero-badge-title">Terfavorit</div>
                <div className="hero-badge-desc">Sate Nusantara</div>
              </div>
            </div>
            <div className="hero-badge hero-badge--bottom">
              <span className="hero-badge-icon">🌶️</span>
              <div>
                <div className="hero-badge-title">100% Autentik</div>
                <div className="hero-badge-desc">Rempah Pilihan</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
