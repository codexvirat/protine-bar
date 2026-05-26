"use client";

import { Cpu, ShieldCheck, Award, Microscope, FlaskConical, Target, HeartHandshake } from "lucide-react";

export default function About() {
  const labPrinciples = [
    {
      title: "Molecular Precision",
      description: "We work with chemical formulations, not kitchen recipes. Every micro-dose is calibrated to induce concrete physiological adaptions.",
      icon: Microscope,
    },
    {
      title: "Pure Sourcing",
      description: "Zero trace contaminants. We source raw ingredients exclusively from GMP-certified facilities in Europe and North America.",
      icon: ShieldCheck,
    },
    {
      title: "Bioavailability First",
      description: "Ingredients are chelated or hydrolyzed. If the intestinal tract cannot absorb the nutrient, it does not go into the wrapper.",
      icon: FlaskConical,
    },
  ];

  const stages = [
    {
      step: "01",
      name: "BIO-PATHWAY ANALYSIS",
      details: "Our biochemists map target physiological pathways (such as ATP energy, muscle nitrogen synthesis, or dermal collagen hydration) to identify critical limiting compounds.",
    },
    {
      step: "02",
      name: "CLINICAL DOSE VERIFICATION",
      details: "We audit scientific trials to verify the exact active dose required for physiological response. We reject 'marketing dustings' in favor of full therapeutic amounts.",
    },
    {
      step: "03",
      name: "GASTRIC EMPTYING LABS",
      details: "Every formulation is optimized to ensure rapid absorption under workout strain. We exclude heavy thickening gums and bloating fibers that slow down digestion.",
    },
    {
      step: "04",
      name: "SPECTROSCOPY COMPLIANCE",
      details: "Finished batches undergo liquid chromatography-mass spectrometry (LC-MS) testing to confirm molecular density, label accuracy, and complete purity.",
    },
  ];

  return (
    <div className="w-full bg-[#050505] text-[#F5F7FA] py-32 px-6 sm:px-12 md:px-24">
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-cyber-grid opacity-10 pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="space-y-4 max-w-xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00C2FF]/10 border border-[#00C2FF]/20 text-[10px] tracking-widest text-[#00C2FF] font-mono uppercase">
            <Microscope className="w-3.5 h-3.5" />
            <span>ORIGIN STORY // BIOTECH_RECOVERY</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white uppercase">
            ABOUT THE LAB
          </h1>
          <p className="text-sm text-zinc-400 leading-relaxed font-sans">
            Aesthetix Labs was born in a biotech fitness incubator with a single directive: replace the outdated supplement candy bars of the last decade with clean, reengineered recovery devices.
          </p>
        </div>

        {/* Narrative & Visual block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl font-black tracking-widest text-white uppercase">THE SHIFT IN NUTRITIONAL PROTOCOL</h2>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              Traditional protein bars are candy bars in disguise, stuffed with hydrogenated palm oils, artificial texturizers, and low-cost collagen gelatin to cheat protein numbers on paper. They leave athletes bloated and cognitively sluggish.
            </p>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              Aesthetix represents a new paradigm. We approach recovery as a chemical optimization. By embedding clinical doses of active biomolecules (like Creatine Creapure, KSM-66 Ashwagandha, and Marine Collagen Peptides) directly into a clean whey isolate matrix, we ensure that every bite advances your physical blueprint.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
              <div className="border-l border-[#00C2FF]/30 pl-4">
                <span className="block text-xl font-mono font-black text-white">0%</span>
                <span className="text-[9px] font-mono text-zinc-500 uppercase">SUGAR ALCOHOLS</span>
              </div>
              <div className="border-l border-[#00C2FF]/30 pl-4">
                <span className="block text-xl font-mono font-black text-white">100%</span>
                <span className="text-[9px] font-mono text-zinc-500 uppercase">LABEL HONESTY</span>
              </div>
              <div className="border-l border-[#00C2FF]/30 pl-4">
                <span className="block text-xl font-mono font-black text-white">4</span>
                <span className="text-[9px] font-mono text-zinc-500 uppercase">CORE LOADOUTS</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 p-8 rounded-2xl border border-white/[0.04] bg-[#07070a]/90 relative overflow-hidden scanlines">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00C2FF]/30 to-transparent" />
            <h3 className="font-mono text-[10px] text-zinc-500 tracking-wider uppercase mb-6 flex items-center gap-1">
              <Target className="w-4 h-4 text-[#00C2FF]" /> MISSION OBJECTIVE
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans mb-4">
              To build the cleanest, most scientifically advanced recovery system on earth, designed to fit into an active, high-performance lifestyle.
            </p>
            <div className="border-t border-white/[0.04] pt-4 font-mono text-[9px] text-[#00C2FF] flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" />
              <span>ESTABLISHED 2026 // SYSTEM ONLINE</span>
            </div>
          </div>
        </div>

        {/* Principles Grid */}
        <div className="space-y-8 mb-24 border-t border-white/[0.04] pt-16">
          <h2 className="text-xl font-black tracking-widest text-white uppercase text-center mb-12">LAB PRINCIPLES</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {labPrinciples.map((p, idx) => (
              <div key={idx} className="p-8 rounded-2xl border border-white/[0.03] bg-white/[0.01] hover:border-[#00C2FF]/30 hover:bg-white/[0.02] transition-all duration-300 flex flex-col gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#00C2FF]/10 flex items-center justify-center border border-[#00C2FF]/20 text-[#00C2FF]">
                  <p.icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold tracking-widest text-white uppercase">{p.title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed font-sans">{p.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stages Timeline */}
        <div className="space-y-8 border-t border-white/[0.04] pt-16">
          <h2 className="text-xl font-black tracking-widest text-white uppercase text-center mb-12">THE PROTOCOL DEVELOPMENT STAGES</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stages.map((stage) => (
              <div key={stage.step} className="p-6 rounded-2xl border border-white/[0.03] bg-white/[0.01] flex flex-col justify-between h-full relative overflow-hidden group">
                <span className="absolute right-4 top-2 font-mono text-4xl font-black text-white/[0.02] group-hover:text-white/[0.04] transition-all duration-300 select-none">
                  {stage.step}
                </span>
                <div className="space-y-4">
                  <span className="font-mono text-xs font-bold text-[#00C2FF] tracking-wider">{stage.step} // STAGE</span>
                  <h3 className="text-sm font-bold tracking-widest text-white uppercase">{stage.name}</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed font-sans">{stage.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
