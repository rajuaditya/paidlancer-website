// Tracking loads only when IDs are present in .env — no hardcoded keys.
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: ((...args: unknown[]) => void) & { callMethod?: unknown; queue?: unknown[]; loaded?: boolean; version?: string; push?: unknown };
    _fbq?: unknown;
  }
}

const GA4 = import.meta.env.VITE_GA4_ID as string | undefined;
const GTM = import.meta.env.VITE_GTM_ID as string | undefined;
const PIXEL = import.meta.env.VITE_META_PIXEL_ID as string | undefined;
let started = false;

function inject(src: string) {
  const s = document.createElement('script');
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

export function initAnalytics() {
  if (started || typeof window === 'undefined') return;
  started = true;
  window.dataLayer = window.dataLayer || [];
  if (GTM) {
    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
    inject(`https://www.googletagmanager.com/gtm.js?id=${GTM}`);
  }
  if (GA4) {
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA4, { send_page_view: false });
    inject(`https://www.googletagmanager.com/gtag/js?id=${GA4}`);
  }
  if (PIXEL) {
    /* Standard Meta Pixel bootstrap */
    const f = window as Window;
    if (!f.fbq) {
      const n = function (...args: unknown[]) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const self = n as any;
        self.callMethod ? self.callMethod(...args) : self.queue.push(args);
      } as unknown as NonNullable<Window['fbq']>;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const nn = n as any;
      nn.push = n; nn.loaded = true; nn.version = '2.0'; nn.queue = [];
      f.fbq = n; f._fbq = n;
      inject('https://connect.facebook.net/en_US/fbevents.js');
    }
    f.fbq!('init', PIXEL);
  }
}

export function trackPageView(path: string) {
  if (typeof window === 'undefined') return;
  window.dataLayer?.push({ event: 'page_view', page_path: path });
  if (GA4 && window.gtag) window.gtag('event', 'page_view', { page_path: path, page_location: window.location.href });
  if (PIXEL && window.fbq) window.fbq('track', 'PageView');
}

/** Conversion events: whatsapp_click, call_click, email_click, form_submit, cta_click, calculator_run, audit_run */
export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;
  window.dataLayer?.push({ event, ...params });
  if (GA4 && window.gtag) window.gtag('event', event, params);
  if (PIXEL && window.fbq) {
    if (event === 'form_submit' || event === 'whatsapp_click') window.fbq('track', 'Lead', params);
    else window.fbq('trackCustom', event, params);
  }
}
