import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordsContainerRef = useRef<HTMLParagraphElement>(null);
  const punchlineRef = useRef<HTMLDivElement>(null);

  const manifestoText = 'Making videos is ten percent fun. The rest is menus and an edit that never ends.';
  const words = manifestoText.split(' ');

  useEffect(() => {
    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Word-by-word scrub reveal
    const wordSpans = wordsContainerRef.current?.querySelectorAll('.manifesto-word');
    if (wordSpans && wordSpans.length > 0 && sectionRef.current) {
      gsap.fromTo(
        wordSpans,
        { opacity: 0.15 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.05,
          scrollTrigger: {
            trigger: wordsContainerRef.current,
            start: 'top 80%',
            end: 'bottom 40%',
            scrub: true,
          },
        }
      );
    }

    // Punchline reveal with blur pattern
    if (punchlineRef.current) {
      gsap.fromTo(
        punchlineRef.current,
        { opacity: 0, y: 30, filter: 'blur(8px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.9,
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
    <section
      ref={sectionRef}
      className="py-32 md:py-44 page-gutters flex flex-col justify-center"
    >
      <div className="max-w-[760px]">
        {/* Scrubbing word-by-word statement */}
        <p
          ref={wordsContainerRef}
          className="font-display text-4xl sm:text-5xl md:text-[64px] leading-[1.12] tracking-tight text-[rgba(239,233,221,0.4)]"
          style={{ textWrap: 'balance' }}
        >
          {words.map((word, idx) => (
            <span
              key={idx}
              className="manifesto-word inline-block mr-[0.25em] transition-opacity duration-75 text-[#EFE9DD]"
              style={{ opacity: 0.15 }}
            >
              {word}
            </span>
          ))}
        </p>

        {/* Punchline */}
        <div
          ref={punchlineRef}
          className="mt-14 sm:mt-16 font-display text-4xl sm:text-5xl md:text-[64px] leading-[1.12] tracking-tight text-[#EFE9DD]"
        >
          We’re deleting{' '}
          <span className="italic text-[#F3DFA8] gold-glow font-display">
            the rest.
          </span>
        </div>
      </div>
    </section>
  );
}
