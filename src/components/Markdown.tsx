import { Fragment, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { slugify } from '../data/blog';

function inline(text: string, key = 0): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = key;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const t = m[0];
    if (t.startsWith('**')) out.push(<strong key={k++}>{t.slice(2, -2)}</strong>);
    else if (t.startsWith('*')) out.push(<em key={k++}>{t.slice(1, -1)}</em>);
    else {
      const [, label, href] = /\[([^\]]+)\]\(([^)]+)\)/.exec(t)!;
      out.push(
        href.startsWith('/') ? <Link key={k++} to={href}>{label}</Link> : <a key={k++} href={href} target="_blank" rel="noopener noreferrer">{label}</a>,
      );
    }
    last = m.index + t.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export default function Markdown({ source }: { source: string }) {
  const blocks: ReactNode[] = [];
  const lines = source.split('\n');
  let i = 0;
  let key = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }
    if (line.startsWith('## ')) {
      const t = line.slice(3).trim();
      blocks.push(<h2 key={key++} id={slugify(t)}>{inline(t)}</h2>);
      i++;
    } else if (line.startsWith('### ')) {
      blocks.push(<h3 key={key++}>{inline(line.slice(4).trim())}</h3>);
      i++;
    } else if (line.startsWith('- ')) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith('- ')) items.push(lines[i++].slice(2));
      blocks.push(<ul key={key++}>{items.map((it, j) => <li key={j}>{inline(it)}</li>)}</ul>);
    } else if (/^\d+\. /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\. /.test(lines[i])) items.push(lines[i++].replace(/^\d+\. /, ''));
      blocks.push(<ol key={key++}>{items.map((it, j) => <li key={j}>{inline(it)}</li>)}</ol>);
    } else {
      const para: string[] = [];
      while (i < lines.length && lines[i].trim() && !/^(## |### |- |\d+\. )/.test(lines[i])) para.push(lines[i++]);
      blocks.push(<p key={key++}>{inline(para.join(' '))}</p>);
    }
  }
  return <Fragment>{blocks}</Fragment>;
}
