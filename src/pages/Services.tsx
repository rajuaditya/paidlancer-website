import { Link } from 'react-router-dom';
import { ArrowUpRight, Check } from 'lucide-react';
import { Seo, breadcrumbSchema, serviceSchema } from '../lib/seo';
import { Glyph3D, PageHero, Reveal, TiltCard } from '../components/ui';
import { services, getService, type Service } from '../data/services';
import { FinalCta } from '../sections/home/Sections';

export function ServiceDetail({ s, index }: { s: Service; index: number }) {
  return (
    <section id={s.slug} className="scroll-mt-24 border-t border-white/10 py-16 sm:py-20">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,.85fr)_minmax(0,1.15fr)]">
        <Reveal>
          <div className="lg:sticky lg:top-28">
            <TiltCard max={10} className="w-fit rounded-3xl">
              <div className="glass glow-border grid h-[150px] w-[150px] place-items-center rounded-3xl" style={{ transformStyle: 'preserve-3d' }}>
                <div style={{ transform: 'translateZ(40px)' }}><Glyph3D icon={s.icon} hue={s.hue} size={84} /></div>
              </div>
            </TiltCard>
            <p className="mt-6 text-[12px] font-semibold tabular-nums text-plum-200/70">{String(index + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')}</p>
            <h2 className="display mt-2 text-[clamp(30px,3.4vw,46px)]">{s.name}</h2>
            <p className="mt-3 text-[16px] leading-relaxed text-plum-100/80">{s.short}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {s.landing ? (
                <Link to={s.path} className="btn-primary pr-2">Full details <span className="btn-icon"><ArrowUpRight size={16} /></span></Link>
              ) : (
                <Link to="/contact/" className="btn-primary pr-2">Enquire <span className="btn-icon"><ArrowUpRight size={16} /></span></Link>
              )}
              <Link to="/pricing/" className="btn-ghost">Pricing</Link>
            </div>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <p className="text-[18px] leading-relaxed text-white/90">{s.description}</p>
          <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2">
            {[
              { h: 'Business benefits', items: s.benefits },
              { h: 'Who needs this', items: s.whoFor },
              { h: 'My process', items: s.process, ordered: true },
              { h: 'Deliverables', items: s.deliverables },
            ].map((b) => (
              <div key={b.h} className="bg-plum-950 p-6">
                <h3 className="text-[12px] font-semibold uppercase tracking-[0.18em] text-banana">{b.h}</h3>
                <ul className="mt-4 space-y-2.5">
                  {b.items.map((it, k) => (
                    <li key={it} className="flex gap-3 text-[14.5px] text-white/90">
                      {b.ordered ? <span className="grid h-5 w-5 flex-none place-items-center rounded bg-plum-700 text-[11px] font-bold text-banana">{k + 1}</span> : <Check size={16} className="mt-0.5 flex-none text-banana" />}
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-6 text-[14px] text-plum-200">
            Related:{' '}
            {s.related.map((r, k) => {
              const rs = getService(r);
              return rs ? (
                <span key={r}>
                  {k > 0 && ' · '}
                  <Link to={rs.path} className="text-white underline decoration-white/30 underline-offset-4 hover:text-banana">{rs.name.replace(' in Hyderabad', '')}</Link>
                </span>
              ) : null;
            })}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export default function Services() {
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'Services', path: '/services/' }];
  return (
    <>
      <Seo
        title="Digital Marketing Services in Hyderabad | SEO, Ads & Websites"
        description="12 services from Hyderabad freelancer Peddiraju Bikkavolu: SEO, Google Ads, Meta Ads, social media, websites, Shopify, lead generation, design and analytics."
        path="/services/"
        schema={[breadcrumbSchema(crumbs), ...services.map((s) => serviceSchema({ name: s.name, description: s.description, path: s.path }))]}
      />
      <PageHero kicker="Services" title="Digital marketing services" accent="in Hyderabad." crumbsItems={crumbs}>
        Twelve services, one person accountable for all of them. Pick what you need — or let me recommend the right mix for your budget and goals.
      </PageHero>
      <nav aria-label="Service index" className="wrap pb-10">
        <ul className="flex flex-wrap gap-2">
          {services.map((s) => (
            <li key={s.slug}>
              <a href={`#${s.slug}`} className="inline-flex min-h-[40px] items-center rounded-full border border-white/12 px-4 text-[13.5px] text-white/85 transition hover:border-banana hover:text-banana">{s.name.replace(' in Hyderabad', '')}</a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="wrap">
        {services.map((s, i) => (
          <ServiceDetail key={s.slug} s={s} index={i} />
        ))}
      </div>
      <FinalCta />
    </>
  );
}
