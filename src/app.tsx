import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/header';
import { Hero } from './pages/hero';
import { Features } from './pages/features';
import { Showcase } from './pages/showcase';
import { Stack } from './pages/stack';
import { Footer } from './components/footer';
import './styles/styles.css';

export type Section = 'hero' | 'features' | 'showcase' | 'stack';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>('hero');
  const containerRef = useRef<HTMLDivElement | null>(null);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    const container = containerRef.current;
    if (el && container) {
      const top = el.getBoundingClientRect().top - container.getBoundingClientRect().top + container.scrollTop;
      container.scrollTo({ top, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    }
  };

  useEffect(() => {
    const sections = ['hero', 'features', 'showcase', 'stack'];
    const elements = sections.map((s) => document.getElementById(s)).filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            setActiveSection(entry.target.id as Section);
          }
        });
      },
      {
        root: containerRef.current,
        threshold: 0.5,
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="viewport">
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="scanlines" aria-hidden="true" />
      <Header onNavClick={scrollTo} />

      {/* Snap-Scrolling Main Feed */}
      <main id="main" ref={containerRef} className="snap-container" onClick={(event) => {
        const link = (event.target as HTMLElement).closest('a[href^="#"]');
        if (link) { event.preventDefault(); scrollTo(link.getAttribute('href')!.slice(1)); }
      }}>
        <section id="hero" className="snap-section">
          <Hero onExplore={() => scrollTo('features')} />
        </section>

        <section id="features" className="snap-section">
          <Features onNext={() => scrollTo('showcase')} />
        </section>

        <section id="showcase" className="snap-section">
          <Showcase onNext={() => scrollTo('stack')} />
        </section>

        <section id="stack" className="snap-section" style={{ justifyContent: 'space-between' }}>
          <Stack onNext={() => scrollTo('hero')} />
          <Footer onNavClick={scrollTo} />
        </section>
      </main>

      {/* Snap Indicator Dots */}
      <div
        style={{
          position: 'fixed',
          right: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          zIndex: 100,
        }}
        className="section-dots"
      >
        {(['hero', 'features', 'showcase', 'stack'] as const).map((s) => (
          <button
            key={s}
            onClick={() => scrollTo(s)}
            style={{
              width: activeSection === s ? '24px' : '8px',
              height: '8px',
              backgroundColor: activeSection === s ? 'var(--primary)' : 'rgba(255, 255, 255, 0.25)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            title={s === 'showcase' ? 'Editor' : s === 'stack' ? 'Build with us' : s}
            aria-label={s === 'showcase' ? 'Editor' : s === 'stack' ? 'Build with us' : s}
            aria-current={activeSection === s ? 'location' : undefined}
          />
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .section-dots { display: none !important; }
        }
      `}</style>
    </div>
  );
};
