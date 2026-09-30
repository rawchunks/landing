import React, { useState } from 'react';
import { COLORS, BRANDING } from '../lib/theme';
import { Glitch } from './glitch';
import { Button } from './button';

export interface Props {
  onNavClick?: (target: string) => void;
}

export const Header: React.FC<Props> = ({ onNavClick }) => {
  const [open, setOpen] = useState(false);

  const scrollTo = (id: string) => {
    if (onNavClick) {
      onNavClick(id);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setOpen(false);
  };

  const navStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: '64px',
    backgroundColor: 'rgba(0, 0, 0, 0.92)',
    borderBottom: `1px solid ${COLORS.border}`,
    backdropFilter: 'blur(12px)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 clamp(16px, 4vw, 40px)',
  };

  const linkStyle: React.CSSProperties = {
    color: COLORS.textSecondary,
    fontSize: 'var(--font-xs)',
    letterSpacing: 'var(--letter-spacing-base)',
    textTransform: 'uppercase',
    fontWeight: 700,
    cursor: 'pointer',
    transition: 'color 0.2s',
  };

  return (
    <>
      <nav style={navStyle}>
        {/* Brand identity */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img
            src="/icon.svg"
            alt="Rawchunks"
            style={{ width: '32px', height: '32px', objectFit: 'contain' }}
          />
          <Glitch
            text={BRANDING.name}
            style={{
              fontSize: 'var(--font-lg)',
              fontWeight: 900,
              color: COLORS.primary,
              letterSpacing: 'var(--letter-spacing-wide)',
            }}
          />
        </div>

        {/* Desktop links */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
          }}
          className="desktop-nav"
        >
          <span style={linkStyle} onClick={() => scrollTo('features')}>
            Features
          </span>
          <span style={linkStyle} onClick={() => scrollTo('showcase')}>
            Showcase
          </span>
          <span style={linkStyle} onClick={() => scrollTo('stack')}>
            Tech
          </span>
          <Button
            size="sm"
            variant="primary"
            onClick={() => {
              window.location.href = window.location.hostname === 'localhost' ? 'http://localhost:3001' : BRANDING.appUrl;
            }}
          >
            Launch Studio
          </Button>
        </div>

        {/* Mobile toggle */}
        <div className="mobile-nav">
          <Button size="xs" variant="ghost" onClick={() => setOpen(!open)}>
            {open ? 'Close' : 'Menu'}
          </Button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {open && (
        <div
          style={{
            position: 'fixed',
            top: '64px',
            inset: '64px 0 0 0',
            backgroundColor: 'rgba(0, 0, 0, 0.97)',
            backdropFilter: 'blur(16px)',
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '32px',
          }}
        >
          <span style={{ ...linkStyle, fontSize: 'var(--font-md)' }} onClick={() => scrollTo('features')}>
            Features
          </span>
          <span style={{ ...linkStyle, fontSize: 'var(--font-md)' }} onClick={() => scrollTo('showcase')}>
            Showcase
          </span>
          <span style={{ ...linkStyle, fontSize: 'var(--font-md)' }} onClick={() => scrollTo('stack')}>
            Tech
          </span>
          <Button
            size="lg"
            variant="primary"
            onClick={() => {
              window.location.href = window.location.hostname === 'localhost' ? 'http://localhost:3001' : BRANDING.appUrl;
            }}
          >
            Launch Studio
          </Button>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-nav { display: block !important; }
        }
        @media (min-width: 769px) {
          .desktop-nav { display: flex !important; }
          .mobile-nav { display: none !important; }
        }
      `}</style>
    </>
  );
};
