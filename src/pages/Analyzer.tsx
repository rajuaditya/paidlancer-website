import { useState, type FormEvent } from 'react';
import { AlertTriangle, CheckCircle2, Loader2, Monitor, Smartphone, XCircle, MessageCircle, Gauge } from 'lucide-react';
import { Seo, breadcrumbSchema } from '../lib/seo';
import { PageHero, SectionHeading } from '../components/ui';
import { waLink } from '../lib/contact';
import { track } from '../lib/analytics';
import { FinalCta } from '../sections/home/Sections';

type Audit = { id: string; title: string; description?: string; score: number | null; displayValue?: string; scoreDisplayMode?: string; details?: { type?: string; items?: unknown[]; overallSavingsMs?: number; data?: string } };
type Result = {
  url: string;
  strategy: string;
  categories: Record<string, { title: string; score: number | null }>;
  audits: Record<string, Audit>;
  fetchedAt: string;
};

const KEY = import.meta.env.VITE_PAGESPEED_API_KEY as string | undefined;
const seoChecks = [
  { id: 'document-title', label: 'Page title' },
  { id: 'meta-description', label: 'Meta description' },
  { id: 'viewport', label: 'Mobile viewport' },
  { id: 'heading-order', label: 'Heading structure' },
  { id: 'image-alt', label: 'Image alt attributes' },
  { id: 'http-status-code', label: 'HTTP status' },
  { id: 'is-crawlable', label: 'Page can be indexed' },
  { id: 'link-text', label: 'Descriptive link text' },
  { id: 'crawlable-anchors', label: 'Crawlable links' },
  { id: 'canonical', label: 'Canonical URL' },
  { id: 'robots-txt', label: 'robots.txt' },
];
const metrics = [
  { id: 'first-contentful-paint', label: 'First Contentful Paint' },
  { id: 'largest-contentful-paint', label: 'Largest Contentful Paint' },
  { id: 'total-blocking-time', label: 'Total Blocking Time' },
  { id: 'cumulative-layout-shift', label: 'Cumulative Layout Shift' },
  { id: 'speed-index', label: 'Speed Index' },
];
const clean = (s = '') => s.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/`/g, '');

function Ring({ score, label }: { score: number | null; label: string }) {
  const v = score === null ? null : Math.round(score * 100);
  const color = v === null ? '#8D55D5' : v >= 90 ? '#FFE34D' : v >= 50 ? '#D9C6F5' : '#FF8FA3';
  const C = 2 * Math.PI * 42;
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <svg viewBox="0 0 100 100" className="h-28 w-28" role="img" aria-label={`${label}: ${v ?? 'not available'} out of 100`}>
        <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,.1)" strokeWidth="8" />
        <circle cx="50" cy="50" r="42" fill="none" stroke={color} strokeWidth="8" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={v === null ? C : C * (1 - v / 100)} transform="rotate(-90 50 50)" style={{ transition: 'stroke-dashoffset 1.2s ease' }} />
        <text x="50" y="57" textAnchor="middle" fontSize="24" fontWeight="800" fill="#fff" fontFamily="Archivo Variable">{v ?? '–'}</text>
      </svg>
      <span className="text-[14px] font-semibold">{label}</span>
    </div>
  );
}

function StatusIcon({ score, mode }: { score: number | null; mode?: string }) {
  if (score === null || mode === 'notApplicable' || mode === 'manual' || mode === 'informative') return <span className="text-[12px] text-plum-200">n/a</span>;
  if (score >= 0.9) return <CheckCircle2 size={20} className="text-banana" aria-label="Pass" />;
  if (score >= 0.5) return <AlertTriangle size={20} className="text-plum-200" aria-label="Needs work" />;
  return <XCircle size={20} className="text-[#FF8FA3]" aria-label="Fail" />;
}

export default function Analyzer() {
  const [url, setUrl] = useState('');
  const [strategy, setStrategy] = useState<'mobile' | 'desktop'>('mobile');
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [error, setError] = useState('');
  const [res, setRes] = useState<Result | null>(null);
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'Website Growth Analyzer', path: '/website-growth-analyzer/' }];

  async function run(e: FormEvent) {
    e.preventDefault();
    let target = url.trim();
    if (!target) return;
    if (!/^https?:\/\//i.test(target)) target = 'https://' + target;
    try {
      new URL(target);
    } catch {
      setError('That doesn’t look like a valid website address.');
      setState('error');
      return;
    }
    setState('loading');
    setError('');
    track('audit_run', { strategy });
    const params = new URLSearchParams({ url: target, strategy });
    ['PERFORMANCE', 'SEO', 'ACCESSIBILITY', 'BEST_PRACTICES'].forEach((c) => params.append('category', c));
    if (KEY) params.set('key', KEY);
    try {
      const r = await fetch(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${params}`);
      const j = await r.json();
      if (!r.ok || j.error) {
        const msg = j?.error?.message || `HTTP ${r.status}`;
        throw new Error(r.status === 429 ? 'Google’s free PageSpeed quota is busy right now. Please try again in a minute.' : `Google couldn’t analyse that page: ${clean(msg)}`);
      }
      const lh = j.lighthouseResult;
      setRes({ url: lh.finalDisplayedUrl || lh.finalUrl || target, strategy, categories: lh.categories, audits: lh.audits, fetchedAt: lh.fetchTime });
      setState('done');
    } catch (err) {
      const m = err instanceof Error ? err.message : '';
      setError(err instanceof TypeError || /fetch/i.test(m) ? 'Couldn’t reach Google PageSpeed Insights from your browser (network issue or a blocker extension). Please try again in a moment.' : m || 'Something went wrong. Please try again.');
      setState('error');
    }
  }

  const opportunities = res
    ? Object.values(res.audits)
        .filter((a) => a.details?.type === 'opportunity' && a.score !== null && a.score < 0.9)
        .sort((a, b) => (b.details?.overallSavingsMs || 0) - (a.details?.overallSavingsMs || 0))
        .slice(0, 6)
    : [];
  const failedSeo = res ? seoChecks.filter((c) => { const a = res.audits[c.id]; return a && a.score !== null && a.score < 0.9 && a.scoreDisplayMode !== 'notApplicable'; }) : [];
  const shot = res?.audits['final-screenshot']?.details?.data;
  const summary = res
    ? `Hi Raju, I ran the Website Growth Analyzer on ${res.url} (${res.strategy}).\nPerformance ${Math.round((res.categories.performance?.score ?? 0) * 100)}, SEO ${Math.round((res.categories.seo?.score ?? 0) * 100)}, Accessibility ${Math.round((res.categories.accessibility?.score ?? 0) * 100)}, Best practices ${Math.round((res.categories['best-practices']?.score ?? 0) * 100)}.\nCan you help me fix the issues?`
    : '';

  return (
    <>
      <Seo
        title="Free Website Growth Analyzer | SEO & Speed Check – PAIDLANCER"
        description="Free website audit powered by Google PageSpeed Insights: check titles, meta descriptions, headings, image alt text and Core Web Vitals."
        path="/website-growth-analyzer/"
        schema={[breadcrumbSchema(crumbs), { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Website Growth Analyzer', applicationCategory: 'BusinessApplication', operatingSystem: 'Any', url: 'https://paidlancer.in/website-growth-analyzer/', offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } }]}
      />
      <PageHero kicker="Free tool" title="Website Growth" accent="Analyzer." crumbsItems={crumbs}>
        A real audit of any public web page, run by Google’s PageSpeed Insights (Lighthouse). See your SEO basics, speed and accessibility — and what to fix first.
      </PageHero>

      <section className="pb-20">
        <div className="wrap">
          <form onSubmit={run} className="glass glow-border rounded-[24px] p-5 sm:p-7">
            <label htmlFor="az-url" className="label">Website URL</label>
            <div className="flex flex-col gap-3 lg:flex-row">
              <input id="az-url" type="text" inputMode="url" autoComplete="url" placeholder="yourbusiness.com" value={url} onChange={(e) => setUrl(e.target.value)} className="field text-[17px]" required />
              <div className="flex rounded-xl border border-white/12 p-1" role="group" aria-label="Device">
                {(['mobile', 'desktop'] as const).map((s) => (
                  <button key={s} type="button" aria-pressed={strategy === s} onClick={() => setStrategy(s)} className={`flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-lg px-4 text-[14px] capitalize ${strategy === s ? 'bg-banana font-semibold text-plum-950' : 'text-white/80'}`}>
                    {s === 'mobile' ? <Smartphone size={16} /> : <Monitor size={16} />} {s}
                  </button>
                ))}
              </div>
              <button type="submit" disabled={state === 'loading'} className="btn-primary lg:w-[200px]">
                {state === 'loading' ? <><Loader2 size={18} className="animate-spin" /> Analysing…</> : <><Gauge size={18} /> Analyse</>}
              </button>
            </div>
            <p className="mt-3 text-[12.5px] text-plum-200/75">Powered by the Google PageSpeed Insights API. Nothing is stored. A full test usually takes 20–60 seconds.</p>
          </form>

          {state === 'loading' && (
            <div role="status" className="mt-10 grid place-items-center gap-4 py-16 text-center">
              <Loader2 size={36} className="animate-spin text-banana" />
              <p className="text-[16px]">Google is loading and testing your page on a {strategy} device…</p>
            </div>
          )}
          {state === 'error' && <p role="alert" className="mt-8 rounded-2xl border border-[#FF8FA3]/40 bg-[#FF8FA3]/10 p-5 text-[15px]">{error}</p>}

          {state === 'done' && res && (
            <div className="mt-12 space-y-10 animate-fadeup">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-[13px] text-plum-200">Report for</p>
                  <p className="break-all text-[20px] font-semibold">{res.url}</p>
                  <p className="text-[12.5px] text-plum-200/70">{res.strategy} · {new Date(res.fetchedAt).toLocaleString('en-IN')}</p>
                </div>
                <a href={waLink(summary)} target="_blank" rel="noopener noreferrer" className="btn-primary" onClick={() => track('whatsapp_click', { source: 'analyzer' })}><MessageCircle size={17} /> Get help fixing this</a>
              </div>

              <div className="glass grid grid-cols-2 gap-8 rounded-[24px] p-8 md:grid-cols-4">
                <Ring score={res.categories.performance?.score ?? null} label="Performance" />
                <Ring score={res.categories.seo?.score ?? null} label="SEO" />
                <Ring score={res.categories.accessibility?.score ?? null} label="Accessibility" />
                <Ring score={res.categories['best-practices']?.score ?? null} label="Best practices" />
              </div>

              <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,.8fr)]">
                <div className="glass rounded-[24px] p-6 sm:p-8">
                  <h2 className="text-[20px] font-semibold">SEO checklist</h2>
                  <ul className="mt-5 divide-y divide-white/10">
                    {seoChecks.map((c) => {
                      const a = res.audits[c.id];
                      if (!a) return null;
                      return (
                        <li key={c.id} className="flex items-start gap-4 py-3.5">
                          <StatusIcon score={a.score} mode={a.scoreDisplayMode} />
                          <div className="min-w-0 flex-1">
                            <p className="font-medium">{c.label}</p>
                            <p className="text-[13px] text-plum-200">{a.title}{c.id === 'image-alt' && a.details?.items?.length ? ` — ${a.details.items.length} image(s) missing alt text` : ''}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="space-y-6">
                  <div className="glass rounded-[24px] p-6">
                    <h2 className="text-[20px] font-semibold">Core metrics</h2>
                    <dl className="mt-4 space-y-3">
                      {metrics.map((m) => {
                        const a = res.audits[m.id];
                        return a ? (
                          <div key={m.id} className="flex items-center justify-between gap-3 text-[14px]">
                            <dt className="flex items-center gap-2"><StatusIcon score={a.score} />{m.label}</dt>
                            <dd className="font-semibold tabular-nums">{a.displayValue}</dd>
                          </div>
                        ) : null;
                      })}
                    </dl>
                  </div>
                  {shot && <img src={shot} alt={`Screenshot of ${res.url} as loaded by Google`} className="mx-auto max-h-[420px] rounded-2xl border border-white/10" />}
                </div>
              </div>

              <div className="glass rounded-[24px] p-6 sm:p-8">
                <h2 className="text-[20px] font-semibold">What to fix first</h2>
                {failedSeo.length === 0 && opportunities.length === 0 ? (
                  <p className="mt-4 text-plum-100/80">No major issues flagged in this test. Next step: content, keywords and local SEO — which an automated test can’t judge.</p>
                ) : (
                  <ol className="mt-5 space-y-4">
                    {[...failedSeo.map((c) => res.audits[c.id]), ...opportunities].map((a, i) => (
                      <li key={a.id} className="flex gap-4">
                        <span className="grid h-7 w-7 flex-none place-items-center rounded-lg bg-plum-700 text-[13px] font-bold text-banana">{i + 1}</span>
                        <div>
                          <p className="font-semibold">{a.title}{a.displayValue ? <span className="ml-2 font-normal text-plum-200">({a.displayValue})</span> : null}</p>
                          <p className="mt-1 text-[14px] leading-relaxed text-plum-100/75">{clean(a.description).split('. ').slice(0, 2).join('. ')}.</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                )}
                <p className="mt-6 text-[12.5px] text-plum-200/70">Lab test results vary between runs and devices. Scores measure technical quality, not your Google ranking.</p>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="section bg-plum-900/40">
        <div className="wrap">
          <SectionHeading kicker="What this checks" title="An automated test" accent="is only the start.">
            The analyzer checks technical basics that Google can measure. It can’t judge whether your content answers what customers search, whether your offer is compelling, or how you compare to competitors — that’s where a manual audit helps.
          </SectionHeading>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
