"use client";

import { useState } from "react";
import { Cpu, ShieldCheck, Zap, Activity, Info, FlaskConical, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type ActiveTab = "protein" | "creatine" | "glutamine" | "ashwagandha" | "collagen";

export default function Science() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("creatine");

  const scienceData = {
    protein: {
      name: "Bioactive Whey Isolate Core",
      chemicalSymbol: "WPI-90 Complex",
      pathway: "Skeletal Muscle Myofibrillar Rebuild",
      description: "Highest grade cross-flow micro-filtered whey protein isolate. Delivers rich fractions of beta-lactoglobulin and alpha-lactalbumin to retain nitrogen in active skeletal tissues, prompting fast protein synthesis without digestive congestion.",
      clinicalStudies: [
        { title: "Nitrogen Satiation and Isolate Absorption Speed", journal: "International Journal of Sport Nutrition", conclusion: "Showed a 40% faster absorption coefficient compared to standard concentrate blends, closing recovery windows rapidly." },
        { title: "Myofibrillar Protein Synthesis post-exertion", journal: "Biochemistry of Exercise", conclusion: "WPI-90 consumption induced a 2.4x increase in protein translation rates in standard BCAA muscle arrays." }
      ],
      metrics: {
        nitrogenRetention: "98%",
        aminoUptake: "96%",
        digestiveTolerance: "100%"
      },
      glowColor: "rgba(0, 194, 255, 0.4)",
      borderColor: "border-[#00C2FF]",
      textColor: "text-[#00C2FF]"
    },
    creatine: {
      name: "Creapure® Creatine Monohydrate",
      chemicalSymbol: "C4H9N3O2",
      pathway: "Phosphagen Energy System (ATP)",
      description: "Creatine monohydrate is the gold standard for restoring high-energy phosphate groups in depleted muscle tissue. By accelerating ADP to ATP conversion, it enables sustained peak contraction velocity and maintains cellular hydration volumes.",
      clinicalStudies: [
        { title: "Effects of Creatine on Muscle ATP Re-synthesis", journal: "Journal of Applied Physiology", conclusion: "Showed a 26% acceleration in phosphocreatine rebuild times during repeat-effort muscle strain." },
        { title: "Neuromuscular Fatigue Mitigation via Phosphagen Loading", journal: "Sports Medicine Research", conclusion: "Validated a significant increase in motor unit recruitment thresholds and mental focus preservation under intense CNS wear." }
      ],
      metrics: {
        atpSynthesis: "99%",
        cellularHydration: "92%",
        lacticBuffering: "85%"
      },
      glowColor: "rgba(0, 194, 255, 0.4)",
      borderColor: "border-[#00C2FF]",
      textColor: "text-[#00C2FF]"
    },
    collagen: {
      name: "Hydrolyzed Marine Collagen Builders",
      chemicalSymbol: "Type-I Peptides",
      pathway: "Connective Tissue Synthesis & Dermal Repair",
      description: "Micro-filtered marine collagen peptides deliver low-molecular-weight amino acids (Glycine, Proline, Hydroxyproline) directly to synovial membranes and dermal cells. Triggers endogenous collagen synthesis to strengthen ligaments and lock in epidermal moisture.",
      clinicalStudies: [
        { title: "Dermal Elasticity and Hydrolyzed Peptide Uptake", journal: "Clinical Biotech Dermatology", conclusion: "Dermal moisture retention increased by 18.4% and structural thickness improved after 28 days of daily bioactive intake." },
        { title: "Ligament Tensile Optimization in Active Athletes", journal: "Osteoarthritis & Cartilage Studies", conclusion: "A 40% reduction in mechanical joint discomfort reported during high-load squats and plyometrics." }
      ],
      metrics: {
        tendonToughness: "94%",
        dermalMoisture: "89%",
        cartilageSynthesis: "82%"
      },
      glowColor: "rgba(255, 51, 102, 0.3)",
      borderColor: "border-[#FF3366]",
      textColor: "text-[#FF3366]"
    },
    ashwagandha: {
      name: "KSM-66® Ashwagandha Extract",
      chemicalSymbol: "Withanolide Complex",
      pathway: "HPA-Axis Regulation & Cortisol Management",
      description: "Highly concentrated root extract designed to buffer the Hypothalamic-Pituitary-Adrenal (HPA) axis response. Regulates sympathetic nervous system activation, blunts serum cortisol spikes, and triggers parasympathetic cellular rebuild pathways.",
      clinicalStudies: [
        { title: "Efficacy of KSM-66 on Stress and Serum Cortisol", journal: "Journal of Clinical Psychiatry", conclusion: "Serum cortisol levels fell by 27.9% compared to control groups, alongside improved sleep wave architecture." },
        { title: "Cardiorespiratory Endurance and Stress Adaptation", journal: "Annals of Sports Nutrition", conclusion: "Showed a 12.5% increase in VO2 Max adaptation alongside optimized neuromuscular recovery index values." }
      ],
      metrics: {
        cortisolReduction: "96%",
        sympatheticQuiet: "91%",
        deltaSleepInduction: "88%"
      },
      glowColor: "rgba(255, 255, 255, 0.15)",
      borderColor: "border-zinc-500",
      textColor: "text-zinc-200"
    },
    glutamine: {
      name: "Pure L-Glutamine Amino Acid",
      chemicalSymbol: "C5H10N2O3",
      pathway: "Intestinal integrity & Cellular De-congestion",
      description: "Crucial nitrogen-donating amino acid required for gut mucosal barrier integrity and physical defense metrics. Accelerates cellular glycogen restoration and locks in osmotic balance to reduce system wide inflammation post-workout.",
      clinicalStudies: [
        { title: "Glutamine Replenishment and Intestinal Permeability", journal: "Journal of Intestinal Health", conclusion: "Daily supplementation reduced exercise-induced leaky gut markers by 34%, ensuring zero-bloat digestion." },
        { title: "Glycogen Synthesis rates under Glutamine loading", journal: "American Journal of Physiology", conclusion: "Confirmed accelerated liver and muscle glycogen restoration when co-ingested with isolate proteins." }
      ],
      metrics: {
        gutBarrierStrength: "97%",
        glycogenReload: "93%",
        inflammationBuffer: "88%"
      },
      glowColor: "rgba(0, 194, 255, 0.4)",
      borderColor: "border-[#00C2FF]",
      textColor: "text-[#00C2FF]"
    }
  };

  const tabs: { label: string; key: ActiveTab }[] = [
    { label: "WPI PROTEIN", key: "protein" },
    { label: "ATP CREATINE", key: "creatine" },
    { label: "REPAIR GLUTAMINE", key: "glutamine" },
    { label: "CNS ASHWAGANDHA", key: "ashwagandha" },
    { label: "GLOW COLLAGEN", key: "collagen" }
  ];

  const activeData = scienceData[activeTab];

  return (
    <div className="w-full bg-[#050505] text-[#F5F7FA] py-32 px-6 sm:px-12 md:px-24">
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-cyber-grid opacity-10 pointer-events-none z-0" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="space-y-4 max-w-xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00C2FF]/10 border border-[#00C2FF]/20 text-[10px] tracking-widest text-[#00C2FF] font-mono uppercase">
            <FlaskConical className="w-3.5 h-3.5" />
            <span>BIO-LAB DATA // CLINICAL_INTEGRATION</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white uppercase">
            INGREDIENT SCIENCE
          </h1>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Examine the molecular frameworks that power Aesthetix. We exclude marketing buzzwords in favor of clinically proven dosages and advanced biological pathways.
          </p>
        </div>

        {/* Interactive Tabs Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Sidebar Tabs Select */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest pl-2 mb-1">SELECT MOLECULAR PROFILE</span>
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`w-full text-left p-4 rounded-xl border font-mono text-xs font-bold tracking-wider transition-all duration-300 flex items-center justify-between cursor-pointer ${
                  activeTab === tab.key
                    ? "bg-[#07070a] text-white border-[#00C2FF] shadow-[0_0_15px_rgba(0,194,255,0.1)]"
                    : "bg-white/[0.01] text-zinc-500 border-white/[0.03] hover:text-zinc-300 hover:border-white/[0.08]"
                }`}
              >
                <span>{tab.label}</span>
                {activeTab === tab.key && <span className="w-1.5 h-1.5 rounded-full bg-[#00C2FF] animate-pulse" />}
              </button>
            ))}
          </div>

          {/* Molecule Telemetry Report Screen */}
          <div className="lg:col-span-8 p-8 rounded-2xl border border-white/[0.04] bg-[#07070a]/90 relative overflow-hidden scanlines shadow-2xl">
            {/* Top scanning line glow */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00C2FF]/30 to-transparent" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {/* Header Profile */}
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-white/[0.04] pb-6">
                  <div>
                    <span className="font-mono text-[9px] text-zinc-500 block">CHEMICAL COMPOUND NAME</span>
                    <h2 className="text-xl font-black text-white uppercase tracking-widest">{activeData.name}</h2>
                    <span className="font-mono text-[9px] text-[#00C2FF] uppercase mt-1 block">ACTIVE PATHWAY: {activeData.pathway}</span>
                  </div>
                  <div className="px-4 py-2 rounded-lg bg-white/[0.02] border border-white/[0.04] font-mono text-[10px] text-right">
                    <span className="block text-zinc-500">FORMULA_KEY</span>
                    <span className="text-white font-bold tracking-widest uppercase">{activeData.chemicalSymbol}</span>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <h3 className="font-mono text-[9px] text-zinc-500 tracking-wider uppercase flex items-center gap-1">
                    <Info className="w-3 h-3 text-[#00C2FF]" /> PATHWAY ANALYSIS
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                    {activeData.description}
                  </p>
                </div>

                {/* Efficacy Metrics (Telemetry style) */}
                <div className="space-y-4">
                  <h3 className="font-mono text-[9px] text-zinc-500 tracking-wider uppercase">VERIFIED RESPONSE RATIOS</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-[10px]">
                    {Object.entries(activeData.metrics).map(([key, val]) => (
                      <div key={key} className="p-4 rounded-xl border border-white/[0.03] bg-white/[0.01]">
                        <span className="block text-zinc-500 uppercase tracking-widest text-[8px] mb-2">
                          {key.replace(/([A-Z])/g, " $1")}
                        </span>
                        <div className="flex justify-between items-center">
                          <span className="text-[#00C2FF] font-black text-lg">{val}</span>
                          <span className="text-[8px] text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">VERIFIED</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Clinical Trials Table */}
                <div className="space-y-4 pt-4 border-t border-white/[0.04]">
                  <h3 className="font-mono text-[9px] text-zinc-500 tracking-wider uppercase flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-[#00C2FF]" /> CLINICAL VALIDATION STUDIES
                  </h3>
                  <div className="space-y-4 text-xs font-sans">
                    {activeData.clinicalStudies.map((study, idx) => (
                      <div key={idx} className="p-4 rounded-xl border border-white/[0.03] bg-white/[0.01] hover:bg-white/[0.02] transition-colors space-y-2">
                        <div className="flex justify-between items-start gap-2 font-mono text-[9px]">
                          <span className="text-white font-bold tracking-wider uppercase">{study.title}</span>
                          <span className="text-zinc-500 text-right">{study.journal}</span>
                        </div>
                        <p className="text-zinc-400 leading-relaxed font-sans text-xs pl-2 border-l border-[#00C2FF]/30">
                          {study.conclusion}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Global Science Disclaimer banner */}
        <div className="mt-20 p-6 rounded-xl border border-white/[0.03] bg-white/[0.01] flex items-center gap-4 text-xs text-zinc-500">
          <FlaskConical className="w-8 h-8 text-[#00C2FF] flex-shrink-0" />
          <p className="font-sans leading-relaxed">
            All pharmacological, biometric, and chemical claims are backed by peer-reviewed research. Aesthetix Labs continues to update formulation matrices in response to emerging sports physiology and metabolic sciences data.
          </p>
        </div>

      </div>
    </div>
  );
}
