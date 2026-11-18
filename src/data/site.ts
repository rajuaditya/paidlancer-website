// Single source of truth for business details. Everything here was taken from the
// existing paidlancer.in site or confirmed by Raju — keep it that way.
export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://paidlancer.in').replace(/\/$/, '');

export const site = {
  brand: 'PAIDLANCER',
  domain: 'paidlancer.in',
  owner: {
    name: 'Peddiraju Bikkavolu',
    short: 'Raju',
    role: 'Digital Marketing Freelancer',
    education: 'B.Sc. Computer Science (2024)',
    since: 2022,
  },
  phone: '+91 94925 22824',
  phoneRaw: '+919492522824',
  whatsapp: '919492522824',
  email: 'digitalgullymarketor@gmail.com',
  address: {
    street: 'Road No. 3, Venkatrao Nagar, Kukatpally BJP Office Lane',
    locality: 'Kukatpally',
    city: 'Hyderabad',
    region: 'Telangana',
    postalCode: '', // add your PIN code before launch if you want it in schema
    country: 'IN',
  },
  geo: { city: 'Hyderabad', area: 'Kukatpally' },
  // Confirmed by Raju (Nov 2026). Old site showed "120+ websites / 100% satisfaction" — not used.
  stats: [
    { value: 2, suffix: '+', label: 'Years freelancing', detail: 'Full-time freelance since 2022' },
    { value: 40, suffix: '+', label: 'Clients served', detail: 'Startups, SMEs and growing brands' },
    { value: 9, suffix: '+', label: 'Industries', detail: 'Real estate to manufacturing' },
    { value: 2, suffix: '-in-1', label: 'Marketing + Dev', detail: 'Campaigns and the websites they land on' },
  ],
  socials: [] as { label: string; href: string }[], // add Instagram / LinkedIn URLs here when ready
};

export const nav = [
  { label: 'About', to: '/about/' },
  { label: 'Services', to: '/services/' },
  { label: 'Work', to: '/portfolio/' },
  { label: 'Pricing', to: '/pricing/' },
  { label: 'Blog', to: '/blog/' },
];

export const industries = [
  { name: 'Real Estate', icon: 'Building2' },
  { name: 'Healthcare', icon: 'HeartPulse' },
  { name: 'Education', icon: 'GraduationCap' },
  { name: 'E-commerce', icon: 'ShoppingBag' },
  { name: 'IT Solutions', icon: 'Cpu' },
  { name: 'Restaurants', icon: 'UtensilsCrossed' },
  { name: 'Interior Design', icon: 'Sofa' },
  { name: 'Consulting', icon: 'Briefcase' },
  { name: 'Manufacturing', icon: 'Factory' },
] as const;
