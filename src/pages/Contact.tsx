import { MessageCircle, Phone, Mail, MapPin } from 'lucide-react';
import { Seo, breadcrumbSchema, businessSchema } from '../lib/seo';
import { PageHero, Reveal, SectionHeading } from '../components/ui';
import { BookingForm, DiscoveryWizard } from '../components/Forms';
import { site } from '../data/site';
import { mailLink, telLink, waLink } from '../lib/contact';
import { track } from '../lib/analytics';

export default function Contact() {
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact/' }];
  const methods = [
    { icon: MessageCircle, label: 'WhatsApp', value: site.phone, href: waLink('Hi Raju, I found you on paidlancer.in and want to discuss my business.'), ev: 'whatsapp_click' },
    { icon: Phone, label: 'Call', value: site.phone, href: telLink, ev: 'call_click' },
    { icon: Mail, label: 'Email', value: site.email, href: mailLink('Project enquiry from paidlancer.in'), ev: 'email_click' },
    { icon: MapPin, label: 'Visit', value: 'Kukatpally, Hyderabad', href: 'https://www.google.com/maps/search/?api=1&query=Venkatrao+Nagar+Road+No+3+Kukatpally+Hyderabad', ev: 'map_click' },
  ];
  return (
    <>
      <Seo
        title="Contact Raju | Hire a Digital Marketing Freelancer in Hyderabad"
        description="Contact Peddiraju Bikkavolu (PAIDLANCER) for SEO, ads and website projects. WhatsApp +91 94925 22824 or book a free consultation."
        path="/contact/"
        schema={[businessSchema(), breadcrumbSchema(crumbs)]}
      />
      <PageHero kicker="Contact" title="Let’s grow" accent="your business." crumbsItems={crumbs}>
        WhatsApp is the fastest way to reach me. Prefer structure? Answer five quick questions or book a consultation below.
      </PageHero>

      <section className="pb-16">
        <div className="wrap grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {methods.map(({ icon: I, label, value, href, ev }, i) => (
            <Reveal key={label} delay={i * 60}>
              <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" onClick={() => track(ev, { source: 'contact_page' })} className="glass group flex h-full items-center gap-4 rounded-2xl p-5 transition hover:border-banana/50">
                <span className="grid h-12 w-12 flex-none place-items-center rounded-xl bg-banana text-plum-950 transition group-hover:rotate-[-6deg]"><I size={20} /></span>
                <span className="min-w-0">
                  <span className="block text-[12.5px] text-plum-200">{label}</span>
                  <span className="block truncate font-semibold">{value}</span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="discover" className="section scroll-mt-20 bg-plum-900/40">
        <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,.75fr)_minmax(0,1.25fr)]">
          <SectionHeading kicker="Project discovery" title="Five questions," accent="one clear brief.">
            Pick your answers and I’ll get a ready-made summary — so our first conversation starts with your goals, not small talk.
          </SectionHeading>
          <DiscoveryWizard />
        </div>
      </section>

      <section id="book" className="section scroll-mt-20">
        <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,.75fr)_minmax(0,1.25fr)]">
          <SectionHeading kicker="Consultation" title="Book a free" accent="consultation.">
            30 minutes to understand your business, review what you’re doing now and agree on next steps. In person in Kukatpally, or online.
          </SectionHeading>
          <BookingForm />
        </div>
      </section>
    </>
  );
}
