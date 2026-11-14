import React, { useState } from 'react';
import { 
  Cpu, 
  Satellite, 
  Wind, 
  Activity, 
  Layers, 
  CheckCircle2, 
  Sparkles, 
  ChevronRight,
  Code2,
  Server,
  Database,
  Cloud
} from 'lucide-react';

export default function ProjectDetailsSection({ details }) {
  const [activeStep, setActiveStep] = useState(0);

  const iconMap = {
    Satellite: Satellite,
    Wind: Wind,
    Cpu: Cpu,
    Activity: Activity,
    Layers: Layers
  };

  return (
    <section id="details" className="py-20 bg-white border-b border-gray-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0052FF] border border-blue-200 text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Required Section 4</span>
            <span className="text-gray-300">•</span>
            <span>Technical Deep Dive</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#111111] mb-4">
            Project Architecture & Details
          </h2>
          <p className="text-base sm:text-lg text-[#6B7280] max-w-3xl leading-relaxed">
            A comprehensive breakdown of how AERO-PULSE works under the hood, the life-saving benefits delivered to frontline communities, and the open-source technologies powering the stack.
          </p>
        </div>

        {/* 1. How It Works (Step-by-step Interactive Pipeline) */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#111111]">
                1. System Architecture: How It Works
              </h3>
              <p className="text-xs sm:text-sm text-[#6B7280]">
                From orbital satellite sensor telemetry to sub-second browser-rendered forecasts
              </p>
            </div>
            <span className="text-xs font-mono text-[#0052FF] bg-blue-50 px-3 py-1 rounded-full border border-blue-200 hidden sm:inline-block">
              5-Stage Automated Ingestion
            </span>
          </div>

          {/* Interactive Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            {details.howItWorks.map((step, idx) => {
              const Icon = iconMap[step.icon] || Cpu;
              const isSelected = activeStep === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`p-5 rounded-2xl text-left transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-blue-50/80 border-[#0052FF] shadow-xs ring-1 ring-[#0052FF]'
                      : 'bg-[#F9F9FB] border-gray-200 hover:border-gray-300 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs font-mono font-bold ${isSelected ? 'text-[#0052FF]' : 'text-gray-400'}`}>
                      {step.step}
                    </span>
                    <Icon className={`w-5 h-5 ${isSelected ? 'text-[#0052FF]' : 'text-gray-500'}`} />
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#111111] mb-1 line-clamp-2">
                    {step.title}
                  </h4>
                  <div className="text-[11px] text-[#6B7280]">
                    Stage {idx + 1} Pipeline
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Step Deep-Dive Canvas (Apple style) */}
          <div className="slide-card rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-white to-[#F9F9FB] border border-gray-200/90 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold bg-[#0052FF] text-white px-2.5 py-0.5 rounded-md">
                    STAGE {details.howItWorks[activeStep].step}
                  </span>
                  <span className="text-xs font-semibold text-[#0052FF]">
                    Active Pipeline Component
                  </span>
                </div>
                <h4 className="text-2xl font-bold text-[#111111]">
                  {details.howItWorks[activeStep].title}
                </h4>
                <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">
                  {details.howItWorks[activeStep].description}
                </p>
              </div>

              <div className="shrink-0 p-6 rounded-2xl bg-white border border-gray-200/80 text-center shadow-xs">
                <div className="text-xs font-semibold text-[#6B7280] uppercase mb-1">Execution Speed</div>
                <div className="text-2xl font-black text-[#0052FF]">Sub-Second</div>
                <div className="text-[11px] text-gray-500 mt-1">Zero Cloud Lock-in</div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Key Benefits & Real-World Impact */}
        <div className="mb-20">
          <div className="mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-[#111111]">
              2. Quantified Benefits & Societal Impact
            </h3>
            <p className="text-xs sm:text-sm text-[#6B7280]">
              Engineered specifically for public health resilience and disaster equity
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {details.benefits.map((benefit, idx) => (
              <div key={idx} className="slide-card rounded-3xl p-6 bg-[#F9F9FB] border border-gray-200 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold text-[#0052FF] uppercase tracking-wider mb-3 bg-white w-fit px-2.5 py-1 rounded-full border border-gray-200">
                    {benefit.tag}
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-[#111111] mb-2">
                    {benefit.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                    {benefit.description}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-gray-200/60 flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Validated by Mission Data</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Tools & Languages Used (Categorized Tech Stack) */}
        <div>
          <div className="mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-[#111111]">
              3. Tools, Frameworks & Languages Used
            </h3>
            <p className="text-xs sm:text-sm text-[#6B7280]">
              Full open-source React stack combined with modern geospatial data engineering
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {details.techStack.map((stack, idx) => (
              <div key={idx} className="p-6 rounded-3xl bg-white border border-gray-200 shadow-xs">
                <div className="text-xs font-bold text-[#0052FF] uppercase tracking-wider mb-4 flex items-center justify-between">
                  <span>{stack.category}</span>
                  <Code2 className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {stack.tools.map((tool, tIdx) => (
                    <span 
                      key={tIdx} 
                      className="px-3 py-1.5 rounded-xl bg-[#F9F9FB] hover:bg-blue-50 border border-gray-200 hover:border-blue-200 text-xs font-medium text-[#111111] transition-colors"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
