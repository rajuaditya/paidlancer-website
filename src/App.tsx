import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import { landingServices } from './data/services';

// Route-level code splitting: only the homepage ships in the main bundle.
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const ServiceLanding = lazy(() => import('./pages/ServiceLanding'));
const LocalLanding = lazy(() => import('./pages/LocalLanding'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Contact = lazy(() => import('./pages/Contact'));
const Analyzer = lazy(() => import('./pages/Analyzer'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Resume = lazy(() => import('./pages/Resume'));

function Loading() {
  return <div className="grid min-h-[70svh] place-items-center" aria-busy="true"><span className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-banana" /></div>;
}

export default function App() {
  return (
    <Layout>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          {landingServices.map((s) => (
            <Route key={s.slug} path={s.path.replace(/\/$/, '')} element={<ServiceLanding slug={s.slug} />} />
          ))}
          <Route path="/digital-marketing-freelancer-kukatpally" element={<LocalLanding />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/category/:cat" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/website-growth-analyzer" element={<Analyzer />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}
