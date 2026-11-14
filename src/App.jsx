import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroHeader from './components/HeroHeader';
import SummarySection from './components/SummarySection';
import DemoViewer from './components/DemoViewer';
import FinalProjectLinks from './components/FinalProjectLinks';
import ProjectDetailsSection from './components/ProjectDetailsSection';
import AiUsageSection from './components/AiUsageSection';
import NasaDataSection from './components/NasaDataSection';
import ReferencesSection from './components/ReferencesSection';
import SubmissionRulesSection from './components/SubmissionRulesSection';
import InteractiveSandbox from './components/InteractiveSandbox';
import ProjectCustomizerModal from './components/ProjectCustomizerModal';
import Footer from './components/Footer';

import { initialProjectData } from './data/projectData';

export default function App() {
  const [projectData, setProjectData] = useState(initialProjectData);
  const [isSandboxOpen, setIsSandboxOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  // Handlers for customization
  const handleUpdateProjectData = (formData) => {
    setProjectData((prev) => ({
      ...prev,
      title: formData.title,
      subtitle: formData.subtitle,
      tagline: formData.tagline,
      challenge: formData.challenge,
      team: {
        ...prev.team,
        name: formData.teamName,
      },
      demo: {
        ...prev.demo,
        deckUrl: formData.deckUrl,
        videoUrl: formData.videoUrl,
      },
      links: {
        ...prev.links,
        livePrototype: formData.livePrototype,
        codeRepository: formData.codeRepository,
      }
    }));
  };

  const handleResetProjectData = () => {
    setProjectData(initialProjectData);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9FB] text-[#111111] selection:bg-[#0052FF]/20 selection:text-[#0052FF]">
      
      {/* Navigation */}
      <Navbar
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
        onOpenRulesModal={() => scrollToSection('rules')}
        onOpenSandbox={() => setIsSandboxOpen(true)}
      />

      {/* Hero Section / Title Slide */}
      <HeroHeader
        data={projectData}
        onOpenDeck={() => scrollToSection('demo')}
        onOpenVideo={() => scrollToSection('demo')}
        onOpenSandbox={() => setIsSandboxOpen(true)}
      />

      {/* Main Content Area */}
      <main>
        {/* Required Section 1: High-level summary */}
        <SummarySection summary={projectData.summary} />

        {/* Required Section 2: Project demo link (7-Slide deck / 30s video) */}
        <DemoViewer demo={projectData.demo} />

        {/* Required Section 3: Final project link */}
        <FinalProjectLinks 
          links={projectData.links} 
          onOpenSandbox={() => setIsSandboxOpen(true)}
        />

        {/* Required Section 4: Project details (How it works, benefits, tools) */}
        <ProjectDetailsSection details={projectData.details} />

        {/* Required Section 5: Use of AI ("SI") & Watermarking */}
        <AiUsageSection aiUsage={projectData.aiUsage} />

        {/* Required Section 6: NASA data (Global Award Eligibility) */}
        <NasaDataSection nasaData={projectData.nasaData} />

        {/* Required Section 7: References & Citations */}
        <ReferencesSection references={projectData.references} />

        {/* Key Demo & Submission Rules (Language, Public Access, Limits) */}
        <SubmissionRulesSection rulesAudit={projectData.rulesAudit} />
      </main>

      {/* Footer */}
      <Footer data={projectData} />

      {/* Interactive Simulation Sandbox Modal */}
      <InteractiveSandbox
        isOpen={isSandboxOpen}
        onClose={() => setIsSandboxOpen(false)}
      />

      {/* Submission Customizer Modal */}
      <ProjectCustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        projectData={projectData}
        onUpdateProjectData={handleUpdateProjectData}
        onResetProjectData={handleResetProjectData}
      />

    </div>
  );
}
