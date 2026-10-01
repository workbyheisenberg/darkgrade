import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ClosingSectionProps {
  onWatchVideo: () => void;
  onOpenStarModal: () => void;
}

export default function ClosingSection({ onWatchVideo, onOpenStarModal }: ClosingSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLParagraphElement>(null);
  const punchlineRef = useRef<HTMLDivElement>(null);

  const creamPart = 'Somewhere, two people have a podcast in their heads';
  const dimPart = 'the world will never hear.';

  const creamWords = creamPart.split(' ');
  const dimWords = dimPart.split(' ');

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const wordElements = wordsRef.current?.querySelectorAll('.closing-word');
    if (wordElements && wordElements.length > 0 && containerRef.current) {
      gsap.fromTo(
        wordElements,
        { opacity: 0.15, filter: 'blur(4px)' },
        {
          opacity: 1,
          filter: 'blur(0px)',
          ease: 'none',
          stagger: 0.04,
          scrollTrigger: {
            trigger: wordsRef.current,
            start: 'top 85%',
            end: 'bottom 45%',
            scrub: true,
          },
        }
      );
    }

    if (punchlineRef.current) {
      gsap.fromTo(
        punchlineRef.current,
        { opacity: 0, y: 30, filter: 'blur(10px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: punchlineRef.current,
            start: 'top 85%',
          },
        }
      );
    }
  }, []);

  return (
    <section ref={containerRef} className="py-32 md:py-48 page-gutters flex flex-col items-center text-center">
      {/* Centered Eyebrow */}
      <div className="font-mono-tag tracking-[0.24em] text-[12px] mb-14 flex items-center gap-2.5 select-none">
        <span className="text-[#EFE9DD]">04</span>
        <span className="text-[rgba(239,233,221,0.32)]">THE POINT OF ALL THIS</span>
      </div>

      {/* Main serif statement */}
      <div className="max-w-[940px] mx-auto">
        <p
          ref={wordsRef}
          className="font-display text-4xl sm:text-5xl md:text-[60px] leading-[1.12] tracking-tight"
          style={{ textWrap: 'balance' }}
        >
          {creamWords.map((word, i) => (
            <span
              key={`cream-${i}`}
              className="closing-word inline-block mr-[0.25em] text-[#EFE9DD] transition-opacity duration-75"
              style={{ opacity: 0.15 }}
            >
              {word}
            </span>
          ))}
          {dimWords.map((word, i) => (
            <span
              key={`dim-${i}`}
              className="closing-word inline-block mr-[0.25em] text-[rgba(239,233,221,0.4)] transition-opacity duration-75"
              style={{ opacity: 0.15 }}
            >
              {word}
            </span>
          ))}
        </p>

        {/* Punchline */}
        <div
          ref={punchlineRef}
          className="mt-14 font-display italic text-4xl sm:text-5xl md:text-[60px] leading-[1.12] tracking-tight text-[#F3DFA8] gold-glow"
          style={{ textWrap: 'balance' }}
        >
          The world is still waiting on what you haven’t made yet.
        </div>

        {/* Centered CTA pills */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onWatchVideo}
            className="h-[56px] px-8 rounded-full pill-primary flex items-center justify-center gap-2.5 text-[15px] cursor-pointer"
            data-cursor="interactive"
          >
            <span>Watch it in action</span>
            <span className="text-xs">▶</span>
          </button>

          <button
            onClick={onOpenStarModal}
            className="h-[56px] px-8 rounded-full pill-secondary flex items-center justify-center gap-2 text-[15px] cursor-pointer"
            data-cursor="interactive"
          >
            <span>Star on GitHub</span>
            <span className="text-[#F3DFA8] text-xs">✦</span>
          </button>
        </div>
      </div>
    </section>
  );
}
