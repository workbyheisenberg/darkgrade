/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Loader from './components/Loader';
import BackgroundVideo from './components/BackgroundVideo';
import CustomCursor from './components/CustomCursor';
import CustomScrollbar from './components/CustomScrollbar';
import Header from './components/Header';
import Hero from './components/Hero';
import MarqueeStrip from './components/MarqueeStrip';
import ManifestoSection from './components/ManifestoSection';
import ProductActsSection from './components/ProductActsSection';
import StatsBand from './components/StatsBand';
import RoadmapSection from './components/RoadmapSection';
import PrinciplesSection from './components/PrinciplesSection';
import ClosingSection from './components/ClosingSection';
import Footer from './components/Footer';
import {
  VideoDemoModal,
  GitHubModal,
  DiscordModal,
  DocsModal,
  ActDetailModal,
} from './components/Modals';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [loaderFinished, setLoaderFinished] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Modals state
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [starModalOpen, setStarModalOpen] = useState(false);
  const [discordModalOpen, setDiscordModalOpen] = useState(false);
  const [docsModalOpen, setDocsModalOpen] = useState(false);
  const [selectedAct, setSelectedAct] = useState<number | null>(null);

  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setLoaderFinished(true);
      return;
    }

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // exponential out
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    // Stop scrolling while loader is running
    lenis.stop();

    // Wire Lenis into ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const handleLoaderComplete = () => {
    setLoaderFinished(true);
    // Enable smooth scroll once loader finishes
    if (lenisRef.current) {
      lenisRef.current.start();
    }
  };

  return (
    <div className="relative min-h-screen text-[#EFE9DD] selection:bg-[#F3DFA8]/20 selection:text-[#F3DFA8]">
      {/* 1. Counter Loader */}
      {!loaderFinished && (
        <Loader
          onComplete={handleLoaderComplete}
          videoLoaded={videoLoaded}
        />
      )}

      {/* 2. Custom Cursor & Scrollbar */}
      <CustomCursor />
      <CustomScrollbar />

      {/* 3. Background Video Mechanism */}
      <BackgroundVideo onVideoReady={() => setVideoLoaded(true)} />

      {/* 4. Top Header */}
      <Header
        onOpenStarModal={() => setStarModalOpen(true)}
        onOpenDocsModal={() => setDocsModalOpen(true)}
      />

      {/* 5. Main Single-Page Sections */}
      <main className="relative z-10 w-full">
        {/* Section 6: Hero */}
        <Hero
          loaderFinished={loaderFinished}
          onWatchVideo={() => setVideoModalOpen(true)}
          onJoinDiscord={() => setDiscordModalOpen(true)}
        />

        {/* Section 7: Marquee Strip */}
        <MarqueeStrip />

        {/* Section 8: Manifesto Section */}
        <ManifestoSection />

        {/* Section 9: Product Rows (Acts I, II, III) */}
        <ProductActsSection
          onSelectAct={(actNum) => setSelectedAct(actNum)}
        />

        {/* Section 10: Stats Band */}
        <StatsBand />

        {/* Section 11: Roadmap Section */}
        <RoadmapSection />

        {/* Section 12: Principles Section */}
        <PrinciplesSection />

        {/* Section 13: Closing Statement */}
        <ClosingSection
          onWatchVideo={() => setVideoModalOpen(true)}
          onOpenStarModal={() => setStarModalOpen(true)}
        />
      </main>

      {/* Section 14: Footer */}
      <Footer
        onOpenStarModal={() => setStarModalOpen(true)}
        onOpenDiscordModal={() => setDiscordModalOpen(true)}
        onOpenDocsModal={() => setDocsModalOpen(true)}
        onSelectAct={(actNum) => setSelectedAct(actNum)}
      />

      {/* Interactive Modals */}
      <VideoDemoModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
      />

      <GitHubModal
        isOpen={starModalOpen}
        onClose={() => setStarModalOpen(false)}
      />

      <DiscordModal
        isOpen={discordModalOpen}
        onClose={() => setDiscordModalOpen(false)}
      />

      <DocsModal
        isOpen={docsModalOpen}
        onClose={() => setDocsModalOpen(false)}
      />

      <ActDetailModal
        actNumber={selectedAct}
        onClose={() => setSelectedAct(null)}
      />
    </div>
  );
}
