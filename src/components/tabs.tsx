import { useEffect, useRef } from 'react';

interface Props {
  id: string;
  label: string;
  items: readonly string[];
  selected: number;
  onSelect: (index: number) => void;
}

export const Tabs = ({ id, label, items, selected, onSelect }: Props) => {
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const rail = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const button = buttons.current[selected];
    const container = rail.current;
    if (!button || !container) return;
    const left = button.offsetLeft - container.offsetLeft;
    if (left < container.scrollLeft) container.scrollLeft = left;
    else if (left + button.offsetWidth > container.scrollLeft + container.clientWidth) {
      container.scrollLeft = left + button.offsetWidth - container.clientWidth;
    }
  }, [selected]);
  return (
    <div ref={rail} className="tabs" role="tablist" aria-label={label}>
      {items.map((item, index) => (
        <button key={item} ref={(el) => { buttons.current[index] = el; }} type="button" role="tab"
          id={`${id}-tab-${index}`} aria-controls={`${id}-panel`} aria-selected={selected === index}
          tabIndex={selected === index ? 0 : -1} onClick={() => onSelect(index)}
          onKeyDown={(event) => {
            let next = index;
            if (event.key === 'ArrowRight') next = (index + 1) % items.length;
            else if (event.key === 'ArrowLeft') next = (index - 1 + items.length) % items.length;
            else if (event.key === 'Home') next = 0;
            else if (event.key === 'End') next = items.length - 1;
            else return;
            event.preventDefault(); onSelect(next); buttons.current[next]?.focus();
            buttons.current[next]?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
          }}>{item}</button>
      ))}
    </div>
  );
};

export const Arrow = ({ direction }: { direction: 'left' | 'right' }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d={direction === 'left' ? 'M15 5 8 12l7 7' : 'm9 5 7 7-7 7'} stroke="currentColor" strokeWidth="1.5" />
  </svg>
);
