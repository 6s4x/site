import React from 'react';
import { 
  Compass, 
  Target, 
  HeartHandshake, 
  Activity, 
  Clock, 
  Maximize2, 
  CheckCircle2, 
  ArrowUpRight 
} from 'lucide-react';

export default function SummarySection({ summary }) {
  return (
    <section id="summary" className="py-20 bg-[#F9F9FB] border-b border-gray-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0052FF] border border-blue-200 text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Required Section 1</span>
            <span className="text-gray-300">•</span>
            <span>Submission Dossier</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#111111] mb-4">
            High-Level Project Summary
          </h2>
          <p className="text-base sm:text-lg text-[#6B7280] max-w-3xl leading-relaxed">
            The mandatory core executive brief: defining precisely what was engineered, how it tackles the NASA challenge statement, and its transformative global impact.
          </p>
        </div>

        {/* 3 Apple-Style Presentation Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-14">
          
          {/* Card 1: What We Built */}
          <div className="slide-card rounded-3xl p-8 flex flex-col justify-between border border-gray-200/80 bg-white">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-[#0052FF] bg-blue-50 px-3 py-1 rounded-full border border-blue-200/60">
                  01 / System Concept
                </span>
                <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-[#0052FF]">
                  <Compass className="w-5 h-5" />
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-[#111111] mb-4">
                What We Built
              </h3>

              <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed mb-6">
                {summary.whatWeBuilt}
              </p>
            </div>

            <div className="pt-6 border-t border-gray-100 flex items-center gap-2 text-xs font-semibold text-[#0052FF]">
              <CheckCircle2 className="w-4 h-4" />
              <span>Full-Stack Web GIS + Edge AI Inference</span>
            </div>
          </div>

          {/* Card 2: How It Addresses the Challenge */}
          <div className="slide-card rounded-3xl p-8 flex flex-col justify-between border border-gray-200/80 bg-white">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-[#0052FF] bg-blue-50 px-3 py-1 rounded-full border border-blue-200/60">
                  02 / Problem Solving
                </span>
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <Target className="w-5 h-5" />
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-[#111111] mb-4">
                Addressing the Challenge
              </h3>

              <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed mb-6">
                {summary.howItAddressesChallenge}
              </p>
            </div>

            <div className="pt-6 border-t border-gray-100 flex items-center gap-2 text-xs font-semibold text-indigo-600">
              <CheckCircle2 className="w-4 h-4" />
              <span>Direct Bridge from Satellite to Hospital Dispatch</span>
            </div>
          </div>

          {/* Card 3: Why It Matters */}
          <div className="slide-card rounded-3xl p-8 flex flex-col justify-between border border-gray-200/80 bg-white">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-[#0052FF] bg-blue-50 px-3 py-1 rounded-full border border-blue-200/60">
                  03 / Human Value
                </span>
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <HeartHandshake className="w-5 h-5" />
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-[#111111] mb-4">
                Why It Matters
              </h3>

              <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed mb-6">
                {summary.whyItMatters}
              </p>
            </div>

            <div className="pt-6 border-t border-gray-100 flex items-center gap-2 text-xs font-semibold text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
              <span>Empowering 340,000+ At-Risk Populations</span>
            </div>
          </div>

        </div>

        {/* Quantified System Benchmarks (Slide Key Takeaways) */}
        <div className="bg-white rounded-3xl p-8 border border-gray-200/80 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-100">
            <div>
              <h4 className="text-lg font-bold text-[#111111]">
                Quantified Engineering Benchmarks
              </h4>
              <p className="text-xs text-[#6B7280]">
                Independently measured during NASA Space Apps development & stress-testing
              </p>
            </div>
            <span className="text-xs font-medium text-[#0052FF] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Open Science Performance Standard
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {summary.keyMetrics.map((metric, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-[#F9F9FB] border border-gray-100">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#111111] mb-1">
                  {metric.value}
                </div>
                <div className="text-xs font-semibold text-[#0052FF] uppercase tracking-wider mb-1">
                  {metric.label}
                </div>
                <div className="text-xs text-[#6B7280]">
                  {metric.detail}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
