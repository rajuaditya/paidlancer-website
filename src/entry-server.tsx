import { renderToPipeableStream } from 'react-dom/server';
import { Writable } from 'node:stream';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';
import { SeoProvider, renderHeadTags, type HeadData } from './lib/seo';
import { landingServices } from './data/services';
import { posts, blogCategories, postsInCategory } from './data/blog';

export function render(url: string): Promise<{ html: string; head: string; noindex: boolean }> {
  const collector: { head?: HeadData } = {};
  return new Promise((resolve, reject) => {
    let html = '';
    const stream = renderToPipeableStream(
      <SeoProvider collector={collector}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </SeoProvider>,
      {
        onAllReady() {
          const sink = new Writable({
            write(chunk, _enc, cb) {
              html += chunk.toString();
              cb();
            },
          });
          sink.on('finish', () => resolve({ html, head: collector.head ? renderHeadTags(collector.head) : '', noindex: !!collector.head?.noindex }));
          stream.pipe(sink);
        },
        onError(err) {
          reject(err);
        },
      },
    );
  });
}

export function routes() {
  const list = [
    '/', '/about/', '/resume/', '/services/', '/portfolio/', '/pricing/', '/blog/', '/contact/', '/website-growth-analyzer/',
    '/digital-marketing-freelancer-kukatpally/',
    ...landingServices.map((s) => s.path),
    ...posts.map((p) => `/blog/${p.slug}/`),
    ...blogCategories.map((c) => `/blog/category/${c.slug}/`),
  ];
  const lastmod: Record<string, string> = {};
  posts.forEach((p) => (lastmod[`/blog/${p.slug}/`] = p.date));
  const emptyCats = blogCategories.filter((c) => postsInCategory(c.slug).length === 0).map((c) => `/blog/category/${c.slug}/`);
  return { list, lastmod, emptyCats };
}
