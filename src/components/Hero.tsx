import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onWatchVideo: () => void;
  onJoinDiscord: () => void;
  loaderFinished: boolean;
}

export default function Hero({ onWatchVideo, onJoinDiscord, loaderFinished }: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loaderFinished) return;

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Blur / Fade reveal on loader completion
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.9 } });

    tl.fromTo(
      line1Ref.current,
      { opacity: 0, y: 32, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.95 }
    )
      .fromTo(
        line2Ref.current,
        { opacity: 0, y: 32, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.95 },
        '-=0.83'
      )
      .fromTo(
        bodyRef.current,
        { opacity: 0, y: 24, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.85 },
        '-=0.7'
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 20, filter: 'blur(6px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8 },
        '-=0.65'
      );

    // Subtle parallax on scroll
    if (contentRef.current && heroRef.current) {
      gsap.to(contentRef.current, {
        y: -90,
        opacity: 0.15,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }

    return () => {
      tl.kill();
    };
  }, [loaderFinished]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-between pt-[100px] pb-10 page-gutters overflow-hidden"
    >
      {/* Top spacer for vertical centering slightly above middle */}
      <div className="flex-1" />

      {/* Main Content */}
      <div ref={contentRef} className="max-w-[1280px] w-full will-change-transform">
        {/* Mono eyebrow */}
        <div className="font-mono-tag text-[rgba(239,233,221,0.32)] mb-5 sm:mb-6 tracking-[0.24em] select-none">
          LOCAL-FIRST AI FOR CREATIVE PROFESSIONALS
        </div>

        {/* H1 Heading on two lines */}
        <h1
          className="font-display text-[clamp(68px,11vw,176px)] leading-[0.92] tracking-[-0.02em] select-none"
          style={{ textWrap: 'balance' }}
        >
          <div ref={line1Ref} className="text-[#EFE9DD]">
            Shoot more.
          </div>
          <div ref={line2Ref} className="text-[#EFE9DD]">
            Edit <span className="italic text-[#F3DFA8] gold-glow font-display">less.</span>
          </div>
        </h1>

        {/* Paragraph */}
        <p
          ref={bodyRef}
          className="mt-8 text-[17px] sm:text-[18px] leading-[1.62] text-[rgba(239,233,221,0.55)] max-w-[480px] font-normal"
        >
          Darkgrade dials in your camera, captures the shot, and returns a finished first cut —{' '}
          <strong className="text-[#EFE9DD] font-medium">on your own machine.</strong> You stay
          the director, and nothing leaves your computer unless you say so.
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="mt-9 sm:mt-11 flex flex-wrap items-center gap-4">
          <button
            onClick={onWatchVideo}
            className="h-[56px] px-8 rounded-full pill-primary flex items-center justify-center gap-2.5 text-[15px] cursor-pointer"
            data-cursor="interactive"
          >
            <span>Watch it in action</span>
            <span className="text-xs">▶</span>
          </button>
          <button
            onClick={onJoinDiscord}
            className="h-[56px] px-8 rounded-full pill-secondary flex items-center justify-center text-[15px] cursor-pointer"
            data-cursor="interactive"
          >
            Join the Discord
          </button>
        </div>
      </div>

      {/* Bottom spacer for balance */}
      <div className="flex-1 min-h-[60px]" />

      {/* Bottom status bar */}
      <div className="w-full flex items-end justify-between border-t border-[rgba(239,233,221,0.12)] pt-6 text-[11px] font-mono-tag">
        {/* Bottom-left: SCROLL indicator */}
        <div className="flex items-center gap-3">
          <span className="text-[rgba(239,233,221,0.32)] tracking-[0.24em]">SCROLL</span>
          <div className="w-[1px] h-6 bg-[rgba(239,233,221,0.18)] relative overflow-hidden">
            <div className="w-full h-full bg-[#F3DFA8] animate-scroll-line" />
          </div>
        </div>

        {/* Bottom-right: TESTED ON cameras */}
        <div className="text-right">
          <div className="text-[rgba(239,233,221,0.32)] tracking-[0.22em] mb-1">
            TESTED ON
          </div>
          <div className="text-[rgba(239,233,221,0.55)] tracking-[0.16em]">
            SONY α7 IV · NIKON Z6 III · CANON R6 MK III
          </div>
        </div>
      </div>
    </section>
  );
}
