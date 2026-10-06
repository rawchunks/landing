import React from 'react';
import { COLORS } from '../lib/theme';
import { Glitch } from '../components/glitch';

export interface Tech {
  name: string;
  role: string;
  desc: string;
  color: string;
}

export interface Props {
  onNext?: () => void;
}

export const Stack: React.FC<Props> = () => {
  const stack: Tech[] = [
    {
      name: 'Google Lyria',
      role: 'Realtime Latent Audio Streamer',
      desc: 'Sub-second audio synthesis delivering high-fidelity musical continuous stems.',
      color: COLORS.primary,
    },
    {
      name: 'Google Gemini',
      role: 'Generative Lyricist & Musicologist',
      desc: 'Structure-aware lyrical parsing [Verse/Chorus] and style descriptor intelligence.',
      color: COLORS.secondary,
    },
    {
      name: 'Web Audio DSP',
      role: 'Browser Multi-Track Inpainter',
      desc: 'Client-side boundary cross-fading, stem channel mixing, and waveform slicing.',
      color: COLORS.accent,
    },
    {
      name: 'NVIDIA H100 Cluster',
      role: 'Kubernetes Neural Pipeline',
      desc: 'Dedicated inference pods running low-latency stem separation and in-painting models.',
      color: COLORS.warning,
    },
  ];

  return (
    <div
      id="stack"
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'clamp(20px, 4vh, 40px) clamp(16px, 6vw, 80px)',
        boxSizing: 'border-box',
        gap: 'clamp(12px, 2vh, 24px)',
      }}
    >
      <div>
        <Glitch
          text="INFRASTRUCTURE // NEURAL PIPELINE"
          style={{
            fontSize: 'var(--font-lg)',
            color: COLORS.warning,
            fontWeight: 900,
            letterSpacing: 'var(--letter-spacing-wide)',
          }}
          intensity="low"
        />
        <p style={{ color: COLORS.textSecondary, fontSize: 'var(--font-sm)', margin: '4px 0 0 0' }}>
          Zero buffering. Massive parallel inference clusters for instant song rendering.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
        {stack.map((item, idx) => (
          <Glitch
            key={idx}
            style={{
              padding: '18px',
              borderColor: `${item.color}40`,
              backgroundColor: 'rgba(10, 10, 10, 0.85)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 'var(--font-md)', fontWeight: 900, color: item.color }}>
                {item.name}
              </span>
              <span style={{ fontSize: 'var(--font-xs)', color: COLORS.textTertiary }}>
                0{idx + 1}
              </span>
            </div>
            <span style={{ fontSize: 'var(--font-xs)', color: COLORS.text, fontWeight: 700 }}>
              {item.role}
            </span>
            <p style={{ fontSize: 'var(--font-xs)', color: COLORS.textSecondary, lineHeight: 1.5, margin: 0 }}>
              {item.desc}
            </p>
          </Glitch>
        ))}
      </div>
    </div>
  );
};
