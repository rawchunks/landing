import React from 'react';
import { COLORS, BRANDING } from '../lib/theme';
import { Glitch } from './glitch';

export interface Props {
  onNavClick?: (target: string) => void;
}

export const Footer: React.FC<Props> = () => {
  return (
    <footer
      style={{
        width: '100%',
        padding: '16px clamp(16px, 6vw, 80px)',
        backgroundColor: 'rgba(0, 0, 0, 0.95)',
        borderTop: `1px solid ${COLORS.border}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        boxSizing: 'border-box',
        zIndex: 10,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: COLORS.primary, display: 'inline-block' }} />
        <span style={{ fontSize: 'var(--font-xs)', color: COLORS.primary, fontWeight: 700 }}>
          SYSTEMS ACTIVE // AUDIO LATENTS ONLINE
        </span>
      </div>

      <Glitch
        text={BRANDING.manifesto}
        style={{
          fontSize: 'var(--font-xs)',
          color: COLORS.textTertiary,
          letterSpacing: 'var(--letter-spacing-base)',
        }}
        intensity="low"
      />

      <div style={{ fontSize: 'var(--font-xs)', color: COLORS.textTertiary }}>
        © {new Date().getFullYear()} {BRANDING.name} · RAW SOUND
      </div>
    </footer>
  );
};
