import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Link2, MessageCircle, Check } from 'lucide-react';
import { Seo, absUrl, breadcrumbSchema, faqSchema } from '../lib/seo';
import { SITE_URL, site } from '../data/site';
import { Breadcrumbs, FaqAccordion, MagneticButton } from '../components/ui';
import { categoryName, getPost, readingTime, relatedPosts, toc } from '../data/blog';
import { ArticleCover, BlogCard } from '../components/Cards';
import Markdown from '../components/Markdown';
import NotFound from './NotFound';
import avatar from '../assets/img/raju-suit-400.webp';

function Share({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const e = encodeURIComponent;
  const links = [
    { label: 'Share on WhatsApp', href: `https://wa.me/?text=${e(title + ' ' + url)}`, glyph: <MessageCircle size={17} /> },
    { label: 'Share on LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${e(url)}`, glyph: <span className="text-[14px] font-bold">in</span> },
    { label: 'Share on Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${e(url)}`, glyph: <span className="text-[16px] font-bold">f</span> },
    { label: 'Share on X', href: `https://twitter.com/intent/tweet?url=${e(url)}&text=${e(title)}`, glyph: <span className="text-[14px] font-bold">X</span> },
  ];
  return (
    <div className="flex flex-wrap items-center gap-2">
      {links.map(({ label, href, glyph }) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="grid h-11 w-11 place-items-center rounded-xl border border-white/15 text-white/80 transition hover:border-banana hover:text-banana">{glyph}</a>
      ))}
      <button type="button" aria-label="Copy link" onClick={() => { navigator.clipboard?.writeText(url).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1800); }); }} className="grid h-11 w-11 place-items-center rounded-xl border border-white/15 text-white/80 transition hover:border-banana hover:text-banana">
        {copied ? <Check size={17} className="text-banana" /> : <Link2 size={17} />}
      </button>
    </div>
  );
}

export default function BlogPost() {
  const { slug = '' } = useParams();
  const post = getPost(slug);
  const [active, setActive] = useState('');
  useEffect(() => {
    if (!post) return;
    const hs = Array.from(document.querySelectorAll<HTMLElement>('.article h2[id]'));
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: '0px 0px -70% 0px' });
    hs.forEach((h) => io.observe(h));
    return () => io.disconnect();
  }, [post]);
  if (!post) return <NotFound />;

  const path = `/blog/${post.slug}/`;
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog/' }, { name: categoryName(post.category), path: `/blog/category/${post.category}/` }, { name: post.title, path }];
  const contents = toc(post);
  const article = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: absUrl(path),
    image: SITE_URL + '/og-image.jpg',
    author: { '@type': 'Person', '@id': SITE_URL + '/#person', name: site.owner.name, url: SITE_URL + '/about/' },
    publisher: { '@id': SITE_URL + '/#business' },
    articleSection: categoryName(post.category),
    wordCount: post.body.split(/\s+/).length,
    inLanguage: 'en-IN',
  };

  return (
    <>
      <Seo title={post.metaTitle.length <= 56 ? post.metaTitle + ' | PAIDLANCER' : post.metaTitle} description={post.metaDescription} path={path} type="article" publishedTime={post.date} modifiedTime={post.date} schema={[article, breadcrumbSchema(crumbs), ...(post.faqs ? [faqSchema(post.faqs)] : [])]} />
      <article>
        <header className="pb-10 pt-32 sm:pt-40">
          <div className="wrap max-w-[920px]">
            <Breadcrumbs items={crumbs} />
            <Link to={`/blog/category/${post.category}/`} className="kicker mt-8 hover:text-banana">{categoryName(post.category)}</Link>
            <h1 className="display mt-5 text-[clamp(2.2rem,5vw,4.2rem)] leading-[1]">{post.title}</h1>
            <p className="lead mt-6">{post.excerpt}</p>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-5 border-y border-white/10 py-5">
              <div className="flex items-center gap-3">
                <img src={avatar} alt="" width={44} height={44} className="h-11 w-11 rounded-full object-cover ring-2 ring-banana/60" />
                <div className="text-[14px]">
                  <Link to="/about/" className="font-semibold hover:text-banana">{site.owner.name}</Link>
                  <p className="text-plum-200"><time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</time> · {readingTime(post)} min read</p>
                </div>
              </div>
              <Share url={absUrl(path)} title={post.title} />
            </div>
          </div>
        </header>
        <div className="wrap max-w-[1180px]">
          <ArticleCover post={post} large />
        </div>
        <div className="wrap mt-14 grid max-w-[1180px] gap-12 lg:grid-cols-[240px_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <nav aria-label="Table of contents" className="glass rounded-2xl p-5">
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-banana">Contents</p>
              <ol className="mt-3 space-y-2 text-[14px]">
                {contents.map((c) => (
                  <li key={c.id}><a href={`#${c.id}`} className={`block border-l-2 py-0.5 pl-3 transition ${active === c.id ? 'border-banana text-white' : 'border-white/10 text-plum-200 hover:text-white'}`}>{c.text}</a></li>
                ))}
              </ol>
            </nav>
          </aside>
          <div className="min-w-0 max-w-[720px]">
            <div className="article"><Markdown source={post.body} /></div>
            {post.faqs && (
              <section className="mt-14">
                <h2 className="display mb-6 text-[32px]">FAQs</h2>
                <FaqAccordion items={post.faqs} defaultOpen={-1} />
              </section>
            )}
            <div className="glass glow-border mt-14 flex flex-col gap-5 rounded-[22px] p-7 sm:flex-row sm:items-center">
              <img src={avatar} alt="Peddiraju Bikkavolu" width={72} height={72} className="h-[72px] w-[72px] flex-none rounded-full object-cover" />
              <div className="flex-1">
                <p className="text-[12px] uppercase tracking-[0.18em] text-plum-200">About the author</p>
                <p className="mt-1 text-[18px] font-semibold">{site.owner.name}</p>
                <p className="mt-1 text-[14.5px] text-plum-100/80">Digital marketing freelancer and web developer in Hyderabad. Founder of PAIDLANCER, working with 40+ businesses since 2022.</p>
              </div>
              <MagneticButton to="/contact/">Work with me</MagneticButton>
            </div>
          </div>
        </div>
      </article>
      <section className="section">
        <div className="wrap">
          <h2 className="display text-[clamp(30px,3.6vw,48px)]">Related <span className="serif-i font-normal text-banana">articles</span></h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">{relatedPosts(post).map((p) => <BlogCard key={p.slug} post={p} />)}</div>
        </div>
      </section>
    </>
  );
}
