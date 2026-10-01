import { useEffect, useState } from 'react';

interface LoaderProps {
  onComplete: () => void;
  videoLoaded?: boolean;
}

export default function Loader({ onComplete, videoLoaded = false }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    let startTime = performance.now();
    let animationFrameId: number;
    const duration = 2400; // ~2.4s non-linear counter
    let finished = false;

    // Non-linear progress simulation with realistic pauses/stalls
    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      let ratio = Math.min(elapsed / duration, 1);

      // Non-linear easing with small stalls around 34%, 68%, 89%
      let simulatedVal = 0;
      if (ratio < 0.3) {
        simulatedVal = Math.pow(ratio / 0.3, 1.4) * 34;
      } else if (ratio < 0.38) {
        // slight stall around 34-36%
        simulatedVal = 34 + (ratio - 0.3) / 0.08 * 4;
      } else if (ratio < 0.65) {
        simulatedVal = 38 + Math.pow((ratio - 0.38) / 0.27, 0.9) * 30;
      } else if (ratio < 0.72) {
        // slight stall around 68-71%
        simulatedVal = 68 + (ratio - 0.65) / 0.07 * 3;
      } else if (ratio < 0.9) {
        simulatedVal = 71 + ((ratio - 0.72) / 0.18) * 19;
      } else {
        // final push to 100%
        simulatedVal = 90 + ((ratio - 0.9) / 0.1) * 10;
      }

      // If video loaded early, accelerate slightly, but keep minimum duration
      const currentProgress = Math.min(Math.floor(simulatedVal), 100);
      setProgress(currentProgress);

      if (ratio >= 1 && !finished) {
        finished = true;
        setProgress(100);

        // At 100: hold 250ms, then fade overlay out (0.8s) while hero text reveals
        setTimeout(() => {
          setFadingOut(true);
          setTimeout(() => {
            onComplete();
          }, 800);
        }, 250);
      } else if (!finished) {
        animationFrameId = requestAnimationFrame(updateProgress);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [onComplete]);

  // Zero-padded 3-digit number format
  const paddedNumber = String(progress).padStart(3, '0');

  return (
    <div
      className={`fixed inset-0 z-[10000] bg-[#070605] flex flex-col items-center justify-center select-none pointer-events-auto transition-opacity duration-800 ${
        fadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-hidden={fadingOut}
    >
      <div className="flex flex-col items-center">
        {/* Tiny pixel label */}
        <div className="font-pixel text-[11px] text-[rgba(239,233,221,0.32)] tracking-[0.22em] uppercase mb-5">
          (+) DARKGRADE
        </div>

        {/* Large serif counter */}
        <div className="flex items-baseline font-display text-7xl sm:text-8xl md:text-[96px] tracking-tight leading-none text-[#EFE9DD] mb-6">
          <span className="tabular-nums font-normal">{paddedNumber}</span>
          <span className="italic text-[#F3DFA8] text-5xl sm:text-6xl md:text-[76px] ml-1.5 gold-glow">
            %
          </span>
        </div>

        {/* Scaled gold progress line */}
        <div className="w-[260px] h-[2px] bg-[rgba(239,233,221,0.12)] rounded-full overflow-hidden relative">
          <div
            className="h-full bg-[#F3DFA8] transition-all duration-75 ease-out rounded-full"
            style={{
              width: `${progress}%`,
              boxShadow: '0 0 14px rgba(243,223,168,0.7), 0 0 4px rgba(243,223,168,0.4)',
            }}
          />
        </div>
      </div>
    </div>
  );
}
