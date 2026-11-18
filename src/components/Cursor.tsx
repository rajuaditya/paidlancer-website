import { useEffect, useRef } from 'react';

/**
 * Animated cursor for mouse / trackpad users: a yellow dot that follows exactly and a ring that trails
 * behind with easing. The ring grows over links and buttons, and shows a label over elements with
 * data-cursor="Drag" (or any text). Hidden on touch screens and for reduced-motion users.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced || !dot.current || !ring.current) return;
    const root = document.documentElement;
    root.classList.add('has-cursor');

    let x = -100, y = -100, rx = -100, ry = -100, raf = 0, visible = false;
    let hover = false, down = false, text = '', rs = 1, ds = 1;
    const d = dot.current, r = ring.current, l = label.current!;

    const render = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      const ts = (text ? 2.6 : hover ? 1.7 : 1) * (down ? 0.85 : 1);
      const tds = down ? 0.6 : hover || text ? 0 : 1;
      rs += (ts - rs) * 0.2;
      ds += (tds - ds) * 0.25;
      d.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${ds.toFixed(3)})`;
      r.style.transform = `translate3d(${rx.toFixed(2)}px, ${ry.toFixed(2)}px, 0) translate(-50%, -50%) scale(${rs.toFixed(3)})`;
      const moving = Math.abs(x - rx) > 0.1 || Math.abs(y - ry) > 0.1 || Math.abs(ts - rs) > 0.002 || Math.abs(tds - ds) > 0.002;
      raf = moving ? requestAnimationFrame(render) : 0;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(render); };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      x = e.clientX; y = e.clientY;
      if (!visible) { visible = true; rx = x; ry = y; d.style.opacity = '1'; r.style.opacity = '1'; }
      kick();
    };
    const onOver = (e: Event) => {
      const t = e.target as HTMLElement | null;
      const labelled = t?.closest<HTMLElement>('[data-cursor]');
      const field = t?.closest('input, textarea, select');
      text = labelled?.dataset.cursor || '';
      hover = !field && !!t?.closest('a, button, [role="button"], [role="tab"], summary, label');
      l.textContent = text;
      r.classList.toggle('is-hover', hover || !!text);
      r.classList.toggle('is-label', !!text);
      d.style.opacity = field ? '0' : visible ? '1' : '0';
      r.style.opacity = field ? '0' : visible ? '1' : '0';
      kick();
    };
    const onLeave = () => { visible = false; d.style.opacity = '0'; r.style.opacity = '0'; };
    const onDown = () => { down = true; kick(); };
    const onUp = () => { down = false; kick(); };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      root.classList.remove('has-cursor');
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
    };
  }, []);

  return (
    <>
      <div ref={ring} aria-hidden="true" className="no-print cursor-ring pointer-events-none fixed left-0 top-0 z-[100] hidden h-9 w-9 rounded-full opacity-0 transition-[opacity,background-color,border-color] duration-200 [@media(pointer:fine)]:grid">
        <span ref={label} className="cursor-label m-auto text-[7px] font-bold uppercase tracking-[0.12em] text-plum-950 opacity-0 transition-opacity" />
      </div>
      <div ref={dot} aria-hidden="true" className="no-print pointer-events-none fixed left-0 top-0 z-[101] hidden h-2 w-2 rounded-full bg-banana opacity-0 shadow-[0_0_12px_rgba(255,227,77,.8)] transition-opacity duration-200 [@media(pointer:fine)]:block" />
    </>
  );
}
