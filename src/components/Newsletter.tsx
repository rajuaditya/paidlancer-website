import { useState, type FormEvent } from 'react';
import { ArrowRight } from 'lucide-react';
import { mailLink } from '../lib/contact';
import { track } from '../lib/analytics';

const ENDPOINT = import.meta.env.VITE_NEWSLETTER_ENDPOINT as string | undefined;

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return setState('error');
    if (!ENDPOINT) {
      // No list provider configured yet — hand off to email rather than pretend.
      track('newsletter_email_handoff');
      window.location.href = mailLink('Subscribe me to PAIDLANCER marketing notes', `Please add ${email} to your monthly marketing notes.`);
      return;
    }
    setState('sending');
    try {
      const r = await fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) });
      if (!r.ok) throw new Error();
      track('newsletter_subscribe');
      setState('done');
    } catch {
      setState('error');
    }
  }

  if (state === 'done') return <p className="mt-5 rounded-xl bg-white/5 p-4 text-[14px] text-banana">You’re subscribed. Thanks!</p>;

  return (
    <form onSubmit={onSubmit} className="mt-5" noValidate>
      <label htmlFor="nl-email" className="sr-only">Email address</label>
      <div className="flex gap-2">
        <input id="nl-email" type="email" required autoComplete="email" className="field" placeholder="you@business.com" value={email} onChange={(e) => { setEmail(e.target.value); setState('idle'); }} />
        <button type="submit" aria-label="Subscribe" disabled={state === 'sending'} className="grid h-[50px] w-[50px] flex-none place-items-center rounded-xl bg-banana text-plum-950 transition hover:-translate-y-0.5 disabled:opacity-60">
          <ArrowRight size={20} />
        </button>
      </div>
      {state === 'error' && <p className="mt-2 text-[13px] text-banana">Please enter a valid email (or try again).</p>}
      {!ENDPOINT && <p className="mt-2 text-[12px] text-plum-200/60">Subscribing opens an email to Raju.</p>}
    </form>
  );
}
