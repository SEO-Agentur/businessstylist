'use client';

import { useState, useEffect, useRef } from 'react';

export default function AnalyseRail() {
  const [progress, setProgress] = useState(0);
  const [phaseLabel, setPhaseLabel] = useState('Analyse™ · Kostenfrei');
  const formRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      const pct = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
      setProgress(pct);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setPhaseLabel('Define™ · Phase 01');
          } else {
            setPhaseLabel('Analyse™ · Kostenfrei');
          }
        });
      },
      { threshold: 0 }
    );

    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollListener, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    const formEl = document.getElementById('analyseForm');
    if (formEl) {
      formRef.current = formEl;
      observer.observe(formEl);
    }

    return () => {
      window.removeEventListener('scroll', scrollListener);
      window.removeEventListener('resize', handleScroll);
      if (formRef.current) observer.unobserve(formRef.current);
    };
  }, []);

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  return (
    <aside className="analyse-rail" aria-hidden="true">
      <span className="analyse-rail__mark">
        <img
          src="/businessstylist-logo-sml.png"
          alt=""
          className="analyse-rail__logo"
        />
      </span>
      <div className="analyse-rail__track">
        <div
          className="analyse-rail__fill"
          style={isMobile ? { width: `${progress * 100}%` } : { height: `${progress * 100}%` }}
        />
      </div>
      <span className="analyse-rail__phase">{phaseLabel}</span>
    </aside>
  );
}
