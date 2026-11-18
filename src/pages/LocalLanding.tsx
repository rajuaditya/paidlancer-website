import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin, Navigation, Users, Clock } from 'lucide-react';
import { Seo, breadcrumbSchema, businessSchema, faqSchema } from '../lib/seo';
import { FaqAccordion, PageHero, Reveal, SectionHeading, Glyph3D } from '../components/ui';
import { services } from '../data/services';
import { site } from '../data/site';
import { FinalCta } from '../sections/home/Sections';

const faqs = [
  { q: 'Can I meet you in person in Kukatpally?', a: 'Yes. I’m based on Road No. 3, Venkatrao Nagar, Kukatpally. We can meet at your office or a convenient spot nearby — message me on WhatsApp to fix a time.' },
  { q: 'Do you only work with businesses in Kukatpally?', a: 'No. Kukatpally is my base, but I work with clients across Hyderabad, India and abroad online.' },
  { q: 'Which nearby areas do you serve?', a: 'Clients in KPHB, Moosapet, Balanagar, Miyapur, Nizampet, Bachupally, Kondapur, Hitech City and the rest of Hyderabad — in person where practical, online everywhere.' },
  { q: 'What does local SEO in Kukatpally involve?', a: 'Optimising your Google Business Profile, keeping your name, address and phone consistent online, earning genuine reviews and making your website clearly relevant to Kukatpally searches.' },
];

export default function LocalLanding() {
  const path = '/digital-marketing-freelancer-kukatpally/';
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'Kukatpally', path }];
  return (
    <>
      <Seo
        title="Digital Marketing Freelancer in Kukatpally, Hyderabad | PAIDLANCER"
        description="Kukatpally-based digital marketing freelancer Peddiraju Bikkavolu. Meet in person for SEO, Google Ads, Meta Ads and websites. Serving all of Hyderabad."
        path={path}
        schema={[businessSchema(), breadcrumbSchema(crumbs), faqSchema(faqs)]}
      />
      <PageHero kicker="Local · Kukatpally" title="Digital marketing freelancer" accent="in Kukatpally." crumbsItems={crumbs}>
        I live and work in Kukatpally. If your business is nearby, we can sit down together, look at your numbers and plan your marketing face to face — the way a lot of business owners here prefer.
      </PageHero>

      <section className="pb-20">
        <div className="wrap grid gap-5 md:grid-cols-3">
          {[
            { icon: Users, t: 'Meet in person', b: 'Planning sessions at your office or nearby. Easier to understand your business when I can see it.' },
            { icon: Navigation, t: 'Local knowledge', b: 'I know how people in KPHB, Miyapur and Nizampet search, and which areas to target — and exclude — in ads.' },
            { icon: Clock, t: 'Quick turnaround', b: 'Need photos for your Google Business Profile or a quick fix on your site? Being close helps.' },
          ].map(({ icon: I, t, b }, i) => (
            <Reveal key={t} delay={i * 80} className="glass rounded-[22px] p-7">
              <I className="text-banana" size={26} />
              <h2 className="mt-4 text-[20px] font-semibold">{t}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-plum-100/75">{b}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section bg-plum-900/40">
        <div className="wrap grid gap-12 lg:grid-cols-2">
          <div className="article">
            <h2 className="!mt-0">Why local businesses in Kukatpally need a different plan</h2>
            <p>Kukatpally is one of Hyderabad’s busiest residential and commercial areas — dense with clinics, coaching centres, restaurants, retail and service businesses competing for the same nearby customers. For most of them, the most valuable searches are local: “near me”, “in KPHB”, “in Kukatpally”.</p>
            <p>That changes the priorities. A well-optimised <Link to="/services/#local-seo">Google Business Profile</Link> and consistent local listings often matter more than ranking city-wide. Ads should target a sensible radius rather than the whole city. And a WhatsApp button usually beats a long form.</p>
            <h2>What I typically do for Kukatpally businesses</h2>
            <ul>
              <li>Set up or fix the Google Business Profile — categories, services, photos, posts and reviews.</li>
              <li>Run <Link to="/google-ads-management-hyderabad/">Google Ads</Link> and <Link to="/meta-ads-management-hyderabad/">Meta Ads</Link> targeted to the areas you actually serve.</li>
              <li>Build or improve a fast <Link to="/website-development-hyderabad/">website</Link> with clear calls and WhatsApp.</li>
              <li>Track calls, direction requests and WhatsApp clicks so you know what is working.</li>
            </ul>
          </div>
          <Reveal className="glass glow-border h-fit rounded-[24px] p-7">
            <MapPin className="text-banana" />
            <h2 className="mt-4 text-[22px] font-semibold">Where to find me</h2>
            <address className="mt-3 not-italic leading-relaxed text-plum-100/85">
              {site.brand} — {site.owner.name}<br />
              {site.address.street}<br />
              Kukatpally, Hyderabad, Telangana
            </address>
            <p className="mt-3 text-[14px] text-plum-200">{site.phone} · {site.email}</p>
            <a href="https://www.google.com/maps/search/?api=1&query=Venkatrao+Nagar+Road+No+3+Kukatpally+Hyderabad" target="_blank" rel="noopener noreferrer" className="btn-ghost mt-6">Open in Google Maps <ArrowUpRight size={16} /></a>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHeading kicker="Services in Kukatpally" title="Everything available" accent="locally." />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <Link key={s.slug} to={s.path} className="glass group flex items-center gap-4 rounded-2xl p-4 transition hover:border-banana/40">
                <Glyph3D icon={s.icon} hue={s.hue} size={42} />
                <span className="text-[14.5px] font-medium group-hover:text-banana">{s.name.replace(' in Hyderabad', '')}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-plum-900/40">
        <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)]">
          <SectionHeading kicker="FAQ" title="Kukatpally" accent="questions." />
          <FaqAccordion items={faqs} />
        </div>
      </section>
      <FinalCta />
    </>
  );
}
