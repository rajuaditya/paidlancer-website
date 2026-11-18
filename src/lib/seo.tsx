import { createContext, useContext, useEffect, type ReactNode } from 'react';
import { SITE_URL, site } from '../data/site';

export type HeadData = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article' | 'profile';
  noindex?: boolean;
  schema?: Record<string, unknown>[];
  publishedTime?: string;
  modifiedTime?: string;
};

type Collector = { head?: HeadData };
const SeoContext = createContext<Collector | null>(null);

export function SeoProvider({ collector, children }: { collector: Collector; children: ReactNode }) {
  return <SeoContext.Provider value={collector}>{children}</SeoContext.Provider>;
}

export const absUrl = (path: string) => (path.startsWith('http') ? path : SITE_URL + path);
const DEFAULT_IMAGE = '/og-image.jpg';

/** Declares the page's metadata. Server: collected for prerender. Browser: applied on navigation. */
export function Seo(props: HeadData) {
  const collector = useContext(SeoContext);
  if (collector && typeof window === 'undefined') collector.head = props;

  useEffect(() => {
    applyHead(props);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.path, props.title]);
  return null;
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function applyHead(h: HeadData) {
  document.title = h.title;
  const url = absUrl(h.path);
  const img = absUrl(h.image || DEFAULT_IMAGE);
  setMeta('name', 'description', h.description);
  setMeta('name', 'robots', h.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large');
  setMeta('property', 'og:title', h.title);
  setMeta('property', 'og:description', h.description);
  setMeta('property', 'og:url', url);
  setMeta('property', 'og:image', img);
  setMeta('property', 'og:type', h.type || 'website');
  setMeta('name', 'twitter:title', h.title);
  setMeta('name', 'twitter:description', h.description);
  setMeta('name', 'twitter:image', img);
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  link.href = url;
  document.head.querySelectorAll('script[data-ld]').forEach((n) => n.remove());
  (h.schema || []).forEach((s) => {
    const sc = document.createElement('script');
    sc.type = 'application/ld+json';
    sc.setAttribute('data-ld', '');
    sc.textContent = JSON.stringify(s);
    document.head.appendChild(sc);
  });
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Used by the prerender script to build the <head> for each static HTML file. */
export function renderHeadTags(h: HeadData): string {
  const url = absUrl(h.path);
  const img = absUrl(h.image || DEFAULT_IMAGE);
  const tags = [
    `<title>${esc(h.title)}</title>`,
    `<meta name="description" content="${esc(h.description)}" />`,
    `<meta name="robots" content="${h.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:site_name" content="${site.brand}" />`,
    `<meta property="og:locale" content="en_IN" />`,
    `<meta property="og:type" content="${h.type || 'website'}" />`,
    `<meta property="og:title" content="${esc(h.title)}" />`,
    `<meta property="og:description" content="${esc(h.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${img}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(h.title)}" />`,
    `<meta name="twitter:description" content="${esc(h.description)}" />`,
    `<meta name="twitter:image" content="${img}" />`,
  ];
  if (h.publishedTime) tags.push(`<meta property="article:published_time" content="${h.publishedTime}" />`);
  if (h.modifiedTime) tags.push(`<meta property="article:modified_time" content="${h.modifiedTime}" />`);
  const gsc = import.meta.env.VITE_GSC_VERIFICATION;
  if (gsc) tags.push(`<meta name="google-site-verification" content="${esc(gsc)}" />`);
  (h.schema || []).forEach((s) =>
    tags.push(`<script type="application/ld+json" data-ld>${JSON.stringify(s).replace(/</g, '\\u003c')}</script>`),
  );
  return tags.join('\n    ');
}

/* ---------- Structured data helpers (real, consistent business info only) ---------- */

export const personSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': SITE_URL + '/#person',
  name: site.owner.name,
  alternateName: 'Raju',
  jobTitle: site.owner.role,
  url: SITE_URL + '/about/',
  image: SITE_URL + '/og-image.jpg',
  email: 'mailto:' + site.email,
  telephone: site.phoneRaw,
  worksFor: { '@id': SITE_URL + '/#business' },
  address: { '@type': 'PostalAddress', addressLocality: 'Hyderabad', addressRegion: 'Telangana', addressCountry: 'IN' },
  alumniOf: { '@type': 'EducationalOrganization', name: 'B.Sc. Computer Science' },
  knowsAbout: ['Search Engine Optimization', 'Google Ads', 'Meta Ads', 'Social Media Marketing', 'Lead Generation', 'Local SEO', 'Google Analytics 4', 'WordPress', 'Shopify', 'React'],
  sameAs: site.socials.map((s) => s.href),
});

export const businessSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': SITE_URL + '/#business',
  name: site.brand,
  description: 'Digital marketing freelancer in Hyderabad offering SEO, Google Ads, Meta Ads, social media marketing and website development.',
  url: SITE_URL + '/',
  image: SITE_URL + '/og-image.jpg',
  logo: SITE_URL + '/apple-touch-icon.png',
  telephone: site.phoneRaw,
  email: site.email,
  priceRange: '₹4,999 – ₹24,999',
  founder: { '@id': SITE_URL + '/#person' },
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.street,
    addressLocality: 'Hyderabad',
    addressRegion: 'Telangana',
    addressCountry: 'IN',
    ...(site.address.postalCode ? { postalCode: site.address.postalCode } : {}),
  },
  areaServed: [
    { '@type': 'City', name: 'Hyderabad' },
    { '@type': 'Country', name: 'India' },
  ],
  sameAs: site.socials.map((s) => s.href),
});

export const websiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': SITE_URL + '/#website',
  url: SITE_URL + '/',
  name: site.brand,
  publisher: { '@id': SITE_URL + '/#business' },
  inLanguage: 'en-IN',
});

export const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: absUrl(it.path) })),
});

export const faqSchema = (faqs: { q: string; a: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
});

export const serviceSchema = (s: { name: string; description: string; path: string }) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: s.name,
  description: s.description,
  url: absUrl(s.path),
  serviceType: s.name,
  provider: { '@id': SITE_URL + '/#business' },
  areaServed: { '@type': 'City', name: 'Hyderabad' },
});
