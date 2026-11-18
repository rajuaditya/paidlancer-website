import { useEffect, useRef } from 'react';

/** Very light ambient particles (≈40 dots). Pauses off-screen and respects reduced motion. */
export default function Particles({ count = 42, className = '' }: { count?: number; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = c.getContext('2d');
    if (!ctx) return;
    let w = 0, h = 0, raf = 0, visible = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const dots = Array.from({ length: count }, () => ({
      x: Math.random(), y: Math.random(), r: Math.random() * 1.6 + 0.4,
      vx: (Math.random() - 0.5) * 0.00012, vy: -Math.random() * 0.00022 - 0.00004,
      y2: Math.random() < 0.18, a: Math.random() * 0.5 + 0.2,
    }));
    const size = () => {
      w = c.clientWidth; h = c.clientHeight;
      c.width = w * dpr; c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    size();
    const ro = new ResizeObserver(size);
    ro.observe(c);
    let started = false;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && started) loop(); });
    io.observe(c);
    // Start after the page has settled so it never competes with first load.
    const startTimer = window.setTimeout(() => { started = true; if (visible) loop(); }, 2500);
    function loop() {
      cancelAnimationFrame(raf);
      if (!visible) return;
      ctx!.clearRect(0, 0, w, h);
      for (const d of dots) {
        d.x += d.vx * 16; d.y += d.vy * 16;
        if (d.y < -0.02) { d.y = 1.02; d.x = Math.random(); }
        if (d.x < -0.02) d.x = 1.02; if (d.x > 1.02) d.x = -0.02;
        ctx!.beginPath();
        ctx!.arc(d.x * w, d.y * h, d.r, 0, Math.PI * 2);
        ctx!.fillStyle = d.y2 ? `rgba(255,227,77,${d.a})` : `rgba(217,198,245,${d.a * 0.8})`;
        ctx!.fill();
      }
      raf = requestAnimationFrame(loop);
    }
    return () => { cancelAnimationFrame(raf); clearTimeout(startTimer); ro.disconnect(); io.disconnect(); };
  }, [count]);
  return <canvas ref={ref} aria-hidden="true" className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}
