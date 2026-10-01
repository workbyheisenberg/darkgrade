import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onOpenStarModal: () => void;
  onOpenDocsModal: () => void;
}

export default function Header({ onOpenStarModal, onOpenDocsModal }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-[60px] flex items-center transition-all duration-300 page-gutters ${
          scrolled
            ? 'bg-[#070605]/55 backdrop-blur-[14px] border-b border-[rgba(239,233,221,0.12)]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="w-full flex items-center justify-between">
          {/* Left: Pixel Logo */}
          <a
            href="#"
            className="flex items-center text-[#EFE9DD] hover:text-[#F3DFA8] transition-colors"
            data-cursor="interactive"
          >
            <span className="font-pixel text-[15px] sm:text-[17px] tracking-[0.18em] uppercase select-none">
              (+) DARKGRADE
            </span>
          </a>

          {/* Center: Nav links */}
          <nav className="hidden md:flex items-center gap-8 text-[15px] font-normal">
            <button
              onClick={() => scrollToSection('product')}
              className="text-[rgba(239,233,221,0.55)] hover:text-[#EFE9DD] transition-colors cursor-pointer"
              data-cursor="interactive"
            >
              Product
            </button>
            <button
              onClick={() => scrollToSection('roadmap')}
              className="text-[rgba(239,233,221,0.55)] hover:text-[#EFE9DD] transition-colors cursor-pointer"
              data-cursor="interactive"
            >
              Roadmap
            </button>
            <button
              onClick={() => scrollToSection('principles')}
              className="text-[rgba(239,233,221,0.55)] hover:text-[#EFE9DD] transition-colors cursor-pointer"
              data-cursor="interactive"
            >
              Principles
            </button>
            <button
              onClick={onOpenDocsModal}
              className="text-[rgba(239,233,221,0.55)] hover:text-[#EFE9DD] transition-colors cursor-pointer"
              data-cursor="interactive"
            >
              Docs
            </button>
          </nav>

          {/* Right: GitHub Star Pill + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenStarModal}
              className="h-[44px] px-4 sm:px-5 flex items-center gap-2 rounded-full border border-[rgba(239,233,221,0.15)] bg-[#070605]/60 hover:bg-[#EFE9DD]/10 hover:border-[rgba(239,233,221,0.35)] text-[#EFE9DD] text-[13px] sm:text-[14px] font-normal transition-all duration-200 cursor-pointer"
              data-cursor="interactive"
            >
              <span className="text-[#F3DFA8] text-xs">✦</span>
              <span className="whitespace-nowrap">Star on GitHub</span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[rgba(239,233,221,0.7)] hover:text-[#EFE9DD] cursor-pointer"
              aria-label="Toggle navigation menu"
              data-cursor="interactive"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Overlay Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#070605]/95 backdrop-blur-2xl flex flex-col justify-center px-8 sm:px-12 md:hidden">
          <div className="flex flex-col gap-6 text-left">
            <span className="font-mono-tag text-[rgba(239,233,221,0.32)] mb-2">
              NAVIGATION
            </span>
            <button
              onClick={() => scrollToSection('product')}
              className="font-display text-4xl text-[#EFE9DD] hover:text-[#F3DFA8] text-left transition-colors cursor-pointer"
            >
              Product
            </button>
            <button
              onClick={() => scrollToSection('roadmap')}
              className="font-display text-4xl text-[#EFE9DD] hover:text-[#F3DFA8] text-left transition-colors cursor-pointer"
            >
              Roadmap
            </button>
            <button
              onClick={() => scrollToSection('principles')}
              className="font-display text-4xl text-[#EFE9DD] hover:text-[#F3DFA8] text-left transition-colors cursor-pointer"
            >
              Principles
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDocsModal();
              }}
              className="font-display text-4xl text-[#EFE9DD] hover:text-[#F3DFA8] text-left transition-colors cursor-pointer"
            >
              Docs
            </button>

            <div className="pt-8 border-t border-[rgba(239,233,221,0.12)] flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenStarModal();
                }}
                className="w-full h-12 rounded-full border border-[rgba(239,233,221,0.2)] bg-[#EFE9DD]/5 text-[#EFE9DD] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="text-[#F3DFA8]">✦</span> Star on GitHub
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
