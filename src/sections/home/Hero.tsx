import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronLeft, ChevronRight, MapPin, MessageCircle, Phone, Mail, Search, MousePointerClick, Megaphone, MonitorSmartphone, Sparkles } from 'lucide-react';
import { site } from '../../data/site';
import { clients } from '../../data/content';
import { MagneticButton } from '../../components/ui';
import Particles from '../../components/Particles';
import VoiceIntro from '../../components/VoiceIntro';
import { mailLink, telLink, waLink } from '../../lib/contact';
import { track } from '../../lib/analytics';
import { useCountUp, useMounted } from '../../lib/hooks';
import HeroVideo from '../../components/HeroVideo';

const channels = [
  { key: 'up', label: 'SEO', to: '/seo-services-hyderabad/', icon: Search },
  { key: 'right', label: 'Google Ads', to: '/google-ads-management-hyderabad/', icon: MousePointerClick },
  { key: 'down', label: 'Meta Ads', to: '/meta-ads-management-hyderabad/', icon: Megaphone },
  { key: 'left', label: 'Websites', to: '/website-development-hyderabad/', icon: MonitorSmartphone },
] as const;

const liveClients = clients.filter((c) => c.url);
const ticker = ['SEO', 'Google Ads', 'Meta Ads', 'Websites', 'Shopify', 'Lead Generation', 'Local SEO', 'Social Media', 'Analytics', 'Branding'];

function initials(n: string) {
  return n.split(/\s+/).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
}

function HeroStat({ value, suffix, label, detail }: { value: number; suffix: string; label: string; detail: string }) {
  const mounted = useMounted();
  const v = useCountUp(value, mounted, 1600);
  return (
    <div tabIndex={0} className="group relative rounded-xl border border-white/10 bg-plum-950/30 px-3.5 py-3 outline-none backdrop-blur-sm transition hover:border-banana/50 focus-visible:border-banana">
      <p className="display text-[30px] leading-none text-white">
        {mounted ? v : value}
        <span className="text-banana">{suffix}</span>
      </p>
      <p className="mt-1.5 text-[11.5px] font-medium leading-tight text-plum-200">{label}</p>
      <span role="tooltip" className="pointer-events-none absolute -top-2 left-1/2 z-10 w-max max-w-[200px] -translate-x-1/2 -translate-y-full rounded-lg bg-banana px-3 py-1.5 text-[12px] font-semibold text-plum-950 opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
        {detail}
      </span>
    </div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [channel, setChannel] = useState<number>(-1);
  const [clientIdx, setClientIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [time, setTime] = useState('');
  const mounted = useMounted();

  // Pointer → CSS variables (smoothed with rAF). The loop only runs while something is moving:
  // after pointer input, during a gentle idle orbit on desktop (starts after load), and only while the hero is on screen.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(pointer: fine)').matches;
    let tx = 0, ty = 0.35, cx = 0, cy = 0.35, raf = 0, inside = false, t = 0, lastCh = -2, visible = true, idle = false;
    const head = el.querySelector<HTMLElement>('[data-head]');
    const apply = () => {
      const mag = Math.min(1, Math.hypot(cx, cy));
      const ang = Math.atan2(cy, cx);
      el.style.setProperty('--dx', cx.toFixed(4));
      el.style.setProperty('--dy', cy.toFixed(4));
      el.style.setProperty('--mag', mag.toFixed(4));
      el.style.setProperty('--ang', ang.toFixed(4) + 'rad');
      let ch = -1;
      if (mag > 0.18) {
        const deg = (ang * 180) / Math.PI;
        ch = deg > -135 && deg <= -45 ? 0 : deg > -45 && deg <= 45 ? 1 : deg > 45 && deg <= 135 ? 2 : 3;
      }
      if (ch !== lastCh) {
        lastCh = ch;
        setChannel(ch);
      }
    };
    const tick = () => {
      raf = 0;
      if (!visible) return;
      if (!inside && idle) {
        t += 0.006;
        tx = Math.cos(t) * 0.55;
        ty = Math.sin(t * 1.3) * 0.45;
      }
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      apply();
      const moving = Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001;
      if (moving || (idle && !inside)) raf = requestAnimationFrame(tick);
    };
    const kick = () => { if (!raf && visible) raf = requestAnimationFrame(tick); };
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const hr = head?.getBoundingClientRect();
      const hx = hr ? hr.left + hr.width / 2 : r.left + r.width * 0.55;
      const hy = hr ? hr.top + hr.height / 2 : r.top + r.height * 0.35;
      tx = Math.max(-1, Math.min(1, (e.clientX - hx) / (r.width * 0.42)));
      ty = Math.max(-1, Math.min(1, (e.clientY - hy) / (r.height * 0.5)));
      inside = fine;
      kick();
    };
    const onLeave = () => { inside = false; kick(); };
    el.addEventListener('pointermove', onMove, { passive: true });
    el.addEventListener('pointerdown', onMove, { passive: true });
    el.addEventListener('pointerleave', onLeave);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) kick(); });
    io.observe(el);
    apply();
    const idleTimer = window.setTimeout(() => { if (fine && !reduced) { idle = true; kick(); } }, 3500);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(idleTimer);
      io.disconnect();
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerdown', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  // Client carousel
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setClientIdx((i) => (i + 1) % liveClients.length), 4500);
    return () => clearInterval(id);
  }, [paused]);

  // IST clock
  useEffect(() => {
    const fmt = () => setTime(new Intl.DateTimeFormat('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata' }).format(new Date()));
    fmt();
    const id = setInterval(fmt, 30000);
    return () => clearInterval(id);
  }, []);

  const client = liveClients[clientIdx];
  const ch = channel >= 0 ? channels[channel] : null;
  const month = mounted ? new Intl.DateTimeFormat('en-IN', { month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' }).format(new Date()) : '';

  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      className="noise relative mx-2 mt-2 overflow-hidden rounded-[26px] sm:mx-3 sm:mt-3 sm:rounded-[30px]"
      style={{
        background:
          'radial-gradient(ellipse 55% 65% at 60% 42%, #8D55D5 0%, #54228B 38%, #30105F 70%, #200B45 100%)',
      }}
    >
      {/* Desktop: Raju's video as the hero backdrop (fades into the purple on the left, behind the copy) */}
      <div className="absolute inset-y-0 hidden lg:block" style={{ left: '13%', width: '100%', transform: 'translate3d(calc(var(--dx,0) * -12px), calc(var(--dy,0) * -8px), 0) scale(1.04)', transition: 'transform .1s linear' }}>
        <HeroVideo variant="desktop" className="absolute inset-0" style={{ WebkitMaskImage: 'linear-gradient(to right, transparent 0, #000 22%)', maskImage: 'linear-gradient(to right, transparent 0, #000 22%)' }} />
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block" style={{ background: 'linear-gradient(90deg, #200B45 0%, rgba(32,11,69,.88) 26%, rgba(32,11,69,.35) 44%, rgba(32,11,69,0) 58%), linear-gradient(180deg, rgba(32,11,69,.55) 0%, rgba(32,11,69,0) 18%, rgba(32,11,69,0) 72%, rgba(32,11,69,.75) 100%)' }} />
      <Particles />
      {/* soft spotlight following the pointer */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-60" style={{ background: 'radial-gradient(600px circle at calc(58% + var(--dx,0) * 18%) calc(40% + var(--dy,0) * 14%), rgba(255,227,77,.10), transparent 60%)' }} />

      {/* Left rail */}
      <div aria-hidden="true" className="absolute left-7 top-28 hidden flex-col items-center gap-5 lg:flex">
        <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/60 [transform:rotate(180deg)] [writing-mode:vertical-rl]">Est. 2022 — Hyderabad, IN</span>
        <span className="h-[300px] w-px bg-gradient-to-b from-white/30 to-transparent" />
      </div>

      {/* Floating contact links */}
      <div className="absolute bottom-[76px] left-5 z-10 hidden flex-col gap-1.5 lg:flex">
        {[
          { href: waLink('Hi Raju, I found you on paidlancer.in.'), label: 'WhatsApp', icon: MessageCircle, ev: 'whatsapp_click' },
          { href: telLink, label: 'Call', icon: Phone, ev: 'call_click' },
          { href: mailLink('Project enquiry from paidlancer.in'), label: 'Email', icon: Mail, ev: 'email_click' },
        ].map(({ href, label, icon: Icon, ev }) => (
          <a key={label} href={href} aria-label={label} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" onClick={() => track(ev, { source: 'hero_rail' })} className="grid h-11 w-11 place-items-center rounded-xl border border-white/15 text-white/80 transition hover:border-banana hover:bg-banana hover:text-plum-950">
            <Icon size={17} />
          </a>
        ))}
      </div>

      <div className="relative z-[2] grid gap-6 px-5 pb-[78px] pt-[112px] sm:px-8 lg:min-h-[max(760px,min(100svh,940px))] lg:grid-cols-[minmax(0,1.12fr)_minmax(0,1fr)_minmax(0,.72fr)] lg:pl-[104px] lg:pr-8 lg:pt-[118px] lg:pb-[60px]">
        {/* COPY */}
        <div className="flex flex-col justify-center gap-6 lg:pb-8">
          <p className="chip w-fit">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inset-0 animate-ping2 rounded-full bg-banana" />
              <span className="relative h-2 w-2 rounded-full bg-banana" />
            </span>
            Available for new projects{month && <span className="text-plum-200"> · {month}</span>}
          </p>
          <h1 id="hero-title" className="display text-[clamp(42px,4.3vw,66px)] leading-[0.92]">
            <span className="block">Best Digital Marketing</span>
            <span className="block">Freelancer</span>
            <span className="serif-i block text-[1.26em] leading-[0.9] text-banana">in Hyderabad.</span>
          </h1>
          <p className="text-[19px] font-semibold text-white/95">Turning business ideas into digital growth.</p>
          <p className="max-w-[470px] text-[15.5px] leading-relaxed text-plum-100/85">
            I’m <strong className="font-semibold text-white">Peddiraju Bikkavolu</strong>, a Hyderabad-based digital marketing freelancer helping startups, small businesses and growing brands build powerful online identities, generate quality leads and increase sales through performance-driven digital strategies.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <MagneticButton to="/contact/" onClick={() => track('cta_click', { cta: 'hero_grow' })}>Let’s Grow Your Business</MagneticButton>
            <MagneticButton to="/portfolio/" variant="ghost" onClick={() => track('cta_click', { cta: 'hero_work' })}>Explore My Work</MagneticButton>
          </div>
          <div className="grid max-w-[470px] grid-cols-3 gap-2.5 pt-1">
            {site.stats.slice(0, 3).map((s) => (
              <HeroStat key={s.label} {...s} />
            ))}
          </div>
        </div>

        {/* STAGE */}
        <div className="relative mx-auto flex h-[460px] w-full max-w-[520px] items-end justify-center sm:h-[540px] lg:h-auto lg:max-w-none" style={{ perspective: '1200px' }}>
          {/* Mobile / tablet: the video sits in its own framed stage */}
          <HeroVideo variant="mobile" className="absolute inset-0 rounded-[22px] border border-white/10 lg:hidden" style={{ WebkitMaskImage: 'linear-gradient(to bottom, #000 80%, transparent)', maskImage: 'linear-gradient(to bottom, #000 80%, transparent)' }} />
          <span data-head aria-hidden="true" className="absolute left-1/2 top-[22%] h-1 w-1" />

          {/* voice note */}
          <div className="absolute bottom-[96px] left-1/2 z-[4] -translate-x-1/2 lg:bottom-[124px] lg:left-[6%] lg:translate-x-0">
            <VoiceIntro />
          </div>

          {/* identity tag */}
          <div className="glass-strong glow-border absolute bottom-6 left-1/2 z-[3] w-max -translate-x-1/2 rounded-2xl px-4 py-3 lg:bottom-10 lg:left-[6%] lg:translate-x-0" style={{ transform: undefined }}>
            <p className="flex items-center gap-2 text-[15px] font-semibold">
              {site.owner.name}
              <Sparkles size={14} className="text-banana" aria-hidden="true" />
            </p>
            <p className="mt-0.5 flex items-center gap-1.5 text-[12.5px] text-plum-200">
              Digital Marketing Freelancer · <MapPin size={12} aria-hidden="true" /> Kukatpally, HYD
            </p>
          </div>
        </div>

        {/* CARDS */}
        <div className="flex flex-col gap-4 sm:flex-row lg:flex-col lg:items-end lg:justify-between lg:pb-2">
          {/* Growth radar */}
          <div className="glass hidden w-full rounded-2xl p-4 sm:block lg:w-[252px]">
            <div className="flex items-center justify-between gap-2 whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.12em]">
              <span className="flex items-center gap-2 text-white/85">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-banana" aria-hidden="true" /> Growth radar
              </span>
              <span className="text-banana" suppressHydrationWarning>{time ? `${time} IST` : 'IST'}</span>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <div aria-hidden="true" className="relative h-[96px] w-[96px] flex-none rounded-full border border-white/20 bg-white/[0.03]">
                <div className="absolute inset-[24%] rounded-full border border-white/10" />
                <div className="absolute inset-x-0 top-1/2 h-px bg-white/12" />
                <div className="absolute inset-y-0 left-1/2 w-px bg-white/12" />
                <span className="absolute left-1/2 top-1 -translate-x-1/2 text-[7px] font-bold text-white/70">SEO</span>
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[7px] font-bold text-white/70">META</span>
                <span className="absolute left-1 top-1/2 -translate-y-1/2 text-[7px] font-bold text-white/70">WEB</span>
                <span className="absolute right-1 top-1/2 -translate-y-1/2 text-[7px] font-bold text-white/70">ADS</span>
                <div className="absolute left-1/2 top-1/2 h-px origin-left bg-banana/70" style={{ width: 'calc(var(--mag,0) * 42%)', transform: 'rotate(var(--ang,0rad))' }} />
                <div className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-banana/25" style={{ left: 'calc(50% + var(--dx,0) * 40%)', top: 'calc(50% + var(--dy,0) * 40%)' }}>
                  <div className="absolute inset-[4px] rounded-full bg-banana shadow-[0_0_12px_#FFE34D]" />
                </div>
                <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] text-plum-200">Focus</p>
                <p className="serif-i text-[27px] leading-[1.02]">{ch ? ch.label : 'Full-funnel'}</p>
              </div>
            </div>
            <div className="mt-3 border-t border-white/10 pt-3">
              <Link to={ch ? ch.to : '/services/'} className="flex items-center justify-between text-[13px] font-semibold text-white hover:text-banana">
                {ch ? `Explore ${ch.label}` : 'Explore all services'} <ArrowUpRight size={15} />
              </Link>
              <p className="mt-1 text-[11.5px] text-plum-200/80">Move your cursor around me ↖</p>
            </div>
          </div>

          {/* Client carousel */}
          <div className="glass w-full rounded-2xl p-2.5 lg:w-[268px]" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} aria-roledescription="carousel" aria-label="Clients">
            <div className="flex items-center gap-3">
              <div aria-hidden="true" className="grid h-[78px] w-[78px] flex-none place-items-center rounded-xl text-[26px] font-black text-banana display" style={{ background: `linear-gradient(150deg, hsl(${268 + (clientIdx % 5) * 6} 55% 48%), #30105F)` }}>
                {initials(client.name)}
              </div>
              <div className="min-w-0" aria-live="polite">
                <span className="rounded-md bg-banana px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-plum-950">
                  CLIENT {String(clientIdx + 1).padStart(2, '0')}
                </span>
                <p className="mt-1.5 truncate text-[16px] font-bold leading-tight display [font-stretch:90%]">{client.name}</p>
                <p className="text-[12px] text-plum-200">{client.industry}</p>
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between pl-1">
              <a href={client.url} target="_blank" rel="noopener noreferrer" className="flex min-h-[40px] items-center gap-1 text-[12.5px] font-semibold text-white/85 hover:text-banana">
                Visit live site <ArrowUpRight size={14} />
              </a>
              <div className="flex gap-1.5">
                <button type="button" aria-label="Previous client" onClick={() => setClientIdx((i) => (i - 1 + liveClients.length) % liveClients.length)} className="grid h-10 w-10 place-items-center rounded-lg border border-white/15 hover:bg-white/10">
                  <ChevronLeft size={16} />
                </button>
                <button type="button" aria-label="Next client" onClick={() => setClientIdx((i) => (i + 1) % liveClients.length)} className="grid h-10 w-10 place-items-center rounded-lg border border-white/15 hover:bg-white/10">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
            <div aria-hidden="true" className="mt-1 h-[3px] overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-banana transition-[width] duration-500" style={{ width: `${((clientIdx + 1) / liveClients.length) * 100}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* scroll indicator */}
      <a href="#intro" aria-label="Scroll to introduction" className="absolute bottom-[58px] left-1/2 z-[3] hidden -translate-x-1/2 flex-col items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70 lg:flex">
        <span className="relative h-8 w-5 rounded-full border border-white/40">
          <span className="absolute left-1/2 top-1.5 h-1.5 w-1 -translate-x-1/2 animate-scrolldot rounded-full bg-banana" />
        </span>
      </a>

      {/* Marquee */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 z-[4] flex h-[46px] items-center overflow-hidden bg-banana text-plum-950">
        <div className="flex w-max animate-marquee items-center whitespace-nowrap">
          {[0, 1, 2, 3].flatMap((k) =>
            ticker.map((t, i) => (
              <span key={`${k}-${i}`} className="flex items-center">
                <span className={i % 2 ? 'serif-i px-6 text-[21px]' : 'display px-6 text-[15px] uppercase tracking-wide [font-stretch:82%]'}>{t}</span>
                <span className="text-[11px]">✦</span>
              </span>
            )),
          )}
        </div>
      </div>
    </section>
  );
}
