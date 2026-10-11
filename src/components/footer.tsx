import { BRANDING } from '../lib/theme';

export const Footer = (_props: { onNavClick?: (target: string) => void }) => (
  <footer className="footer">
    <img src="/mark.svg" width="28" height="28" alt="" />
    <span className="footer-manifesto">{BRANDING.manifesto}</span>
    <span>© {new Date().getFullYear()} Rawchunks</span>
    <nav aria-label="Footer"><a href={BRANDING.docsUrl}>Documentation</a><a href={BRANDING.githubUrl}>GitHub</a></nav>
  </footer>
);
