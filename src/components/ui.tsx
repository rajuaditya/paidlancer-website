import { useState, type ReactNode, type ElementType, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight, ChevronDown, Search, MousePointerClick, Megaphone, Share2, MonitorSmartphone, Blocks, ShoppingCart,
  Magnet, Palette, Clapperboard, MapPin, LineChart, MessageCircle, Code2, IndianRupee, Compass, BarChart3, Building2,
  HeartPulse, GraduationCap, ShoppingBag, Cpu, UtensilsCrossed, Sofa, Briefcase, Factory, type LucideIcon,
} from 'lucide-react';
import { useCountUp, useInView, useMagnetic, useTilt } from '../lib/hooks';
import { breadcrumbSchema } from '../lib/seo';

export const icons: Record<string, LucideIcon> = {
  Search, MousePointerClick, Megaphone, Share2, MonitorSmartphone, Blocks, ShoppingCart, Magnet, Palette, Clapperboard,
  MapPin, LineChart, MessageCircle, Code2, IndianRupee, Compass, BarChart3, Building2, HeartPulse, GraduationCap,
  ShoppingBag, Cpu, UtensilsCrossed, Sofa, Briefcase, Factory,
};

export function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }: { children: ReactNode; className?: string; delay?: number; as?: ElementType }) {
  const [ref, seen] = useInView<HTMLDivElement>();
  return (
    <Tag ref={ref} className={`reveal ${seen ? 'is-in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
}

export function SectionHeading({ kicker, title, accent, children, center = false, as: H = 'h2' }: { kicker: string; title: ReactNode; accent?: ReactNode; children?: ReactNode; center?: boolean; as?: 'h1' | 'h2' }) {
  return (
    <Reveal className={`max-w-3xl ${center ? 'mx-auto text-center' : ''}`}>
      <span className="kicker">{kicker}</span>
      <H className="h2 mt-5">
        {title} {accent && <span className="serif-i block text-[1.12em] font-normal leading-[0.95] text-banana">{accent}</span>}
      </H>
      {children && <div className={`lead mt-6 ${center ? 'mx-auto' : ''} max-w-2xl`}>{children}</div>}
    </Reveal>
  );
}

type BtnProps = { to: string; children: ReactNode; variant?: 'primary' | 'ghost'; icon?: boolean; className?: string; onClick?: () => void; external?: boolean };

export function MagneticButton({ to, children, variant = 'primary', icon = true, className = '', onClick, external }: BtnProps) {
  const ref = useMagnetic<HTMLAnchorElement>(0.18);
  const cls = `${variant === 'primary' ? 'btn-primary pr-2' : 'btn-ghost'} ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      {icon && (variant === 'primary' ? <span className="btn-icon"><ArrowUpRight size={17} /></span> : <ArrowUpRight size={17} className="opacity-70" />)}
    </>
  );
  if (external || to.startsWith('http') || to.startsWith('mailto') || to.startsWith('tel')) {
    return (
      <a ref={ref} href={to} className={cls} onClick={onClick} target={to.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
        {inner}
      </a>
    );
  }
  return (
    <Link ref={ref} to={to} className={cls} onClick={onClick}>
      {inner}
    </Link>
  );
}

export function Counter({ value, suffix = '', className = '' }: { value: number; suffix?: string; className?: string }) {
  const [ref, seen] = useInView<HTMLSpanElement>({ threshold: 0.4 });
  const v = useCountUp(value, seen);
  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{value}{suffix}</span>
      <span aria-hidden="true">{seen ? v : value}{suffix}</span>
    </span>
  );
}

/** Lightweight CSS-3D icon block: stacked layers + glass face, tilts with the card. */
export function Glyph3D({ icon, hue = '#FFE34D', size = 72 }: { icon: string; hue?: string; size?: number }) {
  const Icon = icons[icon] || Search;
  const s = { width: size, height: size } as CSSProperties;
  return (
    <div className="relative" style={{ ...s, transformStyle: 'preserve-3d' }} aria-hidden="true">
      {[3, 2, 1].map((i) => (
        <div
          key={i}
          className="absolute inset-0 rounded-[22%]"
          style={{ transform: `translate3d(${i * 3}px, ${i * 4}px, -${i * 8}px)`, background: `rgba(84,34,139,${0.35 + i * 0.12})`, border: '1px solid rgba(255,255,255,.06)' }}
        />
      ))}
      <div
        className="absolute inset-0 grid place-items-center rounded-[22%]"
        style={{
          transform: 'translateZ(18px)',
          background: `linear-gradient(145deg, rgba(255,255,255,.22), rgba(141,85,213,.28) 45%, rgba(48,16,95,.85))`,
          border: '1px solid rgba(255,255,255,.22)',
          boxShadow: `inset 0 1px 0 rgba(255,255,255,.35), 0 18px 40px -12px ${hue}55`,
        }}
      >
        <Icon size={size * 0.42} strokeWidth={1.8} style={{ color: hue, filter: `drop-shadow(0 4px 10px ${hue}66)` }} />
      </div>
    </div>
  );
}

export function TiltCard({ children, className = '', max = 6 }: { children: ReactNode; className?: string; max?: number }) {
  const ref = useTilt<HTMLDivElement>(max);
  return (
    <div ref={ref} className={`tilt relative ${className}`}>
      <div className="tilt-shine pointer-events-none absolute inset-0 rounded-[inherit]" />
      {children}
    </div>
  );
}

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-[13px] text-plum-200/80">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((it, i) => (
          <li key={it.path} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden="true" className="text-plum-400">/</span>}
            {i === items.length - 1 ? (
              <span aria-current="page" className="text-white">{it.name}</span>
            ) : (
              <Link to={it.path} className="hover:text-banana">{it.name}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
export const crumbs = breadcrumbSchema;

export function FaqAccordion({ items, defaultOpen = 0 }: { items: { q: string; a: string }[]; defaultOpen?: number }) {
  const [open, setOpen] = useState<number>(defaultOpen);
  return (
    <div className="divide-y divide-white/10 border-y border-white/10">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex w-full items-center justify-between gap-6 py-5 text-left text-[17px] font-semibold text-white transition hover:text-banana"
              >
                <span>{f.q}</span>
                <span className={`grid h-9 w-9 flex-none place-items-center rounded-full border border-white/15 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-banana text-plum-950' : ''}`}>
                  <ChevronDown size={18} />
                </span>
              </button>
            </h3>
            <div id={`faq-${i}`} role="region" className="grid transition-[grid-template-rows] duration-300 ease-out" style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}>
              <div className="overflow-hidden">
                <p className="max-w-3xl pb-6 text-[15.5px] leading-relaxed text-plum-100/80">{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function PageHero({ kicker, title, accent, children, crumbsItems }: { kicker: string; title: ReactNode; accent?: ReactNode; children?: ReactNode; crumbsItems: { name: string; path: string }[] }) {
  return (
    <header className="relative overflow-hidden pb-14 pt-32 sm:pb-20 sm:pt-40">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_70%_0%,rgba(141,85,213,.35),transparent_60%)]" />
      <div className="wrap relative">
        <Breadcrumbs items={crumbsItems} />
        <div className="mt-8">
          <span className="kicker">{kicker}</span>
          <h1 className="display mt-5 max-w-4xl text-[clamp(2.7rem,6.5vw,5.6rem)]">
            {title} {accent && <span className="serif-i block text-[1.08em] font-normal text-banana">{accent}</span>}
          </h1>
          {children && <div className="lead mt-7 max-w-2xl">{children}</div>}
        </div>
      </div>
    </header>
  );
}
