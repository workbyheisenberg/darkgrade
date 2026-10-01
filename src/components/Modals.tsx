import { useState } from 'react';
import { X, Star, Copy, Check, ExternalLink, Play, Pause, Disc, Terminal, Shield, Zap, Camera, Sliders } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VideoDemoModal({ isOpen, onClose }: ModalProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeCam, setActiveCam] = useState<'A' | 'B'>('A');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl">
      <div className="relative w-full max-w-5xl bg-[#0c0a08] border border-[rgba(239,233,221,0.18)] rounded-2xl overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="h-14 px-6 border-b border-[rgba(239,233,221,0.12)] flex items-center justify-between bg-[#070605]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span className="font-mono-tag text-[11px] text-[#EFE9DD]">
              LIVE STUDIO MONITOR · DARKGRADE LINK 2.4.0
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[rgba(239,233,221,0.6)] hover:text-[#EFE9DD] hover:bg-white/5 transition-colors cursor-pointer"
            data-cursor="interactive"
          >
            <X size={20} />
          </button>
        </div>

        {/* Video simulation stage */}
        <div className="relative aspect-video w-full bg-[#050403] overflow-hidden flex items-center justify-center">
          <img
            src="/bg/poster.jpg"
            alt="Camera Live Monitor Feed"
            className={`w-full h-full object-cover transition-transform duration-1000 ${
              isPlaying ? 'scale-105' : 'scale-100'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />

          {/* OSD Telemetry Overlay */}
          <div className="absolute top-6 left-6 right-6 flex items-start justify-between font-mono text-xs text-[#EFE9DD]/90 select-none">
            <div className="flex flex-col gap-1 bg-black/60 backdrop-blur-md px-3 py-2 rounded border border-white/10">
              <span className="text-[#F3DFA8] font-bold">CAM {activeCam}: SONY α7 IV</span>
              <span className="text-[11px] text-[rgba(239,233,221,0.6)]">4K 24p · XAVC S-I · 10-BIT 4:2:2</span>
              <span className="text-[11px] text-emerald-400">CONNECT: USB 3.2 GEN 2 · LOCAL PRIVACY ON</span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setActiveCam('A')}
                className={`px-3 py-1.5 rounded text-xs font-mono transition-colors ${
                  activeCam === 'A' ? 'bg-[#F3DFA8] text-black font-semibold' : 'bg-black/60 text-white/70 border border-white/10'
                }`}
              >
                CAM A (Wide)
              </button>
              <button
                onClick={() => setActiveCam('B')}
                className={`px-3 py-1.5 rounded text-xs font-mono transition-colors ${
                  activeCam === 'B' ? 'bg-[#F3DFA8] text-black font-semibold' : 'bg-black/60 text-white/70 border border-white/10'
                }`}
              >
                CAM B (Tight)
              </button>
            </div>
          </div>

          {/* Center focus reticle */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="w-24 h-24 border border-[#F3DFA8]/40 rounded-sm relative">
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-[1px] bg-[#F3DFA8]" />
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-[1px] bg-[#F3DFA8]" />
              <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-[1px] h-3 bg-[#F3DFA8]" />
              <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-[1px] h-3 bg-[#F3DFA8]" />
              <span className="absolute bottom-2 right-2 text-[9px] font-mono text-[#F3DFA8]/80">EYE-AF LOCK</span>
            </div>
          </div>

          {/* Bottom Live Controls */}
          <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-4 bg-black/70 backdrop-blur-md px-4 py-2.5 rounded-lg border border-white/10">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="text-[#F3DFA8] hover:scale-110 transition-transform cursor-pointer"
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              </button>
              <span className="text-[#EFE9DD]">ISO 800</span>
              <span className="text-[#EFE9DD]">1/50</span>
              <span className="text-[#EFE9DD]">f/2.8</span>
              <span className="text-[#EFE9DD]">5600K</span>
            </div>

            <div className="hidden sm:flex items-center gap-3 bg-black/70 backdrop-blur-md px-4 py-2.5 rounded-lg border border-white/10 text-[11px] text-[rgba(239,233,221,0.7)]">
              <span className="text-emerald-400">● REALTIME AUDIO SYNC</span>
              <span>BUFFER: 0 MS</span>
              <span className="text-[#F3DFA8]">LOCAL FIRST EDIT: READY</span>
            </div>
          </div>
        </div>

        {/* Under-video explanatory footer */}
        <div className="p-6 bg-[#070605] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm text-[rgba(239,233,221,0.7)]">
          <div>
            <div className="text-[#EFE9DD] font-medium text-[15px] mb-1">
              Zero-latency USB tethering & instant timeline assembly
            </div>
            <p className="text-xs text-[rgba(239,233,221,0.55)]">
              Camera feeds stream directly into browser WebUSB or local background daemon.
            </p>
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full pill-primary text-xs font-medium cursor-pointer"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
}

export function GitHubModal({ isOpen, onClose }: ModalProps) {
  const [copied, setCopied] = useState(false);
  const [starred, setStarred] = useState(false);
  const [starCount, setStarCount] = useState(14820);

  if (!isOpen) return null;

  const handleStar = () => {
    if (!starred) {
      setStarred(true);
      setStarCount((c) => c + 1);
    } else {
      setStarred(false);
      setStarCount((c) => c - 1);
    }
  };

  const copyClone = () => {
    navigator.clipboard.writeText('git clone https://github.com/darkgrade/darkgrade.git');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-[#0a0907] border border-[rgba(239,233,221,0.18)] rounded-2xl p-6 sm:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 rounded-lg text-[rgba(239,233,221,0.5)] hover:text-[#EFE9DD] transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-full bg-[#F3DFA8]/10 flex items-center justify-center text-[#F3DFA8]">
            <Star size={20} />
          </div>
          <div>
            <div className="font-pixel text-[13px] text-[#EFE9DD] uppercase tracking-wider">
              (+) DARKGRADE / LINK
            </div>
            <div className="text-xs text-[rgba(239,233,221,0.5)] font-mono">
              Fair Core Licensed · Open Source
            </div>
          </div>
        </div>

        <p className="text-[14px] text-[rgba(239,233,221,0.65)] leading-relaxed mb-6">
          Starring the repository helps support independent camera protocols and local-first creative tools.
        </p>

        <div className="flex items-center justify-between p-4 rounded-xl border border-[rgba(239,233,221,0.1)] bg-[#070605] mb-6">
          <div className="flex flex-col">
            <span className="text-xs text-[rgba(239,233,221,0.4)] font-mono">STAR COUNTER</span>
            <span className="text-2xl font-display text-[#EFE9DD] tabular-nums">
              {starCount.toLocaleString()}
            </span>
          </div>
          <button
            onClick={handleStar}
            className={`px-5 py-2.5 rounded-full flex items-center gap-2 text-xs font-medium transition-all cursor-pointer ${
              starred
                ? 'bg-[#F3DFA8] text-black font-semibold'
                : 'bg-white/10 hover:bg-white/15 text-white'
            }`}
          >
            <Star size={14} className={starred ? 'fill-current' : ''} />
            <span>{starred ? 'Starred!' : 'Star Repo'}</span>
          </button>
        </div>

        {/* Git Clone command */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-[#070605] border border-[rgba(239,233,221,0.1)] font-mono text-xs text-[rgba(239,233,221,0.7)]">
          <span className="truncate mr-2">$ git clone https://github.com/darkgrade/darkgrade</span>
          <button
            onClick={copyClone}
            className="p-1.5 hover:text-[#F3DFA8] transition-colors cursor-pointer shrink-0"
            title="Copy command"
          >
            {copied ? <Check size={14} className="text-[#F3DFA8]" /> : <Copy size={14} />}
          </button>
        </div>
      </div>
    </div>
  );
}

export function DiscordModal({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-[#0a0907] border border-[rgba(239,233,221,0.18)] rounded-2xl p-6 sm:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 rounded-lg text-[rgba(239,233,221,0.5)] hover:text-[#EFE9DD] transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-full bg-[#5865F2]/20 flex items-center justify-center text-[#5865F2]">
            <Disc size={22} />
          </div>
          <div>
            <div className="font-pixel text-[13px] text-[#EFE9DD] uppercase tracking-wider">
              DARKGRADE COMMUNITY
            </div>
            <div className="text-xs text-emerald-400 font-mono flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              8,420 CREATORS ONLINE
            </div>
          </div>
        </div>

        <p className="text-[14px] text-[rgba(239,233,221,0.65)] leading-relaxed mb-6">
          Discuss camera hardware firmware, test WebUSB drivers, and get early alpha builds of Studio and Create.
        </p>

        <div className="space-y-2 mb-6 text-xs font-mono text-[rgba(239,233,221,0.6)]">
          <div className="flex items-center gap-2 p-2 rounded bg-white/[0.03]">
            <span className="text-[#F3DFA8]">#</span> camera-tethering-troubleshooting
          </div>
          <div className="flex items-center gap-2 p-2 rounded bg-white/[0.03]">
            <span className="text-[#F3DFA8]">#</span> local-ai-edit-recipes
          </div>
          <div className="flex items-center gap-2 p-2 rounded bg-white/[0.03]">
            <span className="text-[#F3DFA8]">#</span> studio-rig-showcase
          </div>
        </div>

        <a
          href="https://discord.com"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setTimeout(onClose, 500)}
          className="w-full h-12 rounded-full bg-[#EFE9DD] text-[#070605] font-medium text-sm flex items-center justify-center gap-2 hover:bg-white transition-colors cursor-pointer"
        >
          <span>Join Server Invitation</span>
          <ExternalLink size={15} />
        </a>
      </div>
    </div>
  );
}

export function DocsModal({ isOpen, onClose }: ModalProps) {
  const [tab, setTab] = useState<'quickstart' | 'webusb' | 'events'>('quickstart');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl">
      <div className="relative w-full max-w-3xl bg-[#0c0a08] border border-[rgba(239,233,221,0.18)] rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="h-14 px-6 border-b border-[rgba(239,233,221,0.12)] flex items-center justify-between bg-[#070605]">
          <div className="flex items-center gap-3">
            <Terminal size={18} className="text-[#F3DFA8]" />
            <span className="font-mono-tag text-[11px] text-[#EFE9DD]">
              DARKGRADE LINK DOCS & API REFERENCE
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[rgba(239,233,221,0.6)] hover:text-[#EFE9DD] transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Tabs */}
        <div className="flex border-b border-[rgba(239,233,221,0.1)] bg-black/40 px-6 pt-3 gap-4 text-xs font-mono">
          <button
            onClick={() => setTab('quickstart')}
            className={`pb-3 border-b-2 transition-colors cursor-pointer ${
              tab === 'quickstart' ? 'border-[#F3DFA8] text-[#F3DFA8]' : 'border-transparent text-white/50'
            }`}
          >
            Quickstart
          </button>
          <button
            onClick={() => setTab('webusb')}
            className={`pb-3 border-b-2 transition-colors cursor-pointer ${
              tab === 'webusb' ? 'border-[#F3DFA8] text-[#F3DFA8]' : 'border-transparent text-white/50'
            }`}
          >
            WebUSB in Browser
          </button>
          <button
            onClick={() => setTab('events')}
            className={`pb-3 border-b-2 transition-colors cursor-pointer ${
              tab === 'events' ? 'border-[#F3DFA8] text-[#F3DFA8]' : 'border-transparent text-white/50'
            }`}
          >
            Camera Events
          </button>
        </div>

        {/* Code Body */}
        <div className="p-6 overflow-y-auto font-mono text-xs text-[rgba(239,233,221,0.8)] leading-relaxed space-y-4">
          {tab === 'quickstart' && (
            <div>
              <p className="text-white/60 mb-2">// 1. Install package</p>
              <pre className="p-3 bg-black/60 rounded border border-white/10 text-[#F3DFA8] mb-4">
                npm i @darkgrade/link
              </pre>

              <p className="text-white/60 mb-2">// 2. Connect and capture take</p>
              <pre className="p-3 bg-black/60 rounded border border-white/10 text-[#EFE9DD] overflow-x-auto">
{`import { CameraManager } from '@darkgrade/link';

const camera = await CameraManager.autoDetect();
console.log('Connected to:', camera.model); // Sony α7 IV

// Set capture parameters
await camera.setExposure({
  iso: 800,
  shutterSpeed: '1/50',
  aperture: 'f/2.8',
  whiteBalance: '5600K'
});

// Start synchronized recording
await camera.startRecording();`}
              </pre>
            </div>
          )}

          {tab === 'webusb' && (
            <div>
              <p className="text-white/60 mb-2">// Direct browser access without native plugins</p>
              <pre className="p-3 bg-black/60 rounded border border-white/10 text-[#EFE9DD] overflow-x-auto">
{`import { requestBrowserCamera } from '@darkgrade/link/browser';

const button = document.getElementById('connect-btn');
button.onclick = async () => {
  const session = await requestBrowserCamera({
    filters: [{ vendorId: 0x054c }] // Sony
  });

  session.streamLiveView((frameBlob) => {
    videoCanvas.draw(frameBlob);
  });
};`}
              </pre>
            </div>
          )}

          {tab === 'events' && (
            <div>
              <p className="text-white/60 mb-2">// Listen to physical shutter, dial rotations & focus locks</p>
              <pre className="p-3 bg-black/60 rounded border border-white/10 text-[#EFE9DD] overflow-x-auto">
{`camera.on('shutterPress', (event) => {
  console.log('Take started at timestamp:', event.timestamp);
});

camera.on('focusLock', ({ distance, coordinates }) => {
  renderFocusBox(coordinates);
});`}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="h-12 px-6 border-t border-[rgba(239,233,221,0.1)] bg-[#070605] flex items-center justify-between text-xs font-mono text-white/50">
          <span>MIT / FAIR CORE 1.0</span>
          <span>DOCUMENTATION V2.4</span>
        </div>
      </div>
    </div>
  );
}

export function ActDetailModal({
  actNumber,
  onClose,
}: {
  actNumber: number | null;
  onClose: () => void;
}) {
  if (!actNumber) return null;

  const actData = {
    1: {
      title: 'Act I: Link',
      status: 'SHIPPING TODAY (v2.4.0)',
      summary: 'The open-source camera hardware bridge for Node.js, WebUSB, and native platforms.',
      bullets: [
        'Universal vendor abstraction: Sony PTP/IP, Canon EDSDK, Nikon MTP.',
        'High-speed WebUSB streaming right inside modern Chrome & Chromium browsers.',
        'Hardware metadata synchronization down to the millisecond.',
        'Zero cloud dependency: run 100% locally on your workstation.',
      ],
      icon: <Camera className="text-[#F3DFA8]" size={24} />,
    },
    2: {
      title: 'Act II: Studio',
      status: 'IN ACTIVE DEVELOPMENT (BETA Q3)',
      summary: 'Automated scene director, lighting telemetry sync, and instant first cuts.',
      bullets: [
        'Automatic audio timecode synchronization across multiple cameras.',
        'Takes are organized by scene, shot number, and actor focus.',
        'Generates DaVinci Resolve (.drp) and Final Cut XML projects immediately after recording.',
        'Smart exposure compensation and LUT auto-matching.',
      ],
      icon: <Sliders className="text-[#F3DFA8]" size={24} />,
    },
    3: {
      title: 'Act III: Create',
      status: 'THE RESEARCH DREAM',
      summary: 'Natural language creative collaboration with your camera and raw media library.',
      bullets: [
        'Ask for pacing changes: "Cut this segment down to 45 seconds for a dynamic YouTube Short."',
        'Local neural voice matching and whisper transcript alignment.',
        'Contextual B-roll extraction from your private footage archive.',
        'Preserves creative ownership: no generative AI avatars or synthetic voice slop.',
      ],
      icon: <Zap className="text-[#F3DFA8]" size={24} />,
    },
  }[actNumber];

  if (!actData) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
      <div className="relative w-full max-w-lg bg-[#0c0a08] border border-[rgba(239,233,221,0.18)] rounded-2xl p-6 sm:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 rounded-lg text-[rgba(239,233,221,0.5)] hover:text-[#EFE9DD] transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-[#F3DFA8]/10 flex items-center justify-center">
            {actData.icon}
          </div>
          <div>
            <h3 className="font-display text-2xl text-[#EFE9DD]">{actData.title}</h3>
            <span className="font-mono text-xs text-[#F3DFA8] tracking-wider">
              {actData.status}
            </span>
          </div>
        </div>

        <p className="text-[14px] text-[rgba(239,233,221,0.7)] leading-relaxed mb-6">
          {actData.summary}
        </p>

        <div className="space-y-3 mb-8">
          {actData.bullets.map((bullet, i) => (
            <div key={i} className="flex items-start gap-2.5 text-xs text-[rgba(239,233,221,0.85)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F3DFA8] mt-1.5 shrink-0" />
              <span>{bullet}</span>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full h-11 rounded-full pill-primary text-xs font-medium cursor-pointer"
        >
          Got It
        </button>
      </div>
    </div>
  );
}
