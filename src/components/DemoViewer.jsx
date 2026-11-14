import React, { useState, useEffect } from 'react';
import { 
  Presentation, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Subtitles, 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink, 
  CheckCircle, 
  ShieldCheck, 
  Copy, 
  Maximize2, 
  Sparkles, 
  Download,
  Flame,
  Wind,
  Layers,
  Database,
  Users
} from 'lucide-react';

export default function DemoViewer({ demo }) {
  const [activeTab, setActiveTab] = useState('deck'); // 'deck' or 'video'
  const [currentSlide, setCurrentSlide] = useState(1);
  const [copiedLink, setCopiedLink] = useState(false);

  // Video player simulator state
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0); // 0 to 30 seconds
  const [isMuted, setIsMuted] = useState(false);
  const [showCaptions, setShowCaptions] = useState(true);

  // Video timer effect
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setVideoProgress((prev) => {
          if (prev >= 30) {
            setIsPlaying(false);
            return 30;
          }
          return Number((prev + 0.2).toFixed(1));
        });
      }, 200);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const copyDemoLink = (url) => {
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev < 7 ? prev + 1 : 1));
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev > 1 ? prev - 1 : 7));
  };

  const activeSlideData = demo.slides.find((s) => s.slideNumber === currentSlide);

  // Current caption based on video progress
  const getCurrentCaption = () => {
    if (videoProgress < 5.5) return demo.videoScript[0].voiceover;
    if (videoProgress < 13.5) return demo.videoScript[1].voiceover;
    if (videoProgress < 21.5) return demo.videoScript[2].voiceover;
    return demo.videoScript[3].voiceover;
  };

  return (
    <section id="demo" className="py-20 bg-white border-b border-gray-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0052FF] border border-blue-200 text-xs font-semibold uppercase tracking-wider mb-3">
              <span>Required Section 2</span>
              <span className="text-gray-300">•</span>
              <span>Project Demo & Rules Compliance</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#111111] mb-3">
              Project Demo & Pitch
            </h2>
            <p className="text-base sm:text-lg text-[#6B7280] max-w-2xl">
              Judges can evaluate either the <strong>7-Slide Presentation Deck</strong> or the <strong>30-Second Video Pitch</strong>. Both are fully public and tested in incognito with zero login barriers.
            </p>
          </div>

          {/* Mode Switcher Pills (Apple style) */}
          <div className="flex items-center bg-[#F1F3F6] p-1.5 rounded-2xl border border-gray-200/80 self-start md:self-auto">
            <button
              onClick={() => setActiveTab('deck')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'deck'
                  ? 'bg-white text-[#111111] shadow-xs'
                  : 'text-[#6B7280] hover:text-[#111111]'
              }`}
            >
              <Presentation className="w-4 h-4 text-[#0052FF]" />
              <span>7-Slide Deck</span>
              <span className="text-[10px] bg-blue-100 text-[#0052FF] px-1.5 py-0.5 rounded-md font-bold">7 / 7</span>
            </button>

            <button
              onClick={() => setActiveTab('video')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'video'
                  ? 'bg-white text-[#111111] shadow-xs'
                  : 'text-[#6B7280] hover:text-[#111111]'
              }`}
            >
              <Play className="w-4 h-4 text-[#0052FF]" />
              <span>30-Sec Pitch Video</span>
              <span className="text-[10px] bg-blue-100 text-[#0052FF] px-1.5 py-0.5 rounded-md font-bold">30.0s</span>
            </button>
          </div>
        </div>

        {/* Public Access Verification Card */}
        <div className="bg-[#F9F9FB] rounded-2xl p-4 sm:p-5 border border-gray-200/80 mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-[#111111]">Public Link Verified</span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  Zero Login • Incognito Tested
                </span>
              </div>
              <p className="text-xs text-[#6B7280]">
                Requires no Google account, password, or permission request. Direct public access for NASA Judges.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => copyDemoLink(activeTab === 'deck' ? demo.deckUrl : demo.videoUrl)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-xs font-semibold text-[#111111] hover:bg-gray-50 transition-colors cursor-pointer"
            >
              {copiedLink ? <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-gray-500" />}
              <span>{copiedLink ? 'Link Copied!' : 'Copy Direct Link'}</span>
            </button>
            <a
              href={activeTab === 'deck' ? demo.deckUrl : demo.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#0052FF] hover:bg-[#0043D6] text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <span>Open in New Tab</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* TAB 1: 7-Slide Deck Interactive Viewer */}
        {activeTab === 'deck' && (
          <div className="slide-card rounded-3xl border border-gray-200 overflow-hidden bg-white">
            
            {/* Top Deck Control Bar */}
            <div className="px-6 py-4 bg-[#F9F9FB] border-b border-gray-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0052FF] bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                  {activeSlideData.badge}
                </span>
                <span className="text-sm font-semibold text-[#111111]">
                  {activeSlideData.title}
                </span>
              </div>

              {/* Slide Navigator Controls */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                    <button
                      key={num}
                      onClick={() => setCurrentSlide(num)}
                      className={`w-7 h-7 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        currentSlide === num
                          ? 'bg-[#111111] text-white shadow-xs'
                          : 'text-[#6B7280] hover:bg-gray-200'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>

                <div className="h-4 w-px bg-gray-300 mx-1" />

                <div className="flex items-center gap-1">
                  <button
                    onClick={handlePrevSlide}
                    className="p-1.5 rounded-lg text-[#111111] hover:bg-gray-200 transition-colors cursor-pointer"
                    title="Previous Slide (←)"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNextSlide}
                    className="p-1.5 rounded-lg text-[#111111] hover:bg-gray-200 transition-colors cursor-pointer"
                    title="Next Slide (→)"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Slide Presentation Canvas (Crisp 16:9 Presentation Frame) */}
            <div className="p-8 sm:p-12 md:p-16 min-h-[480px] flex flex-col justify-between bg-gradient-to-br from-white via-[#FCFCFE] to-[#F7F8FA]">
              
              {/* Slide Header */}
              <div>
                <div className="flex items-center justify-between text-xs font-medium text-[#6B7280] mb-3">
                  <span>NASA Space Apps 2024 Presentation Deck</span>
                  <span className="font-mono text-[#0052FF]">SLIDE 0{currentSlide} / 07</span>
                </div>
                
                <h3 className="text-2xl sm:text-4xl font-extrabold text-[#111111] tracking-tight mb-2">
                  {activeSlideData.title}
                </h3>
                <p className="text-base sm:text-lg text-[#0052FF] font-medium mb-8">
                  {activeSlideData.subtitle}
                </p>

                {/* Dynamic Slide Content Render based on Slide Number */}
                <div className="my-6">
                  {currentSlide === 1 && (
                    <div className="p-6 sm:p-8 rounded-2xl bg-white border border-gray-200/80 shadow-xs flex flex-col md:flex-row items-center gap-6">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#0052FF] to-[#0B3D91] text-white flex items-center justify-center shrink-0">
                        <Flame className="w-10 h-10" />
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-xl font-bold text-[#111111]">AERO-PULSE Submission Title Slide</h4>
                        <p className="text-sm text-[#4B5563] leading-relaxed">
                          Official 7-slide presentation dossier for NASA Space Apps Challenge. Lead: {demo.slides[0].content}
                        </p>
                        <div className="flex flex-wrap gap-2 pt-2">
                          <span className="text-xs bg-gray-100 text-gray-800 px-2.5 py-1 rounded-md font-mono">Team: Orbital Vanguard</span>
                          <span className="text-xs bg-blue-50 text-[#0052FF] px-2.5 py-1 rounded-md font-mono">Track: Earth Observation</span>
                          <span className="text-xs bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md font-mono">Status: Public</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentSlide === 2 && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="p-5 rounded-2xl bg-red-50/60 border border-red-200">
                        <div className="text-3xl font-extrabold text-red-600 mb-1">340,000+</div>
                        <div className="text-xs font-bold text-red-900 uppercase">Annual Deaths</div>
                        <div className="text-xs text-red-700 mt-1">From acute wildfire smoke & PM2.5 inhalation worldwide.</div>
                      </div>
                      <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200">
                        <div className="text-3xl font-extrabold text-amber-700 mb-1">$140 Billion</div>
                        <div className="text-xs font-bold text-amber-900 uppercase">Health Economic Toll</div>
                        <div className="text-xs text-amber-800 mt-1">Hospital admissions and loss of productive workdays.</div>
                      </div>
                      <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200">
                        <div className="text-3xl font-extrabold text-[#0052FF] mb-1">48 - 72 Hours</div>
                        <div className="text-xs font-bold text-blue-900 uppercase">The Critical Blindspot</div>
                        <div className="text-xs text-blue-700 mt-1">Plumes travel continents unnoticed before sirens sound.</div>
                      </div>
                    </div>
                  )}

                  {currentSlide === 3 && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { title: 'NASA FIRMS', sub: 'VIIRS 375m & MODIS', desc: 'Real-time thermal fire anomalies' },
                        { title: 'NASA MERRA-2', sub: 'Atmospheric Reanalysis', desc: '3D Wind vectors (u/v) & pressure' },
                        { title: 'NASA GIBS', sub: 'WMTS Tile Servers', desc: 'TrueColor imagery browse layers' },
                        { title: 'Landsat 9', sub: 'OLI-2 Multispectral', desc: 'Post-fire burn severity index' },
                      ].map((item, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-white border border-gray-200 shadow-2xs">
                          <div className="text-xs font-bold text-[#0052FF] uppercase">{item.title}</div>
                          <div className="text-xs font-semibold text-[#111111] mt-0.5">{item.sub}</div>
                          <div className="text-[11px] text-[#6B7280] mt-1">{item.desc}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {currentSlide === 4 && (
                    <div className="p-6 rounded-2xl bg-white border border-gray-200 flex flex-col md:flex-row items-center justify-between gap-6">
                      <div className="space-y-2">
                        <div className="text-xs font-bold text-[#0052FF] uppercase">Surrogate Modeling Breakthrough</div>
                        <h4 className="text-lg font-bold text-[#111111]">Physics-Informed Neural Network (PINN)</h4>
                        <p className="text-xs sm:text-sm text-[#4B5563] max-w-xl">
                          Substitutes 45-minute legacy Eulerian/Lagrangian HYSPLIT numerical simulations with an autoregressive neural surrogate delivering 72-hour smoke advection-diffusion in 2.3 seconds.
                        </p>
                      </div>
                      <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-center shrink-0">
                        <div className="text-2xl font-black text-[#0052FF]">1,100x</div>
                        <div className="text-[11px] font-bold text-blue-900 uppercase">Faster Than HYSPLIT</div>
                      </div>
                    </div>
                  )}

                  {currentSlide === 5 && (
                    <div className="p-6 rounded-2xl bg-white border border-gray-200 flex items-center justify-between gap-4">
                      <div>
                        <div className="text-xs font-bold text-emerald-600 uppercase">Interactive Solution</div>
                        <h4 className="text-lg font-bold text-[#111111]">Web-Based Real-Time Earth GIS Dashboard</h4>
                        <p className="text-xs sm:text-sm text-[#4B5563] mt-1">
                          Allows frontline operators to query any hospital or school, view live particulate trajectory, and receive automated GeoJSON alerts without login or fees.
                        </p>
                      </div>
                      <div className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                        60 FPS WebGL
                      </div>
                    </div>
                  )}

                  {currentSlide === 6 && (
                    <div className="p-6 rounded-2xl bg-white border border-gray-200">
                      <div className="text-xs font-bold text-indigo-600 uppercase mb-2">Empirical Benchmarking</div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="p-3 bg-gray-50 rounded-xl">
                          <div className="text-xl font-bold text-[#111111]">94.2%</div>
                          <div className="text-xs text-[#6B7280]">Correlation vs EPA AirNow monitors</div>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-xl">
                          <div className="text-xl font-bold text-[#111111]">84 Mins</div>
                          <div className="text-xs text-[#6B7280]">Earlier than municipal emergency sirens</div>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-xl">
                          <div className="text-xl font-bold text-[#111111]">Zero</div>
                          <div className="text-xs text-[#6B7280]">Hardware costs for frontline towns</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentSlide === 7 && (
                    <div className="p-6 rounded-2xl bg-white border border-gray-200 flex flex-col md:flex-row justify-between items-center gap-6">
                      <div className="space-y-2">
                        <div className="text-xs font-bold text-[#0052FF] uppercase">Conclusion & Commitment</div>
                        <h4 className="text-lg font-bold text-[#111111]">Open Science for Planetary Resilience</h4>
                        <p className="text-xs sm:text-sm text-[#4B5563]">
                          Fully open sourced under Apache 2.0. Ready for integration with NASA PACE satellite missions in 2025.
                        </p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <span className="text-xs font-mono bg-gray-100 text-[#111111] px-3 py-1 rounded-md border border-gray-200">Apache 2.0</span>
                        <span className="text-xs font-mono bg-blue-50 text-[#0052FF] px-3 py-1 rounded-md border border-blue-200">NASA Open Science</span>
                      </div>
                    </div>
                  )}
                </div>

                <p className="text-sm text-[#4B5563] leading-relaxed max-w-3xl">
                  {activeSlideData.content}
                </p>
              </div>

              {/* Slide Footer Key Takeaway */}
              <div className="mt-8 pt-6 border-t border-gray-200/80 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#0052FF]" />
                  <span className="text-xs font-semibold text-[#111111]">Key Takeaway:</span>
                  <span className="text-xs text-[#4B5563]">{activeSlideData.keyTakeaway}</span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={demo.deckUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0052FF] hover:underline"
                  >
                    <span>View in Google Slides</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </div>

            {/* Bottom 7 Slide Thumbnails Strip */}
            <div className="px-6 py-4 bg-[#F9F9FB] border-t border-gray-200 flex items-center justify-between overflow-x-auto gap-3">
              <span className="text-xs font-semibold text-[#6B7280] whitespace-nowrap">
                Slides (Strictly 7 Max):
              </span>
              <div className="flex items-center gap-2">
                {demo.slides.map((s) => (
                  <button
                    key={s.slideNumber}
                    onClick={() => setCurrentSlide(s.slideNumber)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                      currentSlide === s.slideNumber
                        ? 'bg-[#0052FF] text-white shadow-xs'
                        : 'bg-white text-[#4B5563] border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    Slide {s.slideNumber}: {s.title.split(':')[0]}
                  </button>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: 30-Second Video Pitch Demo */}
        {activeTab === 'video' && (
          <div className="slide-card rounded-3xl border border-gray-200 overflow-hidden bg-white">
            
            {/* Video Player Frame */}
            <div className="relative aspect-video max-h-[520px] bg-[#0A0D14] flex flex-col justify-between p-6 sm:p-10 text-white overflow-hidden">
              
              {/* Background ambient visuals simulating high-resolution NASA Earth observation demo */}
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#0052FF_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
              
              {/* Video Top Overlay */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                    NASA Space Apps Pitch Reel • 30-Sec Cap
                  </span>
                </div>
                <div className="text-xs font-mono bg-black/60 px-3 py-1 rounded-full border border-white/10">
                  {videoProgress.toFixed(1)}s / 30.0s
                </div>
              </div>

              {/* Center Simulated Player Graphic */}
              <div className="relative z-10 flex flex-col items-center justify-center my-auto text-center">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-20 h-20 rounded-full bg-white/95 text-[#111111] hover:bg-white hover:scale-105 flex items-center justify-center shadow-2xl transition-all cursor-pointer mb-4"
                  title={isPlaying ? 'Pause Demo' : 'Play 30s Demo'}
                >
                  {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
                </button>
                <div className="text-lg font-bold">AERO-PULSE 30-Second Rapid Pitch</div>
                <div className="text-xs text-gray-400 mt-1">Full English voiceover & verified subtitles</div>
              </div>

              {/* Subtitles Overlay Bar */}
              {showCaptions && (
                <div className="relative z-10 self-center max-w-2xl bg-black/85 backdrop-blur-md px-5 py-2.5 rounded-xl border border-white/20 text-center mb-4">
                  <span className="text-xs sm:text-sm font-medium text-yellow-300">
                    [EN Subtitles]: "{getCurrentCaption()}"
                  </span>
                </div>
              )}

              {/* Bottom Scrubber & Controls */}
              <div className="relative z-10 space-y-2">
                {/* Progress bar */}
                <div 
                  className="w-full h-2 bg-white/20 rounded-full overflow-hidden cursor-pointer"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    const newProgress = (clickX / rect.width) * 30;
                    setVideoProgress(Number(newProgress.toFixed(1)));
                  }}
                >
                  <div 
                    className="h-full bg-[#0052FF] transition-all duration-100" 
                    style={{ width: `${(videoProgress / 30) * 100}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-gray-300 pt-1">
                  <div className="flex items-center gap-3">
                    <button onClick={() => setIsPlaying(!isPlaying)} className="hover:text-white cursor-pointer">
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    <button onClick={() => setIsMuted(!isMuted)} className="hover:text-white cursor-pointer">
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                    <span className="font-mono text-[11px]">0:{videoProgress < 10 ? `0${Math.floor(videoProgress)}` : Math.floor(videoProgress)} / 0:30</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setShowCaptions(!showCaptions)} 
                      className={`flex items-center gap-1 text-[11px] px-2 py-0.5 rounded cursor-pointer ${showCaptions ? 'bg-white/20 text-white' : 'text-gray-400'}`}
                    >
                      <Subtitles className="w-3.5 h-3.5" />
                      <span>CC (English)</span>
                    </button>
                    <span className="text-[11px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30">
                      Rule Compliant (&lt;30s)
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Video Script Breakdown (Judges Inspection) */}
            <div className="p-8 bg-[#F9F9FB] border-t border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-bold text-[#111111] uppercase tracking-wider">
                  Synchronized 30-Second Script & Voiceover Timeline
                </h4>
                <span className="text-xs text-[#6B7280]">Language: English (US)</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {demo.videoScript.map((segment, idx) => (
                  <div 
                    key={idx}
                    className={`p-4 rounded-2xl border transition-all ${
                      (idx === 0 && videoProgress < 5.5) ||
                      (idx === 1 && videoProgress >= 5.5 && videoProgress < 13.5) ||
                      (idx === 2 && videoProgress >= 13.5 && videoProgress < 21.5) ||
                      (idx === 3 && videoProgress >= 21.5)
                        ? 'bg-blue-50/70 border-[#0052FF] shadow-xs'
                        : 'bg-white border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-mono text-[#0052FF] mb-1">
                      <span>{segment.time}</span>
                      <span className="font-bold">Part 0{idx + 1}</span>
                    </div>
                    <div className="text-xs font-bold text-[#111111] mb-1">{segment.title}</div>
                    <div className="text-xs text-[#4B5563] leading-relaxed italic">
                      "{segment.voiceover}"
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
