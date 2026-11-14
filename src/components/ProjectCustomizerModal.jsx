import React, { useState } from 'react';
import { 
  X, 
  Save, 
  RotateCcw, 
  Download, 
  Copy, 
  Check, 
  Sliders, 
  Sparkles 
} from 'lucide-react';

export default function ProjectCustomizerModal({ 
  isOpen, 
  onClose, 
  projectData, 
  onUpdateProjectData,
  onResetProjectData 
}) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    title: projectData.title,
    subtitle: projectData.subtitle,
    tagline: projectData.tagline,
    challenge: projectData.challenge,
    teamName: projectData.team.name,
    deckUrl: projectData.demo.deckUrl,
    videoUrl: projectData.demo.videoUrl,
    livePrototype: projectData.links.livePrototype,
    codeRepository: projectData.links.codeRepository,
  });

  const [copiedMd, setCopiedMd] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateProjectData(formData);
    onClose();
  };

  const generateMarkdownDossier = () => {
    return `# ${formData.title} — NASA Space Apps Project Submission

**Subtitle:** ${formData.subtitle}  
**Challenge:** ${formData.challenge}  
**Team:** ${formData.teamName}  

## 1. High-Level Summary
- **What We Built:** ${projectData.summary.whatWeBuilt}
- **Addressing the Challenge:** ${projectData.summary.howItAddressesChallenge}
- **Why It Matters:** ${projectData.summary.whyItMatters}

## 2. Project Demo Link (Public / Incognito Tested)
- **7-Slide Presentation Deck:** ${formData.deckUrl}
- **30-Second Video Pitch:** ${formData.videoUrl}

## 3. Final Project Link
- **Live Prototype:** ${formData.livePrototype}
- **Code Repository:** ${formData.codeRepository}

## 4. Project Details
${projectData.details.howItWorks.map(s => `- **${s.title}**: ${s.description}`).join('\n')}

## 5. Use of AI ("SI")
${projectData.aiUsage.disclosureStatement}

## 6. NASA Data (Global Award Mandatory)
${projectData.nasaData.map(d => `- **${d.name}**: ${d.howUsed}`).join('\n')}

## 7. References
${projectData.references.spaceAgencies.map(r => `- ${r.citation} (${r.url})`).join('\n')}

## 8. Demo & Submission Rules Compliance
- Language: 100% English Verified
- Public Access: Zero login, password, or permission gates. Tested in incognito.
`;
  };

  const copyMarkdown = () => {
    navigator.clipboard.writeText(generateMarkdownDossier());
    setCopiedMd(true);
    setTimeout(() => setCopiedMd(false), 2000);
  };

  const downloadMarkdownFile = () => {
    const element = document.createElement("a");
    const file = new Blob([generateMarkdownDossier()], {type: 'text/markdown'});
    element.href = URL.createObjectURL(file);
    element.download = `${formData.title.toLowerCase().replace(/\s+/g, '-')}-submission.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 apple-blur animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 flex flex-col">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between bg-[#F9F9FB]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#0052FF] flex items-center justify-center">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#111111]">
                Customize Project Submission Details
              </h3>
              <p className="text-xs text-[#6B7280]">
                Update names, titles, and public submission links in real-time
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-[#111111] uppercase tracking-wider block mb-1">
                Project Name
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-[#0052FF] focus:ring-1 focus:ring-[#0052FF] outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#111111] uppercase tracking-wider block mb-1">
                Team Name
              </label>
              <input
                type="text"
                name="teamName"
                value={formData.teamName}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-[#0052FF] focus:ring-1 focus:ring-[#0052FF] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-[#111111] uppercase tracking-wider block mb-1">
              Project Subtitle
            </label>
            <input
              type="text"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-[#0052FF] focus:ring-1 focus:ring-[#0052FF] outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#111111] uppercase tracking-wider block mb-1">
              Project Tagline / Hook
            </label>
            <textarea
              name="tagline"
              rows={2}
              value={formData.tagline}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-[#0052FF] focus:ring-1 focus:ring-[#0052FF] outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-[#111111] uppercase tracking-wider block mb-1">
                Public Slide Deck URL (7 Slides Max)
              </label>
              <input
                type="text"
                name="deckUrl"
                value={formData.deckUrl}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs font-mono focus:border-[#0052FF] focus:ring-1 focus:ring-[#0052FF] outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#111111] uppercase tracking-wider block mb-1">
                Public Video URL (30s Max)
              </label>
              <input
                type="text"
                name="videoUrl"
                value={formData.videoUrl}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs font-mono focus:border-[#0052FF] focus:ring-1 focus:ring-[#0052FF] outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-[#111111] uppercase tracking-wider block mb-1">
                Live Prototype URL
              </label>
              <input
                type="text"
                name="livePrototype"
                value={formData.livePrototype}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs font-mono focus:border-[#0052FF] focus:ring-1 focus:ring-[#0052FF] outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#111111] uppercase tracking-wider block mb-1">
                GitHub Repository URL
              </label>
              <input
                type="text"
                name="codeRepository"
                value={formData.codeRepository}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs font-mono focus:border-[#0052FF] focus:ring-1 focus:ring-[#0052FF] outline-none"
              />
            </div>
          </div>

          {/* Export Actions */}
          <div className="p-4 rounded-2xl bg-[#F9F9FB] border border-gray-200 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs text-[#6B7280]">
              Ready to submit? Export the full NASA Space Apps formatted submission form:
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={copyMarkdown}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-gray-300 text-xs font-semibold text-[#111111] hover:bg-gray-50 cursor-pointer"
              >
                {copiedMd ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedMd ? 'Copied' : 'Copy Form Markdown'}</span>
              </button>
              <button
                type="button"
                onClick={downloadMarkdownFile}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-gray-300 text-xs font-semibold text-[#111111] hover:bg-gray-50 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download .MD</span>
              </button>
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-4 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => {
                onResetProjectData();
                onClose();
              }}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-red-600 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Official Defaults</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0052FF] hover:bg-[#0043D6] text-white text-xs font-semibold shadow-xs cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Apply Changes</span>
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
}
