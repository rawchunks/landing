import React from 'react';

export interface Props {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'warning' | 'muted';
  clickable?: boolean;
  active?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export const Badge: React.FC<Props> = ({
  children,
  variant = 'primary',
  clickable = false,
  active = false,
  onClick,
  style = {},
}) => {
  const getColors = () => {
    switch (variant) {
      case 'secondary':
        return {
          bg: active ? 'rgba(255, 0, 160, 0.25)' : 'rgba(255, 0, 160, 0.08)',
          border: 'var(--secondary)',
          text: 'var(--secondary)',
        };
      case 'accent':
        return {
          bg: active ? 'rgba(0, 204, 255, 0.25)' : 'rgba(0, 204, 255, 0.08)',
          border: 'var(--accent)',
          text: 'var(--accent)',
        };
      case 'warning':
        return {
          bg: active ? 'rgba(255, 170, 0, 0.25)' : 'rgba(255, 170, 0, 0.08)',
          border: 'var(--warning)',
          text: 'var(--warning)',
        };
      case 'muted':
        return {
          bg: 'rgba(255, 255, 255, 0.05)',
          border: 'rgba(255, 255, 255, 0.2)',
          text: 'var(--text-dim)',
        };
      case 'primary':
      default:
        return {
          bg: active ? 'rgba(0, 255, 65, 0.25)' : 'rgba(0, 255, 65, 0.08)',
          border: 'var(--primary)',
          text: 'var(--primary)',
        };
    }
  };

  const palette = getColors();

  return (
    <span
      onClick={clickable ? onClick : undefined}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '2px 8px',
        fontSize: 'var(--font-xs)',
        fontFamily: 'var(--font-family)',
        fontWeight: 700,
        letterSpacing: 'var(--letter-spacing-tight)',
        textTransform: 'uppercase',
        backgroundColor: palette.bg,
        border: `1px solid ${palette.border}`,
        color: palette.text,
        cursor: clickable ? 'pointer' : 'default',
        userSelect: 'none',
        whiteSpace: 'nowrap',
        transition: 'all 0.15s ease',
        ...style,
      }}
    >
      {children}
    </span>
  );
};
