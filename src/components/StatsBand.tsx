import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function StatsBand() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [val1, setVal1] = useState('7–13');
  const [val2, setVal2] = useState(16);
  const [val3, setVal3] = useState(0);
  const [val4, setVal4] = useState(63);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        setHasAnimated(true);

        // Animate counter values with expo-out curve over 1.8s
        const obj = {
          rangeStart: 7,
          rangeEnd: 13,
          stat2: 16,
          stat4: 63,
        };

        gsap.to(obj, {
          rangeStart: 10,
          rangeEnd: 20,
          stat2: 25,
          stat4: 100,
          duration: 1.8,
          ease: 'power4.out',
          onUpdate: () => {
            const start = Math.round(obj.rangeStart);
            const end = Math.round(obj.rangeEnd);
            setVal1(`${start}–${end}`);
            setVal2(Math.round(obj.stat2));
            setVal4(Math.round(obj.stat4));
          },
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full border-y border-[rgba(239,233,221,0.12)] min-h-[190px] page-gutters py-10 md:py-0 flex items-center select-none"
    >
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[rgba(239,233,221,0.12)]">
        {/* Stat 1: 10–20 hrs */}
        <div className="py-6 sm:py-8 sm:px-6 lg:px-8 flex flex-col justify-center">
          <div className="flex items-baseline mb-2">
            <span className="font-display text-6xl sm:text-7xl lg:text-[76px] leading-none text-[#EFE9DD] tabular-nums font-normal tracking-tight">
              {val1}
            </span>
            <span className="ml-2.5 font-display italic text-3xl sm:text-4xl text-[#F3DFA8] gold-glow">
              hrs
            </span>
          </div>
          <p className="text-[14px] leading-snug text-[rgba(239,233,221,0.55)] max-w-[220px]">
            of post-production per video, cut down to minutes.
          </p>
        </div>

        {/* Stat 2: 25 yrs */}
        <div className="py-6 sm:py-8 sm:px-6 lg:px-8 flex flex-col justify-center">
          <div className="flex items-baseline mb-2">
            <span className="font-display text-6xl sm:text-7xl lg:text-[76px] leading-none text-[#EFE9DD] tabular-nums font-normal tracking-tight">
              {val2}
            </span>
            <span className="ml-2.5 font-display italic text-3xl sm:text-4xl text-[#F3DFA8] gold-glow">
              yrs
            </span>
          </div>
          <p className="text-[14px] leading-snug text-[rgba(239,233,221,0.55)] max-w-[220px]">
            cameras have spoken one shared language.
          </p>
        </div>

        {/* Stat 3: 0 bytes */}
        <div className="py-6 sm:py-8 sm:px-6 lg:px-8 flex flex-col justify-center">
          <div className="flex items-baseline mb-2">
            <span className="font-display text-6xl sm:text-7xl lg:text-[76px] leading-none text-[#EFE9DD] tabular-nums font-normal tracking-tight">
              {val3}
            </span>
            <span
              className={`ml-2.5 font-display italic text-3xl sm:text-4xl text-[#F3DFA8] gold-glow transition-opacity duration-700 ${
                hasAnimated ? 'opacity-100' : 'opacity-0'
              }`}
            >
              bytes
            </span>
          </div>
          <p className="text-[14px] leading-snug text-[rgba(239,233,221,0.55)] max-w-[220px]">
            leave your machine by default.
          </p>
        </div>

        {/* Stat 4: 100 % */}
        <div className="py-6 sm:py-8 sm:px-6 lg:px-8 flex flex-col justify-center">
          <div className="flex items-baseline mb-2">
            <span className="font-display text-6xl sm:text-7xl lg:text-[76px] leading-none text-[#EFE9DD] tabular-nums font-normal tracking-tight">
              {val4}
            </span>
            <span className="ml-2 font-display italic text-3xl sm:text-4xl text-[#F3DFA8] gold-glow">
              %
            </span>
          </div>
          <p className="text-[14px] leading-snug text-[rgba(239,233,221,0.55)] max-w-[220px]">
            of our code is licensed as fair core. View it on GitHub.
          </p>
        </div>
      </div>
    </section>
  );
}
