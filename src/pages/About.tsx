import { Seo, breadcrumbSchema, personSchema } from '../lib/seo';
import { MagneticButton, PageHero, Reveal, SectionHeading, TiltCard } from '../components/ui';
import { skillGroups, proficiency } from '../data/services';
import { site } from '../data/site';
import { story, Trust, Process, FinalCta } from '../sections/home/Sections';
import { useInView } from '../lib/hooks';
import portrait from '../assets/img/raju-portrait-1200.webp';
import portraitSm from '../assets/img/raju-portrait-640.webp';
import cinematic from '../assets/img/raju-cinematic-900.webp';
import suit from '../assets/img/raju-suit-720.webp';
import hero from '../assets/img/raju-hero-900.webp';
import sayhi from '../assets/img/raju-sayhi-720.webp';

const gallery = [
  { src: portrait, alt: 'Peddiraju Bikkavolu, portrait with glasses', cls: 'sm:col-span-2 sm:row-span-2', pos: 'object-[42%_center]' },
  { src: cinematic, alt: 'Raju in a black blazer at an evening event', cls: '', pos: 'object-top' },
  { src: suit, alt: 'Raju in a formal suit', cls: '', pos: 'object-center' },
  { src: hero, alt: 'Raju pointing and smiling', cls: 'bg-gradient-to-b from-plum-400 to-plum-900', pos: 'object-contain object-bottom' },
  { src: sayhi, alt: 'Raju in a denim jacket holding a toy water gun', cls: 'bg-gradient-to-b from-plum-700 to-plum-950', pos: 'object-contain object-bottom' },
];

function SkillBars() {
  const [ref, seen] = useInView<HTMLDivElement>({ threshold: 0.3 });
  return (
    <div ref={ref} className="space-y-4">
      {proficiency.map((p, i) => (
        <div key={p.name}>
          <div className="flex justify-between text-[14px]"><span className="font-medium">{p.name}</span><span className="tabular-nums text-plum-200">{p.value}%</span></div>
          <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/10" role="progressbar" aria-valuenow={p.value} aria-valuemin={0} aria-valuemax={100} aria-label={`${p.name} proficiency`}>
            <div className="h-full rounded-full bg-gradient-to-r from-plum-400 to-banana transition-[width] duration-[1200ms] ease-out" style={{ width: seen ? `${p.value}%` : '0%', transitionDelay: `${i * 70}ms` }} />
          </div>
        </div>
      ))}
      <p className="pt-2 text-[12px] text-plum-200/60">Self-assessed, as listed on my previous website.</p>
    </div>
  );
}

export default function About() {
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'About', path: '/about/' }];
  return (
    <>
      <Seo
        title="About Peddiraju Bikkavolu | Digital Marketing Freelancer, Hyderabad"
        description="Meet Peddiraju Bikkavolu (Raju), the self-taught marketer and developer behind PAIDLANCER. Freelancing since 2022, 40+ clients, B.Sc. CS 2024."
        path="/about/"
        type="profile"
        schema={[personSchema(), breadcrumbSchema(crumbs)]}
      />
      <PageHero kicker="About me" title="Peddiraju Bikkavolu." accent="The person behind PAIDLANCER." crumbsItems={crumbs}>
        Digital marketing freelancer and web developer based in Kukatpally, Hyderabad. I help startups, small businesses and growing brands build an online presence that actually brings enquiries.
      </PageHero>

      <section className="pb-20">
        <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
          <Reveal>
            <TiltCard max={5} className="rounded-[26px]">
              <img src={portrait} srcSet={`${portraitSm} 640w, ${portrait} 1200w`} sizes="(min-width:1024px) 600px, 92vw" width={1200} height={800} alt="Peddiraju Bikkavolu, digital marketing freelancer in Hyderabad" className="aspect-[4/3] w-full rounded-[26px] border border-white/10 object-cover object-[40%_center] shadow-glow" />
            </TiltCard>
          </Reveal>
          <div className="article space-y-0">
            <p className="!mt-0 text-[20px] leading-relaxed text-white">
              I didn’t learn digital marketing in a classroom. In 2022 I started teaching myself — online videos, free tools, and a lot of trial and error on real campaigns.
            </p>
            <p>Instead of waiting to finish my degree and look for a job, I started freelancing. My first clients were small businesses that needed someone to make sense of Google, Instagram and their website. I learned fast because the stakes were real: if a campaign didn’t bring enquiries, the client noticed.</p>
            <p>Over the next couple of years I worked with training institutes, IT companies, interior designers, restaurants, consultants and online stores. Each industry taught me something different — how students compare institutes, how B2B buyers research, how a restaurant fills tables on a Tuesday.</p>
            <p>I graduated with a <strong>B.Sc. in Computer Science in 2024</strong>. That technical background is what makes my work different: I can build and fix the websites my campaigns depend on — in WordPress, Shopify or React — set up tracking properly, and spot the problem when ads get clicks but no calls.</p>
            <p>Today I run <strong>PAIDLANCER</strong>, working directly with every client. I keep pricing at freelancer level, explain results honestly, and focus on numbers that matter: enquiries, sales and cost per lead. My long-term goal is to grow PAIDLANCER into an agency that helps brands across India grow online — without losing the personal, direct way of working that clients value.</p>
            <div className="not-prose mt-8"><MagneticButton to="/resume/">View &amp; download my resume</MagneticButton></div>
          </div>
        </div>
      </section>

      <Trust />

      <section className="section">
        <div className="wrap">
          <SectionHeading kicker="Journey" title="How I got" accent="here." />
          <ol className="mt-14 grid gap-px overflow-hidden rounded-[22px] border border-white/10 bg-white/10 md:grid-cols-4">
            {story.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 80} className="bg-plum-950 p-7">
                <p className="display text-[40px] text-banana">{s.year}</p>
                <h3 className="mt-3 text-[18px] font-semibold">{s.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-plum-100/75">{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section bg-plum-900/40">
        <div className="wrap grid gap-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,.8fr)]">
          <div>
            <SectionHeading kicker="Skills" title="Marketing, development" accent="and creative." />
            <div className="mt-10 space-y-8">
              {skillGroups.map((g, gi) => (
                <Reveal key={g.title} delay={gi * 80}>
                  <h3 className="text-[13px] font-semibold uppercase tracking-[0.18em] text-banana">{g.title}</h3>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {g.items.map((s) => (
                      <li key={s} className="rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-1.5 text-[14px] transition hover:-translate-y-0.5 hover:border-banana/60 hover:text-banana">{s}</li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal delay={120} className="glass rounded-[22px] p-7">
            <h3 className="text-[18px] font-semibold">Proficiency</h3>
            <div className="mt-6"><SkillBars /></div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHeading kicker="Gallery" title="Off the" accent="spreadsheet." />
          <div className="mt-12 grid auto-rows-[220px] gap-4 sm:grid-cols-3 sm:auto-rows-[240px] lg:grid-cols-4">
            {gallery.map((g, i) => (
              <Reveal key={i} delay={i * 70} className={`group relative overflow-hidden rounded-[20px] border border-white/10 ${g.cls}`}>
                <img src={g.src} alt={g.alt} loading="lazy" className={`h-full w-full ${g.pos.includes('contain') ? '' : 'object-cover'} ${g.pos} transition duration-700 group-hover:scale-[1.06]`} />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-plum-950/70 via-transparent to-plum-700/10 opacity-80 transition group-hover:opacity-40" />
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-[13px] text-plum-200/70">Based in {site.geo.area}, {site.geo.city}. Meeting clients in person or online.</p>
        </div>
      </section>

      <Process />
      <FinalCta />
    </>
  );
}
