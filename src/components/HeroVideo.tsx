import { useEffect, useRef, useState } from 'react';
import video720 from '../assets/video/hero-raju-720.mp4';
import video480 from '../assets/video/hero-raju-480.mp4';
import posterFirst from '../assets/video/hero-poster-first.webp';
import finalLg from '../assets/video/hero-final-1600.webp';
import finalSm from '../assets/video/hero-final-800.webp';

/**
 * Raju's hero video — muted, inline, plays once and holds on the last frame
 * then crossfades into Raju's portrait. Only the variant for the current screen size loads.
 * Reduced-motion visitors see the portrait straight away.
 */
export default function HeroVideo({ variant, className = '', style }: { variant: 'desktop' | 'mobile'; className?: string; style?: React.CSSProperties }) {
  const [active, setActive] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [ended, setEnded] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const upd = () => setActive(variant === 'desktop' ? mq.matches : !mq.matches);
    upd();
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    mq.addEventListener?.('change', upd);
    return () => mq.removeEventListener?.('change', upd);
  }, [variant]);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true; // must be set as a property for autoplay to be allowed everywhere
    v.defaultMuted = true;
    v.play().catch(() => { /* autoplay refused (e.g. data saver): the poster stays */ });
  }, [active, reduced]);

  return (
    <div className={`pointer-events-none overflow-hidden ${className}`} style={style} aria-hidden="true">
      <img src={posterFirst} alt="" width={1280} height={720} decoding="async" className="absolute inset-0 h-full w-full object-cover" />
      {active && !reduced && (
        <video ref={ref} muted autoPlay playsInline preload="auto" poster={posterFirst} disablePictureInPicture onEnded={() => setEnded(true)} className="absolute inset-0 h-full w-full object-cover">
          <source src={variant === 'desktop' ? video720 : video480} type="video/mp4" />
        </video>
      )}
      {/* Final portrait: fades in when the video finishes (or immediately for reduced motion) */}
      {(ended || reduced) && (
        <img
          src={variant === 'desktop' ? finalLg : finalSm}
          srcSet={`${finalSm} 800w, ${finalLg} 1600w`}
          sizes={variant === 'desktop' ? '100vw' : '92vw'}
          alt=""
          width={1600}
          height={967}
          decoding="async"
          className="absolute inset-0 h-full w-full animate-[fadein_1.1s_ease_both] object-cover"
        />
      )}
    </div>
  );
}
