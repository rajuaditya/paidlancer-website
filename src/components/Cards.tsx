import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronLeft, ChevronRight, Quote, Search, MousePointerClick, Megaphone, MapPin, MonitorSmartphone, Lightbulb, Share2, ShoppingCart, FileText } from 'lucide-react';
import { testimonials, type Client } from '../data/content';
import { categoryName, readingTime, type Post } from '../data/blog';
import { TiltCard } from './ui';

const catIcon: Record<string, typeof Search> = {
  seo: Search, 'google-ads': MousePointerClick, 'meta-ads': Megaphone, 'local-seo': MapPin, 'website-development': MonitorSmartphone,
  'digital-marketing-tips': Lightbulb, 'social-media-marketing': Share2, 'ecommerce-marketing': ShoppingCart, 'case-studies': FileText,
};

/** Designed cover (no stock photos). */
export function ArticleCover({ post, large = false }: { post: Post; large?: boolean }) {
  const Icon = catIcon[post.category] || Lightbulb;
  const seed = post.slug.length % 5;
  return (
    <div role="img" aria-label={post.coverAlt} className={`relative overflow-hidden ${large ? 'aspect-[16/9] sm:aspect-[3/1] rounded-[22px]' : 'aspect-[16/10] rounded-2xl'}`} style={{ background: `radial-gradient(ellipse 80% 90% at ${20 + seed * 15}% 0%, #8D55D5, #54228B 45%, #30105F 80%)` }}>
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      <div className="absolute -right-6 -top-6 h-40 w-40 rounded-full bg-banana/20 blur-2xl" />
      <div className="absolute bottom-0 right-0 p-5">
        <div className="grid h-16 w-16 place-items-center rounded-2xl border border-white/25 bg-white/10 backdrop-blur" style={{ transform: 'rotate(-8deg)' }}>
          <Icon size={30} className="text-banana" />
        </div>
      </div>
      <p className={`absolute left-5 top-5 max-w-[78%] display text-white/95 ${large ? 'text-[clamp(26px,4.4vw,60px)] leading-[0.95]' : 'text-[19px]'}`}>{post.title.split(' – ')[0].split(':')[0]}</p>
      <span className="absolute bottom-5 left-5 rounded-md bg-banana px-2 py-1 text-[11px] font-bold text-plum-950">{categoryName(post.category)}</span>
    </div>
  );
}

export function BlogCard({ post }: { post: Post }) {
  return (
    <article className="group">
      <Link to={`/blog/${post.slug}/`} className="block">
        <TiltCard max={5} className="rounded-2xl">
          <ArticleCover post={post} />
        </TiltCard>
        <div className="mt-4 flex items-center gap-3 text-[12.5px] text-plum-200">
          <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</time>
          <span aria-hidden="true">·</span>
          <span>{readingTime(post)} min read</span>
        </div>
        <h3 className="mt-2 text-[19px] font-semibold leading-snug text-white transition group-hover:text-banana">{post.title}</h3>
        <p className="mt-2 line-clamp-2 text-[14.5px] leading-relaxed text-plum-100/75">{post.excerpt}</p>
      </Link>
    </article>
  );
}

export function TestimonialSlider() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setI((x) => (x + 1) % testimonials.length), 6500);
    return () => clearInterval(id);
  }, [paused]);
  const t = testimonials[i];
  return (
    <div className="glass glow-border relative rounded-[24px] p-7 sm:p-12" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} aria-roledescription="carousel" aria-label="Client testimonials">
      <Quote size={56} className="absolute right-8 top-8 text-banana/20" aria-hidden="true" />
      <figure key={i} className="animate-fadeup" aria-live="polite">
        <blockquote className="serif-i max-w-3xl text-[clamp(26px,3.4vw,44px)] leading-[1.15] text-white">“{t.quote}”</blockquote>
        <figcaption className="mt-8 flex items-center gap-4">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-banana display text-[18px] text-plum-950" aria-hidden="true">{t.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}</span>
          <span>
            <span className="block font-semibold">{t.name}</span>
            <span className="block text-[14px] text-plum-200">{t.role}</span>
          </span>
        </figcaption>
      </figure>
      <div className="mt-10 flex items-center justify-between gap-4">
        <div className="flex gap-1.5" aria-hidden="true">
          {testimonials.map((_, k) => (
            <span key={k} className={`h-1 rounded-full transition-all duration-500 ${k === i ? 'w-10 bg-banana' : 'w-4 bg-white/25'}`} />
          ))}
        </div>
        <div className="flex gap-2">
          <button type="button" aria-label="Previous testimonial" onClick={() => setI((i - 1 + testimonials.length) % testimonials.length)} className="grid h-11 w-11 place-items-center rounded-xl border border-white/15 hover:bg-white/10"><ChevronLeft size={18} /></button>
          <button type="button" aria-label="Next testimonial" onClick={() => setI((i + 1) % testimonials.length)} className="grid h-11 w-11 place-items-center rounded-xl border border-white/15 hover:bg-white/10"><ChevronRight size={18} /></button>
        </div>
      </div>
      <p className="mt-6 text-[12px] text-plum-200/60">Testimonials as published on the original paidlancer.in.</p>
    </div>
  );
}

export function ClientCard({ c, onPreview }: { c: Client; onPreview?: (c: Client) => void }) {
  const host = c.url ? new URL(c.url).hostname.replace(/^www\./, '') : null;
  const ini = c.name.split(/\s+/).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
  return (
    <TiltCard max={6} className="rounded-2xl">
      <article className="glass group overflow-hidden rounded-2xl">
        <div className="flex items-center gap-1.5 border-b border-white/10 bg-plum-950/50 px-3 py-2" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-white/25" /><span className="h-2 w-2 rounded-full bg-white/25" /><span className="h-2 w-2 rounded-full bg-banana/70" />
          <span className="ml-2 truncate rounded bg-white/5 px-2 py-0.5 text-[11px] text-plum-200">{host || 'private project'}</span>
        </div>
        {c.screenshot ? (
          <img src={c.screenshot} alt={`${c.name} website`} loading="lazy" className="aspect-[16/10] w-full object-cover object-top" />
        ) : (
          <div className="relative grid aspect-[16/10] place-items-center overflow-hidden" style={{ background: `linear-gradient(150deg, hsl(${262 + (c.name.length % 6) * 6} 52% ${36 + (c.name.length % 3) * 5}%), #200B45)` }}>
            <span className="display text-[64px] text-white/90 transition-transform duration-500 group-hover:scale-110">{ini}</span>
            <span className="absolute bottom-3 right-3 h-10 w-10 rounded-full bg-banana/30 blur-xl" />
          </div>
        )}
        <div className="p-4">
          <p className="text-[12px] font-medium text-banana">{c.industry}</p>
          <h3 className="mt-1 text-[17px] font-semibold">{c.name}</h3>
          {c.categories.length > 0 && <p className="mt-1 text-[12.5px] text-plum-200">{c.categories.join(' · ')}</p>}
          <div className="mt-3 flex gap-2">
            {c.url && onPreview && (
              <button type="button" onClick={() => onPreview(c)} className="min-h-[40px] rounded-lg border border-white/15 px-3 text-[13px] font-semibold hover:bg-white/10">Preview</button>
            )}
            {c.url && (
              <a href={c.url} target="_blank" rel="noopener noreferrer" className="flex min-h-[40px] items-center gap-1 rounded-lg px-3 text-[13px] font-semibold text-white/85 hover:text-banana">
                Live site <ArrowUpRight size={14} />
              </a>
            )}
          </div>
        </div>
      </article>
    </TiltCard>
  );
}
