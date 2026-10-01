import { useState } from 'react';

export default function PrinciplesSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const principles = [
    {
      num: '/01',
      title: 'You’re never replaced',
      description:
        'No AI slop, no fake people. We make your real footage move faster — and give you back your evenings.',
    },
    {
      num: '/02',
      title: 'Local-first & private',
      description:
        'Everything runs on your machine by default. We don’t train on your footage.',
    },
    {
      num: '/03',
      title: 'Open & honest',
      description:
        'A fair core that stays free, fair pricing for the app, no bait-and-switch.',
    },
    {
      num: '/04',
      title: 'Fast as your ideas',
      description:
        'Camera manufacturers move in decades. An open product moves at the speed of its community.',
    },
  ];

  return (
    <section id="principles" className="py-24 md:py-36 page-gutters">
      {/* Eyebrow */}
      <div className="font-mono-tag tracking-[0.24em] text-[12px] pb-12 border-b border-[rgba(239,233,221,0.12)] flex items-center gap-3 select-none">
        <span className="text-[#EFE9DD]">03</span>
        <span className="text-[rgba(239,233,221,0.32)]">PRINCIPLES</span>
      </div>

      {/* Principles Rows */}
      <div className="flex flex-col">
        {principles.map((item, index) => {
          const isHovered = hoveredIdx === index;

          return (
            <div
              key={item.num}
              onMouseEnter={() => setHoveredIdx(index)}
              onMouseLeave={() => setHoveredIdx(null)}
              data-cursor="interactive"
              className={`w-full py-10 sm:py-12 border-b border-[rgba(239,233,221,0.12)] grid grid-cols-1 md:grid-cols-[160px_460px_1fr] gap-6 md:gap-8 items-start cursor-default transition-all duration-300 ${
                isHovered
                  ? 'bg-[rgba(243,223,168,0.04)] px-4 sm:px-6 rounded-xl'
                  : 'bg-transparent px-0'
              }`}
            >
              {/* Numeral: italic serif */}
              <div
                className={`font-display italic text-2xl sm:text-[26px] transition-colors duration-300 select-none ${
                  isHovered ? 'text-[#F3DFA8] gold-glow-subtle' : 'text-[rgba(239,233,221,0.4)]'
                }`}
              >
                {item.num}
              </div>

              {/* Title */}
              <h3
                className={`font-display text-3xl sm:text-[36px] leading-tight tracking-tight transition-colors duration-300 ${
                  isHovered ? 'text-[#ffffff]' : 'text-[#EFE9DD]'
                }`}
              >
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-[16px] sm:text-[17px] leading-[1.62] text-[rgba(239,233,221,0.55)] max-w-[540px]">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
