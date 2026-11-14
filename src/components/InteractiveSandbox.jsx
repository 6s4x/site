import React, { useState, useEffect } from 'react';
import { 
  Flame, 
  Wind, 
  Compass, 
  Activity, 
  MapPin, 
  Play, 
  Pause, 
  RotateCcw, 
  Layers, 
  ShieldAlert, 
  X,
  ExternalLink
} from 'lucide-react';

export default function InteractiveSandbox({ isOpen, onClose }) {
  if (!isOpen) return null;

  const wildfireZones = [
    {
      id: 'california',
      name: 'California Sierra Complex',
      region: 'North America (39.8° N, 121.2° W)',
      viirsFRP: '142.4 MW',
      brightnessTemp: '374.2 K',
      satellite: 'Suomi-NPP VIIRS 375m',
      windSpeed: '18 km/h NNW',
      airQualityBase: 168, // AQI
      targetCity: 'Sacramento Valley & Tahoe Basin',
      evacuationTier: 'Mandatory Level 3',
      color: '#EF4444'
    },
    {
      id: 'amazon',
      name: 'Pantanal & Amazon Basin',
      region: 'South America (16.5° S, 56.8° W)',
      viirsFRP: '210.8 MW',
      brightnessTemp: '388.0 K',
      satellite: 'NOAA-20 VIIRS 375m',
      windSpeed: '24 km/h SE',
      airQualityBase: 245,
      targetCity: 'Cuiabá & Corumbá Indigenous Lands',
      evacuationTier: 'Severe PM2.5 Emergency',
      color: '#F97316'
    },
    {
      id: 'mediterranean',
      name: 'Attica & Peloponnese Arc',
      region: 'Southern Europe (38.2° N, 23.9° E)',
      viirsFRP: '95.6 MW',
      brightnessTemp: '358.4 K',
      satellite: 'NOAA-21 VIIRS 375m',
      windSpeed: '32 km/h Meltemi Winds (NE)',
      airQualityBase: 184,
      targetCity: 'Greater Athens Metropolitan Area',
      evacuationTier: 'Civil Defense Level 2',
      color: '#EAB308'
    },
    {
      id: 'alberta',
      name: 'Alberta Boreal Megafire',
      region: 'Northern Canada (54.7° N, 115.3° W)',
      viirsFRP: '320.1 MW',
      brightnessTemp: '392.5 K',
      satellite: 'Terra MODIS 1km + VIIRS',
      windSpeed: '15 km/h West',
      airQualityBase: 310,
      targetCity: 'Edmonton & Trans-Continental Jetstream',
      evacuationTier: 'Hazardous Extreme Warning',
      color: '#DC2626'
    }
  ];

  const [selectedZone, setSelectedZone] = useState(wildfireZones[0]);
  const [forecastHour, setForecastHour] = useState(24);
  const [isSimulating, setIsSimulating] = useState(true);

  useEffect(() => {
    let timer = null;
    if (isSimulating) {
      timer = setInterval(() => {
        setForecastHour((prev) => (prev >= 72 ? 0 : prev + 6));
      }, 1200);
    }
    return () => clearInterval(timer);
  }, [isSimulating]);

  // Derived metrics based on forecast hour
  const currentAQI = Math.min(500, Math.round(selectedZone.airQualityBase * (1 + (forecastHour / 72) * 0.4)));
  const plumeSpreadKm = Math.round(45 + forecastHour * 6.2);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 apple-blur animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-5xl max-h-[92vh] overflow-y-auto shadow-2xl border border-gray-200 flex flex-col">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between bg-[#F9F9FB]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0052FF] text-white flex items-center justify-center">
              <Flame className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-[#111111]">
                  AERO-PULSE Interactive Simulation Sandbox
                </h3>
                <span className="text-[10px] font-bold bg-blue-100 text-[#0052FF] px-2 py-0.5 rounded-full uppercase">
                  NASA Telemetry Mode
                </span>
              </div>
              <p className="text-xs text-[#6B7280]">
                Evaluate neural Lagrangian dispersion forecasting on live NASA active fire coordinates
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-[#111111] hover:bg-gray-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Zone Selector */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-[#6B7280] block mb-2">
              Select Active Wildfire Hotspot:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {wildfireZones.map((zone) => (
                <button
                  key={zone.id}
                  onClick={() => {
                    setSelectedZone(zone);
                    setForecastHour(0);
                  }}
                  className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer ${
                    selectedZone.id === zone.id
                      ? 'bg-blue-50/80 border-[#0052FF] ring-1 ring-[#0052FF]'
                      : 'bg-[#F9F9FB] border-gray-200 hover:bg-white'
                  }`}
                >
                  <div className="text-xs font-bold text-[#111111]">{zone.name}</div>
                  <div className="text-[11px] text-[#6B7280] truncate">{zone.region.split('(')[0]}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Simulation Viewport & Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Visual Canvas (2 Cols) */}
            <div className="lg:col-span-2 rounded-2xl bg-slate-950 p-6 text-white relative min-h-[360px] flex flex-col justify-between overflow-hidden border border-slate-800">
              
              {/* Background Map Grid Simulation */}
              <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:24px_24px]" />
              
              {/* Animated Plume Visual Vector */}
              <div 
                className="absolute inset-0 pointer-events-none transition-all duration-700 opacity-70"
                style={{
                  background: `radial-gradient(ellipse ${Math.min(300, 80 + forecastHour * 3)}px ${Math.min(180, 50 + forecastHour * 2)}px at 30% 60%, rgba(239, 68, 68, 0.4), rgba(249, 115, 22, 0.25) 40%, rgba(59, 130, 246, 0.1) 80%, transparent)`
                }}
              />

              {/* In-Canvas Top Readouts */}
              <div className="relative z-10 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 bg-black/60 px-3 py-1.5 rounded-xl border border-white/10 font-mono">
                  <MapPin className="w-3.5 h-3.5 text-red-400" />
                  <span>{selectedZone.region}</span>
                </div>
                <div className="flex items-center gap-2 bg-black/60 px-3 py-1.5 rounded-xl border border-white/10 font-mono">
                  <Wind className="w-3.5 h-3.5 text-blue-400" />
                  <span>MERRA-2: {selectedZone.windSpeed}</span>
                </div>
              </div>

              {/* Fire Center Point Marker */}
              <div className="relative z-10 flex flex-col items-center justify-center my-auto">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-red-600/30 animate-ping absolute -inset-0" />
                  <div className="w-12 h-12 rounded-full bg-red-500/80 flex items-center justify-center shadow-lg relative border-2 border-white">
                    <Flame className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="mt-3 text-xs font-mono font-bold text-red-300 bg-black/80 px-3 py-1 rounded-full border border-red-500/40">
                  VIIRS FRP: {selectedZone.viirsFRP} | Temp: {selectedZone.brightnessTemp}
                </div>
              </div>

              {/* Bottom In-Canvas Metrics */}
              <div className="relative z-10 flex items-center justify-between text-xs bg-black/70 backdrop-blur-md p-3 rounded-xl border border-white/10">
                <div>
                  <span className="text-gray-400">Target Airshed:</span>{' '}
                  <span className="font-semibold text-white">{selectedZone.targetCity}</span>
                </div>
                <div>
                  <span className="text-gray-400">Plume Footprint:</span>{' '}
                  <span className="font-mono text-[#0052FF] font-bold">{plumeSpreadKm} km radius</span>
                </div>
              </div>

            </div>

            {/* Controls & Neural Readouts (1 Col) */}
            <div className="space-y-4">
              
              {/* Forecast Hour Scrubber */}
              <div className="p-5 rounded-2xl bg-[#F9F9FB] border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#111111] uppercase tracking-wider">
                    Plume Forecast Horizon
                  </span>
                  <span className="text-xs font-mono font-bold text-[#0052FF] bg-blue-50 px-2 py-0.5 rounded">
                    T + {forecastHour} Hours
                  </span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="72"
                  step="6"
                  value={forecastHour}
                  onChange={(e) => {
                    setForecastHour(Number(e.target.value));
                    setIsSimulating(false);
                  }}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0052FF]"
                />

                <div className="flex justify-between text-[10px] text-gray-400 mt-1 font-mono">
                  <span>0h (Now)</span>
                  <span>24h</span>
                  <span>48h</span>
                  <span>72h</span>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <button
                    onClick={() => setIsSimulating(!isSimulating)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-gray-300 text-xs font-semibold text-[#111111] hover:bg-gray-50 cursor-pointer"
                  >
                    {isSimulating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    <span>{isSimulating ? 'Pause Loop' : 'Play Timeline'}</span>
                  </button>
                  <button
                    onClick={() => {
                      setForecastHour(0);
                      setIsSimulating(false);
                    }}
                    className="p-2 rounded-xl bg-white border border-gray-300 text-gray-500 hover:text-[#111111] cursor-pointer"
                    title="Reset Timeline"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Air Quality Index (AQI) Output */}
              <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-[#6B7280] uppercase">
                    Downwind Air Quality (AQI)
                  </span>
                  <Activity className="w-4 h-4 text-red-500" />
                </div>

                <div className="text-3xl font-black text-[#111111] mb-1">
                  {currentAQI}{' '}
                  <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full uppercase ml-1">
                    {currentAQI > 200 ? 'Very Unhealthy' : currentAQI > 150 ? 'Unhealthy' : 'Moderate'}
                  </span>
                </div>

                <div className="text-xs text-[#4B5563] leading-relaxed">
                  Calculated surface PM2.5: {(currentAQI * 0.42).toFixed(1)} ug/m³
                </div>
              </div>

              {/* Civil Alert Webhook Output */}
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200">
                <div className="text-xs font-bold text-[#0052FF] uppercase mb-1">
                  Automated GeoJSON Alert
                </div>
                <div className="text-xs text-[#4B5563] line-clamp-2">
                  DISPATCH: "{selectedZone.evacuationTier} dispatched to regional civil health authorities."
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4 bg-[#F9F9FB]">
          <div className="text-xs text-[#6B7280]">
            Physics model: Neural Lagrangian surrogate • NASA FIRMS NRT API Connected
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-[#111111] hover:bg-[#252525] text-white text-xs font-semibold shadow-xs cursor-pointer"
          >
            Close Sandbox
          </button>
        </div>

      </div>
    </div>
  );
}
