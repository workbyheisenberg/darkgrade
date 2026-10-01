import { useState, useRef, useEffect } from 'react';
import { ArrowUpRight, ArrowRight, Check, Copy } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ProductActsSectionProps {
  onSelectAct: (actNumber: number) => void;
}

export default function ProductActsSection({ onSelectAct }: ProductActsSectionProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

  const copyCode = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText('npm i @darkgrade/link');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    rowsRef.current.forEach((row, i) => {
      if (!row) return;
      gsap.fromTo(
        row,
        { opacity: 0.2, y: 30, filter: 'blur(8px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: row,
            start: 'top 85%',
          },
        }
      );
    });
  }, []);

  const acts = [
    {
      act: 'Act I',
      title: 'Link',
      pillText: '● SHIPPING NOW',
      pillClass: 'border-[#F3DFA8] text-[#F3DFA8] bg-[#F3DFA8]/5',
      dotColor: 'bg-[#F3DFA8]',
      description:
        'The open-source engine that lets any app speak fluent camera — settings, capture, live view, events. Free, today.',
      hasCodeChip: true,
    },
    {
      act: 'Act II',
      title: 'Studio',
      pillText: '○ IN DEVELOPMENT',
      pillClass: 'border-[rgba(239,233,221,0.2)] text-[rgba(239,233,221,0.6)] bg-transparent',
      dotColor: 'border border-[rgba(239,233,221,0.4)]',
      description:
        'The app that sets the scene, rolls the take, and hands you an automatic first edit the moment you stop recording.',
      hasCodeChip: false,
    },
    {
      act: 'Act III',
      title: 'Create',
      pillText: '○ THE DREAM',
      pillClass: 'border-[rgba(239,233,221,0.2)] text-[rgba(239,233,221,0.6)] bg-transparent',
      dotColor: 'border border-[rgba(239,233,221,0.4)]',
      description:
        'Say what you want to make; get a finished video back. Your footage, your face, your voice — you stay the director.',
      hasCodeChip: false,
    },
  ];

  return (
    <section id="product" ref={sectionRef} className="py-24 md:py-36 page-gutters">
      {/* Eyebrow: 70px gold->transparent line + mono OUR THESIS */}
      <div className="flex items-center gap-4 mb-16 select-none">
        <div
          className="w-[70px] h-[1px]"
          style={{
            background: 'linear-gradient(90deg, #F3DFA8 0%, rgba(243,223,168,0) 100%)',
          }}
        />
        <span className="font-mono-tag text-[rgba(239,233,221,0.32)] tracking-[0.24em]">
          OUR THESIS
        </span>
      </div>

      {/* Acts Rows */}
      <div className="border-t border-[rgba(239,233,221,0.12)]">
        {acts.map((item, index) => {
          const isHovered = hoveredIndex === index;
          const isAnyHovered = hoveredIndex !== null;

          return (
            <div
              key={item.act}
              ref={(el) => {
                rowsRef.current[index] = el;
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => onSelectAct(index + 1)}
              data-cursor="project"
              className={`w-full min-h-[220px] md:min-h-[260px] py-10 md:py-12 border-b border-[rgba(239,233,221,0.12)] grid grid-cols-1 md:grid-cols-[160px_1fr_120px] gap-6 md:gap-8 items-center cursor-pointer transition-all duration-400 ${
                isHovered
                  ? 'bg-gradient-to-r from-[rgba(243,223,168,0.06)] to-transparent'
                  : ''
              } ${isAnyHovered && !isHovered ? 'opacity-65' : 'opacity-100'}`}
            >
              {/* Left Column: Act label */}
              <div className="font-display italic text-2xl md:text-[26px] text-[rgba(239,233,221,0.55)] select-none">
                {item.act}
              </div>

              {/* Main Column: Title + Pill + Description + Optional Code */}
              <div className="flex flex-col gap-4">
                {/* Title & Status Pill on baseline */}
                <div className="flex flex-wrap items-baseline gap-4 sm:gap-6">
                  <h3
                    className={`font-display text-5xl sm:text-6xl md:text-[72px] leading-none tracking-tight transition-colors duration-300 ${
                      isHovered ? 'text-[#EFE9DD]' : 'text-[#EFE9DD]'
                    }`}
                  >
                    {item.title}
                  </h3>

                  {/* Status pill */}
                  <div
                    className={`h-[36px] px-4 rounded-full border text-[11px] font-mono uppercase tracking-[0.2em] flex items-center gap-2 select-none shrink-0 ${item.pillClass}`}
                  >
                    <span>{item.pillText}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[16px] sm:text-[17px] leading-[1.6] text-[rgba(239,233,221,0.55)] max-w-[500px]">
                  {item.description}
                </p>

                {/* Act I Code chip */}
                {item.hasCodeChip && (
                  <div className="mt-2 flex items-center">
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-4 px-4 py-2 rounded-lg border border-[rgba(239,233,221,0.12)] bg-[#070605]/70 backdrop-blur-sm text-[12px] font-mono select-text"
                    >
                      <span className="text-[rgba(239,233,221,0.32)]">$</span>
                      <span className="text-[#EFE9DD]">npm i @darkgrade/link</span>
                      <button
                        onClick={copyCode}
                        className="ml-2 px-2.5 py-1 rounded bg-[rgba(239,233,221,0.06)] hover:bg-[#F3DFA8]/20 text-[10px] uppercase tracking-wider text-[rgba(239,233,221,0.7)] hover:text-[#F3DFA8] transition-colors flex items-center gap-1.5 cursor-pointer"
                        data-cursor="interactive"
                        title="Copy to clipboard"
                      >
                        {copied ? (
                          <>
                            <Check size={12} className="text-[#F3DFA8]" />
                            <span className="text-[#F3DFA8]">COPIED</span>
                          </>
                        ) : (
                          <>
                            <Copy size={12} />
                            <span>COPY</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: 58px Circular Arrow Button */}
              <div className="flex md:justify-end">
                <div
                  className={`w-[58px] h-[58px] rounded-full flex items-center justify-center transition-all duration-300 ${
                    isHovered
                      ? 'bg-[#F3DFA8] text-[#070605] shadow-[0_0_24px_rgba(243,223,168,0.4)] scale-105'
                      : 'border border-[rgba(239,233,221,0.15)] bg-transparent text-[#EFE9DD]'
                  }`}
                >
                  {isHovered ? (
                    <ArrowRight size={24} className="transition-transform duration-300" />
                  ) : (
                    <ArrowUpRight size={22} className="transition-transform duration-300" />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
