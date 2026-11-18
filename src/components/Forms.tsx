import { useState, type FormEvent } from 'react';
import { ArrowLeft, ArrowRight, Check, Mail, MessageCircle, Send } from 'lucide-react';
import { services } from '../data/services';
import { hasFormBackend, mailLink, submitForm, waLink } from '../lib/contact';
import { track } from '../lib/analytics';

/* ---------------- Interactive project discovery ---------------- */
const steps = [
  { key: 'business', q: 'What business do you run?', multi: false, opts: ['Real estate', 'Healthcare / clinic', 'Education / training', 'E-commerce / retail', 'IT / B2B', 'Restaurant / café', 'Interior design', 'Consulting / services', 'Manufacturing', 'Something else'] },
  { key: 'services', q: 'What services do you need?', multi: true, opts: ['SEO', 'Google Ads', 'Meta Ads', 'Social media', 'New website', 'Website redesign', 'Shopify store', 'Graphic design / video', 'Not sure — advise me'] },
  { key: 'budget', q: 'What is your monthly budget (fees + ads)?', multi: false, opts: ['Under ₹15,000', '₹15,000 – ₹30,000', '₹30,000 – ₹60,000', '₹60,000 – ₹1,50,000', 'Above ₹1,50,000', 'One-time project only'] },
  { key: 'goal', q: 'What is your main goal?', multi: false, opts: ['More leads / enquiries', 'More online sales', 'Rank higher on Google', 'Build brand awareness', 'Launch a new business', 'Fix what isn’t working'] },
  { key: 'contact', q: 'How should I contact you?', multi: false, opts: ['WhatsApp', 'Phone call', 'Email', 'Video meeting', 'Meet in Kukatpally'] },
] as const;

type Answers = Record<string, string[]>;

export function DiscoveryWizard() {
  const [step, setStep] = useState(0);
  const [a, setA] = useState<Answers>({});
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const done = step >= steps.length;
  const cur = steps[Math.min(step, steps.length - 1)];
  const sel = a[cur.key] || [];

  const pick = (o: string) => {
    if (cur.multi) setA({ ...a, [cur.key]: sel.includes(o) ? sel.filter((x) => x !== o) : [...sel, o] });
    else {
      setA({ ...a, [cur.key]: [o] });
      setTimeout(() => setStep((s) => s + 1), 180);
    }
  };

  const summary = [
    `Hi Raju${name ? `, this is ${name}` : ''}. Here’s my project brief from paidlancer.in:`,
    `• Business: ${a.business?.join(', ') || '—'}`,
    `• Services: ${a.services?.join(', ') || '—'}`,
    `• Budget: ${a.budget?.join(', ') || '—'}`,
    `• Main goal: ${a.goal?.join(', ') || '—'}`,
    `• Preferred contact: ${a.contact?.join(', ') || '—'}`,
  ].join('\n');

  async function sendBackend() {
    setStatus('sending');
    try {
      await submitForm('discovery', { name, ...Object.fromEntries(Object.entries(a).map(([k, v]) => [k, v.join(', ')])) });
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="glass glow-border rounded-[24px] p-6 sm:p-9">
      <div className="flex items-center justify-between text-[13px] text-plum-200">
        <span>{done ? 'Your summary' : `Step ${step + 1} of ${steps.length}`}</span>
        {step > 0 && (
          <button type="button" onClick={() => setStep((s) => s - 1)} className="flex min-h-[40px] items-center gap-1.5 hover:text-white"><ArrowLeft size={15} /> Back</button>
        )}
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10" aria-hidden="true">
        <div className="h-full rounded-full bg-banana transition-all duration-500" style={{ width: `${(Math.min(step, steps.length) / steps.length) * 100}%` }} />
      </div>

      {!done ? (
        <fieldset key={cur.key} className="mt-8 animate-fadeup">
          <legend className="display text-[clamp(26px,3vw,38px)]">{cur.q}</legend>
          {cur.multi && <p className="mt-2 text-[14px] text-plum-200">Choose all that apply.</p>}
          <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
            {cur.opts.map((o) => {
              const on = sel.includes(o);
              return (
                <button key={o} type="button" aria-pressed={on} onClick={() => pick(o)} className={`flex min-h-[52px] items-center justify-between gap-3 rounded-xl border px-4 text-left text-[15px] font-medium transition ${on ? 'border-banana bg-banana text-plum-950' : 'border-white/12 bg-white/[0.03] hover:border-white/35'}`}>
                  {o} {on && <Check size={17} />}
                </button>
              );
            })}
          </div>
          {cur.multi && (
            <button type="button" disabled={!sel.length} onClick={() => setStep((s) => s + 1)} className="btn-primary mt-6 disabled:opacity-40">
              Continue <ArrowRight size={17} />
            </button>
          )}
        </fieldset>
      ) : (
        <div className="mt-8 animate-fadeup">
          <h3 className="display text-[clamp(26px,3vw,38px)]">Here’s your enquiry summary</h3>
          <dl className="mt-6 divide-y divide-white/10 rounded-2xl border border-white/10">
            {steps.map((s, i) => (
              <div key={s.key} className="flex flex-col gap-1 p-4 sm:flex-row sm:items-center sm:justify-between">
                <dt className="text-[13px] text-plum-200">{s.q}</dt>
                <dd className="flex items-center gap-3 text-[15px] font-semibold">{a[s.key]?.join(', ') || '—'}<button type="button" onClick={() => setStep(i)} className="text-[12.5px] font-normal text-banana underline underline-offset-2">Edit</button></dd>
              </div>
            ))}
          </dl>
          <label htmlFor="disc-name" className="label mt-6">Your name (optional)</label>
          <input id="disc-name" className="field" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
          {status === 'sent' ? (
            <p role="status" className="mt-6 rounded-xl bg-banana/15 p-4 text-[15px] text-banana">Received by my inbox. I’ll get back to you via {a.contact?.[0] || 'your preferred method'} soon.</p>
          ) : (
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href={waLink(summary)} target="_blank" rel="noopener noreferrer" className="btn-primary" onClick={() => track('form_submit', { form: 'discovery', via: 'whatsapp' })}>
                <MessageCircle size={17} /> Send via WhatsApp
              </a>
              <a href={mailLink('Project brief from paidlancer.in', summary)} className="btn-ghost" onClick={() => track('form_submit', { form: 'discovery', via: 'email' })}>
                <Mail size={17} /> Send by email
              </a>
              {hasFormBackend && (
                <button type="button" onClick={sendBackend} disabled={status === 'sending'} className="btn-ghost">
                  <Send size={17} /> {status === 'sending' ? 'Sending…' : 'Submit here'}
                </button>
              )}
            </div>
          )}
          {status === 'error' && <p role="alert" className="mt-3 text-[14px] text-banana">That didn’t go through. Please use WhatsApp or email instead.</p>}
        </div>
      )}
    </div>
  );
}

/* ---------------- Consultation booking ---------------- */
type Booking = { name: string; email: string; phone: string; business: string; service: string; date: string; message: string };
const empty: Booking = { name: '', email: '', phone: '', business: '', service: '', date: '', message: '' };

export function BookingForm() {
  const [f, setF] = useState<Booking>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Booking, string>>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const today = new Date().toISOString().slice(0, 10);
  const set = (k: keyof Booking) => (e: { target: { value: string } }) => setF({ ...f, [k]: e.target.value });

  function validate() {
    const e: typeof errors = {};
    if (f.name.trim().length < 2) e.name = 'Please enter your name.';
    if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = 'Please enter a valid email.';
    if (f.phone.replace(/\D/g, '').length < 10) e.phone = 'Please enter a 10-digit phone number.';
    if (!f.service) e.service = 'Please choose a service.';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  const text = `Hi Raju, I’d like to book a consultation.\nName: ${f.name}\nEmail: ${f.email}\nPhone: ${f.phone}\nBusiness: ${f.business || '—'}\nService: ${f.service}\nPreferred date: ${f.date || 'Flexible'}\nMessage: ${f.message || '—'}`;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    if (!hasFormBackend) {
      track('form_submit', { form: 'booking', via: 'whatsapp' });
      window.open(waLink(text), '_blank', 'noopener');
      return;
    }
    setStatus('sending');
    try {
      await submitForm('booking', f);
      setStatus('sent');
      setF(empty);
    } catch {
      setStatus('error');
    }
  }

  const err = (k: keyof Booking) => errors[k] && <p id={`${k}-err`} className="mt-1.5 text-[13px] text-banana">{errors[k]}</p>;

  if (status === 'sent')
    return (
      <div role="status" className="glass glow-border rounded-[24px] p-8">
        <Check className="text-banana" size={32} />
        <h3 className="display mt-4 text-[32px]">Request received.</h3>
        <p className="lead mt-3">Your request reached my inbox. It isn’t a confirmed slot yet — I’ll reply by phone, WhatsApp or email to fix a time.</p>
      </div>
    );

  return (
    <form onSubmit={onSubmit} noValidate className="glass rounded-[24px] p-6 sm:p-9">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="b-name" className="label">Name *</label>
          <input id="b-name" className="field" autoComplete="name" value={f.name} onChange={set('name')} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-err' : undefined} />
          {err('name')}
        </div>
        <div>
          <label htmlFor="b-email" className="label">Email *</label>
          <input id="b-email" type="email" className="field" autoComplete="email" value={f.email} onChange={set('email')} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-err' : undefined} />
          {err('email')}
        </div>
        <div>
          <label htmlFor="b-phone" className="label">Phone *</label>
          <input id="b-phone" type="tel" inputMode="tel" className="field" autoComplete="tel" value={f.phone} onChange={set('phone')} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'phone-err' : undefined} />
          {err('phone')}
        </div>
        <div>
          <label htmlFor="b-biz" className="label">Business name</label>
          <input id="b-biz" className="field" autoComplete="organization" value={f.business} onChange={set('business')} />
        </div>
        <div>
          <label htmlFor="b-svc" className="label">Required service *</label>
          <select id="b-svc" className="field" value={f.service} onChange={set('service')} aria-invalid={!!errors.service} aria-describedby={errors.service ? 'service-err' : undefined}>
            <option value="" className="bg-plum-950">Choose a service</option>
            {services.map((s) => <option key={s.slug} className="bg-plum-950">{s.name}</option>)}
            <option className="bg-plum-950">Complete digital marketing</option>
          </select>
          {err('service')}
        </div>
        <div>
          <label htmlFor="b-date" className="label">Preferred meeting date</label>
          <input id="b-date" type="date" min={today} className="field [color-scheme:dark]" value={f.date} onChange={set('date')} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="b-msg" className="label">Message</label>
          <textarea id="b-msg" rows={4} className="field resize-y" value={f.message} onChange={set('message')} placeholder="A few lines about your business and what you want to achieve" />
        </div>
      </div>
      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button type="submit" disabled={status === 'sending'} className="btn-primary">
          {hasFormBackend ? <><Send size={17} /> {status === 'sending' ? 'Sending…' : 'Request consultation'}</> : <><MessageCircle size={17} /> Send request via WhatsApp</>}
        </button>
        {!hasFormBackend && (
          <a href={mailLink('Consultation request', text)} onClick={(e) => { if (!validate()) e.preventDefault(); else track('form_submit', { form: 'booking', via: 'email' }); }} className="btn-ghost"><Mail size={17} /> Or send by email</a>
        )}
      </div>
      <p className="mt-4 text-[12.5px] text-plum-200/75">
        {hasFormBackend ? 'Your details go straight to my inbox. ' : 'Your request opens in WhatsApp with the details filled in. '}
        A meeting is confirmed only when I reply with a time.
      </p>
      {status === 'error' && <p role="alert" className="mt-3 text-[14px] text-banana">Something went wrong sending the form. Please use WhatsApp or email.</p>}
    </form>
  );
}
