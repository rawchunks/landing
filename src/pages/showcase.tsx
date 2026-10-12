import { useState } from 'react';
import { Tabs } from '../components/tabs';

const tools = [
  { name: 'Studio', image: 'editor-overview', title: 'Studio', text: 'Master, lanes and extracted takes share a timeline. Select a range, open the floating toolbox, compare takes and merge the parts you want to keep.', width: 1280, height: 720 },
  { name: 'Mixer', image: 'editor-mixer', title: 'Mixer', text: 'Set levels and pan, mute or solo lanes, and listen to each part in the mix.', width: 911, height: 620 },
  { name: 'Keys', image: 'editor-keys', title: 'Keys', text: 'Place notes in the piano roll, set the note grid and velocity, and quantize the pattern.', width: 666, height: 432 },
  { name: 'Drums', image: 'editor-drums', title: 'Drums', text: 'Program a beat in the step sequencer and add it as a lane alongside the song.', width: 666, height: 432 },
  { name: 'Live Code', image: 'editor-strudel', title: 'Live Code', text: 'Write a supported Strudel-style sound or note pattern and run it alongside the arrangement.', width: 666, height: 432 },
  { name: 'FX Rack', image: 'editor-effects', title: 'FX Rack', text: 'Add effects, adjust their controls, and bypass them to hear what changed.', width: 911, height: 620 },
  { name: 'Sampler', image: 'editor-sampler', title: 'Sampler', text: 'Import audio or record a microphone. Preview the recording, choose equal slices and add a file or slice as a lane.', width: 666, height: 432 },
  { name: 'History', image: 'editor-history', title: 'History', text: 'Save a named project snapshot and revisit it while you work on the next version.', width: 666, height: 432 },
] as const;

export const Showcase = (_props: { onNext?: () => void }) => {
  const [selected, setSelected] = useState(0);
  const tool = tools[selected];
  return (
    <div className="section-content editor-content">
      <div className="section-heading"><h2>The editor</h2><p>A DAW workstation with AI editing, a multitrack timeline, a piano roll, a drum sequencer and live code.</p></div>
      <Tabs id="tools" label="Explore the editor tools" items={tools.map((item) => item.name)} selected={selected} onSelect={setSelected} />
      <div id="tools-panel" role="tabpanel" aria-labelledby={`tools-tab-${selected}`}>
        <figure className={`editor-preview ${selected === 0 ? 'editor-full' : ''}`}>
          <div className="preview-top"><span>Editor preview</span><span>{tool.name}</span></div>
          <div className="editor-stage">
            <img className="editor-timeline" src="/images/editor-timeline.jpg" alt="Rawchunks timeline with Master, Keys, Drums, Strudel and an extracted take." width="1255" height="525" loading="lazy" />
            <div className="editor-tool"><img src={`/images/${selected === 0 ? 'editor-rework' : tool.image}.jpg`} alt={`The real Rawchunks ${tool.name} controls.`} width={selected === 0 ? 911 : tool.width} height={selected === 0 ? 620 : tool.height} loading="lazy" /></div>
          </div>
          <figcaption><h3>{tool.title}</h3><p>{tool.text}</p></figcaption>
        </figure>
      </div>
      <p className="mobile-inspect">Swipe across the timeline to inspect the arrangement.</p>
    </div>
  );
};
