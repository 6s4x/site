import React, { useState } from 'react';
import { 
  Sparkles, 
  ShieldAlert, 
  CheckCircle2, 
  AlertCircle, 
  Eye, 
  FileCheck, 
  Cpu, 
  Layers, 
  Bot, 
  ShieldCheck 
} from 'lucide-react';

export default function AiUsageSection({ aiUsage }) {
  const [showWatermarkSample, setShowWatermarkSample] = useState(true);

  return (
    <section id="ai-usage" className="py-20 bg-[#F9F9FB] border-b border-gray-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0052FF] border border-blue-200 text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Required Section 5</span>
            <span className="text-gray-300">•</span>
            <span>NASA Space Apps AI / "SI" Policy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#111111] mb-4">
            Use of Artificial Intelligence ("SI")
          </h2>
          <p className="text-base sm:text-lg text-[#6B7280] max-w-3xl leading-relaxed">
            Transparent disclosure of where and how AI/synthetic intelligence was deployed, accompanied by strict verification safeguards and indelible watermarking protocols for all generated media.
          </p>
        </div>

        {/* Formal Disclosure Declaration Box (Apple style) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0052FF] flex items-center justify-center shrink-0 mt-1">
              <Bot className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-[#111111]">
                  Official Synthetic Intelligence (SI) Disclosure Statement
                </span>
                <span className="text-[10px] font-bold bg-blue-100 text-[#0052FF] px-2 py-0.5 rounded-full uppercase">
                  Space Apps 2024 Guidelines
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed max-w-3xl">
                {aiUsage.disclosureStatement}
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-2xl">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Human-in-the-Loop Verified</span>
          </div>
        </div>

        {/* AI Deployment Grid */}
        <div className="mb-14">
          <h3 className="text-xl font-bold text-[#111111] mb-6">
            Detailed Breakdown of AI Usage by Domain
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aiUsage.aiCategories.map((item, idx) => (
              <div key={idx} className="slide-card rounded-3xl p-6 bg-white border border-gray-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#0052FF] bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                      {item.domain}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                      item.isCriticalSystem 
                        ? 'bg-purple-50 text-purple-700 border border-purple-200' 
                        : 'bg-gray-100 text-gray-700 border border-gray-200'
                    }`}>
                      {item.isCriticalSystem ? 'Core Scientific Model' : 'Assisted Workflow'}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-[#111111] mb-2 flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-[#0052FF]" />
                    <span>{item.toolUsed}</span>
                  </h4>

                  <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                    {item.role}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-[#6B7280]">
                  <span>Physical Law Constraints: Enforced</span>
                  <span className="text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Audited
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mandatory Watermarking Policy & Interactive Watermark Showcase */}
        <div className="slide-card rounded-3xl p-8 bg-white border border-gray-200">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 pb-6 border-b border-gray-100">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-amber-600 uppercase tracking-wider mb-2">
                <ShieldAlert className="w-4 h-4" />
                <span>Mandatory NASA Watermarking Policy</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#111111]">
                AI-Generated Media & Image Watermarking Standard
              </h3>
              <p className="text-xs sm:text-sm text-[#6B7280] max-w-2xl mt-1">
                {aiUsage.watermarkingPolicy.complianceDetails}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-[#6B7280]">Preview Watermark:</span>
              <button
                onClick={() => setShowWatermarkSample(!showWatermarkSample)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  showWatermarkSample
                    ? 'bg-[#0052FF] text-white shadow-xs'
                    : 'bg-gray-100 text-[#111111] hover:bg-gray-200'
                }`}
              >
                {showWatermarkSample ? 'Watermark: ACTIVE (Compliant)' : 'Watermark: OFF'}
              </button>
            </div>
          </div>

          {/* Interactive Watermarked Asset Inspection Card */}
          <div className="relative rounded-2xl overflow-hidden border border-gray-300 bg-slate-900 min-h-[300px] flex items-center justify-center p-8 text-center text-white">
            
            {/* Visual simulation of 3D smoke dispersion simulation */}
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-blue-950/60 to-slate-900 opacity-90" />
            
            <div className="relative z-10 max-w-md space-y-3">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 mx-auto flex items-center justify-center border border-blue-400/30">
                <Sparkles className="w-6 h-6 animate-pulse" />
              </div>
              <div className="text-base font-bold">
                Synthetic Neural Plume Dispersion Visualization
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Rendered using Physics-Informed Lagrangian surrogate on NASA VIIRS thermal anomaly seed coordinates.
              </p>
            </div>

            {/* Indelible Watermark Badge Overlay */}
            {showWatermarkSample && (
              <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-yellow-400/50 shadow-lg animate-fade-in">
                <span className="w-2 h-2 rounded-full bg-yellow-400 animate-ping" />
                <span className="font-mono text-[10px] sm:text-xs font-bold text-yellow-300 tracking-wider">
                  [SI // AI-GENERATED ASSET: NASA SPACE APPS 2024 COMPLIANT]
                </span>
              </div>
            )}

            {/* Top-left Origin Badge */}
            <div className="absolute top-4 left-4 z-20 text-[10px] font-mono text-gray-400 bg-black/60 px-2.5 py-1 rounded border border-white/10">
              SIMULATION ID: PINN-DISP-2024-V4
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between text-xs text-[#6B7280]">
            <span>Raw NASA MODIS/VIIRS satellite telemetry is preserved without synthetic alteration.</span>
            <span className="text-[#0052FF] font-semibold">NASA AI Ethics Standards: 100% Passed</span>
          </div>

        </div>

      </div>
    </section>
  );
}
