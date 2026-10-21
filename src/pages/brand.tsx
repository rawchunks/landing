import { useEffect, useState } from 'react';
import { BRANDING, COLORS } from '../lib/theme';
import '../styles/brand.css';

const base = '/brand-assets';
const treatments = [
  { id: 'color-dark', label: 'Color / dark surface', surface: '#000000' },
  { id: 'color-light', label: 'Color / light surface', surface: '#ffffff' },
  { id: 'black-only', label: 'Black only', surface: '#ffffff' },
  { id: 'white-only', label: 'White only', surface: '#000000' },
] as const;
const palette = [
  { name: 'Primary / green', hex: COLORS.primary, rgb: '0, 255, 65', contrast: '15.38:1 on black' },
  { name: 'Secondary / magenta', hex: COLORS.secondary, rgb: '255, 0, 160', contrast: '5.76:1 on black' },
  { name: 'Accent / cyan', hex: COLORS.accent, rgb: '0, 204, 255', contrast: '11.08:1 on black' },
  { name: 'Dark field', hex: COLORS.background, rgb: '0, 0, 0', contrast: '21:1 on white' },
  { name: 'Light field / text', hex: COLORS.text, rgb: '255, 255, 255', contrast: '21:1 on black' },
];
const typeRoles = [
  ['Hero', '30–60px / 1.2', '700', '−0.03em'],
  ['Section heading', '28–42px / 1.2', '700', '−0.03em'],
  ['Subheading', '22px / 1.2', '700', '0'],
  ['Body', '15px / 1.65', '400', '0'],
  ['Supporting copy', '13px / 1.65', '400', '0'],
  ['Compact label', '11px / 1.3', '400 or 700', '+0.04em'],
  ['Action', '13px / 1.3', '700', '+0.04em'],
];
const applications = [
  { id: 'partner-announcement', title: 'Partner announcement', size: '1200 × 630', detail: '64px safe margins. 58/70px headline and 24/34px supporting text. Replace both the partner placeholder and the announcement copy.' },
  { id: 'social-post', title: 'Social post', size: '1080 × 1080', detail: '64px margins. One short headline, a real product image and the site URL. The square canvas is for a post; use a profile asset for the avatar.' },
  { id: 'presentation', title: 'Presentation', size: '1920 × 1080', detail: '96px margins. 92/111px title, 32/45px body and 22px footer. Introduce the full name on the title slide; keep content slides focused.' },
];
const preview = (name: string) => `${base}/previews/${name}.webp`;
const download = (name: string) => `${base}/downloads/${name}`;

export const Brand = () => {
  const [treatment, setTreatment] = useState<(typeof treatments)[number]>(treatments[0]);
  const [profileSurface, setProfileSurface] = useState<'black' | 'white'>('black');
  const [kitSize, setKitSize] = useState('24 MB');

  useEffect(() => {
    document.title = 'Rawchunks — Brand kit';
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Official Rawchunks logos, colors, typography, usage guidelines and editable partner, social, presentation and email templates.');
    let active = true;
    fetch(`${base}/kit.json`).then((r) => r.ok ? r.json() : null).then((kit) => {
      if (active && typeof kit?.archiveMiB === 'number') setKitSize(`${kit.archiveMiB} MB`);
    }).catch(() => {});
    return () => { active = false; };
  }, []);

  return (
    <div className="brand-page">
      <a className="skip-link" href="#brand-main">Skip to content</a>
      <header className="brand-header">
        <a href="/" aria-label="Rawchunks home"><img src="/logo.svg" width="590" height="88" alt="Rawchunks" /></a>
        <nav aria-label="Brand navigation"><a href="#logos">Logos</a><a href="#use">Usage</a><a href="#type">Type & color</a><a href="#partners">Partners</a><a href="#templates">Templates</a><a href="/">Site ↗</a></nav>
      </header>
      <main id="brand-main">
        <div className="brand-intro">
          <div>
            <p className="brand-eyebrow">RAWCHUNKS / BRAND RESOURCES</p>
            <h1>Brand kit.</h1>
            <p className="brand-lede">The official artwork and the rules for using it. Logos, typography, colors and layouts for putting Rawchunks in your work.</p>
            <a className="brand-download" href={`${base}/rawchunks-brand-kit.zip`} download>Download the kit <span aria-hidden="true">↓</span></a>
            <p className="brand-format-note">{kitSize} ZIP · SVG + PNG logos · profile & platform icons<br />Editable partner, social, slide & email layouts · guidelines</p>
            <a className="brand-text-link" href={`${base}/brand-guide.md`} download>Download the guidelines ↓</a>
          </div>
          <img className="brand-hero-mark" src={preview('rawchunks-mark-color-dark')} width="660" height="699" alt="Rawchunks R: a record, waveform and scattered digital fragments" />
        </div>

        <section id="logos" className="brand-section">
          <div className="brand-section-heading"><div><p className="brand-eyebrow">01 / ASSET SELECTION</p><h2>Use the logo that<br />fits the placement.</h2></div><p>The full name introduces Rawchunks. Use the R when the name is already established, or for a profile or icon.</p></div>
          <div className="brand-treatments" role="group" aria-label="Logo treatment">{treatments.map((item) => <button key={item.id} type="button" aria-pressed={item.id === treatment.id} onClick={() => setTreatment(item)}>{item.label}</button>)}</div>
          <article className="brand-asset brand-asset-wide">
            <div className="brand-asset-preview" style={{ backgroundColor: treatment.surface }}><img src={preview(`rawchunks-logo-${treatment.id}`)} width="1180" height="176" alt={`Full-name Rawchunks logo, ${treatment.label}`} /></div>
            <div className="brand-asset-info"><div><h3>Full-name logo</h3><p>Headers, press, external mentions, partner materials and first introductions.</p></div><div className="brand-file-links"><a href={download(`rawchunks-logo-${treatment.id}.svg`)} download>SVG ↓</a><a href={download(`rawchunks-logo-${treatment.id}.png`)} download>PNG ↓</a></div></div>
          </article>
          <div className="brand-asset-grid brand-secondary-assets">
            <article className="brand-asset"><div className="brand-asset-preview brand-mark-preview" style={{ backgroundColor: treatment.surface }}><img src={preview(`rawchunks-mark-${treatment.id}`)} alt={`Standalone Rawchunks R, ${treatment.label}`} loading="lazy" /></div><div className="brand-asset-info"><div><h3>Standalone R</h3><p>Brand-led placements where Rawchunks is already named. All four treatments, in SVG and native-resolution PNG, are in the kit.</p></div></div></article>
            <article className="brand-asset"><div className="brand-asset-preview brand-mark-preview" style={{ backgroundColor: '#000000' }}><img src={preview('rawchunks-compact-color-dark')} alt="Compact Rawchunks mark and full-name composition" loading="lazy" /></div><div className="brand-asset-info"><div><h3>Compact mark + name</h3><p>For a nearly square space that must still show the full name. Dark and light versions are in the kit.</p></div></div></article>
          </div>
          <div className="brand-callout"><p><strong>SVG and PNG.</strong> The lettering is vector artwork. The final R retains its native raster texture inside the SVG, so it has a source-resolution limit. Use the SVG to place the composition; use PNG when your application needs a bitmap.</p></div>
          <div className="brand-subheading"><h3>Profiles & small icons</h3><p>These have their own fitting. Use the supplied file without adding another border or padding.</p></div>
          <div className="brand-treatments" role="group" aria-label="Profile background">{(['black', 'white'] as const).map((surface) => <button type="button" key={surface} aria-pressed={profileSurface === surface} onClick={() => setProfileSurface(surface)}>{surface === 'black' ? 'Black field' : 'White field'}</button>)}</div>
          <div className="brand-profiles">{(['square', 'circle'] as const).map((shape) => <figure key={shape}><img src={preview(`rawchunks-profile-${shape}-${profileSurface}`)} width="220" height="220" alt={`Rawchunks ${shape} profile with ${profileSurface} background`} loading="lazy" /><figcaption>{shape === 'square' ? 'Square profile' : 'Circular profile'} · 1024px PNG in kit</figcaption></figure>)}<figure className="brand-icon-example"><img src={preview('icon')} width="96" height="96" alt="Accepted Rawchunks shortcut icon" loading="lazy" /><div className="brand-actual-icons">{[16, 32, 48].map((size) => <span key={size}><img src={`/favicon-${size}.png`} width={size} height={size} alt={`Accepted favicon at ${size} pixels`} />{size}px</span>)}</div><figcaption>Dedicated ICO, SVG icon, 180px touch icon<br />and 512px shortcut PNG in kit</figcaption></figure></div>
        </section>

        <section id="use" className="brand-section">
          <div className="brand-section-heading"><div><p className="brand-eyebrow">02 / LOGO USE</p><h2>Space, scale<br />and alignment.</h2></div><p>Scale the complete composition uniformly. The supplied spacing and baseline are part of the logo.</p></div>
          <figure className="brand-guideline-diagram"><img src={preview('logo-clearspace')} width="1200" height="360" alt="Logo clear-space diagram: one fifth of artwork height on all sides; R and letters share a baseline, with the taller R extending upward" loading="lazy" /><figcaption>Measure from visible artwork, including every fragment. The dashed boundary is the minimum exclusion zone.</figcaption></figure>
          <div className="brand-rules"><article><h3>Keep the R on the baseline.</h3><p>The R body is 110% of the letters’ cap height. The extra height extends upward. Its 12-unit optical gap before A is built in. Preserve the original AWCHUNKS paths and scale the entire file together.</p></article><article><h3>Add clear space in the layout.</h3><p>Leave one fifth of the visible artwork height clear on every side. A 100px-high R needs 20px around it. A 300px-wide full-name logo needs about 8px. The image canvas is not the exclusion zone.</p></article><article><h3>Check the final display size.</h3><p>Start the full-name logo at 180 CSS px wide and the detailed R at 48px high. Below this, use the dedicated icon with a nearby text name. Review at actual size; a large source image cannot make tiny texture readable.</p><div className="brand-minimum-example"><img src={preview('rawchunks-logo-color-dark')} width="180" alt="Full-name logo displayed at the recommended starting width of 180 pixels" /><span>180 CSS px</span></div></article><article><h3>Pick the correct surface.</h3><p>Color dark uses native dark artwork and white lettering; color light uses native light artwork and black lettering. Single-color versions suit monochrome documents. On a busy photo, use a separate neutral panel and preserve the photo’s original color.</p></article></div>
          <div className="brand-misuse-grid"><article><div><img src={preview('rawchunks-logo-color-dark')} className="brand-misuse-stretch" alt="Incorrect example: horizontally distorted logo" loading="lazy" /></div><h3>Do not distort.</h3><p>Preserve width, height and the relationship between R and letters.</p></article><article><div><img src={preview('rawchunks-mark-color-dark')} className="brand-misuse-crop" alt="Incorrect example: cropped mark with fragments removed" loading="lazy" /></div><h3>Do not crop the fragments.</h3><p>The waveform, record texture and chunks belong to the artwork.</p></article><article><div className="brand-misuse-light"><img src={preview('rawchunks-logo-color-dark')} alt="Incorrect example: white logo lettering disappears on a white field" loading="lazy" /></div><h3>Do not force a colorway.</h3><p>Use the native light version on white. Do not add a colored frame, shadow or extra glow.</p></article></div>
          <p className="brand-note">The detailed monochrome R contains texture and opacity. Die cutting, embroidery, binary engraving or spot-ink production may require a separately prepared solid-ink drawing and a proof.</p>
        </section>

        <section id="type" className="brand-section">
          <div className="brand-section-heading"><div><p className="brand-eyebrow">03 / TYPOGRAPHY</p><h2>Courier New.<br />Regular and bold.</h2></div><p>Courier New → Courier → monospace. Use real 400 and 700 weights. The angular logo lettering is supplied artwork and must never be retyped.</p></div>
          <div className="brand-type-specimen"><p className="brand-eyebrow">HEADLINE / BOLD 700</p><p className="brand-type-display">CREATE AT YOUR<br />OWN CONDITIONS.</p><p className="brand-type-body">Create, edit, layer and remix. Write clear instructions in sentence case. Keep longer copy left aligned and give it room to read.</p><span>BODY / REGULAR 400 · 15px / 1.65 · tracking 0</span></div>
          <div className="brand-table-wrap"><table><caption>Website and communication defaults</caption><thead><tr><th scope="col">Role</th><th scope="col">Size / line height</th><th scope="col">Weight</th><th scope="col">Tracking</th></tr></thead><tbody>{typeRoles.map((row) => <tr key={row[0]}>{row.map((value, i) => i === 0 ? <th scope="row" key={i}>{value}</th> : <td key={i}>{value}</td>)}</tr>)}</tbody></table></div>
          <div className="brand-rules"><article><h3>Case and line length</h3><p>Use uppercase for short labels, actions and the manifesto. Set paragraphs in sentence case at roughly 45–70 characters per line. Keep headings short. Avoid long uppercase blocks, forced justification and stretched text.</p></article><article><h3>Using the font in design software</h3><p>Select Courier New Regular or Bold. The kit includes no font binaries. Use a legitimately available font; if using Courier fallback, check wrapping and alignment. The templates adapt type sizes to the canvas, while preserving the hierarchy.</p></article></div>
          <pre className="brand-code"><code>{`font-family: 'Courier New', Courier, monospace;\nfont-size: 15px;\nfont-weight: 400;\nline-height: 1.65;\nletter-spacing: 0;`}</code></pre>
        </section>

        <section id="colors" className="brand-section">
          <div className="brand-section-heading"><div><p className="brand-eyebrow">04 / COLOR & IMAGERY</p><h2>Neutral space.<br />Electric accents.</h2></div><p>Green leads. Magenta and cyan support it. Keep the surrounding layout mostly black, white or the existing neutral surfaces.</p></div>
          <div className="brand-palette">{palette.map((color) => <article key={color.name}><div className="brand-swatch" style={{ background: color.hex }} /><h3>{color.name}</h3><code>{color.hex.toUpperCase()}</code><span>RGB {color.rgb}</span><span>{color.contrast}</span></article>)}</div>
          <div className="brand-rules"><article><h3>Readable color pairings</h3><p>On black, white and all three brand accents meet normal-text contrast. On white, use black for text. Green and cyan are decorative on white; magenta is limited to large text. Normal text requires 4.5:1 contrast, large text 3:1.</p></article><article><h3>Photography and production</h3><p>Preserve the existing studio photography and use real product screenshots. Avoid neon recoloring of photos or generic replacement imagery. Print conversions depend on paper and ink; obtain a printer’s proof instead of treating RGB as a universal CMYK or Pantone specification.</p></article></div>
        </section>

        <section id="partners" className="brand-section">
          <div className="brand-section-heading"><div><p className="brand-eyebrow">05 / PARTNER COMPOSITIONS</p><h2>Two brands.<br />Balanced presence.</h2></div><p>Use the full-name Rawchunks logo. Match the partner’s visual weight and keep its original proportions and permitted colors.</p></div>
          <figure className="brand-guideline-diagram"><img src={preview('partner-spacing')} width="1200" height="340" alt="Horizontal partner example with Rawchunks on the left, a neutral divider, and a placeholder partner wordmark on the right" loading="lazy" /><figcaption>Editable example. “PARTNER” is a placeholder, not a claim of an existing relationship. <a href={download('rawchunks-partner-horizontal.svg')} download>Download horizontal SVG ↓</a></figcaption></figure>
          <div className="brand-rules"><article><h3>Start with equal cap height.</h3><p>Set the partner wordmark near AWCHUNKS’ lettering height, then adjust uniformly for optical weight. Compare visible ink, not empty file canvases. Align wordmarks on the baseline; optically center a tall symbol.</p></article><article><h3>Use one cap height of separation.</h3><p>If AWCHUNKS is 48px tall, leave 48px between the visible logos. An optional 1px neutral divider sits halfway, 24px from each side. Retain the outer logo clear space. Do not recolor a partner logo to match Rawchunks.</p></article></div>
          <div className="brand-partner-secondary"><figure><img src={preview('partner-stacked')} width="800" height="560" alt="Stacked alternative: Rawchunks above a neutral divider, partner wordmark below" loading="lazy" /></figure><div><h3>Stack only when width is limited.</h3><p>If the horizontal pair would squeeze the full name below 180px, stack the logos. Rawchunks above, partner below; center optically and leave one cap height on each side of the divider.</p><a className="brand-text-link" href={download('rawchunks-partner-stacked.svg')} download>Download stacked SVG ↓</a><h3 className="brand-spaced-heading">Website partner strips</h3><p>Use a neutral row or grid with 24px outer inset. Start logos at 36–48px visible lettering height, leaving at least one cap height between brands. Wrap the grid on mobile; preserve text names and optical balance.</p></div></div>
          <div className="brand-relationship-grid"><article><h3>Partner</h3><p>Use “in partnership with” for an agreed relationship that both organizations authorize.</p></article><article><h3>Integration</h3><p>“Integrates with” describes a technical connection. It does not automatically mean partnership or endorsement.</p></article><article><h3>Attribution</h3><p>“Created with Rawchunks” credits use of the product. Keep the credit separate from claims of partnership.</p></article></div>
        </section>

        <section id="templates" className="brand-section">
          <div className="brand-section-heading"><div><p className="brand-eyebrow">06 / APPLICATION TEMPLATES</p><h2>A starting layout<br />for the actual job.</h2></div><p>Editable text, measured margins and the complete supplied logo. Replace placeholders, check the final size and export the finished composition once.</p></div>
          <div className="brand-template-grid">{applications.map((app) => <article key={app.id}><div className={`brand-template-preview brand-template-${app.id}`}><img src={preview(app.id)} alt={`${app.title} layout showing logo placement, headline hierarchy, margins and editable placeholders`} loading="lazy" /></div><div className="brand-asset-info"><h3>{app.title}</h3><span>{app.size}</span></div><p>{app.detail}</p><a className="brand-text-link" href={download(`rawchunks-${app.id}.svg`)} download>Editable SVG ↓</a></article>)}</div>
          <div className="brand-email-example"><div className="brand-email-card"><img src={preview('rawchunks-logo-color-light')} width="236" height="35" alt="Rawchunks light full-name logo in an email signature" loading="lazy" /><strong>YOUR NAME</strong><span>Role · Rawchunks</span><a href={BRANDING.siteUrl}>rawchunks.space</a></div><div><h3>Email signature</h3><p>Use the light full-name PNG at 236px wide with name, role and a text link. Host the PNG on a stable HTTPS URL, replace the local image path in the HTML, and paste the rendered table into your email client. Send yourself a test; contact text must remain readable when images are blocked.</p><a className="brand-text-link" href={download('rawchunks-email-signature.html')} download>Editable HTML ↓</a></div></div>
          <div className="brand-callout"><p><strong>Before publishing:</strong> replace every template placeholder, use an accurate relationship label, check logo contrast and spacing, and confirm that the headline and contact information remain readable at their final display size.</p></div>
        </section>
      </main>
      <footer className="brand-footer"><a href="/">RAWCHUNKS</a><span>Guidelines v1.1 · 21 October 2026</span><nav aria-label="Footer"><a href={`${base}/brand-guide.md`} download>Portable guidelines ↓</a><a href={BRANDING.docsUrl}>Documentation</a><a href={BRANDING.githubUrl}>GitHub</a></nav></footer>
    </div>
  );
};
