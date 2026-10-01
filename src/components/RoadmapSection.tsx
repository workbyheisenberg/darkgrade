import { useEffect, useRef, useState } from 'react';

export default function RoadmapSection() {
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const centerY = window.innerHeight / 2;
      let minDistance = Infinity;
      let closestIdx = 0;

      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const dist = Math.abs(cardCenter - centerY);

        if (dist < minDistance) {
          minDistance = dist;
          closestIdx = index;
        }
      });

      setActiveCardIndex(closestIdx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cards = [
    {
      num: '01',
      title: 'Control your camera from software',
      status: '● SHIPPING TODAY',
      isShippingToday: true,
      subtitle: 'The open-source engine that lets any app talk to your camera.',
      isCard01: true,
    },
    {
      num: '02',
      title: 'Upgrade your gear with software',
      status: '○ ON THE WAY',
      isShippingToday: false,
      subtitle: 'Features that used to need extra hardware, now a software toggle.',
      bullets: [
        { text: 'Auto-capture on motion or sound', shipped: false },
        { text: 'Rack focus / follow focus, in software', shipped: false },
        { text: 'Watch & tether every camera wirelessly', shipped: false },
        { text: 'Drive sliders & gimbals', shipped: false },
        { text: 'Recognize and follow your subject', shipped: false },
        { text: 'Focus peaking & exposure scopes', shipped: false },
        { text: 'Turn your screen into a teleprompter', shipped: false },
        { text: 'Use your camera as a great webcam', shipped: false },
      ],
    },
    {
      num: '03',
      title: 'Start shooting in one click',
      status: '○ ON THE WAY',
      isShippingToday: false,
      subtitle: 'Studio sets up the scene, tone, and files everything for you.',
      bullets: [
        { text: 'One tap to set lights, audio & exposure', shipped: false },
        { text: 'Footage lands in your timeline automatically', shipped: false },
        { text: 'See every camera live while you shoot', shipped: false },
        { text: 'Desktop & mobile app', shipped: false },
        { text: 'Audio & video synced for you', shipped: false },
        { text: 'Creator-style shooting modes', shipped: false },
      ],
    },
    {
      num: '04',
      title: 'Talk to your studio',
      status: '○ ON THE WAY',
      isShippingToday: false,
      subtitle: 'Say what you want, AI sets up the shot — you stay in charge.',
      bullets: [
        { text: 'Voice control for your whole studio', shipped: false },
        { text: 'Plain-language camera & studio commands', shipped: false },
        { text: 'Runs local AI models, privately', shipped: false },
        { text: 'Let AI assistants run the camera (MCP)', shipped: false },
        { text: 'AI that understands what your camera sees', shipped: false },
        { text: 'Captures the context editing needs later', shipped: false },
      ],
    },
    {
      num: '05',
      title: 'Skip editing altogether',
      status: '○ ON THE WAY',
      isShippingToday: false,
      subtitle: 'Hand off the tedious hours of post — keep every creative call.',
      bullets: [
        { text: 'Auto-pick the best takes', shipped: false },
        { text: 'Transcripts & captions', shipped: false },
        { text: 'Hand off to Premiere, DaVinci & Final Cut', shipped: false },
        { text: 'Match color & exposure across clips', shipped: false },
        { text: 'Vertical cutdowns & ready-to-post exports', shipped: false },
        { text: 'Sync timecode, audio & multi-cam', shipped: false },
        { text: 'A first rough cut, assembled for you', shipped: false },
        { text: 'Find & drop in B-roll', shipped: false },
        { text: 'Translate & dub into other languages', shipped: false },
        { text: 'Preview the whole piece before you shoot', shipped: false },
      ],
    },
    {
      num: '06',
      title: 'Plug in the rest of your studio',
      status: '○ ON THE WAY',
      isShippingToday: false,
      subtitle: 'The hub your lights, sound, stream, and edit tools all talk to.',
      bullets: [
        { text: 'OBS, Twitch & capture cards', shipped: false },
        { text: 'Home Assistant, Scrypted & HomeKit', shipped: false },
        { text: 'Philips Hue & studio lighting', shipped: false },
        { text: 'Blackmagic Speed Editor / Console', shipped: false },
        { text: 'DaVinci Resolve, Premiere & Final Cut', shipped: false },
        { text: 'Elgato Stream Deck & Prompter', shipped: false },
        { text: 'Audio interfaces, gimbals & sliders', shipped: false },
        { text: 'Community templates & marketplace', shipped: false },
      ],
    },
  ];

  return (
    <section id="roadmap" className="py-24 md:py-36 page-gutters">
      {/* Header Row */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 pb-14 border-b border-[rgba(239,233,221,0.12)]">
        <div>
          <h2 className="font-display text-5xl sm:text-6xl md:text-[72px] leading-[1.04] tracking-tight text-[#EFE9DD]">
            From “let’s shoot” to <br />
            <span className="italic text-[#F3DFA8] gold-glow font-display">“it’s live.”</span>
          </h2>
          <p className="mt-4 text-[16px] sm:text-[17px] text-[rgba(239,233,221,0.55)]">
            Link is here today. We’re building a lot more.
          </p>
        </div>

        <div className="flex flex-col md:items-end justify-between self-stretch gap-6 select-none">
          {/* Eyebrow */}
          <div className="font-mono-tag tracking-[0.22em] text-[12px]">
            <span className="text-[#EFE9DD]">02</span>{' '}
            <span className="text-[rgba(239,233,221,0.32)]">THE ROAD AHEAD</span>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-6 font-mono-tag text-[11px] text-[rgba(239,233,221,0.55)]">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F3DFA8]" />
              HERE TODAY
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full border border-[rgba(239,233,221,0.4)]" />
              ON THE WAY
            </span>
          </div>
        </div>
      </div>

      {/* Stacked Cards */}
      <div className="flex flex-col">
        {cards.map((card, index) => {
          const isActive = activeCardIndex === index;

          return (
            <div
              key={card.num}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className={`w-full py-12 md:py-16 border-b border-[rgba(239,233,221,0.12)] transition-all duration-500 px-2 sm:px-6 md:px-8 rounded-2xl ${
                isActive
                  ? 'bg-[rgba(239,233,221,0.03)] opacity-100'
                  : 'bg-transparent opacity-55'
              }`}
            >
              {/* Top row: Numeral + Title on Left, Status on Right */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
                <div className="flex items-baseline gap-4 sm:gap-6">
                  <span className="font-display italic text-2xl sm:text-3xl text-[#F3DFA8] gold-glow select-none">
                    {card.num}
                  </span>
                  <h3
                    className={`font-display text-3xl sm:text-4xl md:text-[38px] leading-tight tracking-tight transition-colors ${
                      isActive ? 'text-[#EFE9DD]' : 'text-[rgba(239,233,221,0.85)]'
                    }`}
                  >
                    {card.title}
                  </h3>
                </div>

                <div className="font-mono-tag text-[11px] sm:text-[12px] tracking-[0.2em] shrink-0 select-none">
                  {card.isShippingToday ? (
                    <span className="text-[#F3DFA8] flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#F3DFA8]" />
                      SHIPPING TODAY
                    </span>
                  ) : (
                    <span className="text-[rgba(239,233,221,0.4)] flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full border border-[rgba(239,233,221,0.3)]" />
                      ON THE WAY
                    </span>
                  )}
                </div>
              </div>

              {/* Subtitle */}
              <p className="mt-3 text-[15px] sm:text-[16px] text-[rgba(239,233,221,0.55)] ml-0 sm:ml-12 max-w-[620px]">
                {card.subtitle}
              </p>

              {/* Bullets: Special layout for Card 01 vs general 2-column cards */}
              {card.isCard01 ? (
                <div className="mt-10 ml-0 sm:ml-12 flex flex-col gap-8">
                  {/* Group 1 & 2 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* CONTROL & CAPTURE */}
                    <div>
                      <div className="font-mono-tag text-[11px] text-[rgba(239,233,221,0.35)] tracking-[0.2em] mb-4">
                        CONTROL & CAPTURE
                      </div>
                      <div className="flex flex-col gap-3">
                        {[
                          'Set ISO, shutter, aperture & more from code',
                          'Capture photos',
                          'Live view streaming',
                          'Start / stop recording',
                        ].map((bullet, i) => (
                          <div key={i} className="flex items-center gap-3 text-[16px] sm:text-[17px] text-[#EFE9DD]">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#F3DFA8] shrink-0" />
                            <span>{bullet}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CONNECT & TRANSFER */}
                    <div>
                      <div className="font-mono-tag text-[11px] text-[rgba(239,233,221,0.35)] tracking-[0.2em] mb-4">
                        CONNECT & TRANSFER
                      </div>
                      <div className="flex flex-col gap-3">
                        {[
                          'USB in the browser (WebUSB) & on a computer',
                          'Detects your camera automatically',
                          'Pull photos & video off the camera',
                          'React to camera events in real time',
                        ].map((bullet, i) => (
                          <div key={i} className="flex items-center gap-3 text-[16px] sm:text-[17px] text-[#EFE9DD]">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#F3DFA8] shrink-0" />
                            <span>{bullet}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Hairline divider before CAMERAS */}
                  <div className="w-full h-[1px] bg-[rgba(239,233,221,0.08)] pt-2">
                    <div className="font-mono-tag text-[11px] text-[rgba(239,233,221,0.35)] tracking-[0.2em] mb-4">
                      CAMERAS
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Left: Filled */}
                      <div className="flex flex-col gap-3">
                        {[
                          'Sony α — full support',
                          'Nikon Z — capture, settings, live view',
                          'Canon EOS R — control & events',
                        ].map((bullet, i) => (
                          <div key={i} className="flex items-center gap-3 text-[16px] sm:text-[17px] text-[#EFE9DD]">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#F3DFA8] shrink-0" />
                            <span>{bullet}</span>
                          </div>
                        ))}
                      </div>

                      {/* Right: Hollow */}
                      <div className="flex flex-col gap-3">
                        {[
                          'Wireless (Wi-Fi) control',
                          'Nikon / Canon video & live view',
                          'Fujifilm, Panasonic, Olympus & more',
                        ].map((bullet, i) => (
                          <div key={i} className="flex items-center gap-3 text-[16px] sm:text-[17px] text-[rgba(239,233,221,0.55)]">
                            <span className="w-2.5 h-2.5 rounded-full border border-[rgba(239,233,221,0.35)] shrink-0" />
                            <span>{bullet}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-8 ml-0 sm:ml-12 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3.5">
                  {card.bullets?.map((bullet, bIdx) => (
                    <div
                      key={bIdx}
                      className={`flex items-center gap-3 text-[16px] sm:text-[17px] ${
                        bullet.shipped ? 'text-[#EFE9DD]' : 'text-[rgba(239,233,221,0.55)]'
                      }`}
                    >
                      {bullet.shipped ? (
                        <span className="w-2.5 h-2.5 rounded-full bg-[#F3DFA8] shrink-0" />
                      ) : (
                        <span className="w-2.5 h-2.5 rounded-full border border-[rgba(239,233,221,0.35)] shrink-0" />
                      )}
                      <span>{bullet.text}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
