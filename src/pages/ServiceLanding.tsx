import { Link } from 'react-router-dom';
import { ArrowUpRight, Check, MessageCircle } from 'lucide-react';
import { Seo, breadcrumbSchema, faqSchema, serviceSchema } from '../lib/seo';
import { Breadcrumbs, FaqAccordion, Glyph3D, MagneticButton, Reveal, SectionHeading, TiltCard } from '../components/ui';
import { getService, services } from '../data/services';
import { posts } from '../data/blog';
import { BlogCard, TestimonialSlider } from '../components/Cards';
import { FinalCta } from '../sections/home/Sections';
import { waLink } from '../lib/contact';
import { track } from '../lib/analytics';
import NotFound from './NotFound';

const blogMap: Record<string, string[]> = {
  seo: ['seo', 'local-seo'],
  'google-ads': ['google-ads'],
  'meta-ads': ['meta-ads', 'google-ads'],
  'social-media': ['meta-ads', 'digital-marketing-tips'],
  'website-development': ['website-development', 'seo'],
  wordpress: ['website-development'],
  shopify: ['website-development'],
};

export default function ServiceLanding({ slug }: { slug: string }) {
  const s = getService(slug);
  if (!s || !s.landing) return <NotFound />;
  const L = s.landing;
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'Services', path: '/services/' }, { name: s.name.replace(' in Hyderabad', ''), path: s.path }];
  const related = posts.filter((p) => (blogMap[slug] || []).includes(p.category)).slice(0, 3);
  const others = services.filter((x) => x.slug !== slug && x.landing).slice(0, 6);

  return (
    <>
      <Seo title={L.metaTitle} description={L.metaDescription} path={s.path} schema={[serviceSchema({ name: s.name, description: L.metaDescription, path: s.path }), breadcrumbSchema(crumbs), faqSchema(L.faqs)]} />

      <header className="relative overflow-hidden pb-16 pt-32 sm:pt-40">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_80%_20%,rgba(141,85,213,.4),transparent_60%)]" />
        <div className="wrap relative grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,.7fr)] lg:items-center">
          <div>
            <Breadcrumbs items={crumbs} />
            <span className="kicker mt-8">{L.kicker}</span>
            <h1 className="display mt-5 text-[clamp(2.6rem,6vw,5.2rem)]">{L.h1.replace(' in Hyderabad', '')}{L.h1.includes('Hyderabad') && <span className="serif-i block font-normal text-banana">in Hyderabad.</span>}</h1>
            <p className="lead mt-6 max-w-2xl">{s.short}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <MagneticButton to="/contact/" onClick={() => track('cta_click', { cta: 'landing_quote', service: slug })}>Get a free plan</MagneticButton>
              <a href={waLink(`Hi Raju, I’m interested in ${s.name}.`)} target="_blank" rel="noopener noreferrer" className="btn-ghost" onClick={() => track('whatsapp_click', { source: 'landing', service: slug })}>
                <MessageCircle size={17} /> WhatsApp
              </a>
            </div>
          </div>
          <Reveal className="hidden lg:block">
            <TiltCard max={12} className="ml-auto w-fit rounded-[32px]">
              <div className="glass glow-border grid h-[300px] w-[300px] place-items-center rounded-[32px]" style={{ transformStyle: 'preserve-3d' }}>
                <div className="absolute inset-8 rounded-full bg-plum-400/30 blur-3xl" />
                <div style={{ transform: 'translateZ(60px)' }} className="animate-floaty"><Glyph3D icon={s.icon} hue={s.hue} size={140} /></div>
              </div>
            </TiltCard>
          </Reveal>
        </div>
      </header>

      <section className="pb-16">
        <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,.8fr)]">
          <div className="article">
            {L.intro.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}
            {L.sections.map((sec) => (
              <div key={sec.h2}>
                <h2>{sec.h2}</h2>
                {sec.body.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}
                {sec.bullets && <ul>{sec.bullets.map((b) => <li key={b}>{b}</li>)}</ul>}
              </div>
            ))}
          </div>
          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <div className="glass rounded-[22px] p-6">
              <h2 className="text-[12px] font-semibold uppercase tracking-[0.18em] text-banana">Deliverables</h2>
              <ul className="mt-4 space-y-2.5">
                {s.deliverables.map((d) => <li key={d} className="flex gap-3 text-[14.5px]"><Check size={16} className="mt-0.5 flex-none text-banana" />{d}</li>)}
              </ul>
            </div>
            <div className="glass rounded-[22px] p-6">
              <h2 className="text-[12px] font-semibold uppercase tracking-[0.18em] text-banana">My process</h2>
              <ol className="mt-4 space-y-3">
                {s.process.map((d, k) => <li key={d} className="flex gap-3 text-[14.5px]"><span className="grid h-6 w-6 flex-none place-items-center rounded-md bg-plum-700 text-[12px] font-bold text-banana">{k + 1}</span>{d}</li>)}
              </ol>
            </div>
            <Link to="/pricing/" className="glass flex items-center justify-between rounded-[22px] p-6 transition hover:border-banana/40">
              <span><span className="block text-[13px] text-plum-200">Transparent pricing</span><span className="font-semibold">See packages from ₹4,999</span></span>
              <ArrowUpRight className="text-banana" />
            </Link>
          </aside>
        </div>
      </section>

      <section className="section bg-plum-900/40">
        <div className="wrap grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading kicker="Benefits" title="What you" accent="get from it." />
            <ul className="mt-8 grid gap-3">
              {s.benefits.map((b, i) => (
                <Reveal as="li" key={b} delay={i * 60} className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-[15.5px]"><span className="display text-[24px] text-banana">0{i + 1}</span>{b}</Reveal>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading kicker="Who it’s for" title="Built for" accent="businesses like yours." />
            <ul className="mt-8 grid gap-3">
              {s.whoFor.map((b, i) => (
                <Reveal as="li" key={b} delay={i * 60} className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-[15.5px]"><Check className="text-banana" size={18} />{b}</Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)]">
          <SectionHeading kicker="FAQ" title={`${s.name.replace(' in Hyderabad', '')}`} accent="questions." />
          <FaqAccordion items={L.faqs} />
        </div>
      </section>

      <section className="section pt-0"><div className="wrap"><TestimonialSlider /></div></section>

      {related.length > 0 && (
        <section className="section pt-0">
          <div className="wrap">
            <SectionHeading kicker="Further reading" title="Related" accent="guides." />
            <div className="mt-10 grid gap-8 md:grid-cols-3">{related.map((p) => <BlogCard key={p.slug} post={p} />)}</div>
          </div>
        </section>
      )}

      <section className="pb-6">
        <div className="wrap">
          <h2 className="text-[12px] font-semibold uppercase tracking-[0.18em] text-plum-200">Other services</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {others.map((o) => <li key={o.slug}><Link to={o.path} className="inline-flex min-h-[40px] items-center gap-1 rounded-full border border-white/12 px-4 text-[13.5px] hover:border-banana hover:text-banana">{o.name.replace(' in Hyderabad', '')} <ArrowUpRight size={13} /></Link></li>)}
            <li><Link to="/digital-marketing-freelancer-kukatpally/" className="inline-flex min-h-[40px] items-center gap-1 rounded-full border border-white/12 px-4 text-[13.5px] hover:border-banana hover:text-banana">Digital marketing in Kukatpally <ArrowUpRight size={13} /></Link></li>
          </ul>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
