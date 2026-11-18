import { useLocation } from 'react-router-dom';
import { Seo } from '../lib/seo';
import { MagneticButton } from '../components/ui';

export default function NotFound() {
  const loc = useLocation();
  return (
    <>
      <Seo title="Page not found | PAIDLANCER" description="This page doesn’t exist. Explore digital marketing services, the blog or contact Raju." path={loc.pathname} noindex />
      <section className="grid min-h-[80svh] place-items-center px-5 pt-24 text-center">
        <div>
          <p className="display text-[clamp(110px,22vw,240px)] leading-none text-white/10">404</p>
          <h1 className="display -mt-6 text-[clamp(34px,5vw,60px)]">This page took <span className="serif-i font-normal text-banana">a wrong turn.</span></h1>
          <p className="lead mx-auto mt-4 max-w-md">The link may be old or mistyped. Let’s get you somewhere useful.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <MagneticButton to="/">Back to home</MagneticButton>
            <MagneticButton to="/services/" variant="ghost">View services</MagneticButton>
          </div>
        </div>
      </section>
    </>
  );
}
