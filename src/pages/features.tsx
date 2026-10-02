import React, { useState } from 'react';
import { COLORS } from '../lib/theme';
import { Glitch } from '../components/glitch';
import { Button } from '../components/button';

export interface Item {
  title: string;
  subtitle: string;
  points: string[];
  color: string;
  badge: string;
}

export interface Props {
  onNext?: () => void;
}

export const Features: React.FC<Props> = () => {
  const [selected, setSelected] = useState(0);

  const items: Item[] = [
    {
      title: 'Neural Generation',
      subtitle: 'Simple & Custom Prompt Orchestration',
      badge: 'LATENT SYNTHESIS',
      color: COLORS.primary,
      points: [
        'Natural text prompting with intelligent style expansion',
        'Structured custom lyric parsing [Intro, Verse, Drop, Outro]',
        'Dual parallel generation variations per prompt request',
        'High-density genre, tempo (BPM), and mood tag autocomplete',
      ],
    },
    {
      title: 'Surgical In-Painting',
      subtitle: 'Timeline Precision Section Replacement',
      badge: 'WAVEFORM BRUSH',
      color: COLORS.secondary,
      points: [
        'Select any time window [Start - End] on the interactive waveform',
        'Rewrite lyrics or prompt specifically for the highlighted region',
        'Seamless boundary cross-fade stitching with zero pitch-drift',
        'Drop extend markers to continue tracks forward or prepend intros',
      ],
    },
    {
      title: 'Stem Decomposition',
      subtitle: '4-Channel Isolated Audio Stems',
      badge: 'DSP SEPARATION',
      color: COLORS.accent,
      points: [
        'Instant demuxing into Vocals, Bass, Drums, and Instruments',
        'Individual stem volume faders, solo, and mute controls',
        'Inpaint only the vocal stem without altering backing beats',
        'Direct multi-stem export for external DAWs (Ableton, FL, Logic)',
      ],
    },
  ];

  return (
    <div
      id="features"
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
          text="CORE ARCHITECTURE // SUNO SURPASS"
          style={{
            fontSize: 'var(--font-lg)',
            color: COLORS.primary,
            fontWeight: 900,
            letterSpacing: 'var(--letter-spacing-wide)',
          }}
          intensity="low"
        />
        <p style={{ color: COLORS.textSecondary, fontSize: 'var(--font-sm)', margin: '4px 0 0 0' }}>
          Engineered for producers who demand surgical control over latent music generation.
        </p>
      </div>

      {/* Feature Selector Tabs */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {items.map((item, idx) => (
          <Button
            key={idx}
            size="sm"
            variant={selected === idx ? 'primary' : 'ghost'}
            onClick={() => setSelected(idx)}
          >
            {item.title}
          </Button>
        ))}
      </div>

      {/* Feature Card Display */}
      <Glitch
        style={{
          padding: 'clamp(16px, 3vh, 32px)',
          borderColor: items[selected].color,
          boxShadow: `0 0 16px ${items[selected].color}25`,
          backgroundColor: 'rgba(10, 10, 10, 0.9)',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <h2 style={{ color: items[selected].color, fontSize: 'var(--font-xl)', margin: 0 }}>
              {items[selected].title}
            </h2>
            <span style={{ color: COLORS.textSecondary, fontSize: 'var(--font-xs)', letterSpacing: 'var(--letter-spacing-base)' }}>
              {items[selected].subtitle}
            </span>
          </div>
          <span
            style={{
              padding: '4px 10px',
              border: `1px solid ${items[selected].color}`,
              fontSize: 'var(--font-xs)',
              color: items[selected].color,
              fontWeight: 700,
            }}
          >
            {items[selected].badge}
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px', marginTop: '8px' }}>
          {items[selected].points.map((pt, pIdx) => (
            <div
              key={pIdx}
              style={{
                display: 'flex',
                gap: '10px',
                alignItems: 'flex-start',
                padding: '10px 12px',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              <span style={{ color: items[selected].color, fontWeight: 900 }}>›</span>
              <span style={{ color: COLORS.text, fontSize: 'var(--font-sm)', lineHeight: 1.5 }}>
                {pt}
              </span>
            </div>
          ))}
        </div>
      </Glitch>
    </div>
  );
};
