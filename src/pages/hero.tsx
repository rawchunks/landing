import React from 'react';
import { COLORS, BRANDING } from '../lib/theme';
import { Glitch } from '../components/glitch';
import { Button } from '../components/button';

export interface Props {
  onExplore?: () => void;
}

export const Hero: React.FC<Props> = ({ onExplore }) => {
  const containerStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 clamp(16px, 6vw, 80px)',
    boxSizing: 'border-box',
    position: 'relative',
    zIndex: 2,
  };

  const leftStyle: React.CSSProperties = {
    width: '65%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 'clamp(8px, 1.5vh, 20px)',
  };

  const rightStyle: React.CSSProperties = {
    width: '30%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
  };

  return (
    <div style={containerStyle} className="hero-layout">
      {/* Left side: Acid Manifesto */}
      <div style={leftStyle} className="hero-left">
        <Glitch
          text={BRANDING.tagline}
          style={{
            fontSize: 'var(--font-title)',
            fontWeight: 900,
            color: COLORS.textPrimary,
            letterSpacing: 'var(--letter-spacing-wide)',
            lineHeight: 1.1,
          }}
          intensity="medium"
        />

        <Glitch
          text={BRANDING.slogan}
          style={{
            fontSize: 'var(--font-sm)',
            fontWeight: 700,
            color: COLORS.primary,
            letterSpacing: 'var(--letter-spacing-base)',
          }}
          intensity="low"
        />

        <p
          style={{
            fontSize: 'var(--font-md)',
            color: COLORS.textSecondary,
            lineHeight: 1.6,
            maxWidth: '680px',
            margin: 0,
          }}
        >
          Rawchunks deconstructs AI music creation into surgical, recombinant chunks. Generate full tracks from raw text and style tags, or surgically inpaint waveforms, replace lyrics, and isolate stems in real time.
        </p>

        <Glitch
          text={BRANDING.manifesto}
          style={{
            fontSize: 'var(--font-xs)',
            color: COLORS.textTertiary,
            letterSpacing: 'var(--letter-spacing-base)',
          }}
          intensity="low"
        />
      </div>

      {/* Right side: Visual and CTA */}
      <div style={rightStyle} className="hero-right">
        <div
          style={{
            position: 'relative',
            width: 'clamp(180px, 20vw, 280px)',
            aspectRatio: '1/1',
            border: `1px solid ${COLORS.primary}`,
            boxShadow: 'var(--glow-primary)',
            overflow: 'hidden',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
          }}
        >
          <img
            src="/hero.png"
            alt="Rawchunks Synthesizer"
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent 70%)',
              display: 'flex',
              alignItems: 'flex-end',
              padding: '12px',
            }}
          >
            <span style={{ fontSize: 'var(--font-xs)', color: COLORS.accent, fontWeight: 700 }}>
              NEURAL DSP ENGINE // READY
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', maxWidth: '280px' }}>
          <Button
            size="lg"
            variant="primary"
            onClick={() => {
              window.location.href = window.location.hostname === 'localhost' ? 'http://localhost:3001' : BRANDING.appUrl;
            }}
            style={{ width: '100%' }}
          >
            Enter Studio
          </Button>

          {onExplore && (
            <Button size="sm" variant="ghost" onClick={onExplore} style={{ width: '100%' }}>
              Explore Capabilities ↓
            </Button>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .hero-layout {
            flex-direction: column !important;
            justify-content: center !important;
            gap: 24px !important;
            padding: 80px 20px 20px 20px !important;
            overflow-y: auto !important;
          }
          .hero-left { width: 100% !important; text-align: center !important; align-items: center !important; }
          .hero-right { width: 100% !important; }
        }
      `}</style>
    </div>
  );
};
