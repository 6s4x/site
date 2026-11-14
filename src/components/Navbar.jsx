import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  ExternalLink, 
  CheckCircle2, 
  Layers, 
  FileText, 
  PlayCircle, 
  Database, 
  Sparkles, 
  ShieldCheck, 
  Sliders
} from 'lucide-react';

export default function Navbar({ onOpenCustomizer, onOpenRulesModal, onOpenSandbox }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('summary');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = ['summary', 'demo', 'links', 'details', 'ai-usage', 'nasa-data', 'references', 'rules'];
      const scrollPos = window.scrollY + 200;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'summary', label: 'Summary', icon: FileText },
    { id: 'demo', label: 'Demo (Deck/Video)', icon: PlayCircle },
    { id: 'links', label: 'Project Links', icon: ExternalLink },
    { id: 'details', label: 'Architecture & Tech', icon: Layers },
    { id: 'ai-usage', label: 'AI ("SI") Disclosure', icon: Sparkles },
    { id: 'nasa-data', label: 'NASA Data', icon: Database },
    { id: 'rules', label: 'Rules Compliance', icon: ShieldCheck },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-[#FFFFFF]/90 apple-blur border-b border-gray-200/80 shadow-xs py-2.5' 
        : 'bg-[#F9F9FB]/80 apple-blur border-b border-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand identity */}
        <a href="#top" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0052FF] to-[#0B3D91] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform duration-200">
            <Globe className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold tracking-tight text-[#111111] text-base group-hover:text-[#0052FF] transition-colors">
                AERO-PULSE
              </span>
              <span className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-[#0052FF] border border-blue-200/60 uppercase">
                NASA Space Apps
              </span>
            </div>
            <p className="text-[11px] text-[#6B7280] font-medium hidden sm:block">
              Earth Observation & Neural Plume Forecasting
            </p>
          </div>
        </a>

        {/* Section Navigation Pills (Apple style) */}
        <nav className="hidden xl:flex items-center gap-1 bg-[#F1F3F6] p-1 rounded-full border border-gray-200/60">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-[#111111] shadow-xs font-semibold'
                    : 'text-[#6B7280] hover:text-[#111111] hover:bg-white/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#0052FF]' : 'text-[#6B7280]'}`} />
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Action Controls & Verification Badge */}
        <div className="flex items-center gap-2.5">
          {/* Rules audit pill */}
          <button
            onClick={onOpenRulesModal}
            className="flex items-center gap-1.5 text-xs font-medium bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-full transition-all cursor-pointer"
            title="NASA Space Apps Rules Audit: 100% Compliant"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">Rules Compliant</span>
            <span className="text-[10px] font-bold bg-emerald-600 text-white rounded-full px-1.5 py-0.2">100%</span>
          </button>

          {/* Interactive Simulation Launcher */}
          <button
            onClick={onOpenSandbox}
            className="hidden md:flex items-center gap-1.5 text-xs font-medium bg-[#0052FF] hover:bg-[#0043D6] text-white px-3.5 py-1.5 rounded-full shadow-xs transition-all cursor-pointer hover:shadow-md"
          >
            <PlayCircle className="w-3.5 h-3.5" />
            <span>Launch Simulation</span>
          </button>

          {/* Project Customizer modal toggle */}
          <button
            onClick={onOpenCustomizer}
            className="flex items-center gap-1 p-1.5 rounded-full text-[#4B5563] hover:text-[#111111] hover:bg-gray-100 transition-colors border border-gray-200/80 cursor-pointer"
            title="Edit submission details / customize view"
          >
            <Sliders className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
}
