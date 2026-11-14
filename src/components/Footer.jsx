import React from 'react';
import { Globe, ArrowUp, ExternalLink, Heart, ShieldCheck } from 'lucide-react';
import GithubIcon from './GithubIcon';

export default function Footer({ data }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#FFFFFF] border-t border-gray-200/80 py-16 text-[#6B7280]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-gray-100">
          
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#0052FF] flex items-center justify-center text-white">
                <Globe className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-[#111111]">
                {data.title}
              </span>
              <span className="text-xs bg-gray-100 text-[#111111] px-2.5 py-0.5 rounded-full font-mono">
                Space Apps 2024 / 2025
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#4B5563] max-w-lg leading-relaxed">
              Developed by {data.team.name} under the NASA International Space Apps Challenge. Committed to global disaster resilience and open science.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#F9F9FB] hover:bg-gray-100 text-[#111111] border border-gray-200 text-xs font-semibold transition-colors cursor-pointer"
            >
              <ArrowUp className="w-4 h-4" />
              <span>Back to Top</span>
            </button>
          </div>

        </div>

        {/* Links & Attribution */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          
          <div className="flex flex-wrap items-center gap-6">
            <span>© 2024 Team {data.team.name}</span>
            <span>•</span>
            <span className="text-emerald-700 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Public Domain & Apache 2.0
            </span>
            <span>•</span>
            <span>NASA Open Science Principles Compliant</span>
          </div>

          <div className="text-xs text-[#6B7280]">
            Submission language: English (US) • Public Incognito Verified
          </div>

        </div>

      </div>
    </footer>
  );
}
