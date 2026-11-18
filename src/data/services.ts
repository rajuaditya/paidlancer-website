export type IconName =
  | 'Search' | 'MousePointerClick' | 'Megaphone' | 'Share2' | 'MonitorSmartphone' | 'Blocks' | 'ShoppingCart'
  | 'Magnet' | 'Palette' | 'Clapperboard' | 'MapPin' | 'LineChart';

export type Service = {
  slug: string;
  name: string;
  short: string;
  icon: IconName;
  hue: string; // accent tint for the 3D glyph (stays inside the purple/yellow system)
  path: string; // dedicated landing page, or anchor on /services/
  description: string;
  benefits: string[];
  whoFor: string[];
  process: string[];
  deliverables: string[];
  related: string[];
  landing?: {
    metaTitle: string;
    metaDescription: string;
    h1: string;
    kicker: string;
    intro: string[];
    sections: { h2: string; body: string[]; bullets?: string[] }[];
    faqs: { q: string; a: string }[];
  };
};

export const services: Service[] = [
  {
    slug: 'seo',
    name: 'SEO Services in Hyderabad',
    short: 'Rank for the searches your customers actually make — and turn that traffic into enquiries.',
    icon: 'Search',
    hue: '#FFE34D',
    path: '/seo-services-hyderabad/',
    description:
      'Technical fixes, keyword-mapped pages and steady content work that help your website show up when people in Hyderabad search for what you sell. I focus on pages that bring enquiries, not vanity keywords.',
    benefits: ['Traffic that keeps coming without paying per click', 'Pages built around real buyer searches', 'A faster, cleaner site that Google can crawl properly', 'Clear monthly reporting on rankings, traffic and leads'],
    whoFor: ['Local service businesses', 'Training institutes and colleges', 'Real-estate developers and agents', 'B2B and IT companies with long sales cycles'],
    process: ['Audit: crawl errors, speed, indexing, competitors', 'Keyword map: one search intent per page', 'On-page fixes and new pages where gaps exist', 'Content, internal links and local citations every month'],
    deliverables: ['Technical SEO audit with priorities', 'Keyword-to-page map', 'On-page optimisation (titles, headings, schema)', 'Monthly content plan', 'Monthly ranking + traffic report'],
    related: ['local-seo', 'website-development', 'analytics'],
    landing: {
      metaTitle: 'SEO Services in Hyderabad | SEO Freelancer – PAIDLANCER',
      metaDescription:
        'SEO services in Hyderabad by freelancer Peddiraju Bikkavolu: technical SEO, keyword-mapped pages, local SEO and monthly reports that focus on enquiries.',
      h1: 'SEO Services in Hyderabad',
      kicker: 'Search Engine Optimization',
      intro: [
        'Most small-business websites in Hyderabad are not invisible because Google dislikes them. They are invisible because no page on the site clearly answers the search a customer types. A coaching centre in Ameerpet with one generic “Courses” page will lose to a competitor that has a separate, well-written page for each course and each area it serves.',
        'My SEO work starts there: finding the searches that bring paying customers, making sure each one has a page that deserves to rank, and fixing the technical issues that stop Google from reading your site properly. You work directly with me — the person doing the work — and you get a report every month that shows what changed.',
      ],
      sections: [
        {
          h2: 'What my SEO service covers',
          body: ['SEO is a set of jobs that need to happen in the right order. Here is what I take care of:'],
          bullets: [
            'Technical SEO — indexing, sitemaps, redirects, broken links, Core Web Vitals and mobile usability.',
            'Keyword research — grouped by intent so we do not build five pages that compete with each other.',
            'On-page optimisation — titles, meta descriptions, headings, internal links, image alt text and schema markup.',
            'Content — service pages, location pages where they make sense, and blog articles that answer real questions.',
            'Local SEO — Google Business Profile, NAP consistency and local citations for searches with “near me” intent.',
            'Reporting — Search Console and GA4 data in plain language, with next month’s priorities.',
          ],
        },
        {
          h2: 'How long does SEO take?',
          body: [
            'Honest answer: usually two to three months before you see a clear movement, and longer for competitive keywords. Technical fixes can show results sooner; new content needs time to be crawled, indexed and trusted. Anyone who promises a #1 ranking by a date is guessing — Google decides rankings, not the SEO.',
            'What I can promise is consistent work you can see: a list of what was done each month and the effect it had on impressions, clicks and enquiries.',
          ],
        },
        {
          h2: 'Why hire a freelancer for SEO instead of an agency?',
          body: [
            'With an agency you often brief a salesperson and the work is passed to a junior executive. With me, the person who audits your site is the same person who writes your title tags and answers your WhatsApp. Pricing stays at freelancer level because there is no layer of account managers to pay for.',
          ],
        },
      ],
      faqs: [
        { q: 'How much do your SEO services cost?', a: 'SEO is included in my monthly Standard (₹19,999/month, up to 5 keywords) and Premium (₹24,999/month, up to 10 keywords) plans. Larger projects are quoted after a free audit.' },
        { q: 'Can you guarantee first-page rankings?', a: 'No — and you should be careful with anyone who does. I guarantee the work and transparent reporting; rankings depend on Google, competition and how long the site has been building trust.' },
        { q: 'Do you work on websites built by someone else?', a: 'Yes. I work with WordPress, Shopify, custom React or HTML sites. If a platform limits SEO, I will tell you up front.' },
        { q: 'Will I get reports?', a: 'Yes, every month: rankings for your target keywords, organic traffic, Search Console impressions and clicks, and the enquiries that came from search where tracking allows.' },
      ],
    },
  },
  {
    slug: 'google-ads',
    name: 'Google Ads Management',
    short: 'Search, Performance Max and call campaigns that put you in front of people ready to buy.',
    icon: 'MousePointerClick',
    hue: '#FFD84D',
    path: '/google-ads-management-hyderabad/',
    description:
      'Campaigns built around buying-intent keywords, tight location targeting and proper conversion tracking — so every rupee is measured against calls, forms and WhatsApp enquiries, not just clicks.',
    benefits: ['Enquiries from day one of a campaign', 'Spend only on searches that match your service', 'Call and WhatsApp tracking set up correctly', 'Weekly optimisation, not set-and-forget'],
    whoFor: ['Clinics and healthcare providers', 'Real-estate projects with launch deadlines', 'Institutes running admissions', 'Service businesses that need leads this month'],
    process: ['Keyword and competitor research', 'Campaign structure, ads and landing-page review', 'GA4 + Google Ads conversion tracking', 'Weekly search-term cleaning and bid adjustments'],
    deliverables: ['Account setup or restructure', 'Ad copy and extensions', 'Conversion tracking (calls, forms, WhatsApp)', 'Negative keyword lists', 'Weekly performance summary'],
    related: ['lead-generation', 'analytics', 'website-development'],
    landing: {
      metaTitle: 'Google Ads Management in Hyderabad | Google Ads Expert – PAIDLANCER',
      metaDescription:
        'Google Ads management in Hyderabad by Peddiraju Bikkavolu: Search and Performance Max campaigns, conversion tracking and weekly optimisation.',
      h1: 'Google Ads Management in Hyderabad',
      kicker: 'Google Ads / PPC',
      intro: [
        'Google Ads is the fastest way to reach people who are already searching for your service — “dermatologist in Kukatpally”, “2BHK flats in Kompally”, “digital marketing course with placement”. The problem is that badly set-up campaigns also show your ads to people searching for jobs, free downloads and competitors’ names, and the budget disappears.',
        'I build campaigns the careful way: tight keyword groups, location targeting that matches where you actually serve, ads that speak to one intent each, and conversion tracking that counts real calls and form fills. Then I check search terms every week and cut the waste.',
      ],
      sections: [
        {
          h2: 'Campaign types I manage',
          body: ['The right mix depends on what you sell and how quickly you need results:'],
          bullets: [
            'Search campaigns — the core for most service businesses and lead generation.',
            'Performance Max — useful for e-commerce and businesses with good conversion data.',
            'Call-focused ads — for clinics, emergency services and local businesses where people prefer to phone.',
            'Display and YouTube remarketing — to bring back people who visited but did not enquire.',
          ],
        },
        {
          h2: 'Tracking first, spending second',
          body: [
            'Before a campaign goes live I set up GA4 and Google Ads conversion tracking for form submissions, phone calls and WhatsApp clicks. Without this, Google’s bidding works blind and you cannot tell which keywords pay for themselves.',
            'You get a weekly summary: spend, clicks, conversions, cost per lead, and what I changed.',
          ],
        },
      ],
      faqs: [
        { q: 'What budget do I need for Google Ads in Hyderabad?', a: 'It depends on how competitive your keywords are. Many local businesses start with ₹15,000–₹30,000 a month in ad spend and scale once tracking shows which keywords convert. Use the budget planner on my homepage for an indicative split.' },
        { q: 'Is the ad budget included in your fee?', a: 'No. Ad spend is paid directly to Google from your account. My management fee is separate, so you always own the account and the data.' },
        { q: 'How soon will I get leads?', a: 'Paid ads can bring enquiries within days of going live, but the first two to four weeks are a learning period while we remove poor search terms and refine bids.' },
        { q: 'Can you fix an existing account?', a: 'Yes. I can audit your current account, explain where money is being wasted and restructure it.' },
      ],
    },
  },
  {
    slug: 'meta-ads',
    name: 'Meta Ads Management',
    short: 'Facebook and Instagram campaigns that generate leads and sales — with creatives that stop the scroll.',
    icon: 'Megaphone',
    hue: '#8D55D5',
    path: '/meta-ads-management-hyderabad/',
    description:
      'Lead-form, WhatsApp and website campaigns on Facebook and Instagram, with audience testing, creatives designed in-house and Meta Pixel / Conversions API tracking.',
    benefits: ['Reach buyers before they start searching', 'Instant lead forms and click-to-WhatsApp ads', 'Creatives and copy made for each audience', 'Retargeting for website visitors and video viewers'],
    whoFor: ['Real-estate launches and site visits', 'Restaurants, salons and local brands', 'E-commerce and D2C stores', 'Institutes and event organisers'],
    process: ['Offer and audience planning', 'Creative production (static, carousel, reels)', 'Pixel, CAPI and lead-form setup', 'Testing, scaling winners, pausing losers'],
    deliverables: ['Campaign and ad-set structure', 'Ad creatives and copy', 'Meta Pixel + event setup', 'Lead-form or WhatsApp integration', 'Weekly performance report'],
    related: ['social-media', 'graphic-design', 'video-editing'],
    landing: {
      metaTitle: 'Meta Ads Management in Hyderabad | Facebook & Instagram Ads Expert',
      metaDescription:
        'Facebook and Instagram ads in Hyderabad by Peddiraju Bikkavolu: lead generation, WhatsApp ads, in-house creatives and Meta Pixel tracking.',
      h1: 'Meta Ads Management in Hyderabad',
      kicker: 'Facebook & Instagram Ads',
      intro: [
        'Meta Ads work differently from Google. People on Instagram are not searching for you — you interrupt their scroll. That means the creative and the offer decide most of the result, and targeting is about finding the right people, not the right keywords.',
        'I plan the offer with you, design the creatives myself (statics, carousels and short reels), set up Meta Pixel and lead forms properly, and test audiences in small budgets before scaling the ones that bring real conversations.',
      ],
      sections: [
        {
          h2: 'Campaign objectives I run',
          body: ['Each objective suits a different business goal:'],
          bullets: [
            'Lead generation — instant forms with qualifying questions to filter casual enquiries.',
            'Click-to-WhatsApp — popular with Hyderabad customers who prefer to chat before calling.',
            'Sales / conversions — for online stores with a working Pixel and catalogue.',
            'Retargeting — website visitors, video viewers and Instagram profile engagers.',
            'Awareness and reach — for launches, openings and events.',
          ],
        },
        {
          h2: 'Lead quality matters more than lead count',
          body: [
            'A cheap lead that never picks up the phone is not cheap. I add qualifying questions, use higher-intent form types where needed, and look at what happens after the lead arrives — calls connected, site visits booked, sales closed — so we optimise for business results, not just form fills.',
          ],
        },
      ],
      faqs: [
        { q: 'How much should I spend on Meta Ads?', a: 'Many local campaigns start with ₹500–₹1,000 per day for testing. The right amount depends on your audience size, offer and goal; the budget planner on my homepage gives an indicative split.' },
        { q: 'Do you design the ad creatives?', a: 'Yes. Graphic design and video editing are part of my skill set, so creatives and campaigns are planned together.' },
        { q: 'Facebook or Instagram — which is better?', a: 'Usually both, with Meta deciding placement based on performance. For younger audiences Instagram tends to lead; for some local and real-estate audiences Facebook still performs well.' },
        { q: 'Can you connect leads to WhatsApp or a CRM?', a: 'Yes — lead forms can be connected to Google Sheets, email or a CRM, and click-to-WhatsApp ads send people straight to your chat.' },
      ],
    },
  },
  {
    slug: 'social-media',
    name: 'Social Media Marketing',
    short: 'Consistent, on-brand content and community management that builds trust before the sale.',
    icon: 'Share2',
    hue: '#D9C6F5',
    path: '/social-media-marketing-hyderabad/',
    description:
      'Monthly content calendars, posts, reels and profile optimisation for Instagram, Facebook, LinkedIn and YouTube — planned around what your customers need to hear before they buy.',
    benefits: ['A profile that looks active and trustworthy', 'Content planned a month ahead', 'Reels and creatives produced in-house', 'Insights on what your audience responds to'],
    whoFor: ['Local brands building a following', 'Founders building a personal brand', 'Restaurants, cafés and retail stores', 'Companies that need a professional LinkedIn presence'],
    process: ['Profile audit and optimisation (SMO)', 'Monthly content calendar', 'Design, reels and captions', 'Publishing, community replies and insights'],
    deliverables: ['Optimised bios, highlights and links', 'Monthly content calendar', 'Posts, carousels and reels', 'Scheduling and publishing', 'Monthly insights report'],
    related: ['meta-ads', 'graphic-design', 'video-editing'],
    landing: {
      metaTitle: 'Social Media Marketing Services in Hyderabad | PAIDLANCER',
      metaDescription:
        'Social media marketing in Hyderabad: content calendars, reels, creatives and profile optimisation for Instagram, Facebook and LinkedIn.',
      h1: 'Social Media Marketing in Hyderabad',
      kicker: 'Social Media Marketing & SMO',
      intro: [
        'Before someone calls you, they usually check your Instagram or Facebook page. If the last post is from eight months ago, or the page looks nothing like your brand, you lose them quietly. Social media marketing is how you make that first impression work for you.',
        'I plan a month of content at a time, design the posts and edit the reels myself, and keep your profiles optimised so the next step — call, WhatsApp, visit — is always one tap away.',
      ],
      sections: [
        {
          h2: 'What is included',
          body: ['A typical monthly plan includes:'],
          bullets: [
            'Social Media Optimisation (SMO): bios, highlights, link-in-bio and contact buttons.',
            'A content calendar mixing educational, proof, behind-the-scenes and offer posts.',
            'Static posts, carousels and short-form reels designed to your brand.',
            'Captions and hashtags written for your audience — in English, or Telugu/Hindi mixes where it fits.',
            'Publishing, basic comment and message handling, and a monthly insights summary.',
          ],
        },
        {
          h2: 'Organic and paid work together',
          body: [
            'Organic posting builds trust; paid ads bring reach. The best-performing organic posts often become the best ads, so I plan both together when you use Meta Ads as well.',
          ],
        },
      ],
      faqs: [
        { q: 'How many posts per month?', a: 'It depends on the plan. My Standard plan manages up to 5 social platforms and Premium up to 10; post counts are agreed in the content calendar.' },
        { q: 'Do you shoot photos and videos?', a: 'I edit and design. For original footage, you or your team can shoot on a phone using a simple brief I provide, or we can use your existing material.' },
        { q: 'Will social media alone bring sales?', a: 'Sometimes, but usually it works best alongside ads, a good website and quick replies to enquiries. I will tell you honestly where to put your budget.' },
      ],
    },
  },
  {
    slug: 'website-development',
    name: 'Website Design & Development',
    short: 'Fast, mobile-first websites designed to turn visitors into calls, chats and form fills.',
    icon: 'MonitorSmartphone',
    hue: '#FFE34D',
    path: '/website-development-hyderabad/',
    description:
      'Business websites and landing pages built with React, WordPress or plain HTML — designed around one clear action, fast on mobile data and ready for SEO and ad tracking from day one.',
    benefits: ['Loads quickly on mobile networks', 'Clear calls to action on every page', 'SEO structure and schema built in', 'Tracking ready for Google and Meta ads'],
    whoFor: ['New businesses launching online', 'Companies with an outdated or slow website', 'Campaigns that need a dedicated landing page', 'Professionals building a personal brand site'],
    process: ['Goals, sitemap and content plan', 'Design in your brand colours', 'Development and speed optimisation', 'SEO setup, tracking, testing and launch'],
    deliverables: ['Responsive website (up to 5 pages in Basic)', 'WhatsApp chat integration', 'Basic SEO and Google submission', 'Contact forms with tracking', 'Handover and training'],
    related: ['wordpress', 'shopify', 'seo'],
    landing: {
      metaTitle: 'Website Development in Hyderabad | Website Design Freelancer',
      metaDescription:
        'Website design and development in Hyderabad: fast, mobile-first WordPress, React or Shopify websites, SEO-ready and built to generate leads.',
      h1: 'Website Design & Development in Hyderabad',
      kicker: 'Websites that sell',
      intro: [
        'A website has one job: help the right visitor take the next step. For a clinic that is booking an appointment, for a builder it is scheduling a site visit, for a store it is checking out. Everything on the page should make that step obvious.',
        'Because I also run SEO and ad campaigns, I build websites the way marketers need them — fast on mobile data, with clear calls to action, clean heading structure, schema markup and conversion tracking ready before launch.',
      ],
      sections: [
        {
          h2: 'Technologies I work with',
          body: ['I pick the platform based on what you need to manage after launch, not what is trendy:'],
          bullets: [
            'WordPress — easy for you to edit, great for content-heavy business sites and blogs.',
            'Shopify — the fastest route to a reliable online store.',
            'React / Node.js / Express / MongoDB — for custom features, dashboards and API integrations.',
            'HTML, CSS and JavaScript — for lightweight landing pages that load almost instantly.',
          ],
        },
        {
          h2: 'Built for speed, SEO and conversions',
          body: [
            'Every site gets compressed images, lazy loading, a clean URL structure, one H1 per page, meta tags, an XML sitemap, and tracking for form submissions and WhatsApp clicks. After launch I can take care of updates, backups and speed checks with a maintenance plan.',
          ],
        },
      ],
      faqs: [
        { q: 'How much does a website cost?', a: 'My Basic website package starts at ₹14,999 (one-time) for up to 5 pages on WordPress. Website redesigns start at ₹9,999 and e-commerce stores at ₹24,999. Domain and hosting are extra unless stated.' },
        { q: 'How long does a website take?', a: 'A 5-page business website usually takes one to three weeks, depending on how quickly content and feedback come in.' },
        { q: 'Can I edit the website myself?', a: 'Yes. WordPress and Shopify sites come with a short handover so you can update text, images and products.' },
        { q: 'Do you redesign existing websites?', a: 'Yes — the Website Re-Design package (₹9,999) covers a mobile-friendly design, faster pages and an SEO-friendly structure.' },
      ],
    },
  },
  {
    slug: 'wordpress',
    name: 'WordPress Development',
    short: 'Easy-to-manage WordPress sites with clean builds, sensible plugins and proper speed tuning.',
    icon: 'Blocks',
    hue: '#8D55D5',
    path: '/wordpress-development-hyderabad/',
    description:
      'Custom-styled WordPress websites, blogs and redesigns without plugin bloat — optimised for speed, security and SEO, and simple for your team to update.',
    benefits: ['Edit pages and blog posts yourself', 'Lean plugin stack, fewer security risks', 'SEO plugins configured properly', 'Backups and updates handled'],
    whoFor: ['Service businesses that publish content', 'Institutes with course pages', 'Companies moving off an old builder', 'Anyone who wants control after launch'],
    process: ['Theme and plugin plan', 'Design and build', 'Speed, security and SEO configuration', 'Training and handover'],
    deliverables: ['WordPress website', 'Contact forms and WhatsApp chat', 'SEO plugin setup and sitemap', 'Caching and image optimisation', 'Admin training'],
    related: ['website-development', 'seo', 'analytics'],
    landing: {
      metaTitle: 'WordPress Developer in Hyderabad | WordPress Website Development',
      metaDescription:
        'Freelance WordPress developer in Hyderabad. Fast, secure, SEO-ready WordPress websites, redesigns and maintenance by Peddiraju Bikkavolu (PAIDLANCER).',
      h1: 'WordPress Development in Hyderabad',
      kicker: 'WordPress Developer',
      intro: [
        'WordPress powers a huge share of business websites because it is flexible and easy to update. It also has a reputation for being slow and getting hacked — almost always because of heavy themes, dozens of plugins and no maintenance.',
        'I build WordPress sites the lean way: a light theme, only the plugins you need, caching and image optimisation configured, and an SEO plugin set up properly. You get a site your team can edit without calling a developer for every change.',
      ],
      sections: [
        {
          h2: 'WordPress services',
          body: [],
          bullets: [
            'New WordPress business websites and blogs.',
            'Redesigns and migrations from Wix, Blogger or old themes.',
            'Speed optimisation and Core Web Vitals fixes.',
            'WooCommerce stores for smaller catalogues.',
            'Monthly maintenance: updates, backups and uptime checks (₹4,999/month).',
          ],
        },
      ],
      faqs: [
        { q: 'Is WordPress good for SEO?', a: 'Yes, when it is built cleanly. Rankings depend on content, speed and structure — WordPress handles all three well if it is not overloaded with plugins.' },
        { q: 'Do you provide hosting?', a: 'Domain and hosting are not included in the Basic package, but I can recommend a host and set everything up. The Premium monthly plan includes domain and hosting.' },
        { q: 'Can you fix a slow WordPress site?', a: 'Yes. I audit plugins, images, caching and hosting, then fix the biggest bottlenecks first.' },
      ],
    },
  },
  {
    slug: 'shopify',
    name: 'Shopify E-commerce Development',
    short: 'Shopify stores that look premium, load fast and are ready for ads and sales on day one.',
    icon: 'ShoppingCart',
    hue: '#FFD84D',
    path: '/shopify-development/',
    description:
      'Shopify store setup and customisation — theme design, product pages that sell, payment and shipping setup, and Meta/Google tracking for e-commerce campaigns.',
    benefits: ['Reliable checkout and payments', 'Product pages written to convert', 'Pixel and GA4 e-commerce tracking', 'Easy product and order management'],
    whoFor: ['D2C brands and boutiques', 'Retailers going online', 'Sellers moving off marketplaces', 'Brands preparing to run ads'],
    process: ['Store plan and theme selection', 'Design, collections and product pages', 'Payments, shipping and apps', 'Tracking, testing and launch'],
    deliverables: ['Shopify store with responsive design', '1 domain name connected', 'Payment and shipping setup', 'Meta Pixel and GA4 e-commerce events', 'Store training'],
    related: ['meta-ads', 'google-ads', 'graphic-design'],
    landing: {
      metaTitle: 'Shopify Development | Shopify Store Developer in Hyderabad',
      metaDescription:
        'Shopify store development by Peddiraju Bikkavolu — premium, fast Shopify stores with payments, shipping and ad tracking set up. E-commerce package from ₹24,999.',
      h1: 'Shopify E-commerce Development',
      kicker: 'Shopify Developer',
      intro: [
        'Shopify takes care of hosting, security and checkout, so you can focus on products and marketing. What it does not do for you is make the store look trustworthy, write product pages that answer buyer doubts, or set up tracking so your ads can learn.',
        'I set up Shopify stores with those three things in mind, because I also run the Meta and Google campaigns that send traffic to them.',
      ],
      sections: [
        {
          h2: 'What my Shopify package includes',
          body: ['The E-commerce package (₹24,999, one-time) includes:'],
          bullets: [
            'Shopify store with a responsive, brand-matched design.',
            'One domain name connected.',
            'Collections, product templates and key pages (About, Contact, Policies).',
            'Payment gateway and shipping configuration.',
            'Meta Pixel and GA4 e-commerce tracking, ready for ads.',
          ],
        },
      ],
      faqs: [
        { q: 'Shopify or WordPress for my store?', a: 'Shopify is usually easier for product-focused businesses; WooCommerce on WordPress can suit smaller catalogues or content-heavy brands. I compare both in my blog article on WordPress vs Shopify.' },
        { q: 'Are Shopify’s monthly fees included?', a: 'No, Shopify’s subscription and app fees are paid directly to Shopify. My fee covers the setup and design work.' },
        { q: 'Can you run ads for my store too?', a: 'Yes — Meta Ads and Google Shopping / Performance Max campaigns are part of my services.' },
      ],
    },
  },
  {
    slug: 'lead-generation',
    name: 'Lead Generation',
    short: 'A complete system — ads, landing page, tracking and follow-up — built to bring qualified enquiries.',
    icon: 'Magnet',
    hue: '#FFE34D',
    path: '/services/#lead-generation',
    description:
      'I combine paid campaigns, a focused landing page, lead qualification and instant notifications so your team gets enquiries it can actually convert — and you can see the cost of each one.',
    benefits: ['A predictable flow of enquiries', 'Lower cost per qualified lead over time', 'Leads delivered to WhatsApp, email or Sheets', 'Clear view of which channel works'],
    whoFor: ['Real estate and interiors', 'Education and training', 'Healthcare clinics', 'B2B services'],
    process: ['Offer and audience definition', 'Landing page + form build', 'Campaign launch across Google / Meta', 'Lead-quality review and optimisation'],
    deliverables: ['Landing page', 'Ad campaigns', 'Lead routing and notifications', 'Conversion tracking', 'Weekly lead report'],
    related: ['google-ads', 'meta-ads', 'website-development'],
  },
  {
    slug: 'graphic-design',
    name: 'Graphic Design',
    short: 'Logos, posters, banners and social creatives with a consistent, premium look.',
    icon: 'Palette',
    hue: '#D9C6F5',
    path: '/services/#graphic-design',
    description:
      'Brand-consistent design for social media, ads, print and the web — from logos and brand kits to campaign creatives sized for every placement.',
    benefits: ['One consistent look across channels', 'Ad creatives sized for every placement', 'Fast turnaround on campaign assets', 'Source files you own'],
    whoFor: ['New brands needing an identity', 'Businesses running regular ads', 'Events and launches', 'Social media pages'],
    process: ['Brief and references', 'First concepts', 'Revisions', 'Final files in all formats'],
    deliverables: ['Logos and brand kits', 'Social media creatives', 'Ad banners', 'Posters and flyers', 'Editable source files'],
    related: ['social-media', 'video-editing', 'meta-ads'],
  },
  {
    slug: 'video-editing',
    name: 'Video Editing',
    short: 'Story-driven edits for reels, ads and promos that hold attention in the first three seconds.',
    icon: 'Clapperboard',
    hue: '#8D55D5',
    path: '/services/#video-editing',
    description:
      'Short-form reels, ad videos and promotional edits with captions, pacing and hooks planned for social platforms.',
    benefits: ['Hooks that stop the scroll', 'Captions for sound-off viewing', 'Formats for Reels, Shorts and feed', 'Consistent brand styling'],
    whoFor: ['Brands running Meta or YouTube ads', 'Creators and founders', 'Real-estate walkthroughs', 'Restaurants and retail'],
    process: ['Script or footage review', 'Rough cut', 'Captions, music and graphics', 'Final exports per platform'],
    deliverables: ['Reels and shorts', 'Ad video edits', 'Promotional videos', 'Subtitles', 'Platform-ready exports'],
    related: ['social-media', 'meta-ads', 'graphic-design'],
  },
  {
    slug: 'local-seo',
    name: 'Local SEO & Google Business Profile',
    short: 'Show up in the map pack when people nearby search for what you offer.',
    icon: 'MapPin',
    hue: '#FFD84D',
    path: '/services/#local-seo',
    description:
      'Google Business Profile optimisation, local citations, review strategy and location-relevant content so you appear in “near me” and map results across Hyderabad.',
    benefits: ['More calls and direction requests', 'Visibility in Google Maps', 'Consistent business details online', 'A steady stream of genuine reviews'],
    whoFor: ['Clinics, salons and gyms', 'Restaurants and cafés', 'Shops and showrooms', 'Any business serving nearby customers'],
    process: ['Profile audit and verification help', 'Categories, services, photos and posts', 'Citations and NAP consistency', 'Review request system and monitoring'],
    deliverables: ['Optimised Google Business Profile', 'Local citations', 'Weekly GBP posts', 'Review request templates', 'Monthly local ranking check'],
    related: ['seo', 'website-development', 'analytics'],
  },
  {
    slug: 'analytics',
    name: 'Marketing Analytics & Conversion Tracking',
    short: 'GA4, Meta Pixel and tag setup so you know exactly which marketing brings customers.',
    icon: 'LineChart',
    hue: '#D9C6F5',
    path: '/services/#analytics',
    description:
      'Google Analytics 4, Google Tag Manager, Meta Pixel and Conversions API set up correctly — with events for forms, calls and WhatsApp clicks, and simple dashboards you can read.',
    benefits: ['Know your real cost per lead', 'Ads that optimise on real conversions', 'One dashboard instead of five logins', 'Decisions based on data, not guesses'],
    whoFor: ['Anyone spending on ads', 'Businesses with a new website', 'Stores that need e-commerce tracking', 'Teams that want monthly clarity'],
    process: ['Tracking audit', 'GTM, GA4 and Pixel setup', 'Event and conversion testing', 'Dashboard and handover'],
    deliverables: ['GA4 property and events', 'GTM container', 'Meta Pixel + CAPI', 'Conversion tracking in ad accounts', 'Looker Studio dashboard'],
    related: ['google-ads', 'meta-ads', 'seo'],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
export const landingServices = services.filter((s) => s.landing);

export const skillGroups = [
  {
    title: 'Digital Marketing',
    items: ['SEO', 'SEM', 'Google Ads', 'Meta Ads', 'Social Media Marketing', 'Social Media Optimization', 'Lead Generation', 'Conversion Optimization', 'Retargeting', 'Google Analytics 4', 'Meta Pixel', 'Marketing Strategy', 'Local SEO'],
  },
  {
    title: 'Web Development',
    items: ['React.js', 'WordPress', 'Shopify', 'HTML', 'CSS', 'JavaScript', 'Node.js', 'Express.js', 'MongoDB', 'API Integration', 'Website Optimization', 'E-commerce'],
  },
  {
    title: 'Creative',
    items: ['Graphic Design', 'Social Media Creatives', 'Video Editing', 'Branding', 'Marketing Creatives', 'Promotional Videos'],
  },
];

// Self-assessed proficiency from the existing paidlancer.in About page.
export const proficiency = [
  { name: 'WordPress', value: 99 },
  { name: 'HTML', value: 98 },
  { name: 'Meta Ads', value: 90 },
  { name: 'Shopify', value: 90 },
  { name: 'Node.js', value: 87 },
  { name: 'CSS', value: 85 },
  { name: 'JavaScript', value: 80 },
  { name: 'SEO', value: 75 },
  { name: 'React.js', value: 75 },
];
