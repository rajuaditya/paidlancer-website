import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Info, MessageCircle } from 'lucide-react';
import { inr, plans } from '../data/content';
import { waLink } from '../lib/contact';
import { track } from '../lib/analytics';

const businessTypes = [
  { id: 'realestate', label: 'Real estate', search: 0.4, social: 0.6, note: 'Visual projects and site-visit offers do well on Meta; Google catches buyers searching by locality.' },
  { id: 'healthcare', label: 'Healthcare / clinic', search: 0.7, social: 0.3, note: 'Patients search with urgent intent — Google Search and local SEO usually lead.' },
  { id: 'education', label: 'Education / training', search: 0.55, social: 0.45, note: 'Course-intent searches on Google plus Meta lead forms during admission windows.' },
  { id: 'ecommerce', label: 'E-commerce / D2C', search: 0.4, social: 0.6, note: 'Meta for discovery and retargeting; Google Shopping / Performance Max for buyers comparing products.' },
  { id: 'restaurant', label: 'Restaurant / café', search: 0.25, social: 0.75, note: 'Instagram creatives and local reach drive footfall; keep Google Business Profile strong.' },
  { id: 'it', label: 'IT / B2B services', search: 0.7, social: 0.3, note: 'Decision-makers search for solutions; Google Search plus LinkedIn-style content builds trust.' },
  { id: 'interior', label: 'Interior design', search: 0.45, social: 0.55, note: 'Portfolio-led Meta ads plus Google for “interior designer near me” searches.' },
  { id: 'local', label: 'Local service', search: 0.65, social: 0.35, note: 'Google Search and the map pack bring nearby customers ready to call.' },
  { id: 'other', label: 'Other', search: 0.5, social: 0.5, note: 'Start balanced, then let tracked results decide where to scale.' },
];
const goals = ['Leads & enquiries', 'Online sales', 'Brand awareness', 'Store footfall', 'Admissions / sign-ups'];
const locations = [
  { id: 'local', label: 'My area of Hyderabad' },
  { id: 'city', label: 'All of Hyderabad' },
  { id: 'state', label: 'Telangana & AP' },
  { id: 'india', label: 'Pan-India' },
  { id: 'intl', label: 'International' },
];
const serviceOpts = ['SEO', 'Google Ads', 'Meta Ads', 'Social Media', 'Website', 'E-commerce Store'];

export default function BudgetCalculator() {
  const [biz, setBiz] = useState('realestate');
  const [budget, setBudget] = useState(30000);
  const [loc, setLoc] = useState('city');
  const [goalSel, setGoalSel] = useState<string[]>(['Leads & enquiries']);
  const [svc, setSvc] = useState<string[]>(['Google Ads', 'Meta Ads']);
  const [ran, setRan] = useState(false);

  const toggle = (arr: string[], v: string, set: (x: string[]) => void) => set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const plan = useMemo(() => {
    const b = businessTypes.find((x) => x.id === biz)!;
    let search = b.search;
    if (goalSel.includes('Brand awareness')) search -= 0.12;
    if (goalSel.includes('Store footfall')) search -= 0.05;
    if (goalSel.includes('Online sales') && biz !== 'ecommerce') search += 0.03;
    if (!svc.includes('Google Ads') && svc.includes('Meta Ads')) search = 0;
    if (!svc.includes('Meta Ads') && svc.includes('Google Ads')) search = 1;
    search = Math.max(0, Math.min(1, search));
    const retarget = budget >= 25000 ? 0.1 : 0;
    const g = Math.round((budget * search * (1 - retarget)) / 500) * 500;
    const r = Math.round((budget * retarget) / 500) * 500;
    const m = Math.max(0, budget - g - r);
    const tooThin = budget < 15000 && search > 0.15 && search < 0.85;

    const wantsSite = svc.includes('Website') || svc.includes('E-commerce Store');
    const pkg =
      svc.includes('E-commerce Store') ? plans.find((p) => p.name === 'E-Commerce Store')! :
      svc.includes('Google Ads') || budget >= 40000 ? plans.find((p) => p.name === 'Premium')! :
      plans.find((p) => p.name === 'Standard')!;
    const addSite = svc.includes('Website') && !svc.includes('E-commerce Store') ? plans.find((p) => p.name === 'Basic Website')! : null;
    const monthly = pkg.cadence === 'month' ? pkg : plans.find((p) => p.name === 'Standard')!;

    const steps = [
      'Week 1–2: set up GA4, Google Ads conversions, Meta Pixel and WhatsApp click tracking.',
      wantsSite ? 'Week 1–3: build or fix the landing page your ads will send people to.' : 'Week 1: review the landing page and make the call-to-action obvious.',
      search > 0 ? `Launch Google Search on buying-intent keywords${loc === 'local' ? ' within a tight radius of your location' : ''}.` : null,
      search < 1 ? `Test 2–3 Meta audiences with ${goalSel.includes('Online sales') ? 'product and offer creatives' : 'lead-form or click-to-WhatsApp ads'}.` : null,
      svc.includes('SEO') ? 'Start SEO: technical fixes, keyword-to-page map and Google Business Profile.' : null,
      retarget ? 'From week 3: retarget website visitors and video viewers.' : null,
      'Week 4 onwards: move budget to whatever brings the lowest cost per qualified lead.',
    ].filter(Boolean) as string[];

    return { b, g, m, r, tooThin, pkg, addSite, monthly, steps, search };
  }, [biz, budget, loc, goalSel, svc]);

  const summary = `Hi Raju, I used your budget planner.\nBusiness: ${plan.b.label}\nMonthly ad budget: ${inr(budget)}\nLocation: ${locations.find((l) => l.id === loc)?.label}\nGoals: ${goalSel.join(', ') || '—'}\nServices: ${svc.join(', ') || '—'}\nSuggested split: Google ${inr(plan.g)} · Meta ${inr(plan.m)}${plan.r ? ` · Retargeting ${inr(plan.r)}` : ''}\nCan we discuss?`;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
      {/* inputs */}
      <form className="glass rounded-[22px] p-6 sm:p-8" onSubmit={(e) => { e.preventDefault(); setRan(true); track('calculator_run', { biz, budget }); }}>
        <div>
          <label htmlFor="calc-biz" className="label">Business type</label>
          <select id="calc-biz" className="field" value={biz} onChange={(e) => setBiz(e.target.value)}>
            {businessTypes.map((b) => <option key={b.id} value={b.id} className="bg-plum-950">{b.label}</option>)}
          </select>
        </div>
        <div className="mt-6">
          <div className="flex items-end justify-between">
            <label htmlFor="calc-budget" className="label">Monthly advertising budget</label>
            <output htmlFor="calc-budget" className="display text-[28px] text-banana">{inr(budget)}</output>
          </div>
          <input id="calc-budget" type="range" min={10000} max={300000} step={5000} value={budget} onChange={(e) => setBudget(+e.target.value)} className="mt-2 w-full accent-[#FFE34D]" />
          <div className="mt-1 flex justify-between text-[11.5px] text-plum-200/70"><span>₹10k</span><span>₹3L</span></div>
        </div>
        <fieldset className="mt-6">
          <legend className="label">Target location</legend>
          <div className="flex flex-wrap gap-2">
            {locations.map((l) => (
              <button type="button" key={l.id} aria-pressed={loc === l.id} onClick={() => setLoc(l.id)} className={`min-h-[40px] rounded-full border px-3.5 text-[13px] font-medium transition ${loc === l.id ? 'border-banana bg-banana text-plum-950' : 'border-white/15 text-white/85 hover:border-white/35'}`}>{l.label}</button>
            ))}
          </div>
        </fieldset>
        <fieldset className="mt-6">
          <legend className="label">Marketing goals</legend>
          <div className="flex flex-wrap gap-2">
            {goals.map((g) => (
              <button type="button" key={g} aria-pressed={goalSel.includes(g)} onClick={() => toggle(goalSel, g, setGoalSel)} className={`min-h-[40px] rounded-full border px-3.5 text-[13px] font-medium transition ${goalSel.includes(g) ? 'border-plum-200 bg-plum-200 text-plum-950' : 'border-white/15 text-white/85 hover:border-white/35'}`}>{g}</button>
            ))}
          </div>
        </fieldset>
        <fieldset className="mt-6">
          <legend className="label">Services you need</legend>
          <div className="flex flex-wrap gap-2">
            {serviceOpts.map((g) => (
              <button type="button" key={g} aria-pressed={svc.includes(g)} onClick={() => toggle(svc, g, setSvc)} className={`min-h-[40px] rounded-full border px-3.5 text-[13px] font-medium transition ${svc.includes(g) ? 'border-plum-200 bg-plum-200 text-plum-950' : 'border-white/15 text-white/85 hover:border-white/35'}`}>{g}</button>
            ))}
          </div>
        </fieldset>
        <button type="submit" className="btn-primary mt-8 w-full">Build my indicative plan <ArrowUpRight size={17} /></button>
      </form>

      {/* output */}
      <div className={`glass-strong glow-border relative rounded-[22px] p-6 transition sm:p-8 ${ran ? '' : 'opacity-90'}`} aria-live="polite">
        <div className="flex items-center justify-between">
          <p className="kicker">Indicative plan</p>
          <span className="whitespace-nowrap rounded-md bg-white/10 px-2 py-1 text-[11px] font-semibold text-plum-100">Not a guarantee</span>
        </div>
        <p className="mt-4 text-[15px] leading-relaxed text-plum-100/85">{plan.b.note}</p>

        <div className="mt-6">
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-plum-200">Suggested monthly ad split</p>
          <div className="mt-3 flex h-4 overflow-hidden rounded-full bg-white/10" aria-hidden="true">
            <div className="bg-banana transition-all duration-500" style={{ width: `${(plan.g / budget) * 100}%` }} />
            <div className="bg-plum-400 transition-all duration-500" style={{ width: `${(plan.m / budget) * 100}%` }} />
            <div className="bg-plum-200 transition-all duration-500" style={{ width: `${(plan.r / budget) * 100}%` }} />
          </div>
          <dl className="mt-4 grid grid-cols-3 gap-3 text-[13px]">
            <div><dt className="flex items-center gap-1.5 text-plum-200"><span className="h-2 w-2 rounded-full bg-banana" />Google Ads</dt><dd className="display mt-1 text-[22px]">{inr(plan.g)}</dd></div>
            <div><dt className="flex items-center gap-1.5 text-plum-200"><span className="h-2 w-2 rounded-full bg-plum-400" />Meta Ads</dt><dd className="display mt-1 text-[22px]">{inr(plan.m)}</dd></div>
            <div><dt className="flex items-center gap-1.5 text-plum-200"><span className="h-2 w-2 rounded-full bg-plum-200" />Retargeting</dt><dd className="display mt-1 text-[22px]">{inr(plan.r)}</dd></div>
          </dl>
          {plan.tooThin && (
            <p className="mt-4 flex gap-2 rounded-xl bg-banana/10 p-3 text-[13px] text-banana"><Info size={16} className="mt-0.5 flex-none" /> Under ₹15,000/month, starting with one channel usually teaches you more than splitting thin across two.</p>
          )}
        </div>

        <div className="mt-6 border-t border-white/10 pt-6">
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-plum-200">First 30 days</p>
          <ol className="mt-3 space-y-2 text-[14px] text-white/90">
            {plan.steps.map((s, k) => (
              <li key={s} className="flex gap-3"><span className="grid h-5 w-5 flex-none place-items-center rounded bg-plum-700 text-[11px] font-bold text-banana">{k + 1}</span>{s}</li>
            ))}
          </ol>
        </div>

        <div className="mt-6 grid gap-3 border-t border-white/10 pt-6 sm:grid-cols-2">
          <div className="rounded-xl bg-white/[0.04] p-4">
            <p className="text-[12px] text-plum-200">Suggested service plan</p>
            <p className="mt-1 font-semibold">{plan.monthly.name} · {inr(plan.monthly.price)}/month</p>
            {plan.pkg.cadence === 'one-time' && <p className="text-[13px] text-plum-100/80">+ {plan.pkg.name} {inr(plan.pkg.price)} one-time</p>}
            {plan.addSite && <p className="text-[13px] text-plum-100/80">+ {plan.addSite.name} {inr(plan.addSite.price)} one-time</p>}
          </div>
          <div className="rounded-xl bg-white/[0.04] p-4">
            <p className="text-[12px] text-plum-200">Total first month (indicative)</p>
            <p className="display mt-1 text-[26px] text-banana">{inr(budget + plan.monthly.price + (plan.pkg.cadence === 'one-time' ? plan.pkg.price : 0) + (plan.addSite?.price || 0))}</p>
            <p className="text-[11.5px] text-plum-200/80">Ad spend + management fee</p>
          </div>
        </div>
        <p className="mt-5 text-[12px] leading-relaxed text-plum-200/75">
          This planner applies simple rules of thumb to your inputs. It is an indicative starting point, not a forecast — it does not predict leads, sales or rankings. Real results depend on your market, offer, website and follow-up.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a href={waLink(summary)} target="_blank" rel="noopener noreferrer" className="btn-primary" onClick={() => track('whatsapp_click', { source: 'calculator' })}>
            <MessageCircle size={17} /> Discuss this plan
          </a>
          <Link to="/pricing/" className="btn-ghost">See all packages</Link>
        </div>
      </div>
    </div>
  );
}
