import { site } from '../data/site';
import { track } from './analytics';

export const waLink = (message: string) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
export const mailLink = (subject: string, body = '') =>
  `mailto:${site.email}?subject=${encodeURIComponent(subject)}${body ? '&body=' + encodeURIComponent(body) : ''}`;
export const telLink = `tel:${site.phoneRaw}`;

export function openWhatsApp(message: string, source: string) {
  track('whatsapp_click', { source });
  window.open(waLink(message), '_blank', 'noopener');
}

const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT as string | undefined;
export const hasFormBackend = Boolean(FORM_ENDPOINT);

/** POSTs to the configured backend. Resolves only on a real 2xx — never fakes success. */
export async function submitForm(kind: string, data: Record<string, unknown>) {
  if (!FORM_ENDPOINT) throw new Error('NO_BACKEND');
  const res = await fetch(FORM_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ form: kind, page: typeof window !== 'undefined' ? window.location.href : '', ...data }),
  });
  if (!res.ok) throw new Error('HTTP_' + res.status);
  track('form_submit', { form: kind });
  return true;
}
