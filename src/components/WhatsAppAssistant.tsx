import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MessageCircle, X, ArrowUpRight, Phone, Mail } from 'lucide-react';
import { site } from '../data/site';
import { mailLink, telLink, waLink } from '../lib/contact';
import { track } from '../lib/analytics';
import avatar from '../assets/img/raju-suit-400.webp';

const options = [
  { label: 'SEO Services', msg: 'I’d like to improve my Google rankings with SEO.' },
  { label: 'Google Ads', msg: 'I want to run Google Ads to get enquiries.' },
  { label: 'Meta Ads', msg: 'I want to run Facebook / Instagram ads for leads or sales.' },
  { label: 'Website Development', msg: 'I need a new website (or a redesign).' },
  { label: 'E-commerce Website', msg: 'I want to build an online store (Shopify / WooCommerce).' },
  { label: 'Complete Digital Marketing', msg: 'I’m looking for complete digital marketing for my business.' },
];

export default function WhatsAppAssistant() {
  const [open, setOpen] = useState(false);
  const [picked, setPicked] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [biz, setBiz] = useState('');
  const [show, setShow] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    const on = () => setShow(window.scrollY > 520 || pathname !== '/');
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, [pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const message = [
    `Hi Raju${name ? `, I’m ${name}` : ''}${biz ? ` from ${biz}` : ''}.`,
    picked !== null ? options[picked].msg : 'I’d like to discuss digital marketing for my business.',
    '(Sent from paidlancer.in)',
  ].join(' ');

  return (
    <div className={`no-print fixed bottom-[92px] right-4 z-50 transition-all duration-500 md:bottom-6 md:right-6 ${show || open ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'}`}>
      {open && (
        <div role="dialog" aria-label="WhatsApp enquiry assistant" className="glass-strong glow-border absolute bottom-[72px] right-0 w-[min(360px,calc(100vw-2rem))] origin-bottom-right animate-fadeup rounded-2xl p-4 shadow-glow">
          <div className="flex items-center gap-3">
            <img src={avatar} alt="Peddiraju Bikkavolu" width={44} height={44} className="h-11 w-11 rounded-full object-cover ring-2 ring-banana/70" />
            <div className="min-w-0">
              <p className="text-[15px] font-semibold">Raju · PAIDLANCER</p>
              <p className="text-[12.5px] text-plum-200">Pick a topic — I’ll reply on WhatsApp.</p>
            </div>
            <button type="button" aria-label="Close assistant" onClick={() => setOpen(false)} className="ml-auto grid h-10 w-10 place-items-center rounded-lg hover:bg-white/10">
              <X size={18} />
            </button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {options.map((o, i) => (
              <button
                key={o.label}
                type="button"
                aria-pressed={picked === i}
                onClick={() => setPicked(i)}
                className={`min-h-[40px] rounded-full border px-3.5 text-[13px] font-medium transition ${picked === i ? 'border-banana bg-banana text-plum-950' : 'border-white/15 bg-white/5 text-white hover:border-white/35'}`}
              >
                {o.label}
              </button>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <label className="sr-only" htmlFor="wa-name">Your name</label>
            <input id="wa-name" className="field py-2.5 text-[14px]" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
            <label className="sr-only" htmlFor="wa-biz">Business</label>
            <input id="wa-biz" className="field py-2.5 text-[14px]" placeholder="Business" value={biz} onChange={(e) => setBiz(e.target.value)} />
          </div>
          <p className="mt-3 rounded-xl bg-plum-950/70 p-3 text-[13px] leading-relaxed text-plum-100/85">“{message}”</p>
          <a
            href={waLink(message)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track('whatsapp_click', { source: 'assistant', topic: picked !== null ? options[picked].label : 'general' })}
            className="btn-primary mt-3 w-full"
          >
            Open WhatsApp <ArrowUpRight size={17} />
          </a>
          <div className="mt-3 flex justify-between text-[12.5px] text-plum-200">
            <a href={telLink} className="flex min-h-[32px] items-center gap-1.5 hover:text-banana" onClick={() => track('call_click', { source: 'assistant' })}><Phone size={14} /> {site.phone}</a>
            <a href={mailLink('Enquiry from paidlancer.in', message)} className="flex min-h-[32px] items-center gap-1.5 hover:text-banana" onClick={() => track('email_click', { source: 'assistant' })}><Mail size={14} /> Email</a>
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? 'Close WhatsApp assistant' : 'Chat with Raju on WhatsApp'}
        className="group relative grid h-14 w-14 place-items-center rounded-full bg-banana text-plum-950 shadow-banana transition hover:-translate-y-0.5"
      >
        {!open && <span className="absolute inset-0 animate-ping2 rounded-full bg-banana/60" aria-hidden="true" />}
        {open ? <X size={24} /> : <MessageCircle size={26} strokeWidth={2.2} />}
      </button>
    </div>
  );
}
