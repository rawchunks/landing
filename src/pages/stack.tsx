import { useState } from 'react';
import { Tabs } from '../components/tabs';
import { BRANDING } from '../lib/theme';
import { Button } from '../components/button';

export const Stack = (_props: { onNext?: () => void }) => {
  const [selected, setSelected] = useState(0);
  return (
  <div className="section-content build-content">
    <div className="section-heading"><h2>Voices, publishing and APIs</h2><p>Use a custom voice, publish an original, or build music tools into your own product.</p></div>
    <div className="capability-tabs"><Tabs id="capabilities" label="More capabilities" items={['Voices', 'Licenses', 'APIs']} selected={selected} onSelect={setSelected} /></div>
    <div id="capabilities-panel" className={`capability-list selected-${selected}`}>
      <article><span className="capability-marker" /><div><h3>Custom voices</h3><p>Upload a vocal reference or save a song’s voice. Reuse a trained voice when it’s ready for your generation mode.</p></div><a className="text-link" href={`${BRANDING.docsUrl}/app/voices`}>Voice guide</a></article>
      <article><span className="capability-marker" /><div><h3>Publish and license</h3><p>Offer an original in the Market with your license price and allocation. Buy a remix license and make new versions of a track.</p></div><a className="text-link" href={`${BRANDING.docsUrl}/app/licenses`}>Licensing guide</a></article>
      <article><span className="capability-marker" /><div><h3>Developer APIs</h3><p>Generate and edit audio through the Rawchunks API. Manage songs, takes and saved voices with your own interface.</p></div><a className="text-link" href={`${BRANDING.docsUrl}/dev/overview`}>Developer guides</a></article>
    </div>
    <div className="closing"><p>Open the workstation</p><Button size="lg" href={BRANDING.appUrl}>Launch app</Button></div>
  </div>
  );
};
