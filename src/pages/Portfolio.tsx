import { Seo, breadcrumbSchema } from '../lib/seo';
import { PageHero } from '../components/ui';
import PortfolioGrid from '../components/PortfolioGrid';
import { Testimonials, FinalCta } from '../sections/home/Sections';

export default function Portfolio() {
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'Portfolio', path: '/portfolio/' }];
  return (
    <>
      <Seo
        title="Portfolio | Websites & Digital Marketing Projects – PAIDLANCER"
        description="Clients and live websites from Hyderabad freelancer Peddiraju Bikkavolu across IT, education, interiors, restaurants and e-commerce. Preview sites live."
        path="/portfolio/"
        schema={[breadcrumbSchema(crumbs)]}
      />
      <PageHero kicker="Portfolio" title="Work for real" accent="businesses." crumbsItems={crumbs}>
        25 clients across IT, education, interiors, restaurants, e-commerce and consulting. Filter by industry, and use “Preview” to open a live site full-screen.
      </PageHero>
      <section className="pb-24">
        <div className="wrap">
          <PortfolioGrid />
          <p className="mt-10 max-w-2xl text-[13px] leading-relaxed text-plum-200/70">
            Detailed case studies with goals, work done and outcomes will be added as clients approve them. I don’t publish campaign figures without a client’s permission.
          </p>
        </div>
      </section>
      <Testimonials />
      <FinalCta />
    </>
  );
}
