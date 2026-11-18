import { useCallback, useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { track } from '../lib/analytics';

export const INTRO_TEXT = 'Hey hi! My name is Raju. I’m a digital marketing freelancer.';

// Drop Raju's own recording at src/assets/audio/raju-intro.mp3 (or .m4a/.wav/.ogg) and it is used
// automatically. Until then the browser's built-in voice reads the line (an Indian-English voice when available).
const recordings = import.meta.glob('../assets/audio/raju-intro.*', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;
const recorded = Object.values(recordings)[0] as string | undefined;

type State = 'idle' | 'playing' | 'waiting';
const SESSION_KEY = 'pl-voice-intro';

function pickVoice(): SpeechSynthesisVoice | null {
  const vs = window.speechSynthesis?.getVoices() || [];
  const by = (f: (v: SpeechSynthesisVoice) => boolean) => vs.find(f) || null;
  return (
    by((v) => /en[-_]IN/i.test(v.lang) && /ravi|prabhat|rishi|male|hemant/i.test(v.name)) ||
    by((v) => /en[-_]IN/i.test(v.lang)) ||
    by((v) => /^en[-_](GB|US)/i.test(v.lang) && /male|daniel|david|guy|ryan/i.test(v.name)) ||
    by((v) => /^en/i.test(v.lang))
  );
}

export default function VoiceIntro({ className = '' }: { className?: string }) {
  const [state, setState] = useState<State>('idle');
  const [supported, setSupported] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const armed = useRef<(() => void) | null>(null);

  const stop = useCallback(() => {
    audioRef.current?.pause();
    if (!recorded) window.speechSynthesis?.cancel();
    setState('idle');
  }, []);

  const disarm = () => {
    if (armed.current) {
      window.removeEventListener('pointerdown', armed.current);
      window.removeEventListener('keydown', armed.current);
      armed.current = null;
    }
  };

  const play = useCallback((auto = false) => {
    disarm();
    // Browsers only allow sound after the visitor interacts with the page,
    // so an auto-play attempt that gets blocked waits for the first tap or key press.
    const arm = () => {
      setState('waiting');
      const once = () => play(false);
      armed.current = once;
      window.addEventListener('pointerdown', once, { once: true });
      window.addEventListener('keydown', once, { once: true });
    };
    const started = () => {
      setState('playing');
      try { sessionStorage.setItem(SESSION_KEY, '1'); } catch { /* storage unavailable */ }
      track('voice_intro_play', { auto, source: recorded ? 'recording' : 'tts' });
    };

    if (recorded) {
      const a = audioRef.current || new Audio(recorded);
      audioRef.current = a;
      a.currentTime = 0;
      a.onended = () => setState('idle');
      a.play().then(started).catch(() => (auto ? arm() : setState('idle')));
      return;
    }

    const synth = window.speechSynthesis;
    if (!synth || typeof SpeechSynthesisUtterance === 'undefined') return setSupported(false);
    synth.cancel();
    const u = new SpeechSynthesisUtterance(INTRO_TEXT);
    const v = pickVoice();
    if (v) { u.voice = v; u.lang = v.lang; } else u.lang = 'en-IN';
    u.rate = 0.98;
    u.pitch = 1;
    let didStart = false;
    u.onstart = () => { didStart = true; started(); };
    u.onend = () => setState('idle');
    u.onerror = (e) => {
      if (e.error === 'not-allowed' && auto) arm();
      else if (e.error !== 'interrupted' && e.error !== 'canceled') setState('idle');
    };
    synth.speak(u);
    if (auto) {
      // Some browsers block silently without firing an error.
      window.setTimeout(() => { if (!didStart) { synth.cancel(); arm(); } }, 1200);
    }
  }, []);

  useEffect(() => {
    if (!recorded && !('speechSynthesis' in window)) { setSupported(false); return; }
    let played = false;
    try { played = sessionStorage.getItem(SESSION_KEY) === '1'; } catch { /* ignore */ }
    if (played) return;
    // Voices load asynchronously in Chrome; wait briefly, then try to greet.
    const go = () => play(true);
    const t = window.setTimeout(go, 1100);
    return () => { clearTimeout(t); disarm(); window.speechSynthesis?.cancel(); audioRef.current?.pause(); };
  }, [play]);

  if (!supported) return null;
  const playing = state === 'playing';

  return (
    <div className={`glass-strong glow-border flex w-max max-w-[300px] items-center gap-3 rounded-2xl rounded-bl-md py-2 pl-2 pr-4 shadow-glow ${className}`}>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); playing ? stop() : play(false); }}
        aria-label={playing ? 'Stop Raju’s voice note' : 'Play Raju’s voice note'}
        className="relative grid h-11 w-11 flex-none place-items-center rounded-full bg-banana text-plum-950 transition hover:scale-105"
      >
        {state === 'waiting' && <span className="absolute inset-0 animate-ping2 rounded-full bg-banana/60" aria-hidden="true" />}
        {playing ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="translate-x-[1px]" />}
      </button>
      <div className="min-w-0">
        <div className="flex h-5 items-center gap-[3px]" aria-hidden="true">
          {[6, 12, 18, 10, 16, 8, 14, 20, 9, 15, 7, 13, 17, 10, 6].map((h, i) => (
            <span
              key={i}
              className={`w-[3px] rounded-full ${playing ? 'bg-banana' : 'bg-white/45'}`}
              style={{ height: h, animation: playing ? `voicebar .9s ease-in-out ${i * 0.06}s infinite` : undefined }}
            />
          ))}
        </div>
        <p className="mt-1 text-[12px] leading-tight text-plum-100/85" aria-live="polite">
          {playing ? '“Hey hi! My name is Raju…”' : state === 'waiting' ? 'Tap anywhere to hear Raju' : 'Voice note from Raju'}
        </p>
      </div>
    </div>
  );
}
