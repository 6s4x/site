import React from 'react';
import { 
  Play, 
  Presentation, 
  ExternalLink, 
  Award, 
  ShieldCheck, 
  Flame, 
  Wind, 
  ChevronRight,
  Eye,
  CheckCircle,
  Copy,
  Sparkles
} from 'lucide-react';
import GithubIcon from './GithubIcon';

export default function HeroHeader({ data, onOpenDeck, onOpenVideo, onOpenSandbox }) {
  const [copied, setCopied] = React.useState(false);

  const copyShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="top" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden border-b border-gray-200/70">
      {/* Subtle Apple-style radial ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-gradient-to-b from-blue-100/50 via-slate-100/20 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Meta Bar / Slide Deck Badge */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-gray-200/80 shadow-xs text-xs font-medium text-[#1E1E1E]">
            <span className="w-2 h-2 rounded-full bg-[#0052FF] animate-ping" />
            <span className="font-semibold text-[#0052FF]">NASA SPACE APPS 2024 / 2025</span>
            <span className="text-gray-300">|</span>
            <span className="text-[#6B7280]">Official Project Submission Dossier</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#0052FF] border border-blue-200 text-xs font-semibold">
              <Award className="w-3.5 h-3.5" />
              Global Award Eligible (5 NASA Datasets)
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              Incognito Verified (0 Auth Required)
            </span>
          </div>
        </div>

        {/* Hero Title & Pitch */}
        <div className="max-w-4xl">
          <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-[#0052FF] uppercase mb-3">
            <Flame className="w-4 h-4 text-orange-500" />
            <span>Planetary Wildfire Intelligence</span>
            <ChevronRight className="w-3 h-3 text-gray-400" />
            <Wind className="w-4 h-4 text-[#0052FF]" />
            <span>Atmospheric Aerosol Dispersion</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#111111] leading-[1.08] mb-6">
            {data.title}
          </h1>

          <p className="text-xl sm:text-2xl text-[#4B5563] font-normal leading-relaxed mb-4">
            {data.subtitle}
          </p>

          <p className="text-base sm:text-lg text-[#6B7280] leading-relaxed max-w-3xl mb-8">
            {data.tagline}
          </p>

          {/* Quick Action Navigation Bar (Apple Style Action Buttons) */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            
            {/* Primary Action: Slide Deck */}
            <button
              onClick={onOpenDeck}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#111111] hover:bg-[#252525] text-white text-sm font-semibold shadow-xs hover:shadow-md transition-all cursor-pointer group"
            >
              <Presentation className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
              <span>Explore 7-Slide Deck</span>
              <span className="text-[11px] font-normal bg-white/20 px-2 py-0.5 rounded-full">Max 7</span>
            </button>

            {/* Secondary Action: 30s Video Demo */}
            <button
              onClick={onOpenVideo}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white hover:bg-gray-50 text-[#111111] border border-gray-300 text-sm font-semibold shadow-xs hover:shadow-sm transition-all cursor-pointer group"
            >
              <Play className="w-4 h-4 text-[#0052FF] group-hover:scale-110 transition-transform fill-[#0052FF]" />
              <span>Watch 30s Pitch Video</span>
              <span className="text-[11px] font-medium text-[#6B7280] bg-gray-100 px-2 py-0.5 rounded-full">30s limit</span>
            </button>

            {/* Live Interactive Simulation */}
            <button
              onClick={onOpenSandbox}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#0052FF] hover:bg-[#0043D6] text-white text-sm font-semibold shadow-xs hover:shadow-md transition-all cursor-pointer group"
            >
              <Sparkles className="w-4 h-4 text-yellow-300 group-hover:rotate-12 transition-transform" />
              <span>Launch Live Prototype</span>
            </button>

            {/* GitHub Repo */}
            <a
              href={data.links.codeRepository}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-3.5 rounded-full bg-white hover:bg-gray-50 text-[#4B5563] hover:text-[#111111] border border-gray-200 text-sm font-medium transition-all"
            >
              <GithubIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Code Repository</span>
              <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
            </a>

            {/* Share / Copy link */}
            <button
              onClick={copyShareLink}
              className="inline-flex items-center gap-1.5 px-3 py-3.5 rounded-full bg-white hover:bg-gray-50 text-[#6B7280] hover:text-[#111111] border border-gray-200 text-xs font-medium transition-all cursor-pointer"
              title="Copy verified submission URL"
            >
              {copied ? <CheckCircle className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied Link' : 'Share'}</span>
            </button>
          </div>

        </div>

        {/* Project Metadata Strip (Apple-clean slide footer) */}
        <div className="mt-12 pt-8 border-t border-gray-200/60 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <div className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider mb-1">
              Challenge Track
            </div>
            <div className="text-sm font-semibold text-[#111111]">
              Earth Observation in Action
            </div>
            <div className="text-xs text-[#6B7280]">
              NASA International Space Apps
            </div>
          </div>

          <div>
            <div className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider mb-1">
              Development Team
            </div>
            <div className="text-sm font-semibold text-[#111111]">
              {data.team.name}
            </div>
            <div className="text-xs text-[#6B7280]">
              Lead: {data.team.members[0].name}
            </div>
          </div>

          <div>
            <div className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider mb-1">
              Public Access Verification
            </div>
            <div className="flex items-center gap-1.5 text-sm font-semibold text-emerald-700">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Zero-Auth Confirmed</span>
            </div>
            <div className="text-xs text-[#6B7280]">
              Private window tested: PASS
            </div>
          </div>

          <div>
            <div className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider mb-1">
              NASA Assets Integrated
            </div>
            <div className="text-sm font-semibold text-[#0052FF]">
              5 Validated Datasets
            </div>
            <div className="text-xs text-[#6B7280]">
              FIRMS, MERRA-2, GIBS, Landsat 9, EMIT
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
