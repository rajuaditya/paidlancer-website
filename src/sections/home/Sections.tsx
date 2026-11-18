import { Link } from 'react-router-dom';
import { ArrowUpRight, Check, MessageCircle, CalendarCheck, GraduationCap, MapPin, Rocket, Code2, UserRound, Mail, Phone, Clock3, Download } from 'lucide-react';
import { site, industries } from '../../data/site';
import { clients, faqs, process, whyMe } from '../../data/content';
import { posts } from '../../data/blog';
import { Counter, FaqAccordion, Glyph3D, MagneticButton, Reveal, SectionHeading, TiltCard, icons } from '../../components/ui';
import ServiceSelector from '../../components/ServiceSelector';
import BudgetCalculator from '../../components/BudgetCalculator';
import WorkCoverflow from '../../components/WorkCoverflow';
import { BlogCard, TestimonialSlider } from '../../components/Cards';
import { mailLink, telLink, waLink } from '../../lib/contact';
import { useInView } from '../../lib/hooks';
import worldDots from '../../assets/world-dots.svg';
import { track } from '../../lib/analytics';
import heroLg from '../../assets/img/raju-hero-900.webp';
import heroSm from '../../assets/img/raju-hero-560.webp';
import sayhi from '../../assets/img/raju-sayhi-720.webp';
import sayhiSm from '../../assets/img/raju-sayhi-420.webp';

/* 3 — Personal introduction */
export function Intro() {
  return (
    <section id="intro" className="section scroll-mt-20">
      <div className="wrap grid items-center gap-12 lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] lg:gap-20">
        <Reveal>
          <TiltCard max={7} className="mx-auto max-w-[460px] rounded-[26px]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[26px] border border-white/10 shadow-glow" style={{ transform: 'translateZ(0)', background: 'radial-gradient(ellipse 80% 70% at 50% 35%, #8D55D5 0%, #54228B 45%, #30105F 85%)' }}>
              <div aria-hidden="true" className="absolute left-1/2 top-[38%] aspect-square w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
              <div aria-hidden="true" className="absolute left-1/2 top-[38%] aspect-square w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-banana/10 blur-2xl" />
              <img src={heroLg} srcSet={`${heroSm} 560w, ${heroLg} 900w`} sizes="(min-width:1024px) 460px, 90vw" width={900} height={1004} loading="lazy" alt="Peddiraju Bikkavolu, digital marketing freelancer in Hyderabad, smiling and pointing" className="absolute bottom-0 left-1/2 h-[96%] w-auto max-w-none -translate-x-1/2 object-contain object-bottom" style={{ WebkitMaskImage: 'linear-gradient(to left, transparent 0, #000 9%)', maskImage: 'linear-gradient(to left, transparent 0, #000 9%)' }} />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-plum-950/90 via-transparent to-transparent" />
              <div className="absolute inset-x-5 bottom-5 flex items-end justify-between">
                <div>
                  <p className="serif-i text-[34px] leading-none">Hi, I’m Raju.</p>
                  <p className="mt-1 text-[13px] text-plum-100/80">Founder, PAIDLANCER</p>
                </div>
                <span className="chip"><MapPin size={13} className="text-banana" /> Hyderabad</span>
              </div>
            </div>
          </TiltCard>
        </Reveal>
        <div>
          <Reveal><span className="kicker">Personal introduction</span></Reveal>
          <Reveal delay={80}>
            <p className="display mt-6 text-[clamp(30px,3.6vw,50px)] leading-[1.02]">
              I help Hyderabad businesses get <span className="serif-i font-normal text-banana">found</span>, get <span className="serif-i font-normal text-banana">chosen</span> and get <span className="serif-i font-normal text-banana">contacted</span> — with marketing that’s backed by real technical skill.
            </p>
          </Reveal>
          <Reveal delay={160}>
            <p className="lead mt-6">
              Most freelancers either run ads or build websites. I do both, because campaigns live or die on the page they send people to. You get one person who plans the strategy, sets up the tracking, designs the creatives and fixes the landing page — and who answers when you message.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                { icon: Rocket, t: 'Freelancing since 2022' },
                { icon: GraduationCap, t: 'B.Sc. Computer Science, 2024' },
                { icon: Code2, t: 'Marketing + web development' },
                { icon: MapPin, t: 'Kukatpally, Hyderabad' },
              ].map(({ icon: I, t }) => (
                <li key={t} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-[14.5px]">
                  <I size={18} className="text-banana" /> {t}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={280} className="mt-8">
            <Link to="/about/" className="group inline-flex items-center gap-2 text-[15px] font-semibold text-banana">
              Read my story <ArrowUpRight size={17} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* 4 — Trust indicators */
export function Trust() {
  const names = clients.map((c) => c.name);
  return (
    <section aria-labelledby="trust-h" className="relative border-y border-white/10 bg-plum-900/40 py-14">
      <h2 id="trust-h" className="sr-only">Trust indicators</h2>
      <div className="wrap grid grid-cols-2 gap-y-10 lg:grid-cols-4">
        {site.stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 80} className={`px-2 lg:px-6 ${i > 0 ? 'lg:border-l lg:border-white/10' : ''}`}>
            <p className="display text-[clamp(48px,6vw,76px)] leading-none">
              <Counter value={s.value} />
              <span className="text-banana">{s.suffix}</span>
            </p>
            <p className="mt-2 text-[15px] font-semibold">{s.label}</p>
            <p className="text-[13.5px] text-plum-200/80">{s.detail}</p>
          </Reveal>
        ))}
      </div>
      <div className="relative mt-12 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
        <p className="wrap mb-5 text-[12px] font-semibold uppercase tracking-[0.2em] text-plum-200/70">Businesses I’ve worked with</p>
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap [animation-duration:60s]" aria-label="Client names">
          {[...names, ...names].map((n, i) => (
            <span key={i} aria-hidden={i >= names.length} className="display text-[26px] text-white/35 transition hover:text-white [font-stretch:90%]">{n}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 5 — About / story */
export const story = [
  { year: '2022', title: 'Started without a course', body: 'No formal training — just online videos, free tools and a lot of experiments. Instead of waiting for a job, I took on my first freelance clients and learned by delivering.' },
  { year: 'Learning', title: 'Real clients, real stakes', body: 'Training institutes, IT companies, interior designers, restaurants and online stores. Every industry taught me something different about what makes people enquire.' },
  { year: '2024', title: 'Graduated B.Sc. Computer Science', body: 'Finishing my degree sharpened the technical side — React, Node.js, MongoDB, WordPress and Shopify — so the websites behind my campaigns are built properly.' },
  { year: 'Today', title: 'PAIDLANCER', body: '40+ clients across 9+ industries. The goal: grow into an agency that helps brands across India grow online — without losing the direct, personal way I work.' },
];

export function AboutStory() {
  const [sigRef, sigSeen] = useInView<HTMLDivElement>({ threshold: 0.6 });
  const rows = [
    { icon: UserRound, label: 'Name', value: site.owner.name },
    { icon: Mail, label: 'Email', value: site.email, href: mailLink('Hello from paidlancer.in') },
    { icon: Phone, label: 'Phone', value: site.phone, href: telLink },
    { icon: MapPin, label: 'Location', value: 'Kukatpally, Hyderabad, India' },
    { icon: Clock3, label: 'Availability', value: 'Available for freelance projects', live: true },
  ];
  return (
    <section className="section overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-orbs" />
      <div className="wrap relative grid items-center gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,.95fr)] lg:gap-16">
        {/* left */}
        <div>
          <Reveal><span className="kicker">About me</span></Reveal>
          <Reveal delay={60}>
            <h2 className="h2 mt-5">
              Building digital growth
              <span className="serif-i block text-[1.08em] font-normal leading-[0.95] text-banana">that makes a difference.</span>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="lead mt-6 max-w-xl">
              I’m a Hyderabad-based <strong className="font-semibold text-white">digital marketing freelancer and web developer</strong>. Since 2022 I’ve helped startups, small businesses and growing brands get found on Google, run ads that bring real enquiries, and build websites that convert — backed by a B.Sc. in Computer Science.
            </p>
          </Reveal>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {site.stats.map((st, i) => (
              <Reveal key={st.label} delay={160 + i * 60}>
                <div className="glass glow-border h-full rounded-2xl px-3 py-4 text-center transition hover:-translate-y-1">
                  <p className="display text-[34px] leading-none text-banana"><Counter value={st.value} />{st.suffix}</p>
                  <p className="mt-2 text-[12px] font-medium leading-tight text-plum-100/80">{st.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={420} className="mt-8 flex flex-wrap items-center gap-4">
            <Link to="/resume/" className="group inline-flex min-h-[50px] items-center gap-3 rounded-full border border-banana/60 px-6 text-[13.5px] font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-banana hover:text-plum-950" onClick={() => track('cta_click', { cta: 'about_resume' })}>
              View &amp; download resume <Download size={17} className="text-banana transition group-hover:translate-y-0.5 group-hover:text-plum-950" />
            </Link>
            <Link to="/about/" className="inline-flex items-center gap-1.5 text-[14.5px] font-semibold text-plum-100 hover:text-banana">Read my story <ArrowUpRight size={16} /></Link>
          </Reveal>
        </div>

        {/* right: info card + dotted map + signature */}
        <div className="relative">
          <div aria-hidden="true" className="pointer-events-none absolute -top-6 hidden opacity-90 sm:block" style={{ left: '6%', width: '135%' }}>
            <div className="relative">
              <img src={worldDots} alt="" width={1390} height={700} loading="lazy" className="w-full" />
              {/* Hyderabad */}
              <span className="absolute" style={{ left: '73%', top: '49.5%' }}>
                <span className="absolute -left-3 -top-3 h-6 w-6 animate-ping2 rounded-full bg-banana/60" />
                <span className="absolute -left-1.5 -top-1.5 h-3 w-3 rounded-full bg-banana shadow-[0_0_18px_6px_rgba(255,227,77,.55)]" />
              </span>
            </div>
          </div>
          <Reveal className="relative">
            <dl className="glass glow-border max-w-[460px] rounded-[22px] p-5 sm:p-7">
              {rows.map(({ icon: I, label, value, href, live }) => (
                <div key={label} className="grid grid-cols-[28px_96px_minmax(0,1fr)] items-center gap-2 border-b border-white/[0.07] py-3.5 last:border-0">
                  <I size={19} className="text-banana" aria-hidden="true" />
                  <dt className="text-[14px] text-plum-200">{label}:</dt>
                  <dd className="flex min-w-0 items-center gap-2 text-[14.5px] font-medium text-white">
                    {live && <span className="relative flex h-2 w-2 flex-none"><span className="absolute inset-0 animate-ping2 rounded-full bg-banana" /><span className="relative h-2 w-2 rounded-full bg-banana" /></span>}
                    {href ? <a href={href} className="truncate hover:text-banana">{value}</a> : <span className="truncate">{value}</span>}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <div ref={sigRef} className="relative mt-8 pl-2" aria-label="Signature: Peddiraju Bikkavolu">
            <p
              aria-hidden="true"
              className="font-signature text-[clamp(48px,6vw,72px)] leading-none text-banana [text-shadow:0_0_30px_rgba(255,227,77,.25)]"
              style={{ clipPath: sigSeen ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)', transition: 'clip-path 2.4s cubic-bezier(.6,.05,.3,1)' }}
            >
              Peddiraju Bikkavolu
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 6 — Services */
export function ServicesSection() {
  return (
    <section id="services" className="section scroll-mt-20">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading kicker="Services" title="Everything your growth needs," accent="under one roof." />
          <Reveal><Link to="/services/" className="btn-ghost">All services <ArrowUpRight size={16} /></Link></Reveal>
        </div>
        <div className="mt-14"><ServiceSelector /></div>
      </div>
    </section>
  );
}

/* 7 — Why PAIDLANCER */
export function WhyChoose() {
  return (
    <section className="section bg-plum-900/40">
      <div className="wrap">
        <SectionHeading kicker="Why PAIDLANCER" title="Agency-level thinking," accent="freelancer-level attention." center />
        <div className="mt-14 grid border-l border-t border-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {whyMe.map((w, i) => {
            const I = icons[w.icon];
            return (
              <Reveal key={w.title} delay={(i % 3) * 80} className="group relative border-b border-r border-white/10 p-7 transition hover:bg-white/[0.03] sm:p-9">
                <span className="text-[12px] font-semibold tabular-nums text-plum-200/60">{String(i + 1).padStart(2, '0')}</span>
                <I size={26} className="mt-5 text-banana transition-transform duration-300 group-hover:-translate-y-1" />
                <h3 className="mt-4 text-[20px] font-semibold">{w.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-plum-100/75">{w.body}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* 8 — Featured portfolio */
export function FeaturedWork() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading kicker="Featured work" title="Live websites," accent="real businesses.">
            Swipe or drag through clients I’ve worked with. Tap the front card to open the live site full-screen.
          </SectionHeading>
          <Reveal><Link to="/portfolio/" className="btn-ghost">View portfolio <ArrowUpRight size={16} /></Link></Reveal>
        </div>
        <div className="-mx-5 mt-10 sm:mx-0"><WorkCoverflow /></div>
      </div>
    </section>
  );
}

/* 9 — Industries */
export function Industries() {
  const count = (name: string) => clients.filter((c) => c.industry === name).length;
  return (
    <section className="section pt-0">
      <div className="wrap">
        <SectionHeading kicker="Industries" title="Experience across" accent="nine industries." />
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {industries.map((ind, i) => (
            <Reveal key={ind.name} delay={i * 40}>
              <TiltCard max={10} className="h-full rounded-2xl">
                <div className="glass flex h-full flex-col items-start gap-5 rounded-2xl p-4 sm:flex-row sm:items-center sm:p-5">
                  <div style={{ transform: 'translateZ(30px)' }}><Glyph3D icon={ind.icon} size={50} hue={i % 3 === 0 ? '#FFE34D' : i % 3 === 1 ? '#D9C6F5' : '#FFD84D'} /></div>
                  <div>
                    <p className="text-[15.5px] font-semibold leading-tight sm:text-[17px]">{ind.name}</p>
                    {count(ind.name) > 0 && <p className="mt-1 text-[11.5px] text-plum-200/80">{count(ind.name)} listed client{count(ind.name) > 1 ? 's' : ''}</p>}
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 10 — Results & testimonials */
export function Testimonials() {
  return (
    <section className="section bg-plum-900/40">
      <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,.7fr)_minmax(0,1.3fr)] lg:items-center">
        <div>
          <SectionHeading kicker="Results & testimonials" title="What clients" accent="say about working with me." />
          <Reveal delay={120}>
            <ul className="mt-8 space-y-3 text-[15px] text-plum-100/85">
              {['Visibility gains within weeks (SEO + ads)', 'Quality leads from Google Ads and social', 'Affordable, clear communication', 'Website and campaigns handled end-to-end'].map((x) => (
                <li key={x} className="flex gap-3"><Check size={18} className="mt-0.5 flex-none text-banana" />{x}</li>
              ))}
            </ul>
          </Reveal>
        </div>
        <Reveal delay={100}><TestimonialSlider /></Reveal>
      </div>
    </section>
  );
}

/* 11 — Calculator */
export function Calculator() {
  return (
    <section id="calculator" className="section scroll-mt-20">
      <div className="wrap">
        <SectionHeading kicker="Interactive budget planner" title="Plan your marketing budget" accent="in under a minute.">
          Tell me about your business and budget. The planner suggests a channel split, a first-month action plan and the matching PAIDLANCER package — clearly labelled as an indicative starting point.
        </SectionHeading>
        <div className="mt-12"><BudgetCalculator /></div>
      </div>
    </section>
  );
}

/* 12 — Process */
export function Process() {
  return (
    <section className="section overflow-hidden">
      <div className="wrap">
        <SectionHeading kicker="My working process" title="Six steps," accent="no guesswork." />
        <ol className="mt-14 grid gap-px overflow-hidden rounded-[22px] border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {process.map((p, i) => (
            <Reveal as="li" key={p.title} delay={(i % 3) * 90} className="group relative bg-plum-950 p-7 transition hover:bg-plum-900 sm:p-9">
              <span className="display text-[72px] leading-none text-transparent [-webkit-text-stroke:1px_rgba(217,198,245,.35)] transition group-hover:[-webkit-text-stroke:1px_#FFE34D]">{i + 1}</span>
              <h3 className="mt-4 text-[20px] font-semibold">{p.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-plum-100/75">{p.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* 13 — Blog */
export function BlogTeaser() {
  return (
    <section className="section pt-0">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading kicker="From the blog" title="Practical guides," accent="no fluff." />
          <Reveal><Link to="/blog/" className="btn-ghost">All articles <ArrowUpRight size={16} /></Link></Reveal>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {posts.slice(0, 3).map((p, i) => (
            <Reveal key={p.slug} delay={i * 90}><BlogCard post={p} /></Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 14 — FAQ */
export function Faq() {
  return (
    <section className="section bg-plum-900/40">
      <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)]">
        <SectionHeading kicker="FAQ" title="Questions" accent="clients usually ask.">
          Can’t find yours? <a className="text-banana underline underline-offset-4" href={waLink('Hi Raju, I have a question:')} target="_blank" rel="noopener noreferrer">Ask me on WhatsApp</a>.
        </SectionHeading>
        <Reveal delay={100}><FaqAccordion items={faqs} /></Reveal>
      </div>
    </section>
  );
}

/* 15 — Final CTA */
export function FinalCta() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="noise relative overflow-hidden rounded-[30px] border border-white/10" style={{ background: 'radial-gradient(ellipse 70% 90% at 75% 60%, #8D55D5, #54228B 45%, #30105F 85%)' }}>
          <div className="grid items-end gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,.8fr)]">
            <div className="relative z-[1] p-8 sm:p-14">
              <span className="kicker">Free consultation</span>
              <h2 className="display mt-5 text-[clamp(40px,5.6vw,78px)]">
                Ready to grow?
                <span className="serif-i block font-normal text-banana">Let’s talk.</span>
              </h2>
              <p className="lead mt-5 max-w-lg">Tell me about your business. I’ll review your website and marketing and suggest a practical plan — no obligation.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <MagneticButton to="/contact/#book" onClick={() => track('cta_click', { cta: 'final_book' })}>Book a consultation</MagneticButton>
                <a href={waLink('Hi Raju, I’d like a free consultation for my business.')} target="_blank" rel="noopener noreferrer" className="btn-ghost" onClick={() => track('whatsapp_click', { source: 'final_cta' })}>
                  <MessageCircle size={17} /> WhatsApp me
                </a>
              </div>
              <p className="mt-6 flex items-center gap-2 text-[13.5px] text-plum-100/80"><CalendarCheck size={16} className="text-banana" /> In person in Kukatpally, or online anywhere.</p>
            </div>
            <div className="relative mx-auto h-[380px] w-full max-w-[380px] sm:h-[460px]">
              <img src={sayhi} srcSet={`${sayhiSm} 420w, ${sayhi} 613w`} sizes="380px" width={613} height={938} loading="lazy" alt="Raju smiling in a denim jacket, playfully holding a toy water gun" className="absolute bottom-0 left-1/2 h-full w-auto max-w-none -translate-x-1/2 object-contain object-bottom" style={{ WebkitMaskImage: 'linear-gradient(to bottom, #000 85%, transparent)', maskImage: 'linear-gradient(to bottom, #000 85%, transparent)' }} />
              <span className="absolute right-[4%] top-[8%] rotate-6 rounded-2xl rounded-bl-sm bg-banana px-4 py-2 display text-[26px] text-plum-950 shadow-banana">Say hi!</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
