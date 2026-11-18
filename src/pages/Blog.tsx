import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Seo, breadcrumbSchema } from '../lib/seo';
import { PageHero } from '../components/ui';
import { blogCategories, categoryName, posts, postsInCategory } from '../data/blog';
import { ArticleCover, BlogCard } from '../components/Cards';
import NotFound from './NotFound';

export default function Blog() {
  const { cat } = useParams();
  const [q, setQ] = useState('');
  const validCat = !cat || blogCategories.some((c) => c.slug === cat);
  const base = cat ? postsInCategory(cat) : posts;
  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return base;
    return base.filter((p) => (p.title + ' ' + p.excerpt + ' ' + p.body).toLowerCase().includes(s));
  }, [q, base]);
  if (!validCat) return <NotFound />;

  const name = cat ? categoryName(cat) : '';
  const path = cat ? `/blog/category/${cat}/` : '/blog/';
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog/' }, ...(cat ? [{ name, path }] : [])];
  const [featured, ...rest] = list;

  return (
    <>
      <Seo
        title={cat ? `${name} Articles | PAIDLANCER Blog` : 'Digital Marketing Blog | SEO, Ads & Website Guides – PAIDLANCER'}
        description={cat ? `Practical ${name} guides for businesses in Hyderabad and India from freelancer Peddiraju Bikkavolu.` : 'Practical guides on SEO, Google Ads, Meta Ads, local SEO, websites and lead generation for Hyderabad businesses — by Peddiraju Bikkavolu.'}
        path={path}
        noindex={!!cat && base.length === 0}
        schema={[breadcrumbSchema(crumbs)]}
      />
      <PageHero kicker="Blog" title={cat ? name : 'Marketing guides'} accent={cat ? 'articles.' : 'that respect your time.'} crumbsItems={crumbs}>
        Straightforward advice from real client work — no keyword stuffing, no fake statistics.
      </PageHero>

      <section className="pb-24">
        <div className="wrap">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <nav aria-label="Blog categories" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 lg:mx-0 lg:flex-wrap lg:px-0">
              <Link to="/blog/" className={`flex min-h-[40px] flex-none items-center rounded-full border px-4 text-[13.5px] ${!cat ? 'border-banana bg-banana font-semibold text-plum-950' : 'border-white/15 text-white/80 hover:border-white/40'}`}>All</Link>
              {blogCategories.map((c) => {
                const n = postsInCategory(c.slug).length;
                return (
                  <Link key={c.slug} to={`/blog/category/${c.slug}/`} className={`flex min-h-[40px] flex-none items-center gap-1.5 rounded-full border px-4 text-[13.5px] ${cat === c.slug ? 'border-banana bg-banana font-semibold text-plum-950' : 'border-white/15 text-white/80 hover:border-white/40'}`}>
                    {c.name}<span className="opacity-60">{n}</span>
                  </Link>
                );
              })}
            </nav>
            <div className="relative w-full lg:w-[300px]">
              <label htmlFor="blog-search" className="sr-only">Search articles</label>
              <Search size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-plum-200" />
              <input id="blog-search" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search articles…" className="field pl-11" />
            </div>
          </div>

          {list.length === 0 ? (
            <p className="mt-16 text-plum-200">{base.length === 0 ? 'Articles for this category are coming soon.' : `No articles match “${q}”.`}</p>
          ) : (
            <>
              {featured && !q && (
                <Link to={`/blog/${featured.slug}/`} className="group mt-12 grid items-center gap-8 lg:grid-cols-[1.3fr_1fr]">
                  <ArticleCover post={featured} large />
                  <div>
                    <span className="kicker">Latest</span>
                    <h2 className="display mt-4 text-[clamp(28px,3.2vw,44px)] transition group-hover:text-banana">{featured.title}</h2>
                    <p className="lead mt-4">{featured.excerpt}</p>
                  </div>
                </Link>
              )}
              <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                {(q ? list : rest).map((p) => <BlogCard key={p.slug} post={p} />)}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
