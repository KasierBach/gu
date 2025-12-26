import React from 'react';
import { ChevronRight, Globe, Cpu, Radio, Hash } from 'lucide-react';
import { Theme } from '../types';

interface HeroProps {
  onShopNow: () => void;
  theme?: Theme;
}

export const Hero: React.FC<HeroProps> = ({ onShopNow, theme = 'EFSF' }) => {
  const isZeon = theme === 'ZEON';
  const accentColor = isZeon ? 'text-yellow-500' : 'text-gundam-blue';
  const bgColor = isZeon ? 'bg-red-900' : 'bg-gundam-blue';
  const borderColor = isZeon ? 'border-yellow-500' : 'border-gundam-blue';

  return (
    <div className="relative h-[80vh] min-h-[600px] overflow-hidden group flex items-center justify-center">
      {/* Background Image with Parallax-like scaling */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[20s] ease-linear scale-100 group-hover:scale-110"
        style={{
          backgroundImage: isZeon
            ? 'url("https://images.unsplash.com/photo-1599940829875-9c84eaf7ec44?q=80&w=2070&auto=format&fit=crop")' // Mock Zeon vibes (red/dark)
            : 'url("https://images.unsplash.com/photo-1625895197185-ef501305b5aa?q=80&w=2070&auto=format&fit=crop")'  // Mock Fed vibes (tech/blue)
        }}
      >
        <div className={`absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-slate-900/30 mix-blend-multiply`} />
        {/* Scanline Overlay */}
        <div className="absolute inset-0 bg-scanline opacity-20 pointer-events-none" />
      </div>

      {/* Cockpit HUD Overlay */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute top-8 left-8 p-2 border-l-2 border-t-2 border-white/30 rounded-tl-lg w-32 h-32 animate-float">
          <div className="text-[10px] font-mono text-white/50 mb-1">SYS.DIAG</div>
          <div className="flex gap-1">
            <div className={`w-1 h-1 ${bgColor} animate-pulse`} />
            <div className={`w-1 h-1 ${bgColor} animate-pulse delay-75`} />
            <div className={`w-1 h-1 ${bgColor} animate-pulse delay-150`} />
          </div>
        </div>
        <div className="absolute top-8 right-8 p-2 border-r-2 border-t-2 border-white/30 rounded-tr-lg w-32 h-32 animate-float" style={{ animationDelay: '1s' }}>
          <div className="text-[10px] font-mono text-white/50 text-right mb-1">RADAR</div>
          <div className="w-16 h-16 ml-auto rounded-full border border-white/10 relative flex items-center justify-center">
            <div className={`absolute w-full h-[1px] ${bgColor} opacity-50 animate-spin-slow`} />
          </div>
        </div>
        <div className="absolute bottom-8 left-8 p-2 border-l-2 border-b-2 border-white/30 rounded-bl-lg w-32 h-32 animate-float" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-8 right-8 p-2 border-r-2 border-b-2 border-white/30 rounded-br-lg w-32 h-32 animate-float" style={{ animationDelay: '1.5s' }} />

        {/* Central Crosshair */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] border border-white/5 rounded-full opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className={`w-2 h-2 ${bgColor} rounded-full animate-ping`} />
        </div>
      </div>

      <div className="relative z-20 max-w-5xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-4 mb-8">
          <div className="flex items-center gap-2 px-4 py-1.5 bg-black/50 backdrop-blur border border-white/10 rounded-sm">
            <Globe className={`w-4 h-4 ${accentColor}`} />
            <span className="text-xs font-mono font-bold text-slate-300">
              SECTOR: {isZeon ? 'SIDE 3' : 'EARTH SPHERE'}
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-1.5 bg-black/50 backdrop-blur border border-white/10 rounded-sm">
            <Radio className={`w-4 h-4 ${accentColor} animate-pulse`} />
            <span className="text-xs font-mono font-bold text-slate-300">
              SIG: DETECTED
            </span>
          </div>
        </div>

        <h1 className="text-7xl md:text-9xl font-display font-black text-white mb-6 tracking-tighter leading-[0.85] relative">
          <span className="relative block animate-glitch" style={{ textShadow: `2px 2px 0px ${isZeon ? '#7f1d1d' : '#1e3a8a'}` }}>
            MOBILE
          </span>
          <span className={`relative block text-transparent bg-clip-text bg-gradient-to-b from-white ${isZeon ? 'to-yellow-500' : 'to-gundam-blue'}`}>
            SUIT
          </span>
          <span className="block text-2xl md:text-4xl mt-4 font-bold tracking-[0.5em] text-slate-400 opacity-80">
            GUNPLA HANGAR
          </span>
        </h1>

        <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed border-l-2 border-slate-700 pl-6 text-left font-mono">
          <span className={`${accentColor} font-bold`}>{'>'}{'>'} LOGIN VERIFIED.</span> Welcome, Pilot. Access the comprehensive database of Universal Century and Cosmic Era mobile suits. Begin customization sequence.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button
            onClick={onShopNow}
            className={`group relative px-10 py-5 ${bgColor} overflow-hidden rounded-sm hover:brightness-110 transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.5)]`}
          >
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
            {/* Tech scan effect */}
            <div className="absolute top-0 bottom-0 left-[-100%] w-12 bg-white/20 skew-x-[-20deg] group-hover:left-[150%] transition-all duration-700 ease-in-out" />

            <div className="relative flex items-center gap-3 font-bold uppercase tracking-widest text-white">
              <Cpu className="w-5 h-5" />
              <span>Launch Catalog</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          <button className={`px-10 py-5 border ${borderColor} bg-black/30 backdrop-blur-sm rounded-sm hover:bg-white/5 transition-all duration-300 group`}>
            <span className={`flex items-center gap-3 font-bold uppercase tracking-widest ${accentColor}`}>
              <Hash className="w-4 h-4" />
              Latest Intel
            </span>
          </button>
        </div>
      </div>

      {/* Bottom Scrolling Ticker */}
      <div className="absolute bottom-0 w-full bg-black/80 backdrop-blur border-t border-white/10 py-2 overflow-hidden flex transform translate-y-0.5">
        <div className="animate-marquee whitespace-nowrap flex gap-12 font-mono text-xs text-slate-400">
          <span>// SYSTEM STATUS: NORMAL</span>
          <span className={isZeon ? 'text-yellow-500' : 'text-gundam-blue'}>// NEW ARRIVAL: RX-93 NU GUNDAM VER.KA</span>
          <span>// EXCHANGE RATE: STABLE</span>
          <span>// WEATHER: CLEAR SKIES IN SIDE 7</span>
          <span>// ALERT: MINOVSKY PARTICLE DENSITY INCREASING SECTOR 5</span>
          {/* Duplicate for seamless loop */}
          <span>// SYSTEM STATUS: NORMAL</span>
          <span className={isZeon ? 'text-yellow-500' : 'text-gundam-blue'}>// NEW ARRIVAL: RX-93 NU GUNDAM VER.KA</span>
        </div>
      </div>
    </div>
  );
};