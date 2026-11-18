import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check } from 'lucide-react';
import { services } from '../data/services';
import { Glyph3D, TiltCard } from './ui';
import { track } from '../lib/analytics';

export default function ServiceSelector() {
  const [i, setI] = useState(0);
  const s = services[i];
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.3fr)] lg:gap-10">
      <div role="tablist" aria-label="Services" aria-orientation="vertical" className="-mx-5 flex snap-x gap-2 overflow-x-auto px-5 pb-2 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0 lg:pb-0">
        {services.map((sv, k) => (
          <button
            key={sv.slug}
            role="tab"
            id={`svc-tab-${k}`}
            aria-selected={k === i}
            aria-controls="svc-panel"
            onClick={() => setI(k)}
            onMouseEnter={() => window.matchMedia('(pointer: fine)').matches && setI(k)}
            className={`group flex flex-none snap-start items-center gap-4 rounded-xl border px-4 py-3 text-left transition lg:rounded-none lg:border-x-0 lg:border-t-0 lg:px-2 lg:py-4 ${
              k === i ? 'border-banana bg-banana text-plum-950 lg:border-white/10 lg:bg-transparent lg:text-white' : 'border-white/10 bg-white/[0.03] text-white/75 hover:text-white lg:bg-transparent'
            }`}
          >
            <span className={`hidden w-8 text-[12px] font-semibold tabular-nums lg:block ${k === i ? 'text-banana' : 'text-plum-200/60'}`}>{String(k + 1).padStart(2, '0')}</span>
            <span className={`whitespace-nowrap text-[15px] font-semibold lg:whitespace-normal lg:text-[19px] lg:font-medium ${k === i ? 'lg:translate-x-1' : ''} transition-transform`}>
              {sv.name.replace(' in Hyderabad', '')}
            </span>
            <ArrowUpRight size={18} className={`ml-auto hidden flex-none transition lg:block ${k === i ? 'text-banana opacity-100' : 'opacity-0 group-hover:opacity-60'}`} />
          </button>
        ))}
      </div>

      <TiltCard max={4} className="lg:sticky lg:top-28 lg:self-start">
        <div id="svc-panel" role="tabpanel" aria-labelledby={`svc-tab-${i}`} key={s.slug} className="glass glow-border animate-fadeup rounded-[22px] p-6 sm:p-9">
          <div className="flex items-start justify-between gap-6">
            <div style={{ transform: 'translateZ(40px)' }}>
              <Glyph3D icon={s.icon} hue={s.hue} size={76} />
            </div>
            <span className="display text-[64px] leading-none text-white/[0.06]">{String(i + 1).padStart(2, '0')}</span>
          </div>
          <h3 className="display mt-7 text-[clamp(28px,3vw,40px)]">{s.name}</h3>
          <p className="mt-3 text-[16px] leading-relaxed text-plum-100/85">{s.description}</p>
          <div className="mt-7 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-[11.5px] font-semibold uppercase tracking-[0.18em] text-banana">Business benefits</p>
              <ul className="mt-3 space-y-2.5">
                {s.benefits.map((b) => (
                  <li key={b} className="flex gap-2.5 text-[14.5px] text-white/90"><Check size={16} className="mt-0.5 flex-none text-banana" />{b}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[11.5px] font-semibold uppercase tracking-[0.18em] text-banana">Who it’s for</p>
              <ul className="mt-3 space-y-2.5">
                {s.whoFor.map((b) => (
                  <li key={b} className="flex gap-2.5 text-[14.5px] text-white/90"><span className="mt-2 h-1 w-3 flex-none rounded bg-plum-400" />{b}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-white/10 pt-6">
            <Link to={s.path} className="btn-primary pr-2" onClick={() => track('cta_click', { cta: 'service_selector', service: s.slug })}>
              Explore {s.name.replace(' in Hyderabad', '').replace(' Management', '')} <span className="btn-icon"><ArrowUpRight size={16} /></span>
            </Link>
            <Link to="/contact/" className="btn-ghost">Get a quote</Link>
          </div>
        </div>
      </TiltCard>
    </div>
  );
}
