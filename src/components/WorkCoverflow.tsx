import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { clients, type Client } from '../data/content';
import { PreviewModal } from './PortfolioGrid';
import { track } from '../lib/analytics';

const list = clients.filter((c) => c.url);
const initials = (n: string) => n.split(/\s+/).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
const host = (u: string) => new URL(u).hostname.replace(/^www\./, '');

function Poster({ c, k, active }: { c: Client; k: number; active: boolean }) {
  const hue = 258 + ((k * 7) % 34);
  return (
    <div
      className={`relative h-full w-full overflow-hidden rounded-[22px] border transition-[box-shadow,border-color] duration-500 ${active ? 'border-banana/70 shadow-[0_30px_90px_-20px_rgba(255,227,77,.45)]' : 'border-white/12 shadow-[0_20px_50px_-20px_rgba(8,0,24,.9)]'}`}
      style={{ background: `linear-gradient(165deg, hsl(${hue} 58% 46%) 0%, hsl(${hue + 6} 60% 30%) 48%, #200B45 100%)` }}
    >
      {/* warm light + grid, like a poster */}
      <div className="absolute -right-10 -top-12 h-48 w-48 rounded-full bg-banana/35 blur-3xl" />
      <div className="absolute inset-0 opacity-25" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-plum-950/90 to-transparent" />

      <div className="relative flex h-full flex-col p-4 sm:p-5">
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-white/40" /><span className="h-1.5 w-1.5 rounded-full bg-white/40" /><span className="h-1.5 w-1.5 rounded-full bg-banana" />
          <span className="ml-1.5 truncate rounded-full bg-black/20 px-2 py-0.5 text-[10px] text-white/80 backdrop-blur">{host(c.url!)}</span>
        </div>
        <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-banana">{c.industry}</p>
        <div className="relative mt-auto">
          <span className="display block text-[clamp(64px,9vw,108px)] leading-[0.8] text-white/95 [text-shadow:0_10px_40px_rgba(10,0,30,.5)]">{initials(c.name)}</span>
          <span className="serif-i mt-2 block text-[clamp(22px,2.4vw,30px)] leading-[1] text-white">{c.name}</span>
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-white/15 pt-3 text-[11px] text-white/75">
          <span>Client · {String(k + 1).padStart(2, '0')}</span>
          <span className="flex items-center gap-1">Live <ArrowUpRight size={12} /></span>
        </div>
      </div>
    </div>
  );
}

export default function WorkCoverflow() {
  const n = list.length;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [preview, setPreview] = useState<Client | null>(null);
  const drag = useRef<{ x: number; moved: boolean } | null>(null);
  const justDragged = useRef(false);
  const go = (d: number) => setI((x) => (x + d + n) % n);

  useEffect(() => {
    if (paused || preview || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setI((x) => (x + 1) % n), 4200);
    return () => clearInterval(id);
  }, [paused, preview, n]);

  const onDown = (e: PointerEvent) => { drag.current = { x: e.clientX, moved: false }; };
  const onUp = (e: PointerEvent) => {
    const d = drag.current;
    drag.current = null;
    if (!d) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 40) {
      justDragged.current = true;
      setTimeout(() => (justDragged.current = false), 0);
      go(dx < 0 ? 1 : -1);
    }
  };
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
  };

  const c = list[i];

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="Client websites"
        tabIndex={0}
        onKeyDown={onKey}
        onPointerDown={onDown}
        onPointerUp={onUp}
        onPointerCancel={() => (drag.current = null)}
        data-cursor="Drag"
        className="relative mx-auto h-[400px] select-none overflow-hidden outline-none sm:h-[500px] [--card-w:220px] [--step:118px] sm:[--card-w:300px] sm:[--step:200px] lg:[--step:235px]"
        style={{ perspective: '1400px', touchAction: 'pan-y' }}
      >
        {/* warm glow behind the active card */}
        <div aria-hidden="true" className="absolute left-1/2 top-[46%] h-[70%] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-banana/20 blur-[90px]" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-plum-950 to-transparent" />

        {list.map((cl, k) => {
          let off = k - i;
          if (off > n / 2) off -= n;
          if (off < -n / 2) off += n;
          const a = Math.abs(off);
          const hidden = a > 3;
          const style: CSSProperties = {
            width: 'var(--card-w)',
            aspectRatio: '3 / 4',
            transform: `translate(-50%, -50%) translateX(calc(${off} * var(--step))) translateZ(${-a * 140}px) rotateY(${off === 0 ? 0 : off < 0 ? 26 : -26}deg) scale(${1 - Math.min(a, 3) * 0.08})`,
            zIndex: 20 - a,
            opacity: hidden ? 0 : a === 3 ? 0.35 : 1,
            filter: off === 0 ? 'none' : `brightness(${1 - a * 0.18}) saturate(${1 - a * 0.1})`,
            pointerEvents: hidden ? 'none' : 'auto',
            transition: 'transform .7s cubic-bezier(.2,.8,.2,1), opacity .5s, filter .5s',
          };
          return (
            <button
              key={cl.name}
              type="button"
              tabIndex={-1}
              aria-hidden={off !== 0}
              aria-label={off === 0 ? `${cl.name}, open preview` : `Show ${cl.name}`}
              onClick={() => {
                if (justDragged.current) return;
                if (off === 0) { setPreview(cl); track('cta_click', { cta: 'work_preview', client: cl.name }); }
                else setI(k);
              }}
              className="absolute left-1/2 top-[46%] block text-left"
              style={{ ...style, WebkitBoxReflect: a <= 1 ? 'below 8px linear-gradient(transparent 80%, rgba(255,255,255,.10))' : undefined } as CSSProperties}
            >
              <Poster c={cl} k={k} active={off === 0} />
            </button>
          );
        })}

        <button type="button" aria-label="Previous client" onClick={() => go(-1)} className="absolute left-2 top-[46%] z-30 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-plum-950/60 backdrop-blur transition hover:bg-banana hover:text-plum-950 sm:left-6">
          <ChevronLeft size={20} />
        </button>
        <button type="button" aria-label="Next client" onClick={() => go(1)} className="absolute right-2 top-[46%] z-30 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-plum-950/60 backdrop-blur transition hover:bg-banana hover:text-plum-950 sm:right-6">
          <ChevronRight size={20} />
        </button>
      </div>

      {/* active client details */}
      <div className="relative z-10 mx-auto mt-2 flex max-w-xl flex-col items-center text-center" aria-live="polite">
        <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-plum-200">{String(i + 1).padStart(2, '0')} / {String(n).padStart(2, '0')} · {c.industry}</p>
        <h3 key={c.name} className="display mt-2 animate-fadeup text-[clamp(26px,3vw,38px)]">{c.name}</h3>
        <div className="mt-5 flex gap-3">
          <button type="button" onClick={() => setPreview(c)} className="btn-primary min-h-[46px]"><Eye size={17} /> Preview</button>
          <a href={c.url} target="_blank" rel="noopener noreferrer" className="btn-ghost min-h-[46px]">Live site <ArrowUpRight size={16} /></a>
        </div>
        <div className="mt-6 flex gap-1.5" aria-hidden="true">
          {list.map((_, k) => (
            <span key={k} className={`h-1 rounded-full transition-all duration-500 ${k === i ? 'w-8 bg-banana' : 'w-2 bg-white/20'}`} />
          ))}
        </div>
      </div>
      <PreviewModal client={preview} onClose={() => setPreview(null)} />
    </div>
  );
}
