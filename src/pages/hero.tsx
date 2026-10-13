import { BRANDING } from '../lib/theme';
import { Button } from '../components/button';

export const Hero = (_props: { onExplore?: () => void }) => (
  <div className="hero-layout section-content">
    <div className="hero-copy">
      <h1>{BRANDING.tagline}</h1>
      <p className="product-label">{BRANDING.slogan}</p>
      <p className="hero-description">AI-powered Music Production Suite. Rawchunks lets you generate, edit and license music that you truly own.</p>
      <p className="manifesto">{BRANDING.manifesto}</p>
      <div className="hero-actions"><Button size="lg" href={BRANDING.appUrl}>Make music</Button><a className="text-link" href="#showcase">See the editor</a></div>
    </div>
    <div className="record-scene" aria-hidden="true">
      <div className="record-sleeve"><img src="/hero.png" alt="" width="1376" height="768" /></div>
      <div className="record"><div className="record-label"><img src="/mark.svg" alt="" width="72" height="72" /><span>RAWCHUNKS</span></div></div>
    </div>
    <a className="hero-next" href="#features"><span>Music tools</span><svg width="16" height="24" viewBox="0 0 16 24" aria-hidden="true"><path d="M8 2v18m-5-5 5 5 5-5" fill="none" stroke="currentColor" /></svg></a>
  </div>
);
