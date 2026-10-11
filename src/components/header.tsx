import { useEffect, useRef, useState } from 'react';
import { BRANDING } from '../lib/theme';
import { Button } from './button';

export const Header = ({ onNavClick }: { onNavClick?: (target: string) => void }) => {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const dismiss = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); toggle.current?.focus(); }
    };
    window.addEventListener('keydown', dismiss);
    return () => window.removeEventListener('keydown', dismiss);
  }, [open]);
  return (
    <header className="header">
      <a href="#hero" aria-label="Rawchunks home" onClick={(event) => {
        if (onNavClick) { event.preventDefault(); onNavClick('hero'); }
        setOpen(false);
      }}>
        <img src="/logo.svg" alt="Rawchunks" className="landing-brand-logo" width="590" height="88" />
      </a>
      <button ref={toggle} className="menu-toggle" type="button" aria-expanded={open} aria-controls="site-nav" onClick={() => setOpen(!open)}>{open ? 'Close' : 'Menu'}</button>
      <nav onClick={(event) => {
        const link = (event.target as HTMLElement).closest('a[href^="#"]');
        if (link && onNavClick) { event.preventDefault(); onNavClick(link.getAttribute('href')!.slice(1)); }
      }} id="site-nav" className={`site-nav ${open ? 'is-open' : ''}`} aria-label="Main navigation">
        <a href="#features" onClick={() => setOpen(false)}>Make music</a>
        <a href="#showcase" onClick={() => setOpen(false)}>Editor</a>
        <a href="#stack" onClick={() => setOpen(false)}>Build with us</a>
        <a href={BRANDING.githubUrl}>GitHub</a>
        <Button size="sm" href={BRANDING.appUrl}>Launch app</Button>
      </nav>
    </header>
  );
};
