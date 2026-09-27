import React from 'react';
import { Glitch } from './glitch';
import { Button } from './button';

export interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  width?: string;
}

export const Modal: React.FC<Props> = ({ open, onClose, title, children, width = '550px' }) => {
  if (!open) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: width,
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Glitch
          style={{
            padding: '20px',
            border: '1px solid var(--primary)',
            boxShadow: 'var(--glow-primary)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            maxHeight: '85vh',
            overflowY: 'auto',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid var(--border-dim)',
              paddingBottom: '10px',
            }}
          >
            <h3 style={{ color: 'var(--primary)', fontSize: 'var(--font-md)', margin: 0 }}>
              {title}
            </h3>
            <Button size="xs" variant="ghost" onClick={onClose}>
              ✕
            </Button>
          </div>
          <div>{children}</div>
        </Glitch>
      </div>
    </div>
  );
};
