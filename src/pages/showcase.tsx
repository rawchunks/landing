import React, { useState, useRef } from 'react';
import { COLORS } from '../lib/theme';
import { Glitch } from '../components/glitch';
import { Button } from '../components/button';

export interface Track {
  id: string;
  title: string;
  tags: string[];
  bpm: number;
  duration: string;
  type: 'acid' | 'synth' | 'dark';
}

export interface Props {
  onNext?: () => void;
}

export const Showcase: React.FC<Props> = () => {
  const [active, setActive] = useState<string | null>(null);
  const audioContext = useRef<AudioContext | null>(null);
  const oscillator = useRef<OscillatorNode | null>(null);

  const tracks: Track[] = [
    {
      id: 'trk-1',
      title: 'ACID SUB-ROUTINE // 303',
      tags: ['ACID TECHNO', '135 BPM', 'TB-303', 'OVERDRIVE'],
      bpm: 135,
      duration: '02:44',
      type: 'acid',
    },
    {
      id: 'trk-2',
      title: 'NEURAL CONVERGENCE',
      tags: ['DARK CYBERPUNK', '140 BPM', 'SUB BASS', 'SYNTH'],
      bpm: 140,
      duration: '03:12',
      type: 'synth',
    },
    {
      id: 'trk-3',
      title: 'RECOMBINANT STEM DUMP',
      tags: ['BREAKCORE', '165 BPM', 'GLITCH', 'RAW CHUNK'],
      bpm: 165,
      duration: '01:58',
      type: 'dark',
    },
  ];

  const togglePlay = (t: Track) => {
    if (active === t.id) {
      stopAudio();
      setActive(null);
    } else {
      stopAudio();
      playSynth(t.type);
      setActive(t.id);
    }
  };

  const stopAudio = () => {
    if (oscillator.current) {
      try {
        oscillator.current.stop();
        oscillator.current.disconnect();
      } catch {
        // ignore
      }
      oscillator.current = null;
    }
  };

  const playSynth = (type: 'acid' | 'synth' | 'dark') => {
    try {
      const ctx = audioContext.current || new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      audioContext.current = ctx;
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(type === 'acid' ? 800 : type === 'synth' ? 500 : 350, ctx.currentTime);
      filter.Q.setValueAtTime(type === 'acid' ? 8 : 4, ctx.currentTime);

      osc.type = type === 'acid' ? 'sawtooth' : 'triangle';
      osc.frequency.setValueAtTime(type === 'acid' ? 110 : type === 'synth' ? 82.4 : 65.4, ctx.currentTime);

      // Acid filter sweep
      filter.frequency.exponentialRampToValueAtTime(type === 'acid' ? 3200 : 1800, ctx.currentTime + 0.4);
      filter.frequency.exponentialRampToValueAtTime(type === 'acid' ? 600 : 400, ctx.currentTime + 0.8);

      gain.gain.setValueAtTime(0.18, ctx.currentTime);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      oscillator.current = osc;
    } catch {
      // Audio preview fallback
    }
  };

  return (
    <div
      id="showcase"
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
          text="LIVE AUDIO SHOWCASE // RECOMBINANT FEEDS"
          style={{
            fontSize: 'var(--font-lg)',
            color: COLORS.accent,
            fontWeight: 900,
            letterSpacing: 'var(--letter-spacing-wide)',
          }}
          intensity="low"
        />
        <p style={{ color: COLORS.textSecondary, fontSize: 'var(--font-sm)', margin: '4px 0 0 0' }}>
          Hear raw generated chunks with real-time browser synthesis.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {tracks.map((track) => {
          const isPlaying = active === track.id;
          return (
            <Glitch
              key={track.id}
              style={{
                padding: '14px 20px',
                borderColor: isPlaying ? COLORS.primary : 'var(--border-dim)',
                boxShadow: isPlaying ? 'var(--glow-primary)' : 'none',
                backgroundColor: isPlaying ? 'rgba(0, 255, 65, 0.05)' : 'rgba(10, 10, 10, 0.85)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <Button
                  size="sm"
                  variant={isPlaying ? 'secondary' : 'primary'}
                  onClick={() => togglePlay(track)}
                >
                  {isPlaying ? '■ Stop' : '▶ Preview'}
                </Button>
                <div>
                  <div style={{ fontWeight: 900, fontSize: 'var(--font-md)', color: COLORS.text }}>
                    {track.title}
                  </div>
                  <div style={{ display: 'flex', gap: '6px', marginTop: '4px', flexWrap: 'wrap' }}>
                    {track.tags.map((t, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: 'var(--font-xs)',
                          color: COLORS.textSecondary,
                          backgroundColor: 'rgba(255, 255, 255, 0.06)',
                          padding: '1px 6px',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ fontSize: 'var(--font-xs)', color: COLORS.textTertiary }}>
                  {track.bpm} BPM // {track.duration}
                </span>
                <span
                  style={{
                    fontSize: 'var(--font-xs)',
                    color: isPlaying ? COLORS.primary : COLORS.textTertiary,
                    fontWeight: 700,
                  }}
                >
                  {isPlaying ? '● AUDIBLE DSP' : '○ STANDBY'}
                </span>
              </div>
            </Glitch>
          );
        })}
      </div>
    </div>
  );
};
