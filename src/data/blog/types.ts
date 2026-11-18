export type Post = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  category: string; // slug from blogCategories
  date: string; // ISO
  excerpt: string;
  coverAlt: string;
  body: string; // markdown-lite: ## h2, ### h3, - list, 1. list, **bold**, [link](/path/)
  faqs?: { q: string; a: string }[];
};

export const blogCategories = [
  { slug: 'seo', name: 'SEO' },
  { slug: 'google-ads', name: 'Google Ads' },
  { slug: 'meta-ads', name: 'Meta Ads' },
  { slug: 'social-media-marketing', name: 'Social Media Marketing' },
  { slug: 'website-development', name: 'Website Development' },
  { slug: 'ecommerce-marketing', name: 'E-commerce Marketing' },
  { slug: 'local-seo', name: 'Local SEO' },
  { slug: 'digital-marketing-tips', name: 'Digital Marketing Tips' },
  { slug: 'case-studies', name: 'Case Studies' },
];
