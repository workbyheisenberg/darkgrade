import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface BackgroundVideoProps {
  onVideoReady?: () => void;
}

export default function BackgroundVideo({ onVideoReady }: BackgroundVideoProps) {
  const stackRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [usePosterOnly, setUsePosterOnly] = useState(false);

  useEffect(() => {
    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setUsePosterOnly(true);
      if (onVideoReady) onVideoReady();
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    // Handle canplaythrough
    let calledReady = false;
    const handleCanPlay = () => {
      if (!calledReady) {
        calledReady = true;
        if (onVideoReady) onVideoReady();
      }
    };

    video.addEventListener('canplaythrough', handleCanPlay);

    // Timeout safety for ready state
    const readyTimeout = setTimeout(() => {
      if (!calledReady) {
        calledReady = true;
        if (onVideoReady) onVideoReady();
      }
    }, 3000);

    // Error handling: fallback to poster
    const handleError = () => {
      setUsePosterOnly(true);
      if (!calledReady) {
        calledReady = true;
        if (onVideoReady) onVideoReady();
      }
    };
    video.addEventListener('error', handleError);

    // Attempt autoplay
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay was prevented by browser policy.
        // Listen for first user interaction to resume.
        const handleFirstInteraction = () => {
          video.play().catch(() => {});
          window.removeEventListener('click', handleFirstInteraction);
          window.removeEventListener('keydown', handleFirstInteraction);
          window.removeEventListener('touchstart', handleFirstInteraction);
        };
        window.addEventListener('click', handleFirstInteraction, { once: true });
        window.addEventListener('keydown', handleFirstInteraction, { once: true });
        window.addEventListener('touchstart', handleFirstInteraction, { once: true });
      });
    }

    // Visibility change handling
    const handleVisibilityChange = () => {
      if (document.hidden) {
        video.pause();
      } else {
        video.play().catch(() => {});
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // ScrollTrigger for --scrim variable tween
    // Starts at 0.15, fades to 0.74 by 120% of viewport height, stays around 0.74-0.78
    const stackEl = stackRef.current;
    if (stackEl) {
      stackEl.style.setProperty('--scrim', '0.15');

      const trigger = ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: '+=120%',
        scrub: true,
        onUpdate: (self) => {
          // Lerp between 0.15 and 0.74
          const currentScrim = 0.15 + self.progress * (0.74 - 0.15);
          stackEl.style.setProperty('--scrim', currentScrim.toFixed(3));
        },
      });

      return () => {
        video.removeEventListener('canplaythrough', handleCanPlay);
        video.removeEventListener('error', handleError);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        clearTimeout(readyTimeout);
        trigger.kill();
      };
    }

    return () => {
      video.removeEventListener('canplaythrough', handleCanPlay);
      video.removeEventListener('error', handleError);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearTimeout(readyTimeout);
    };
  }, [onVideoReady]);

  const VIDEO_URL =
    'https://v1.pinimg.com/videos/mc/720p/32/22/b6/3222b64b7d66ea2efafe1ecaecb3f3ca.mp4';

  return (
    <div
      ref={stackRef}
      className="bg-stack fixed inset-0 w-screen h-screen min-h-screen z-[-1] overflow-hidden bg-[#070605]"
      aria-hidden="true"
      style={{
        backgroundImage: 'url(/bg/poster.jpg)',
      }}
    >
      {!usePosterOnly && (
        <video
          id="bg-video"
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/bg/poster.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={VIDEO_URL} type="video/mp4" />
          <source src="/bg/loop.mp4" type="video/mp4" />
        </video>
      )}
      <div className="bg-scrim" />
      <div className="bg-vignette" />
    </div>
  );
}
