import { postsA } from './posts-a';
import { postsB } from './posts-b';
import { blogCategories, type Post } from './types';

export { blogCategories };
export type { Post };

export const posts: Post[] = [...postsA, ...postsB].sort((a, b) => b.date.localeCompare(a.date));

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
export const categoryName = (slug: string) => blogCategories.find((c) => c.slug === slug)?.name || slug;
export const postsInCategory = (slug: string) => posts.filter((p) => p.category === slug);

export const readingTime = (p: Post) => Math.max(3, Math.round(p.body.split(/\s+/).length / 220));

export const slugify = (s: string) =>
  s.toLowerCase().replace(/[*`]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export function relatedPosts(p: Post, n = 3) {
  const same = posts.filter((x) => x.slug !== p.slug && x.category === p.category);
  const rest = posts.filter((x) => x.slug !== p.slug && x.category !== p.category);
  return [...same, ...rest].slice(0, n);
}

export const toc = (p: Post) =>
  p.body
    .split('\n')
    .filter((l) => l.startsWith('## '))
    .map((l) => ({ text: l.slice(3).trim(), id: slugify(l.slice(3)) }));
