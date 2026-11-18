import { Link } from 'react-router-dom';
import {
  UserRound, Briefcase, Sparkles, Layers, Building2, GraduationCap, Download, Printer, MapPin, Rocket, Mail, Phone, Globe,
  MessageCircle, ChevronRight, Check, Megaphone, Search, MonitorSmartphone, ArrowUpRight,
} from 'lucide-react';
import { Seo, breadcrumbSchema, personSchema } from '../lib/seo';
import { site } from '../data/site';
import { skillGroups, proficiency } from '../data/services';
import { clients, testimonials } from '../data/content';
import { mailLink, telLink, waLink } from '../lib/contact';
import { track } from '../lib/analytics';
import photo from '../assets/img/raju-suit-720.webp';

// The PDF is generated from this page (scripts/resume-pdf.mjs) and lives in src/assets/resume/.
const pdfs = import.meta.glob('../assets/resume/*.pdf', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;
const pdfUrl = Object.values(pdfs)[0] as string | undefined;
const PDF_NAME = 'Peddiraju-Bikkavolu-Resume.pdf';

const nav = [
  { id: 'profile', label: 'Profile', icon: UserRound },
  { id: 'experience', label: 'Experience', icon: Briefcase, count: 3 },
  { id: 'skills', label: 'Skills', icon: Sparkles, count: skillGroups.reduce((a, g) => a + g.items.length, 0) },
  { id: 'services', label: 'Services', icon: Layers, count: 6 },
  { id: 'clients', label: 'Clients', icon: Building2, count: clients.length },
  { id: 'education', label: 'Education', icon: GraduationCap, count: 1 },
];

const featuredClients = clients.filter((c) => c.url).slice(0, 5);

function Leaves() {
  return (
    <svg viewBox="0 0 200 240" className="w-full" aria-hidden="true">
      <path d="M100 236c-34 0-46-24-46-52 0-24 14-40 46-40s46 16 46 40c0 28-12 52-46 52Z" fill="#D9C6F5" fillOpacity=".55" />
      <path d="M100 150V40" stroke="#D9C6F5" strokeOpacity=".7" strokeWidth="2" />
      {[
        [100, 60, -38, -18], [100, 78, 36, -14], [100, 96, -44, -6], [100, 112, 40, 2], [100, 128, -30, 8], [100, 46, 22, -30],
      ].map(([x, y, dx, dy], i) => (
        <path key={i} d={`M${x} ${y}c${dx * 0.3} ${dy - 14} ${dx} ${dy - 10} ${dx} ${dy}c${-dx * 0.6} ${10} ${-dx} ${4} ${-dx} 0Z`} fill={i % 2 ? '#8D55D5' : '#EFE6FC'} fillOpacity={i % 2 ? 0.8 : 0.55} />
      ))}
    </svg>
  );
}

export default function Resume() {
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'Resume', path: '/resume/' }];
  return (
    <>
      <Seo
        title="Resume — Peddiraju Bikkavolu | Digital Marketing Freelancer, Hyderabad"
        description="Resume of Peddiraju Bikkavolu: digital marketing freelancer and web developer in Hyderabad. Experience, skills, services, clients and education — view online or download as PDF."
        path="/resume/"
        type="profile"
        schema={[personSchema(), breadcrumbSchema(crumbs)]}
      />
      <section className="resume-page px-3 pb-24 pt-28 sm:px-6 sm:pt-32">
        <div className="mx-auto grid max-w-[1180px] overflow-hidden rounded-[28px] border border-white/10 bg-[#261052] shadow-glow lg:grid-cols-[260px_minmax(0,1fr)]">
          {/* Sidebar */}
          <aside className="resume-side relative flex flex-col overflow-hidden bg-gradient-to-b from-plum-700 to-plum-900 p-5 sm:p-7">
            <p className="text-[13px] text-plum-100/80">Resume</p>
            <p className="mt-1 text-[24px] font-semibold leading-tight">Peddiraju<br className="hidden lg:block" /> Bikkavolu</p>
            <nav aria-label="Resume sections" className="mt-6 lg:mt-8">
              <ul className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:gap-1.5 lg:overflow-visible">
                {nav.map(({ id, label, icon: I, count }, k) => (
                  <li key={id} className="flex-none">
                    <a href={`#${id}`} className={`flex min-h-[44px] items-center gap-3 rounded-xl px-3.5 text-[14.5px] transition ${k === 0 ? 'bg-white/90 font-semibold text-plum-900' : 'text-white/85 hover:bg-white/10'}`}>
                      <I size={18} /> {label}
                      {count !== undefined && <span className={`ml-auto hidden h-6 min-w-6 place-items-center rounded-full px-1.5 text-[11.5px] lg:grid ${k === 0 ? 'bg-plum-200' : 'bg-white/15'}`}>{count}</span>}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-auto hidden w-[85%] pt-10 lg:block"><Leaves /></div>
          </aside>

          {/* Main */}
          <div className="min-w-0 space-y-5 bg-[#2b1260]/60 p-4 sm:p-7">
            {/* top bar */}
            <div className="resume-toolbar flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white/[0.06] px-5 py-4">
              <h1 className="text-[22px] font-semibold">My resume</h1>
              <div className="flex flex-wrap gap-2">
                {pdfUrl && (
                  <a href={pdfUrl} download={PDF_NAME} onClick={() => track('resume_download')} className="btn-primary min-h-[44px] px-4 text-[14px] shadow-none">
                    <Download size={17} /> Download PDF
                  </a>
                )}
                <button type="button" onClick={() => window.print()} className="btn-ghost min-h-[44px] px-4 text-[14px]"><Printer size={17} /> Print</button>
              </div>
            </div>

            {/* profile */}
            <div id="profile" className="scroll-mt-28 rounded-[22px] bg-white/[0.06] p-5 sm:p-7">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                <div className="relative mx-auto h-[170px] w-[170px] flex-none overflow-hidden rounded-full bg-gradient-to-br from-plum-400 to-plum-700 ring-4 ring-white/10 sm:mx-0 sm:h-[190px] sm:w-[190px]">
                  <img src={photo} alt="Peddiraju Bikkavolu" width={720} height={720} className="h-full w-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-[28px] font-semibold leading-tight">{site.owner.name}</h2>
                  <p className="mt-1 text-[15px] text-banana">Digital Marketing Freelancer &amp; Web Developer · {site.brand}</p>
                  <ul className="mt-4 grid gap-2.5 text-[14.5px] text-plum-100/90 sm:grid-cols-2">
                    <li className="flex items-center gap-2.5"><MapPin size={16} className="flex-none text-plum-200" /> Kukatpally, Hyderabad, India</li>
                    <li className="flex items-center gap-2.5"><Rocket size={16} className="flex-none text-plum-200" /> Freelancing since 2022</li>
                    <li className="flex items-center gap-2.5"><GraduationCap size={16} className="flex-none text-plum-200" /> B.Sc. Computer Science (2024)</li>
                    <li className="flex min-w-0 items-center gap-2.5"><Mail size={16} className="flex-none text-plum-200" /> <a href={mailLink('Hello Raju')} className="truncate hover:text-banana">{site.email}</a></li>
                    <li className="flex items-center gap-2.5"><Phone size={16} className="flex-none text-plum-200" /> <a href={telLink} className="hover:text-banana">{site.phone}</a></li>
                    <li className="flex items-center gap-2.5"><Globe size={16} className="flex-none text-plum-200" /> paidlancer.in</li>
                  </ul>
                  <div className="resume-actions mt-5 flex gap-2">
                    {[
                      { href: waLink('Hi Raju, I saw your resume on paidlancer.in.'), label: 'WhatsApp', icon: MessageCircle },
                      { href: mailLink('Hello Raju'), label: 'Email', icon: Mail },
                      { href: telLink, label: 'Call', icon: Phone },
                    ].map(({ href, label, icon: I }) => (
                      <a key={label} href={href} aria-label={label} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="grid h-10 w-10 place-items-center rounded-full bg-plum-400/80 text-white transition hover:bg-banana hover:text-plum-950"><I size={17} /></a>
                    ))}
                  </div>
                </div>
              </div>
              <p className="mt-6 border-t border-white/10 pt-5 text-[15px] leading-relaxed text-plum-100/85">
                Self-taught digital marketer who started freelancing in 2022 and has since worked with 40+ clients across 9+ industries — from training institutes and IT companies to interior designers, restaurants and online stores. I combine marketing strategy (SEO, Google Ads, Meta Ads, social media) with hands-on web development (WordPress, Shopify, React), so campaigns and the websites they depend on are planned, built and measured together.
              </p>
            </div>

            <div className="grid gap-5 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,.75fr)]">
              {/* experience timeline */}
              <div id="experience" className="scroll-mt-28 rounded-[22px] bg-white/[0.06] p-5 sm:p-7">
                <h2 className="text-[19px] font-semibold">Experience</h2>
                <ol className="relative mt-5 space-y-4 pl-8 before:absolute before:bottom-6 before:left-[11px] before:top-6 before:w-px before:bg-plum-400/60">
                  {[
                    { icon: Briefcase, title: 'Founder & Digital Marketing Freelancer', org: 'PAIDLANCER · Hyderabad', time: '2022 – Present', tag: 'Current', points: ['Plan and run SEO, Google Ads and Meta Ads for startups, SMEs and growing brands', 'Work directly with clients from brief to monthly reporting'] },
                    { icon: MonitorSmartphone, title: 'Website Design & Development', org: 'Client projects', time: '2022 – Present', tag: 'Ongoing', points: ['Business websites, landing pages and stores on WordPress, Shopify and React', 'Speed, SEO structure and conversion tracking (GA4, GTM, Meta Pixel) built in'] },
                    { icon: Megaphone, title: 'Creative & Social Media', org: 'Client campaigns', time: '2022 – Present', tag: 'Ongoing', points: ['Social media creatives, ad designs and short-form video edits', 'Content calendars and profile optimisation'] },
                  ].map(({ icon: I, title, org, time, tag, points }) => (
                    <li key={title} className="relative">
                      <span className="absolute -left-8 top-6 grid h-[23px] w-[23px] place-items-center rounded-full border-2 border-plum-400 bg-[#2b1260]"><span className="h-2 w-2 rounded-full bg-plum-200" /></span>
                      <div className="flex gap-4 rounded-2xl bg-plum-400/15 p-4">
                        <span className="grid h-14 w-14 flex-none place-items-center rounded-full bg-plum-200/20 text-plum-100"><I size={22} /></span>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-start justify-between gap-2">
                            <p className="font-semibold leading-snug">{title}</p>
                            <span className="rounded-md bg-banana px-2 py-0.5 text-[11px] font-bold text-plum-950">{tag}</span>
                          </div>
                          <p className="text-[13px] text-plum-200">{org} · {time}</p>
                          <ul className="mt-2 space-y-1 text-[13.5px] text-plum-100/85">
                            {points.map((pt) => <li key={pt} className="flex gap-2"><Check size={14} className="mt-1 flex-none text-banana" />{pt}</li>)}
                          </ul>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="space-y-5">
                {/* education */}
                <div id="education" className="scroll-mt-28 rounded-[22px] bg-white/[0.06] p-5 sm:p-6">
                  <h2 className="text-[19px] font-semibold">Education</h2>
                  <div className="mt-4 flex items-center gap-4 rounded-2xl bg-white/[0.05] p-4">
                    <span className="grid h-12 w-12 flex-none place-items-center rounded-xl bg-plum-200/20 text-plum-100"><GraduationCap size={22} /></span>
                    <div>
                      <p className="font-semibold">B.Sc. Computer Science</p>
                      <p className="text-[13px] text-plum-200">Graduated 2024</p>
                    </div>
                  </div>
                </div>
                {/* hire card */}
                <div id="services" className="resume-hire scroll-mt-28 rounded-[22px] bg-gradient-to-br from-plum-500 to-plum-700 p-6">
                  <h2 className="text-[21px] font-semibold leading-tight">Hire me for</h2>
                  <ul className="mt-4 space-y-2 text-[14px]">
                    {['SEO & Local SEO', 'Google Ads management', 'Meta (Facebook & Instagram) Ads', 'Social media marketing', 'Website & Shopify development', 'Lead generation & tracking'].map((x) => (
                      <li key={x} className="flex gap-2.5"><Check size={16} className="mt-0.5 flex-none text-banana" />{x}</li>
                    ))}
                  </ul>
                  <Link to="/contact/#book" className="mt-6 flex min-h-[46px] items-center justify-center rounded-xl bg-banana font-semibold text-plum-950 transition hover:-translate-y-0.5">Book a consultation</Link>
                </div>
              </div>
            </div>

            {/* skills */}
            <div id="skills" className="scroll-mt-28 rounded-[22px] bg-white/[0.06] p-5 sm:p-7">
              <h2 className="text-[19px] font-semibold">Skills</h2>
              <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,.7fr)]">
                <div className="space-y-5">
                  {skillGroups.map((g) => (
                    <div key={g.title}>
                      <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-banana">{g.title}</p>
                      <ul className="mt-2 flex flex-wrap gap-1.5">
                        {g.items.map((s) => <li key={s} className="rounded-full bg-white/[0.07] px-3 py-1 text-[13px]">{s}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  {proficiency.slice(0, 7).map((p) => (
                    <div key={p.name}>
                      <div className="flex justify-between text-[13px]"><span>{p.name}</span><span className="text-plum-200">{p.value}%</span></div>
                      <div className="mt-1 h-1.5 rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-plum-400 to-banana" style={{ width: `${p.value}%` }} /></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* clients */}
            <div id="clients" className="scroll-mt-28 rounded-[22px] bg-white/[0.06] p-5 sm:p-7">
              <div className="flex items-center justify-between">
                <h2 className="text-[19px] font-semibold">Selected clients</h2>
                <Link to="/portfolio/" className="resume-actions text-[13px] text-banana hover:underline">All {clients.length} clients</Link>
              </div>
              <ul className="mt-3 divide-y divide-white/[0.07]">
                {featuredClients.map((c, k) => {
                  const Icon = [Search, Building2, Megaphone, MonitorSmartphone, Sparkles][k % 5];
                  return (
                    <li key={c.name}>
                      <a href={c.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 py-3.5">
                        <span className="grid h-11 w-11 flex-none place-items-center rounded-full bg-plum-400/25 text-plum-100"><Icon size={18} /></span>
                        <span className="min-w-0 flex-1">
                          <span className="block font-semibold">{c.name}</span>
                          <span className="block text-[13px] text-plum-200">{c.industry}</span>
                        </span>
                        <span className="hidden text-[13px] text-plum-200 sm:block">{new URL(c.url!).hostname.replace(/^www\./, '')}</span>
                        <ChevronRight size={18} className="text-plum-200" />
                      </a>
                    </li>
                  );
                })}
              </ul>
              <blockquote className="mt-4 rounded-2xl bg-white/[0.05] p-4 text-[14px] text-plum-100/90">
                <p className="serif-i text-[19px] leading-snug text-white">“{testimonials[0].quote}”</p>
                <footer className="mt-2 text-[12.5px] text-plum-200">— {testimonials[0].name}, {testimonials[0].role}</footer>
              </blockquote>
            </div>

            <p className="resume-actions text-center text-[13px] text-plum-200">
              Prefer to talk? <a href={waLink('Hi Raju, I saw your resume.')} target="_blank" rel="noopener noreferrer" className="text-banana underline underline-offset-4">Message me on WhatsApp</a> <ArrowUpRight size={13} className="inline" />
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
