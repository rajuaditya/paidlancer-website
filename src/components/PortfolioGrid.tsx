import { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, Monitor, Smartphone, X } from 'lucide-react';
import { clients, portfolioCategories, type Client } from '../data/content';
import { ClientCard } from './Cards';

export function PreviewModal({ client, onClose }: { client: Client | null; onClose: () => void }) {
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');
  useEffect(() => {
    if (!client) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [client, onClose]);
  if (!client || !client.url) return null;
  return (
    <div role="dialog" aria-modal="true" aria-label={`${client.name} live preview`} className="fixed inset-0 z-[80] flex flex-col bg-plum-950/95 p-3 backdrop-blur-xl sm:p-6">
      <div className="flex flex-wrap items-center gap-3">
        <div className="min-w-0">
          <p className="text-[12px] text-banana">{client.industry}</p>
          <h2 className="truncate text-[20px] font-semibold">{client.name}</h2>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <div className="hidden rounded-xl border border-white/15 p-1 sm:flex">
            {(['desktop', 'mobile'] as const).map((d) => (
              <button key={d} type="button" aria-pressed={device === d} onClick={() => setDevice(d)} className={`flex h-9 items-center gap-1.5 rounded-lg px-3 text-[13px] ${device === d ? 'bg-banana text-plum-950' : 'text-white/80'}`}>
                {d === 'desktop' ? <Monitor size={15} /> : <Smartphone size={15} />} {d}
              </button>
            ))}
          </div>
          <a href={client.url} target="_blank" rel="noopener noreferrer" className="btn-ghost min-h-[44px]">Open site <ArrowUpRight size={15} /></a>
          <button type="button" aria-label="Close preview" onClick={onClose} className="grid h-11 w-11 place-items-center rounded-xl bg-banana text-plum-950"><X size={20} /></button>
        </div>
      </div>
      <div className="mt-4 flex flex-1 items-start justify-center overflow-hidden">
        <div className={`h-full overflow-hidden rounded-2xl border border-white/15 bg-white transition-all duration-500 ${device === 'mobile' ? 'w-[390px] max-w-full' : 'w-full'}`}>
          <iframe src={client.url} title={`${client.name} website preview`} className="h-full w-full" loading="lazy" sandbox="allow-scripts allow-same-origin allow-popups" referrerPolicy="no-referrer" />
        </div>
      </div>
      <p className="mt-3 text-center text-[12px] text-plum-200/70">Some websites block embedding. If the preview stays blank, use “Open site”.</p>
    </div>
  );
}

export default function PortfolioGrid({ limit }: { limit?: number }) {
  const [industry, setIndustry] = useState('All');
  const [cat, setCat] = useState('All');
  const [preview, setPreview] = useState<Client | null>(null);

  const industries = useMemo(() => ['All', ...Array.from(new Set(clients.map((c) => c.industry))).filter((x) => x !== 'Other')], []);
  const cats = portfolioCategories.filter((c) => clients.some((x) => x.categories.includes(c)));

  let list = clients.filter((c) => (industry === 'All' || c.industry === industry) && (cat === 'All' || c.categories.includes(cat)));
  if (limit) list = clients.filter((c) => c.url).slice(0, limit);

  return (
    <>
      {!limit && (
        <div className="space-y-4">
          <div role="group" aria-label="Filter by industry" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
            {industries.map((x) => (
              <button key={x} type="button" aria-pressed={industry === x} onClick={() => setIndustry(x)} className={`min-h-[42px] flex-none rounded-full border px-4 text-[13.5px] font-medium transition ${industry === x ? 'border-banana bg-banana text-plum-950' : 'border-white/15 text-white/85 hover:border-white/40'}`}>
                {x}
                <span className="ml-1.5 opacity-60">{x === 'All' ? clients.length : clients.filter((c) => c.industry === x).length}</span>
              </button>
            ))}
          </div>
          {cats.length > 0 && (
            <div role="group" aria-label="Filter by project type" className="flex flex-wrap gap-2">
              {['All', ...cats].map((x) => (
                <button key={x} type="button" aria-pressed={cat === x} onClick={() => setCat(x)} className={`min-h-[38px] rounded-lg border px-3 text-[13px] ${cat === x ? 'border-plum-200 bg-plum-200 text-plum-950' : 'border-white/10 text-white/75'}`}>{x}</button>
              ))}
            </div>
          )}
        </div>
      )}
      <div className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-3 ${limit ? '' : 'mt-8'}`}>
        {list.map((c) => (
          <ClientCard key={c.name} c={c} onPreview={setPreview} />
        ))}
      </div>
      {list.length === 0 && <p className="mt-8 text-plum-200">No projects in this filter yet.</p>}
      <PreviewModal client={preview} onClose={() => setPreview(null)} />
    </>
  );
}
