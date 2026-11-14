import React, { useState } from 'react';
import { 
  BookOpen, 
  ExternalLink, 
  Code2, 
  Image as ImageIcon, 
  FileText, 
  Search,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';

export default function ReferencesSection({ references }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <section id="references" className="py-20 bg-[#F9F9FB] border-b border-gray-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0052FF] border border-blue-200 text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Required Section 7</span>
            <span className="text-gray-300">•</span>
            <span>Academic Rigor & Intellectual Property</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#111111] mb-4">
            References & Attribution
          </h2>
          <p className="text-base sm:text-lg text-[#6B7280] max-w-3xl leading-relaxed">
            Full compliance with NASA Space Apps attribution requirements: citing space agency datasets, peer-reviewed literature, open-source libraries, and media assets.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white rounded-2xl p-3 border border-gray-200 shadow-xs mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {['all', 'agencies', 'code', 'media'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer capitalize ${
                  activeCategory === cat
                    ? 'bg-[#111111] text-white shadow-xs'
                    : 'text-[#6B7280] hover:text-[#111111] hover:bg-gray-100'
                }`}
              >
                {cat === 'all' ? 'All Citations' : cat === 'agencies' ? 'Space Agencies' : cat === 'code' ? 'Code & Libraries' : 'Media & Text'}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#F9F9FB] rounded-xl border border-gray-200 text-xs text-[#111111]">
            <Search className="w-3.5 h-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search citations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-xs w-36 sm:w-48 placeholder-gray-400"
            />
          </div>
        </div>

        {/* 1. Space Agency Data Citations */}
        {(activeCategory === 'all' || activeCategory === 'agencies') && (
          <div className="mb-10">
            <h3 className="text-lg font-bold text-[#111111] mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#0052FF]" />
              <span>Space Agency Datasets & Scholarly Literature</span>
            </h3>

            <div className="space-y-3">
              {references.spaceAgencies
                .filter((item) => item.citation.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((ref, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-white border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs hover:border-gray-300 transition-colors">
                    <div>
                      <div className="text-xs font-semibold text-[#0052FF] mb-1">{ref.type}</div>
                      <p className="text-xs sm:text-sm text-[#111111] font-medium leading-relaxed">
                        {ref.citation}
                      </p>
                      {ref.doi && (
                        <span className="text-[11px] font-mono text-[#6B7280] mt-1 inline-block">
                          DOI: {ref.doi}
                        </span>
                      )}
                    </div>

                    <a
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-xs font-semibold text-[#111111] border border-gray-200 shrink-0 transition-colors"
                    >
                      <span>Visit Resource</span>
                      <ExternalLink className="w-3.5 h-3.5 text-gray-500" />
                    </a>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* 2. Code & Open Source Libraries */}
        {(activeCategory === 'all' || activeCategory === 'code') && (
          <div className="mb-10">
            <h3 className="text-lg font-bold text-[#111111] mb-4 flex items-center gap-2">
              <Code2 className="w-4 h-4 text-[#0052FF]" />
              <span>Open Source Code, Frameworks & Libraries</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {references.codeAndLibraries
                .filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.usage.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((lib, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-white border border-gray-200 flex flex-col justify-between shadow-2xs">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold text-[#111111]">{lib.name}</span>
                        <span className="text-[10px] font-mono bg-blue-50 text-[#0052FF] px-2 py-0.5 rounded border border-blue-200">
                          {lib.license}
                        </span>
                      </div>
                      <p className="text-xs text-[#6B7280] leading-relaxed mb-4">
                        {lib.usage}
                      </p>
                    </div>

                    <a
                      href={lib.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0052FF] hover:underline"
                    >
                      <span>Documentation</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* 3. Media, Text & Dataset Attribution */}
        {(activeCategory === 'all' || activeCategory === 'media') && (
          <div>
            <h3 className="text-lg font-bold text-[#111111] mb-4 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-[#0052FF]" />
              <span>Media, Cartographic Basemaps & Text Attribution</span>
            </h3>

            <div className="space-y-3">
              {references.mediaAndTextAttribution
                .filter((item) => item.source.toLowerCase().includes(searchQuery.toLowerCase()) || item.item.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                    <div>
                      <div className="text-xs font-bold text-[#111111]">{item.source}</div>
                      <div className="text-xs text-[#4B5563]">{item.item}</div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md border border-gray-200">
                        {item.license}
                      </span>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[#0052FF] hover:underline flex items-center gap-1 font-semibold"
                      >
                        <span>Source</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
