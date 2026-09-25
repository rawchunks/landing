import React, { useState, useEffect } from 'react';
import { COLORS } from '../lib/theme';

export interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  href?: string;
  target?: string;
}

export const Button: React.FC<Props> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  style = {},
  disabled = false,
  href,
  target,
}) => {
  const [pressed, setPressed] = useState(false);
  const [pulse, setPulse] = useState(1);

  const getColors = () => {
    switch (variant) {
      case 'secondary':
        return {
          border: COLORS.secondary,
          text: COLORS.secondary,
          glow: `rgba(255, 0, 160, ${pressed ? 0.35 : 0.15})`,
          shadow: 'rgba(255, 0, 160, 0.5)',
        };
      case 'accent':
        return {
          border: COLORS.accent,
          text: COLORS.accent,
          glow: `rgba(0, 204, 255, ${pressed ? 0.35 : 0.15})`,
          shadow: 'rgba(0, 204, 255, 0.5)',
        };
      case 'ghost':
        return {
          border: 'rgba(255, 255, 255, 0.2)',
          text: COLORS.textSecondary,
          glow: 'rgba(255, 255, 255, 0.05)',
          shadow: 'transparent',
        };
      case 'primary':
      default:
        return {
          border: COLORS.primary,
          text: COLORS.primary,
          glow: `rgba(0, 255, 65, ${pressed ? 0.35 : 0.15})`,
          shadow: 'rgba(0, 255, 65, 0.5)',
        };
    }
  };

  const getPadding = () => {
    switch (size) {
      case 'xs':
        return { v: '4px', h: '8px', f: 'var(--font-xs)' };
      case 'sm':
        return { v: '6px', h: '12px', f: 'var(--font-sm)' };
      case 'lg':
        return { v: '14px', h: '28px', f: 'var(--font-lg)' };
      case 'md':
      default:
        return { v: '10px', h: '18px', f: 'var(--font-md)' };
    }
  };

  useEffect(() => {
    if (disabled) return;
    const interval = setInterval(() => {
      setPulse((p) => (p === 1 ? 1.015 : 1));
    }, 1800);
    return () => clearInterval(interval);
  }, [disabled]);

  const palette = getColors();
  const pad = getPadding();

  const buttonStyle: React.CSSProperties = {
    position: 'relative',
    border: `1px solid ${disabled ? COLORS.textTertiary : palette.border}`,
    backgroundColor: 'rgba(5, 5, 5, 0.85)',
    color: disabled ? COLORS.textTertiary : palette.text,
    fontFamily: 'var(--font-family)',
    fontWeight: 900,
    fontSize: pad.f,
    letterSpacing: 'var(--letter-spacing-base)',
    textTransform: 'uppercase',
    textDecoration: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: `${pad.v} ${pad.h}`,
    overflow: 'hidden',
    transform: `scale(${pulse})`,
    transition: 'all 0.15s ease',
    textShadow: pressed ? `0 0 6px ${palette.shadow}` : 'none',
    boxShadow: `0 0 10px ${palette.glow}`,
    backdropFilter: 'blur(6px)',
    flexShrink: 0,
    ...style,
  };

  const overlayStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    background: `linear-gradient(135deg, ${palette.glow}, transparent)`,
    opacity: pressed ? 1 : 0.4,
    pointerEvents: 'none',
  };

  const contentStyle: React.CSSProperties = {
    position: 'relative',
    zIndex: 2,
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    whiteSpace: 'nowrap',
  };

  if (href) {
    return (
      <a
        href={href}
        target={target}
        className={className}
        style={buttonStyle}
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        onMouseLeave={() => setPressed(false)}
      >
        <div style={overlayStyle} />
        <span style={contentStyle}>{children}</span>
      </a>
    );
  }

  return (
    <button
      type="button"
      className={className}
      style={buttonStyle}
      disabled={disabled}
      onClick={onClick}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
    >
      <div style={overlayStyle} />
      <span style={contentStyle}>{children}</span>
    </button>
  );
};
