import { lazy, Suspense } from 'react';
import Hero from '../sections/home/Hero';
import { Seo, businessSchema, faqSchema, personSchema, websiteSchema } from '../lib/seo';
import { faqs } from '../data/content';

// Above-the-fold ships in the main bundle; the rest hydrates from a separate chunk
// (still fully server-rendered, so content and SEO are unaffected).
const load = () => import('../sections/home/Sections');
const Intro = lazy(() => load().then((m) => ({ default: m.Intro })));
const Trust = lazy(() => load().then((m) => ({ default: m.Trust })));
const AboutStory = lazy(() => load().then((m) => ({ default: m.AboutStory })));
const ServicesSection = lazy(() => load().then((m) => ({ default: m.ServicesSection })));
const WhyChoose = lazy(() => load().then((m) => ({ default: m.WhyChoose })));
const FeaturedWork = lazy(() => load().then((m) => ({ default: m.FeaturedWork })));
const Industries = lazy(() => load().then((m) => ({ default: m.Industries })));
const Testimonials = lazy(() => load().then((m) => ({ default: m.Testimonials })));
const Calculator = lazy(() => load().then((m) => ({ default: m.Calculator })));
const Process = lazy(() => load().then((m) => ({ default: m.Process })));
const BlogTeaser = lazy(() => load().then((m) => ({ default: m.BlogTeaser })));
const Faq = lazy(() => load().then((m) => ({ default: m.Faq })));
const FinalCta = lazy(() => load().then((m) => ({ default: m.FinalCta })));

export default function Home() {
  return (
    <>
      <Seo
        title="Best Digital Marketing Freelancer in Hyderabad | PAIDLANCER – Raju"
        description="Peddiraju Bikkavolu (PAIDLANCER) — digital marketing freelancer in Hyderabad for SEO, Google Ads, Meta Ads, social media and websites. 40+ clients since 2022."
        path="/"
        schema={[websiteSchema(), businessSchema(), personSchema(), faqSchema(faqs)]}
      />
      <Hero />
      {[Intro, Trust, AboutStory, ServicesSection, WhyChoose, FeaturedWork, Industries, Testimonials, Calculator, Process, BlogTeaser, Faq, FinalCta].map((S, i) => (
        <div key={i} className="cv-auto">
          <Suspense fallback={<div className="min-h-[60vh]" />}>
            <S />
          </Suspense>
        </div>
      ))}
    </>
  );
}
