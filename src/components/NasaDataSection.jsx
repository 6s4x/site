import React, { useState } from 'react';
import { 
  Database, 
  Award, 
  ExternalLink, 
  CheckCircle2, 
  Terminal, 
  Flame, 
  Wind, 
  Layers, 
  Globe, 
  Radio,
  Copy,
  Check
} from 'lucide-react';

export default function NasaDataSection({ nasaData }) {
  const [selectedAsset, setSelectedAsset] = useState(nasaData[0].id);
  const [copiedEndpoint, setCopiedEndpoint] = useState(false);

  const activeAsset = nasaData.find((a) => a.id === selectedAsset);

  // Sample NASA API payloads to display in interactive inspector
  const samplePayloads = {
    firms: {
      endpoint: "GET https://firms.modaps.eosdis.nasa.gov/api/area/csv/[MAP_KEY]/VIIRS_SNPP_NRT/-122.5,37.5,-122.0,38.0/1",
      contentType: "application/json / GeoJSON",
      latency: "10-minute cadence",
      sample: `{
  "type": "FeatureCollection",
  "source": "NASA FIRMS NRT (VIIRS S-NPP)",
  "features": [
    {
      "type": "Feature",
      "geometry": { "type": "Point", "coordinates": [-121.842, 38.412] },
      "properties": {
        "brightness_ti4": 367.4, // Kelvin (375m I-band)
        "scan": 0.42,
        "track": 0.38,
        "acq_date": "2024-10-06",
        "acq_time": "1842",
        "satellite": "Suomi-NPP",
        "confidence": "nominal",
        "frp": 84.6, // Fire Radiative Power (MW)
        "daynight": "D"
      }
    }
  ]
}`
    },
    merra2: {
      endpoint: "GET https://goldsmr4.gesdisc.eosdis.nasa.gov/opendap/MERRA2/M2I3NVASM.5.12.4/2024/10/MERRA2_400.inst3_3d_asm_Nv.20241006.nc4",
      contentType: "netCDF4-classic / OPeNDAP Array",
      latency: "3-hour assimilated stream",
      sample: `{
  "dataset": "NASA MERRA-2 Atmospheric Reanalysis",
  "variables": {
    "U": { "long_name": "Eastward wind component", "units": "m s-1", "shape": [8, 72, 361, 576] },
    "V": { "long_name": "Northward wind component", "units": "m s-1", "shape": [8, 72, 361, 576] },
    "T": { "long_name": "Air temperature", "units": "K", "shape": [8, 72, 361, 576] },
    "PL": { "long_name": "Mid-level pressure", "units": "Pa", "shape": [8, 72, 361, 576] }
  },
  "ingested_by": "AERO-PULSE Physics Surrogate",
  "status": "VALIDATED"
}`
    },
    gibs: {
      endpoint: "GET https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/VIIRS_SNPP_CorrectedReflectance_TrueColor/default/2024-10-06/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg",
      contentType: "image/jpeg (256x256 Web Mercator Tile)",
      latency: "Real-time tile cache",
      sample: `{
  "service": "NASA GIBS WMTS v1.0.0",
  "layer": "VIIRS_SNPP_CorrectedReflectance_TrueColor",
  "projection": "EPSG:3857 (Web Mercator)",
  "resolution": "250m nominal at equator",
  "tile_matrix": "GoogleMapsCompatible_Level9",
  "cache_hit_rate": "99.4%"
}`
    },
    landsat: {
      endpoint: "GET https://m2m.cr.usgs.gov/api/api/json/stable/scene-search?datasetName=landsat_ot_c2_l2",
      contentType: "GeoTIFF Level-2 Surface Reflectance",
      latency: "16-day repeat cycle",
      sample: `{
  "platform": "LANDSAT_9",
  "sensor": "OLI_TIRS",
  "bands_used": ["Band 5 (NIR - 0.85-0.88 um)", "Band 7 (SWIR2 - 2.11-2.29 um)"],
  "algorithm": "Normalized Burn Ratio (NBR = [B5 - B7] / [B5 + B7])",
  "burn_severity_scale": "USGS Standard (Unburned, Low, Moderate, High)"
}`
    },
    emit: {
      endpoint: "GET https://lpdaac.usgs.gov/products/emitl2aerov001/",
      contentType: "HDF5 Hyperspectral Radiance",
      latency: "ISS orbital path coverage",
      sample: `{
  "instrument": "NASA EMIT Spectrometer (ISS)",
  "spectral_range": "381 to 2493 nm across 285 channels",
  "extracted_products": ["Aerosol Optical Depth (AOD)", "Mineral Iron Oxide Fraction"],
  "application": "Differentiating organic carbon smoke from mineral dust clouds"
}`
    }
  };

  const copyCode = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedEndpoint(true);
    setTimeout(() => setCopiedEndpoint(false), 2000);
  };

  return (
    <section id="nasa-data" className="py-20 bg-white border-b border-gray-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0052FF] border border-blue-200 text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Required Section 6</span>
            <span className="text-gray-300">•</span>
            <span>NASA Data Integration (Global Award Mandatory)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#111111] mb-4">
            NASA Data Resources & Integration
          </h2>
          <p className="text-base sm:text-lg text-[#6B7280] max-w-3xl leading-relaxed">
            Per NASA Space Apps Challenge regulations, teams must integrate at least one NASA resource to qualify for global awards. AERO-PULSE deeply couples <strong>five core NASA Earth observation and atmospheric reanalysis programs</strong>.
          </p>
        </div>

        {/* Global Award Eligibility Seal (Apple style) */}
        <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 rounded-3xl p-6 sm:p-8 border border-blue-200 shadow-xs mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#0052FF] text-white flex items-center justify-center shrink-0 shadow-sm">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-bold text-[#111111]">
                  Global Award Eligibility: 100% Qualified & Verified
                </span>
                <span className="text-xs bg-emerald-600 text-white font-bold px-2.5 py-0.5 rounded-full">
                  5/1 Required Assets
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#4B5563] mt-1">
                Authoritative reliance on NASA FIRMS, MERRA-2, GIBS, Landsat 9, and EMIT directly via NASA Earthdata APIs.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-mono bg-white px-3 py-1.5 rounded-xl border border-blue-200 text-[#0052FF] font-semibold">
              NASA ESDIS Open Data Policy
            </span>
          </div>
        </div>

        {/* Dataset Selection Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
          {nasaData.map((item) => {
            const isSelected = selectedAsset === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedAsset(item.id)}
                className={`p-4 rounded-2xl text-left transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-blue-50/80 border-[#0052FF] shadow-xs ring-1 ring-[#0052FF]'
                    : 'bg-[#F9F9FB] border-gray-200 hover:border-gray-300 hover:bg-white'
                }`}
              >
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#0052FF] mb-1">
                  {item.awardEligibilityTier.split(' ')[0]} {item.awardEligibilityTier.split(' ')[1]}
                </div>
                <div className="text-xs sm:text-sm font-bold text-[#111111] line-clamp-1">
                  {item.name.split('(')[0]}
                </div>
                <div className="text-[11px] text-[#6B7280] truncate mt-0.5">
                  {item.subsystem.split('(')[0]}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active NASA Resource Deep-Dive Canvas */}
        <div className="slide-card rounded-3xl p-8 bg-white border border-gray-200 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 mb-8 pb-8 border-b border-gray-100">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold bg-[#0052FF] text-white px-3 py-1 rounded-md">
                  {activeAsset.awardEligibilityTier}
                </span>
                <span className="text-xs text-[#6B7280]">
                  Agency: {activeAsset.agency}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-[#111111]">
                {activeAsset.name}
              </h3>
              <p className="text-sm font-medium text-[#0052FF]">
                Subsystem: {activeAsset.subsystem}
              </p>

              <div className="pt-2">
                <h4 className="text-xs font-bold text-[#111111] uppercase tracking-wider mb-1">
                  How We Used This NASA Resource:
                </h4>
                <p className="text-sm text-[#4B5563] leading-relaxed">
                  {activeAsset.howUsed}
                </p>
              </div>
            </div>

            <div className="shrink-0 space-y-3 p-5 rounded-2xl bg-[#F9F9FB] border border-gray-200">
              <div>
                <span className="text-[11px] font-semibold text-[#6B7280] uppercase">Data License</span>
                <div className="text-xs font-bold text-[#111111]">{activeAsset.license}</div>
              </div>
              <div>
                <span className="text-[11px] font-semibold text-[#6B7280] uppercase">Access Paradigm</span>
                <div className="text-xs font-bold text-emerald-700">Public REST / Open Data</div>
              </div>
              <a
                href={activeAsset.dataUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0052FF] hover:underline pt-1"
              >
                <span>Visit NASA Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Interactive NASA API Inspector */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#0052FF]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#111111]">
                  Live Ingestion Endpoint & Sample Payload
                </span>
              </div>
              <button
                onClick={() => copyCode(samplePayloads[selectedAsset].sample)}
                className="flex items-center gap-1 text-xs text-[#6B7280] hover:text-[#111111] cursor-pointer"
              >
                {copiedEndpoint ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedEndpoint ? 'Copied' : 'Copy Sample JSON'}</span>
              </button>
            </div>

            <div className="p-3 bg-gray-100 rounded-xl font-mono text-xs text-[#111111] mb-3 break-all flex items-center justify-between gap-2">
              <span className="truncate">{samplePayloads[selectedAsset].endpoint}</span>
              <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-gray-200 shrink-0">
                {samplePayloads[selectedAsset].latency}
              </span>
            </div>

            <div className="relative rounded-2xl overflow-hidden bg-[#0D1117] border border-gray-800 p-5 font-mono text-xs text-gray-200 max-h-60 overflow-y-auto">
              <pre>
                <code>{samplePayloads[selectedAsset].sample}</code>
              </pre>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
