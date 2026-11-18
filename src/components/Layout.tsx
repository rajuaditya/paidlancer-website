import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, X, Home, Layers, Briefcase, PenLine, Send, Phone, Mail, MapPin, MessageCircle, User, IndianRupee, ChevronRight } from 'lucide-react';
import { nav, site } from '../data/site';
import { services } from '../data/services';
import { mailLink, telLink, waLink } from '../lib/contact';
import { initAnalytics, track, trackPageView } from '../lib/analytics';
import WhatsAppAssistant from './WhatsAppAssistant';
import Newsletter from './Newsletter';
import Cursor from './Cursor';
import avatar from '../assets/img/raju-suit-400.webp';

export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link to="/" className={`group flex items-center gap-2.5 ${className}`} aria-label="PAIDLANCER home">
      <svg width="30" height="30" viewBox="0 0 64 64" aria-hidden="true" className="transition-transform duration-500 group-hover:rotate-[-8deg]">
        <rect width="64" height="64" rx="16" fill="#54228B" />
        <path d="M20 48V16h14a10 10 0 0 1 0 20h-6v12z" fill="#FFE34D" />
        <circle cx="46" cy="46" r="4" fill="#D9C6F5" />
      </svg>
      <span className="display text-[20px] font-black tracking-[-0.01em] [font-stretch:88%]">
        PAIDLANCER<span className="text-banana">.</span>
      </span>
    </Link>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const loc = useLocation();
  useEffect(() => setOpen(false), [loc.pathname]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <>
      <header className="no-print fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
        <nav
          aria-label="Main"
          className={`mx-auto flex max-w-[860px] items-center justify-between gap-4 rounded-2xl py-2 pl-4 pr-2 transition-all duration-300 ${scrolled || open ? 'glass-strong shadow-glow' : 'border border-white/10 bg-plum-950/30 backdrop-blur-md'}`}
        >
          <Logo />
          <ul className="hidden items-center gap-7 text-[14px] font-medium md:flex">
            {nav.map((n) => (
              <li key={n.to}>
                <NavLink to={n.to} className={({ isActive }) => `relative py-2 transition hover:text-white ${isActive ? 'text-white' : 'text-white/75'}`}>
                  {({ isActive }) => (
                    <>
                      {n.label}
                      {isActive && <span className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-banana" />}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <Link to="/contact/" className="btn-primary hidden min-h-[42px] rounded-[11px] px-4 text-[14px] shadow-none sm:inline-flex" onClick={() => track('cta_click', { cta: 'nav_lets_talk' })}>
              Let’s talk <ArrowUpRight size={15} />
            </Link>
            <button type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen((o) => !o)} className="grid h-11 w-11 place-items-center rounded-xl border border-white/12 bg-white/5 md:hidden">
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile sheet */}
      <div className={`no-print fixed inset-0 z-40 md:hidden ${open ? 'pointer-events-auto' : 'pointer-events-none'}`} aria-hidden={!open}>
        <div className={`absolute inset-0 bg-plum-950/96 backdrop-blur-xl transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`} onClick={() => setOpen(false)} />
        <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-plum-400/25 blur-3xl" aria-hidden="true" />
        <div className={`relative flex h-full flex-col overflow-y-auto px-4 pb-28 pt-[88px] transition-all duration-500 ${open ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0'}`}>
          {/* mini profile */}
          <div className="glass flex items-center gap-3 rounded-2xl p-3">
            <img src={avatar} alt="" width={44} height={44} className="h-11 w-11 rounded-full object-cover ring-2 ring-banana/70" />
            <div className="min-w-0">
              <p className="truncate text-[14px] font-semibold">Peddiraju Bikkavolu</p>
              <p className="flex items-center gap-1.5 text-[11.5px] text-plum-200"><span className="h-1.5 w-1.5 rounded-full bg-banana" /> Available · Kukatpally, Hyderabad</p>
            </div>
          </div>

          <p className="mb-2 mt-5 px-1 text-[10.5px] font-semibold uppercase tracking-[0.2em] text-plum-200/70">Menu</p>
          <ul className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
            {[
              { label: 'Home', to: '/', sub: 'Start here', icon: Home },
              { label: 'About', to: '/about/', sub: 'My story & skills', icon: User },
              { label: 'Services', to: '/services/', sub: 'SEO, ads, websites', icon: Layers },
              { label: 'Work', to: '/portfolio/', sub: 'Clients & live sites', icon: Briefcase },
              { label: 'Pricing', to: '/pricing/', sub: 'Packages from ₹4,999', icon: IndianRupee },
              { label: 'Blog', to: '/blog/', sub: 'Practical guides', icon: PenLine },
              { label: 'Contact', to: '/contact/', sub: 'Book a free consultation', icon: Send },
            ].map(({ label, to, sub, icon: Icon }, i) => (
              <li key={to} style={{ transitionDelay: `${open ? 60 + i * 35 : 0}ms` }} className={`border-b border-white/[0.07] transition-all duration-500 last:border-0 ${open ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'}`}>
                <NavLink to={to} end={to === '/'} tabIndex={open ? 0 : -1} className="group flex min-h-[56px] items-center gap-3 px-3 py-2">
                  {({ isActive }) => (
                    <>
                      <span className={`grid h-9 w-9 flex-none place-items-center rounded-xl transition ${isActive ? 'bg-banana text-plum-950' : 'bg-white/[0.06] text-plum-100'}`}><Icon size={17} /></span>
                      <span className="min-w-0 flex-1">
                        <span className={`block text-[15.5px] font-semibold leading-tight ${isActive ? 'text-banana' : 'text-white'}`}>{label}</span>
                        <span className="block text-[11.5px] text-plum-200/75">{sub}</span>
                      </span>
                      <ChevronRight size={17} className={`flex-none transition ${isActive ? 'text-banana' : 'text-white/35 group-active:translate-x-0.5'}`} />
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="mt-4 grid grid-cols-2 gap-2.5">
            <a tabIndex={open ? 0 : -1} href={waLink('Hi Raju, I found you on paidlancer.in and would like to discuss my business.')} target="_blank" rel="noopener noreferrer" className="btn-primary min-h-[46px] text-[14px]" onClick={() => track('whatsapp_click', { source: 'mobile_menu' })}>
              <MessageCircle size={17} /> WhatsApp
            </a>
            <a tabIndex={open ? 0 : -1} href={telLink} className="btn-ghost min-h-[46px] text-[14px]" onClick={() => track('call_click', { source: 'mobile_menu' })}>
              <Phone size={17} /> Call
            </a>
          </div>
          <a tabIndex={open ? 0 : -1} href={mailLink('Project enquiry from paidlancer.in')} className="mt-3 flex items-center justify-center gap-2 text-[12.5px] text-plum-200" onClick={() => track('email_click', { source: 'mobile_menu' })}>
            <Mail size={14} /> {site.email}
          </a>
        </div>
      </div>
    </>
  );
}

function MobileDock() {
  const items = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/services/', label: 'Services', icon: Layers },
    { to: '/portfolio/', label: 'Work', icon: Briefcase },
    { to: '/blog/', label: 'Blog', icon: PenLine },
    { to: '/contact/', label: 'Contact', icon: Send },
  ];
  return (
    <nav aria-label="Quick navigation" className="no-print fixed inset-x-3 bottom-3 z-40 md:hidden" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <ul className="glass-strong grid grid-cols-5 rounded-2xl px-1 py-1.5 shadow-glow">
        {items.map(({ to, label, icon: Icon }) => (
          <li key={to}>
            <NavLink to={to} end={to === '/'} className={({ isActive }) => `flex min-h-[48px] flex-col items-center justify-center gap-1 rounded-xl text-[10.5px] font-medium transition ${isActive ? 'bg-white/10 text-banana' : 'text-white/70'}`}>
              <Icon size={19} strokeWidth={2} />
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        setP(h > 0 ? window.scrollY / h : 0);
      });
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return <div aria-hidden="true" className="no-print fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-plum-400 via-banana to-banana" style={{ transform: `scaleX(${p})` }} />;
}

function Footer() {
  const year = 2026;
  return (
    <footer className="no-print relative mt-10 overflow-hidden border-t border-white/10 bg-plum-950 pb-28 pt-20 md:pb-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_80%_100%,rgba(84,34,139,.55),transparent_60%)]" />
      <div className="wrap relative">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-plum-100/75">
              {site.owner.name} — digital marketing freelancer in Hyderabad. SEO, Google Ads, Meta Ads, social media and websites for businesses that want measurable growth.
            </p>
            <ul className="mt-6 space-y-3 text-[14.5px]">
              <li><a href={telLink} className="flex items-center gap-3 text-white/85 hover:text-banana" onClick={() => track('call_click', { source: 'footer' })}><Phone size={16} className="text-banana" /> {site.phone}</a></li>
              <li><a href={mailLink('Project enquiry from paidlancer.in')} className="flex items-center gap-3 break-all text-white/85 hover:text-banana" onClick={() => track('email_click', { source: 'footer' })}><Mail size={16} className="flex-none text-banana" /> {site.email}</a></li>
              <li className="flex items-start gap-3 text-white/75"><MapPin size={16} className="mt-1 flex-none text-banana" /> {site.address.street}, Kukatpally, Hyderabad, Telangana</li>
            </ul>
          </div>
          <div>
            <h2 className="text-[12px] font-semibold uppercase tracking-[0.2em] text-plum-200">Services</h2>
            <ul className="mt-5 space-y-2.5 text-[14.5px]">
              {services.slice(0, 8).map((s) => (
                <li key={s.slug}><Link to={s.path} className="text-white/75 hover:text-banana">{s.name.replace(' in Hyderabad', '')}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-[12px] font-semibold uppercase tracking-[0.2em] text-plum-200">Explore</h2>
            <ul className="mt-5 space-y-2.5 text-[14.5px]">
              {[
                ['About Raju', '/about/'], ['Portfolio', '/portfolio/'], ['Pricing', '/pricing/'], ['Blog', '/blog/'],
                ['Resume', '/resume/'], ['Website Growth Analyzer', '/website-growth-analyzer/'], ['Kukatpally', '/digital-marketing-freelancer-kukatpally/'], ['Contact', '/contact/'],
              ].map(([l, to]) => (
                <li key={to}><Link to={to} className="text-white/75 hover:text-banana">{l}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-[12px] font-semibold uppercase tracking-[0.2em] text-plum-200">Marketing notes, monthly</h2>
            <p className="mt-5 text-[14.5px] text-plum-100/75">Practical tips on SEO, ads and websites. No spam — one email a month at most.</p>
            <Newsletter />
          </div>
        </div>
        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-end">
          <p className="display text-[clamp(3.2rem,11vw,8.5rem)] leading-[0.8] text-white/[0.07]" aria-hidden="true">PAIDLANCER</p>
          <p className="text-[13px] text-plum-200/70">© {year} {site.brand} · {site.owner.name}. Results vary by business; no rankings or outcomes are guaranteed.</p>
        </div>
      </div>
    </footer>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  const loc = useLocation();
  // Fade between pages, but never on the first paint (keeps LCP fast).
  const firstPath = useRef(loc.pathname);
  const animate = loc.pathname !== firstPath.current;
  useEffect(() => {
    initAnalytics();
  }, []);
  useEffect(() => {
    trackPageView(loc.pathname);
    if (loc.hash) {
      const el = document.getElementById(loc.hash.slice(1));
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [loc.pathname, loc.hash]);

  return (
    <>
      <a href="#main" className="sr-only z-[70] rounded-lg bg-banana px-4 py-2 font-semibold text-plum-950 focus:not-sr-only focus:fixed focus:left-3 focus:top-3">Skip to content</a>
      <ScrollProgress />
      <Navbar />
      <main id="main" key={loc.pathname} className={animate ? 'animate-fadeup' : undefined}>
        {children}
      </main>
      <Footer />
      <MobileDock />
      <WhatsAppAssistant />
      <Cursor />
    </>
  );
}
