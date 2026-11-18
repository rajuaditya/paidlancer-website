import { useState } from 'react';
import { Check, MessageCircle } from 'lucide-react';
import { Seo, breadcrumbSchema, faqSchema } from '../lib/seo';
import { FaqAccordion, PageHero, Reveal, SectionHeading, TiltCard } from '../components/ui';
import { inr, plans } from '../data/content';
import { waLink } from '../lib/contact';
import { track } from '../lib/analytics';
import BudgetCalculator from '../components/BudgetCalculator';
import { FinalCta } from '../sections/home/Sections';

const pricingFaqs = [
  { q: 'Is ad spend included in the monthly plans?', a: 'No. Ad spend is paid directly to Google or Meta from your own account. My plans cover strategy, setup, creatives and management.' },
  { q: 'Are there long-term contracts?', a: 'No. Monthly plans are flexible. One-time packages are paid per project.' },
  { q: 'Can a package be customised?', a: 'Yes. These are starting points — tell me what you need and I’ll adjust the scope and quote.' },
  { q: 'Are domain and hosting included?', a: 'Only where stated (Premium plan, and 1 domain in the E-commerce package). Otherwise I’ll help you buy and set them up in your own name.' },
];

export default function Pricing() {
  const [group, setGroup] = useState<'growth' | 'build'>('growth');
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'Pricing', path: '/pricing/' }];
  const list = plans.filter((p) => p.group === group);
  return (
    <>
      <Seo
        title="Digital Marketing Packages & Pricing in Hyderabad | From ₹4,999"
        description="Transparent pricing from PAIDLANCER, Hyderabad: maintenance ₹4,999/mo, websites from ₹14,999, marketing plans from ₹19,999/mo, Shopify ₹24,999."
        path="/pricing/"
        schema={[breadcrumbSchema(crumbs), faqSchema(pricingFaqs)]}
      />
      <PageHero kicker="Pricing" title="Clear packages," accent="freelancer pricing." crumbsItems={crumbs}>
        Published prices so you can plan before we talk. Ad spend is always separate and paid directly to the platform.
      </PageHero>

      <section className="pb-24">
        <div className="wrap">
          <div role="tablist" aria-label="Package type" className="inline-flex rounded-2xl border border-white/12 bg-white/[0.03] p-1">
            {([['growth', 'Monthly growth'], ['build', 'Websites & stores']] as const).map(([k, l]) => (
              <button key={k} role="tab" aria-selected={group === k} onClick={() => setGroup(k)} className={`min-h-[44px] rounded-xl px-5 text-[14px] font-semibold transition ${group === k ? 'bg-banana text-plum-950' : 'text-white/80'}`}>{l}</button>
            ))}
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {list.map((p, i) => (
              <Reveal key={p.name} delay={i * 80}>
                <TiltCard max={4} className="h-full rounded-[24px]">
                  <div className={`flex h-full flex-col rounded-[24px] p-7 ${p.featured ? 'glass-strong glow-border' : 'glass'}`}>
                    <div className="flex items-center justify-between">
                      <h2 className="text-[20px] font-semibold">{p.name}</h2>
                      {p.featured && <span className="rounded-md bg-banana px-2 py-1 text-[11px] font-bold text-plum-950">Popular</span>}
                    </div>
                    <p className="mt-2 text-[14.5px] text-plum-100/75">{p.tagline}</p>
                    <p className="mt-6 flex items-end gap-2">
                      <span className="display text-[52px] leading-none">{inr(p.price)}</span>
                      <span className="pb-1 text-[14px] text-plum-200">{p.cadence === 'month' ? '/ month' : 'one-time'}</span>
                    </p>
                    <ul className="mt-6 flex-1 space-y-2.5 border-t border-white/10 pt-6">
                      {p.features.map((f) => <li key={f} className="flex gap-3 text-[14.5px]"><Check size={16} className="mt-0.5 flex-none text-banana" />{f}</li>)}
                    </ul>
                    {p.note && <p className="mt-4 text-[12.5px] text-plum-200/80">{p.note}</p>}
                    <a href={waLink(`Hi Raju, I’m interested in the ${p.name} package (${inr(p.price)}${p.cadence === 'month' ? '/month' : ''}).`)} target="_blank" rel="noopener noreferrer" onClick={() => track('whatsapp_click', { source: 'pricing', plan: p.name })} className={`${p.featured ? 'btn-primary' : 'btn-ghost'} mt-7 w-full`}>
                      <MessageCircle size={17} /> Choose {p.name}
                    </a>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-plum-900/40">
        <div className="wrap">
          <SectionHeading kicker="Budget planner" title="Not sure which plan?" accent="Try the planner." />
          <div className="mt-12"><BudgetCalculator /></div>
        </div>
      </section>

      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)]">
          <SectionHeading kicker="FAQ" title="Pricing" accent="questions." />
          <FaqAccordion items={pricingFaqs} />
        </div>
      </section>
      <FinalCta />
    </>
  );
}
