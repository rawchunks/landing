import { useState } from 'react';
import { Arrow, Tabs } from '../components/tabs';

const services = [
  { name: 'Generate', title: 'Generate music', text: 'Start with a sentence, image, hum or spoken idea. Songwriter fills the musical brief, lyrics, settings and cover. Review the draft, choose Fast or Master, then generate audio.', image: 'studio-vibe', alt: 'Rawchunks Vibe with an example prompt, image and hum controls, and the Vibe action.' },
  { name: 'Rework', title: 'Rework a section', text: 'Select a range. Describe the replacement, adjust its strength, and compare the new take with the original before you merge it.', image: 'editor-rework', alt: 'Rework controls with mode, strength, lyrics and sound description.' },
  { name: 'Layer', title: 'Layer an instrument', text: 'Ask for an instrument and describe how it should sound. Use Master or selected lanes as the reference, then place the new part alongside them.', image: 'editor-layer', alt: 'Layer controls with Instrument and Sound Description fields.' },
  { name: 'Extract', title: 'Extract a section', text: 'Select a range on the waveform and extract it as a take. Listen, process it separately, and mount the result where it belongs.', image: 'editor-timeline', alt: 'A selected waveform range with the Extract action and an extracted take below.' },
  { name: 'Separate', title: 'Separate stems', text: 'Separate audio into stems, or request a supported instrument. Work on a vocal or instrument part, then balance it with the rest of the song.', image: 'editor-separate', alt: 'Separate controls in the Rawchunks Studio toolbox.' },
  { name: 'Extend', title: 'Extend a track', text: 'Continue the track or add an intro. Set the added duration, describe the new passage, and supply lyrics when you want vocals.', image: 'editor-extend', alt: 'Extend controls for duration, start or end placement, and lyrics.' },
  { name: 'Restyle', title: 'Restyle a track', text: 'Describe a new style for existing audio. Adjust how closely it follows the source, listen to the take, and keep the version you prefer.', image: 'editor-restyle', alt: 'Restyle controls with style description and source influence.' },
] as const;

export const Features = (_props: { onNext?: () => void }) => {
  const [selected, setSelected] = useState(0);
  const item = services[selected];
  const change = (delta: number) => setSelected((current) => (current + delta + services.length) % services.length);
  return (
    <div className="section-content features-content">
      <div className="section-heading"><h2>Generate and edit</h2><p>Use the same music tools in the app or through the Rawchunks API.</p></div>
      <div className="service-selector"><Tabs id="services" label="Music operations" items={services.map((service) => service.name)} selected={selected} onSelect={setSelected} /><div className="carousel-arrows"><button type="button" aria-label="Previous operation" onClick={() => change(-1)}><Arrow direction="left" /></button><button type="button" aria-label="Next operation" onClick={() => change(1)}><Arrow direction="right" /></button></div></div>
      <div id="services-panel" role="tabpanel" aria-labelledby={`services-tab-${selected}`} className="service-panel">
        <div className="service-copy" key={item.name}><h3>{item.title}</h3><p>{item.text}</p><span className="service-position">{selected + 1} / {services.length}</span></div>
        <figure className={`service-image ${item.name === 'Extract' ? 'wide-image' : ''}`}><img src={`/images/${item.image}.${item.name === 'Generate' ? 'png' : 'jpg'}`} alt={item.alt} width={item.name === 'Generate' ? 1602 : item.name === 'Extract' ? 1255 : 911} height={item.name === 'Generate' ? 1376 : item.name === 'Extract' ? 525 : item.name === 'Separate' ? 410 : item.name === 'Restyle' ? 430 : 620} loading="lazy" /><figcaption>{item.name === 'Generate' ? 'Example brief in the current Studio' : 'A Pro studio for your music'}</figcaption></figure>
      </div>
    </div>
  );
};
