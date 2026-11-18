// Clients, testimonials, pricing, FAQs and process — all taken from the existing paidlancer.in.

export type Client = {
  name: string;
  url?: string;
  industry: string; // inferred from the client's name/domain — please verify
  categories: string[]; // fill with the work you did, e.g. ['Website Development', 'SEO Projects']
  screenshot?: string; // drop a screenshot into src/assets/work/ and import it here when ready
};

export const portfolioCategories = ['Website Development', 'SEO Projects', 'Meta Ads Campaigns', 'Google Ads Campaigns', 'E-commerce Projects', 'Social Media Creatives'];

export const clients: Client[] = [
  { name: 'Survi Technologies', url: 'https://survitechnologies.com/', industry: 'IT Solutions', categories: [] },
  { name: 'Arvin IT Solutions', url: 'https://arvinitsolutions.com/', industry: 'IT Solutions', categories: [] },
  { name: 'Tasty Bites', url: 'https://tastybitesus.com/', industry: 'Restaurants', categories: [] },
  { name: 'Inno Space Interiors', url: 'https://innospaceinteriors.com/', industry: 'Interior Design', categories: [] },
  { name: 'Recon Tourism', url: 'https://recontourism.com/', industry: 'Travel & Tourism', categories: [] },
  { name: 'Evrin', url: 'https://evrinstyleunfiltered.com/', industry: 'E-commerce', categories: [] },
  { name: 'Teammates Edu', url: 'https://teammatesedu.com/', industry: 'Education', categories: [] },
  { name: 'Balaji Tech Training', url: 'https://balajitechtraining.com/', industry: 'Education', categories: [] },
  { name: 'Provoke Trainings', url: 'https://provoketrainings.com/', industry: 'Education', categories: [] },
  { name: 'CyberXpert Academy', url: 'https://cyberxpertacademy.in/', industry: 'Education', categories: [] },
  { name: 'Arvin IT Technology', url: 'https://arvinittechnology.com/', industry: 'IT Solutions', categories: [] },
  { name: 'Staffogic Solutions', url: 'https://staffogicsolutions.com/', industry: 'Consulting', categories: [] },
  { name: 'Big Cloud Solutions', url: 'https://bigcloudsolutions.com/', industry: 'IT Solutions', categories: [] },
  { name: 'Lalitavastra', url: 'https://lalitavastra.com/', industry: 'E-commerce', categories: [] },
  { name: 'Tendrils Tech', url: 'https://www.tendrilstech.com/', industry: 'IT Solutions', categories: [] },
  { name: 'Live In Nest Interiors', url: 'http://liveinnestinteriors.com', industry: 'Interior Design', categories: [] },
  { name: 'Digitonix Webworks', url: 'https://digitonixwebworks.com/', industry: 'IT Solutions', categories: [] },
  { name: 'Induslore', url: 'https://induslore.in/', industry: 'E-commerce', categories: [] },
  { name: 'Sezna', industry: 'Other', categories: [] },
  { name: 'Alliance Global', industry: 'Consulting', categories: [] },
  { name: 'ExpertEdge', industry: 'Education', categories: [] },
  { name: 'Heaf', industry: 'Other', categories: [] },
  { name: 'CrawlLogix', industry: 'IT Solutions', categories: [] },
  { name: 'Realance', industry: 'Real Estate', categories: [] },
  { name: 'Sri Balaji Bhavani', industry: 'Other', categories: [] },
];

export const testimonials = [
  {
    name: 'Suresh Reddy',
    role: 'CEO, Survi Pvt. Ltd.',
    quote: 'Excellent digital marketing service! My business visibility increased within a few weeks.',
  },
  {
    name: 'Ravi Kumar Pendli',
    role: 'Founder & CEO, Provoke',
    quote: '…helped us generate quality leads through Google Ads and social media marketing.',
  },
  {
    name: 'Vishnu',
    role: 'Founder & CEO, Staffogic Solutions',
    quote: 'Best digital marketing service at an affordable price.',
  },
  {
    name: 'G. Raghu Nadha Swamy',
    role: 'Chairman & Founder',
    quote: 'Professional digital marketer with deep knowledge of SEO, Meta Ads, and website optimization.',
  },
  {
    name: 'Neeraja',
    role: 'Founder & CEO, TendrilsTech',
    quote: 'Very happy with the service. From website design to marketing campaigns, everything was handled smoothly.',
  },
];

export type Plan = {
  name: string;
  price: number;
  cadence: 'one-time' | 'month';
  tagline: string;
  features: string[];
  note?: string;
  featured?: boolean;
  group: 'growth' | 'build';
};

export const plans: Plan[] = [
  {
    name: 'Standard',
    price: 19999,
    cadence: 'month',
    group: 'growth',
    tagline: 'Website care, SEO and social — the full monthly engine.',
    features: ['Everything in Basic', 'Website management', 'SEO for up to 5 keywords', 'Google Business Profile management', 'GBP ranking for up to 3 keywords', 'Up to 5 social platforms managed', 'Social media ads management'],
    note: 'Domain & hosting not included',
  },
  {
    name: 'Premium',
    price: 24999,
    cadence: 'month',
    group: 'growth',
    featured: true,
    tagline: 'Bigger keyword set plus Google Ads — for businesses ready to scale.',
    features: ['Everything in Standard', 'SEO for up to 10 keywords', 'GBP ranking for up to 5 keywords', 'Up to 10 social platforms managed', 'Social media + Google Ads management', 'Domain & hosting included'],
  },
  {
    name: 'Website Maintenance',
    price: 4999,
    cadence: 'month',
    group: 'growth',
    tagline: 'Keep your site fast, safe and up to date.',
    features: ['Regular updates and small changes', 'Speed checks and performance fixes', 'Daily or weekly backups'],
  },
  {
    name: 'Basic Website',
    price: 14999,
    cadence: 'one-time',
    group: 'build',
    tagline: 'A professional WordPress site to launch your business online.',
    features: ['WordPress website, up to 5 pages', 'Mobile-responsive design', 'WhatsApp chat integration', 'Google submission', 'Basic SEO setup'],
    note: 'Domain & hosting not included',
  },
  {
    name: 'E-Commerce Store',
    price: 24999,
    cadence: 'one-time',
    group: 'build',
    featured: true,
    tagline: 'A Shopify store ready to take orders.',
    features: ['E-commerce store on Shopify', 'Responsive design', '1 domain name'],
  },
  {
    name: 'Website Re-Design',
    price: 9999,
    cadence: 'one-time',
    group: 'build',
    tagline: 'Give an outdated website a fast, modern rebuild.',
    features: ['Mobile-friendly design', 'Fast-loading pages', 'SEO-friendly structure'],
  },
];

export const inr = (n: number) => '₹' + n.toLocaleString('en-IN');

export const faqs = [
  { q: 'Who is the best digital marketing freelancer in Hyderabad for a small business?', a: 'The best fit is someone who understands your industry, works with you directly, explains results honestly and can handle both marketing and the website it depends on. I am Peddiraju Bikkavolu, a Hyderabad-based freelancer (PAIDLANCER) who has worked with 40+ clients since 2022 — judge me by my work, my reviews and a free first conversation.' },
  { q: 'What services do you offer?', a: 'SEO, Google Ads, Meta (Facebook & Instagram) Ads, social media marketing, lead generation, local SEO and Google Business Profile, analytics and conversion tracking, website development (WordPress, Shopify, React), graphic design and video editing.' },
  { q: 'What kind of businesses do you work with?', a: 'Startups, small businesses, SMEs and growing brands — including real estate, healthcare, education, e-commerce, IT, restaurants, interior design, consulting and manufacturing.' },
  { q: 'Do you offer affordable packages in Hyderabad?', a: 'Yes. Packages start at ₹4,999/month for maintenance, ₹14,999 for a website and ₹19,999/month for ongoing marketing. Every plan can be adjusted to your goals and budget.' },
  { q: 'How soon will I see results?', a: 'Paid ads can bring enquiries within days of launch. SEO usually takes two to three months to show clear movement, and longer for competitive keywords. I do not promise rankings — I promise transparent work and reporting.' },
  { q: 'Do you work with clients outside Hyderabad?', a: 'Yes. I work with clients across India and abroad over WhatsApp, calls and video meetings. Clients in Kukatpally and nearby areas can also meet in person.' },
  { q: 'Will I get regular reports?', a: 'Yes — weekly summaries for ad campaigns and a monthly report covering traffic, leads, ad performance and next steps.' },
  { q: 'Do you require long-term contracts?', a: 'No. Monthly services are flexible. I would rather keep you because the work is useful than because a contract says so.' },
  { q: 'How do we get started?', a: 'Message me on WhatsApp, book a consultation from the contact page, or fill in the project questionnaire. I will review your business and suggest a practical plan.' },
];

export const process = [
  { title: 'Understand your business', body: 'Your goals, customers, competitors and what a good lead looks like for you.' },
  { title: 'Plan the strategy', body: 'Pick the right mix — SEO, Google Ads, Meta Ads, social, website — for your budget.' },
  { title: 'Create content & ads', body: 'Posts, reels, designs, ad creatives and a monthly content plan.' },
  { title: 'Optimise website & SEO', body: 'Keywords, titles, speed, tracking and on-page fixes.' },
  { title: 'Run & manage campaigns', body: 'Launch Google and Meta campaigns, track performance and improve every week.' },
  { title: 'Report & grow', body: 'A clear monthly report, then scale what works and cut what does not.' },
];

export const whyMe = [
  { title: 'You work with me, directly', body: 'No account managers in between. The person planning your campaign is the one answering your WhatsApp.', icon: 'MessageCircle' },
  { title: 'Marketing + development', body: 'I build the websites my campaigns send traffic to, so tracking, speed and landing pages are never an afterthought.', icon: 'Code2' },
  { title: 'Freelancer pricing, clear scope', body: 'Published packages from ₹4,999. You know what you pay for before we start.', icon: 'IndianRupee' },
  { title: 'Strategy made for you', body: 'A clinic in Kukatpally and a Shopify brand need different plans. You get one built for your business.', icon: 'Compass' },
  { title: 'Honest reporting', body: 'Weekly and monthly numbers in plain language — what worked, what did not and what changes next.', icon: 'BarChart3' },
  { title: 'Local, and not limited to local', body: 'Based in Kukatpally, Hyderabad. Working with clients across India and abroad.', icon: 'MapPin' },
];
