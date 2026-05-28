"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import {
  Activity, Zap, ShieldAlert, Sparkles, RefreshCw,
  Flame, Brain, Compass, Dumbbell, Play, ArrowRight
} from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";

/* ─── Animation Variants ──────────────────────────────────────────────────── */
const EASE = "easeOut" as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE } },
};
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};
const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE } },
};

/* ─── Community Data ──────────────────────────────────────────────────────── */
const COMMUNITY = [
  {
    initials: "AR",
    name: "Arnav R.",
    role: "Strength Athlete",
    quote: "The creatine hit is real. I stopped supplementing separately — this bar does it all. Recovery is noticeably faster between sessions.",
    product: "Aesthetic Blueprint",
    color: "#00C2FF",
    stat: "+18% strength gains in 6 weeks",
  },
  {
    initials: "SK",
    name: "Sneha K.",
    role: "Yoga Instructor",
    quote: "My skin looks genuinely different. The collagen formula isn't a gimmick — joints feel better, skin is clearer. This is my morning ritual now.",
    product: "Collagen Glow",
    color: "#FF3366",
    stat: "3 weeks to visible glow difference",
  },
  {
    initials: "VN",
    name: "Vikas N.",
    role: "Marathon Runner",
    quote: "Ashwagandha in a bar is genius. My post-run cortisol crashes used to ruin my sleep. Not anymore. This thing genuinely calms the CNS.",
    product: "Aesthetic Blueprint",
    color: "#00C2FF",
    stat: "Sleep quality improved by 40%",
  },
  {
    initials: "PM",
    name: "Priya M.",
    role: "Wellness Coach",
    quote: "I recommend this to all my clients. Clean ingredients, science-backed, no junk. The vanilla almond flavour is genuinely luxurious.",
    product: "Collagen Glow",
    color: "#FF3366",
    stat: "Recommended to 50+ clients",
  },
  {
    initials: "RK",
    name: "Rohan K.",
    role: "CrossFit Athlete",
    quote: "Zero bloat is not marketing. I've eaten 3 of these before a WOD and never felt heavy. High protein, clean carbs — exactly what performance demands.",
    product: "Aesthetic Blueprint",
    color: "#00C2FF",
    stat: "0 digestive incidents in 4 months",
  },
  {
    initials: "IA",
    name: "Isha A.",
    role: "Pilates Instructor",
    quote: "The packaging alone makes you feel like you're buying something premium. But the formula is what keeps me coming back every month.",
    product: "Collagen Glow",
    color: "#FF3366",
    stat: "Subscriber since launch",
  },
];

const BEFORE_AFTER = [
  {
    side: "BEFORE",
    state: "Standard Protein Supplement",
    items: [
      { label: "Post-workout crash", bad: true },
      { label: "Bloating & discomfort", bad: true },
      { label: "Cortisol spike untreated", bad: true },
      { label: "Poor sleep recovery", bad: true },
      { label: "Separate supplementation", bad: true },
    ],
    color: "#71717a",
    bg: "#0A0808",
    accent: "rgba(239,68,68,0.08)",
  },
  {
    side: "AFTER",
    state: "AESTHETIX Precision System",
    items: [
      { label: "Rapid ATP resynthesis", good: true },
      { label: "Zero bloat formula", good: true },
      { label: "Cortisol blunted by KSM-66®", good: true },
      { label: "Deep recovery sleep", good: true },
      { label: "All-in-one stack", good: true },
    ],
    color: "#00C2FF",
    bg: "#06111A",
    accent: "rgba(0,194,255,0.06)",
  },
];

export default function Experience() {
  const recoveryScore = useStore((state) => state.recoveryScore);
  const biomarkers = useStore((state) => state.biomarkers);
  const workouts = useStore((state) => state.workouts);

  const addWorkout = useStore((state) => state.addWorkout);
  const simulateRecovery = useStore((state) => state.simulateRecovery);
  const resetBiomarkers = useStore((state) => state.resetBiomarkers);

  const [activeState, setActiveState] = useState<"before" | "after">("after");
  const [filmPlaying, setFilmPlaying] = useState(false);

  const getStatus = (score: number) => {
    if (score > 80) return { label: "OPTIMAL", color: "text-emerald-400", border: "border-emerald-500/20", bg: "bg-emerald-500/5" };
    if (score > 50) return { label: "DEGRADED", color: "text-amber-400", border: "border-amber-500/20", bg: "bg-amber-500/5" };
    return { label: "CRITICAL WEAR", color: "text-rose-400", border: "border-rose-500/20", bg: "bg-rose-500/5" };
  };

  const getRecommendation = () => {
    if (biomarkers.muscleFatigue > 60 || biomarkers.atpLevel < 40) {
      return { barId: "aesthetic-blueprint", name: "Aesthetic Blueprint", purpose: "Accelerate phosphocreatine ATP rebuild", detail: "Your muscular fatigue index is high and phosphagen reservoirs are severely depleted. Ingest Aesthetic Blueprint (3000mg Creapure Creatine) immediately to reset muscle ATP pools.", color: "#00C2FF" };
    }
    if (biomarkers.cortisol > 60) {
      return { barId: "aesthetic-blueprint", name: "Aesthetic Blueprint", purpose: "Blunt sympathetic cortisol wear", detail: "HPA axis signals reveal elevated cortisol levels. Consume Aesthetic Blueprint (600mg Ashwagandha KSM-66®) to induce non-REM relaxation and downregulate systemic tension.", color: "#00C2FF" };
    }
    if (biomarkers.hydration < 60) {
      return { barId: "collagen-glow", name: "Collagen Glow", purpose: "Electrolyte and hydration recovery", detail: "Osmotic cell pressure is degraded due to fluid loss. Ingest Collagen Glow (Marine Collagen Peptides, L-Glutamine) to expand vascular volume and carry nutrients to fatigued fibers.", color: "#FF3366" };
    }
    return { barId: "collagen-glow", name: "Collagen Glow", purpose: "Structural tissue recovery", detail: "Biomarker indices are balanced. Consume Collagen Glow (5000mg Marine Collagen Peptides) to reinforce joint cartilage and promote skin cell hydration during downtime.", color: "#FF3366" };
  };

  const statusInfo = getStatus(recoveryScore);
  const recommendation = getRecommendation();

  return (
    <div className="w-full bg-[#050505] text-[#F5F7FA]">

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 1 — BRAND FILM (Fullscreen cinematic video)
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">

        {/* Video background */}
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-screen"
          src="/hero-video.mp4"
          autoPlay
          loop
          muted
          playsInline
        />

        {/* Cinematic overlays */}
        <div className="cinematic-video-overlay" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_50%,transparent_40%,rgba(5,5,5,0.9)_100%)]" />

        {/* Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative z-20 text-center max-w-4xl mx-auto px-6 flex flex-col items-center gap-8"
        >
          <motion.div variants={fadeUp} className="section-label">
            SCENE 01 // BRAND NARRATIVE FILM
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-5xl sm:text-7xl md:text-8xl font-black tracking-widest text-white uppercase leading-[0.9]"
          >
            TRAIN.
            <br />
            <span className="text-shimmer">RECOVER.</span>
            <br />
            TRANSFORM.
          </motion.h1>

          <motion.p variants={fadeUp} className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-lg font-sans">
            This is the story of disciplined performance. Of elite athletes who refuse to compromise on what they put in their body. Of recovery as a daily ritual.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => setFilmPlaying(!filmPlaying)}
              className="flex items-center gap-3 bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.12] text-white font-bold text-xs tracking-widest px-8 py-4 rounded-xl transition-all duration-300 uppercase backdrop-blur-sm"
            >
              <Play className="w-4 h-4 fill-white" />
              PLAY BRAND FILM
            </button>
            <a
              href="#before-after"
              className="flex items-center gap-2 text-[#00C2FF] font-bold text-xs tracking-widest px-8 py-4 rounded-xl border border-[#00C2FF]/20 hover:bg-[#00C2FF]/5 transition-all duration-300 uppercase"
            >
              EXPLORE STORY
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </motion.div>

        {/* Brand pillars — bottom strip */}
        <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/[0.06] backdrop-blur-sm bg-[#050505]/50">
          <div className="max-w-7xl mx-auto px-6 sm:px-12 py-4 flex flex-wrap justify-center gap-8">
            {["ENGINEERED RECOVERY", "CLEAN PERFORMANCE", "LUXURY NUTRITION", "MODERN SCIENCE"].map((p) => (
              <span key={p} className="text-[8px] font-mono text-zinc-500 tracking-widest uppercase">{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 2 — BEFORE vs AFTER
      ════════════════════════════════════════════════════════════════════ */}
      <section id="before-after" className="relative w-full py-32 px-6 sm:px-12 md:px-24 border-b border-white/[0.03]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="text-center max-w-2xl mx-auto mb-16 space-y-4"
          >
            <motion.span variants={fadeUp} className="section-label mx-auto">
              SCENE 02 // TRANSFORMATION EVIDENCE
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-black tracking-widest text-white uppercase">
              THE TRANSFORMATION
            </motion.h2>
            <motion.p variants={fadeUp} className="text-sm text-zinc-400 leading-relaxed">
              What changes when you switch to precision nutrition. The data doesn&apos;t lie.
            </motion.p>

            {/* Toggle */}
            <motion.div variants={fadeUp} className="flex justify-center mt-6">
              <div className="flex border border-white/[0.06] rounded-xl p-1 bg-white/[0.02] gap-1">
                {(["before", "after"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setActiveState(s)}
                    className={`px-6 py-2.5 rounded-lg font-mono text-[10px] font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                      activeState === s
                        ? s === "after"
                          ? "bg-[#00C2FF] text-black shadow-[0_0_15px_rgba(0,194,255,0.4)]"
                          : "bg-zinc-700 text-white"
                        : "text-zinc-500 hover:text-white"
                    }`}
                  >
                    {s === "before" ? "BEFORE" : "AFTER AESTHETIX"}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Side-by-side panels (always shown) or toggle on mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {BEFORE_AFTER.map((panel) => {
              const isBefore = panel.side === "BEFORE";
              const isActive = (isBefore && activeState === "before") || (!isBefore && activeState === "after");
              return (
                <motion.div
                  key={panel.side}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={scaleIn}
                  className={`before-after-panel rounded-2xl border p-8 relative overflow-hidden transition-all duration-500 ${
                    isActive ? "opacity-100" : "opacity-40 scale-[0.98]"
                  }`}
                  style={{
                    backgroundColor: panel.bg,
                    borderColor: isActive ? `${panel.color}40` : "rgba(255,255,255,0.04)",
                    boxShadow: isActive ? `0 0 40px ${panel.color}10` : "none",
                  }}
                >
                  {/* Accent glow */}
                  <div
                    className="absolute top-0 left-0 right-0 h-40 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at 50% 0%, ${panel.color}15, transparent 70%)` }}
                  />

                  {/* Header */}
                  <div className="mb-8 relative z-10">
                    <span
                      className="font-mono text-[9px] font-black tracking-widest uppercase block mb-2"
                      style={{ color: panel.color }}
                    >
                      {panel.side}
                    </span>
                    <h3 className="text-xl font-black tracking-widest text-white uppercase">{panel.state}</h3>
                  </div>

                  {/* Items */}
                  <div className="space-y-3 relative z-10">
                    {panel.items.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: isBefore ? -20 : 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="flex items-center gap-4 p-3 rounded-xl border"
                        style={{
                          backgroundColor: panel.accent,
                          borderColor: isBefore ? "rgba(239,68,68,0.08)" : `${panel.color}15`,
                        }}
                      >
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 border"
                          style={{
                            backgroundColor: isBefore ? "rgba(239,68,68,0.1)" : `${panel.color}15`,
                            borderColor: isBefore ? "rgba(239,68,68,0.3)" : `${panel.color}40`,
                          }}
                        >
                          <span
                            className="text-[10px] font-black"
                            style={{ color: isBefore ? "#ef4444" : panel.color }}
                          >
                            {isBefore ? "✕" : "✓"}
                          </span>
                        </div>
                        <span className="text-xs text-zinc-200 font-medium">{item.label}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 3 — RECOVERY SCIENCE (Biometric Dashboard)
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full py-32 px-6 sm:px-12 md:px-24">
        <div className="absolute inset-0 bg-cyber-grid-cyan opacity-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">

          {/* Section intro */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="max-w-xl mb-16 space-y-4"
          >
            <motion.span variants={fadeUp} className="section-label">
              SCENE 03 // REAL-TIME BIOMETRIC READOUT
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-black tracking-widest text-white uppercase">
              RECOVERY SCIENCE
            </motion.h2>
            <motion.p variants={fadeUp} className="text-sm text-zinc-400 leading-relaxed">
              Track your central nervous system strain, cellular energy indices, and fluid pressures. Simulate workouts to model physiological strain and view immediate nutritional countermeasures.
            </motion.p>
          </motion.div>

          {/* Header controls */}
          <div className="flex justify-end mb-8">
            <button
              onClick={resetBiomarkers}
              className="flex items-center gap-2 border border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.06] text-xs font-bold font-mono tracking-wider px-5 py-3 rounded-lg text-zinc-400 hover:text-white transition-all cursor-pointer uppercase"
            >
              <RefreshCw className="w-4 h-4" /> RESET SYSTEM
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Left — Diagnostic Console */}
            <div className="lg:col-span-8 space-y-8">
              <div className="p-8 rounded-2xl border border-white/[0.04] bg-[#07070a]/90 scanlines shadow-2xl relative">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00C2FF]/30 to-transparent" />

                <div className="flex justify-between items-center border-b border-white/[0.04] pb-6 mb-8">
                  <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest">BIOMARKER MONITOR DIAGNOSTICS</span>
                  <span className="font-mono text-[9px] text-[#00C2FF] tracking-widest">CORE_VERSION: V1.12</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {/* Recovery score gauge */}
                  <div className="flex flex-col items-center justify-center p-6 border border-white/[0.03] bg-white/[0.01] rounded-xl">
                    <div className="w-36 h-36 rounded-full border-4 border-zinc-950 flex flex-col items-center justify-center relative shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]">
                      <motion.div
                        className="absolute inset-0 rounded-full border-4 transition-all duration-1000"
                        animate={{
                          borderColor: recoveryScore > 80 ? "#10b981" : recoveryScore > 50 ? "#f59e0b" : "#ef4444",
                          boxShadow: `0 0 20px ${recoveryScore > 80 ? "rgba(16,185,129,0.4)" : recoveryScore > 50 ? "rgba(245,158,11,0.4)" : "rgba(239,68,68,0.4)"}`,
                        }}
                      />
                      <motion.span
                        key={recoveryScore}
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-4xl font-mono font-black text-white"
                      >
                        {recoveryScore}%
                      </motion.span>
                      <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest mt-1">RECOVERY INDEX</span>
                    </div>

                    <div className={`mt-6 px-4 py-1.5 rounded-full border font-mono text-[9px] font-black tracking-widest ${statusInfo.border} ${statusInfo.bg} ${statusInfo.color}`}>
                      STATUS: {statusInfo.label}
                    </div>
                  </div>

                  {/* Progress bars */}
                  <div className="space-y-5">
                    {[
                      { label: "CELLULAR HYDRATION", val: biomarkers.hydration, color: "#06b6d4" },
                      { label: "PHOSPHAGEN ATP RESERVES", val: biomarkers.atpLevel, color: "#f59e0b" },
                      { label: "SERUM CORTISOL (STRESS)", val: biomarkers.cortisol, color: "#ef4444", warn: biomarkers.cortisol > 60 },
                      { label: "MUSCLE FIBER FATIGUE", val: biomarkers.muscleFatigue, color: "#00C2FF", warn: biomarkers.muscleFatigue > 60 },
                    ].map((m) => (
                      <div key={m.label} className="space-y-1">
                        <div className="flex justify-between font-mono text-[9px] text-zinc-400">
                          <span>{m.label}</span>
                          <span className={m.warn ? "text-rose-500 font-bold" : ""}>{m.val}%</span>
                        </div>
                        <div className="w-full h-2 bg-zinc-950 rounded-full overflow-hidden border border-white/[0.02]">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: m.color }}
                            animate={{ width: `${m.val}%` }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Workout Simulation */}
              <div className="p-8 rounded-2xl border border-white/[0.04] bg-[#07070a]/90 shadow-2xl space-y-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF3366]/30 to-transparent" />
                <div>
                  <h3 className="font-mono text-xs font-bold text-zinc-300 tracking-widest uppercase mb-1">INJECT PHYSICAL STRAIN LOAD</h3>
                  <p className="text-[11px] text-zinc-500 leading-relaxed font-sans">
                    Simulate dynamic exercises. High-load stress consumes creatine ATP stores, triggers cortisol spikes, and depletes hydration.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { icon: Compass, label: "MOBILITY PROTOCOL", sub: "LOW // 30M", intensity: "low" as const, color: "#06b6d4" },
                    { icon: Flame, label: "CARDIO CIRCUIT", sub: "MEDIUM // 45M", intensity: "medium" as const, color: "#f59e0b" },
                    { icon: Dumbbell, label: "RESISTANCE LOAD", sub: "HIGH // 60M", intensity: "high" as const, color: "#FF3366" },
                  ].map(({ icon: Icon, label, sub, intensity, color }) => (
                    <button
                      key={label}
                      onClick={() => addWorkout({ type: label, duration: intensity === "low" ? 30 : intensity === "medium" ? 45 : 60, intensity, timestamp: new Date().toLocaleTimeString() })}
                      className="flex flex-col items-center p-5 border border-white/[0.03] bg-white/[0.01] hover:bg-white/[0.03] transition-all rounded-xl gap-3 cursor-pointer group"
                      style={{ ["--hover-border" as string]: `${color}30` }}
                    >
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/[0.05] group-hover:border-current transition-colors" style={{ color }}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-[10px] font-bold text-white uppercase">{label}</span>
                      <span className="font-mono text-[8px] text-zinc-500">{sub}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — Recommendation */}
            <div className="lg:col-span-4 space-y-8">
              <div className="p-6 rounded-2xl border border-white/[0.04] bg-[#07070a]/90 shadow-2xl relative scanlines">
                <div
                  className="absolute top-0 inset-x-0 h-48 opacity-10 pointer-events-none z-0 filter blur-[50px] transition-all duration-500"
                  style={{ backgroundColor: recommendation.color }}
                />

                <div className="flex gap-2 items-center text-xs font-bold text-white font-mono uppercase tracking-widest mb-6">
                  <Sparkles className="w-4 h-4 text-[#00C2FF]" />
                  RECOMMENDED COUNTERMEASURE
                </div>

                <div className="space-y-6 relative z-10">
                  <div className="space-y-1">
                    <span className="font-mono text-[8px] text-zinc-500 block uppercase">FORMULATION CARTRIDGE</span>
                    <h3 className="text-2xl font-black uppercase tracking-widest" style={{ color: recommendation.color }}>
                      {recommendation.name}
                    </h3>
                    <span className="font-mono text-[9px] text-[#00C2FF] font-bold uppercase">{recommendation.purpose}</span>
                  </div>

                  <p className="text-[11px] text-zinc-400 leading-relaxed font-sans bg-white/[0.01] p-3 rounded-lg border border-white/[0.02]">
                    {recommendation.detail}
                  </p>

                  <div className="space-y-3 pt-2">
                    <button
                      onClick={simulateRecovery}
                      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-black font-black text-xs tracking-widest transition-all duration-300 cursor-pointer uppercase"
                      style={{ backgroundColor: recommendation.color, boxShadow: `0 0 15px ${recommendation.color}33` }}
                    >
                      INGEST CARTRIDGE (SIMULATE)
                    </button>

                    <a
                      href={`/product/${recommendation.barId}`}
                      className="w-full flex items-center justify-center gap-2 py-3.5 border border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.06] text-white text-[10px] font-mono tracking-widest rounded-xl transition-colors uppercase"
                    >
                      INSPECT MOLECULAR SPECS
                    </a>
                  </div>
                </div>
              </div>

              {/* Workout log */}
              <div className="p-6 rounded-2xl border border-white/[0.04] bg-[#07070a]/90 shadow-2xl space-y-4">
                <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest block border-b border-white/[0.04] pb-2">SIMULATED EXERCISE LOGS</span>
                {workouts.length === 0 ? (
                  <div className="text-center py-6 text-[10px] font-mono text-zinc-600">NO STRAIN LOGS IN ACTIVE CYCLE</div>
                ) : (
                  <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                    {workouts.map((w, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 rounded-lg bg-white/[0.01] border border-white/[0.02] flex justify-between items-center text-[9px] font-mono"
                      >
                        <div>
                          <span className="block text-white font-bold">{w.type}</span>
                          <span className="text-zinc-500">{w.timestamp} // {w.duration}M</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full border font-black uppercase ${
                          w.intensity === "high" ? "bg-red-500/10 text-red-400 border-red-500/20" :
                          w.intensity === "medium" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
                          "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                        }`}>
                          {w.intensity}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 4 — COMMUNITY
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full py-32 px-6 sm:px-12 md:px-24 bg-[#06060A] border-t border-white/[0.03]">
        <div className="absolute inset-0 bg-cyber-grid opacity-8 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="text-center max-w-2xl mx-auto mb-16 space-y-4"
          >
            <motion.span variants={fadeUp} className="section-label mx-auto">
              SCENE 04 // ATHLETE COMMUNITY
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-black tracking-widest text-white uppercase">
              THE FIELD REPORTS
            </motion.h2>
            <motion.p variants={fadeUp} className="text-sm text-zinc-400 leading-relaxed">
              Not influencers. Not paid testimonials. Real athletes. Real results. Verified performance data from the community that uses AESTHETIX daily.
            </motion.p>
          </motion.div>

          {/* Aggregate bar */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeUp}
            className="flex flex-wrap justify-center gap-8 mb-16 p-6 rounded-2xl border border-white/[0.04] bg-white/[0.01]"
          >
            {[
              { val: "4,200+", label: "Active Athletes", color: "#F5F7FA" },
              { val: "4.8★", label: "Average Rating", color: "#00C2FF" },
              { val: "98%", label: "Repurchase Rate", color: "#34D399" },
              { val: "6 cities", label: "Across India", color: "#F5F7FA" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <span className="block text-2xl font-black font-mono" style={{ color: s.color }}>{s.val}</span>
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">{s.label}</span>
              </div>
            ))}
          </motion.div>

          {/* Community masonry grid */}
          <div className="community-grid">
            {COMMUNITY.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="community-card"
              >
                <div
                  className="review-card p-6 space-y-4 h-full"
                  style={{ borderColor: `${member.color}15` }}
                >
                  {/* Quote */}
                  <p className="text-sm text-zinc-300 leading-relaxed font-sans">&ldquo;{member.quote}&rdquo;</p>

                  {/* Stat badge */}
                  <div
                    className="px-3 py-2 rounded-lg border text-[9px] font-mono font-bold"
                    style={{
                      borderColor: `${member.color}25`,
                      backgroundColor: `${member.color}08`,
                      color: member.color,
                    }}
                  >
                    📊 {member.stat}
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-2 border-t border-white/[0.04]">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center font-mono text-[10px] font-black border flex-shrink-0"
                      style={{ backgroundColor: `${member.color}12`, borderColor: `${member.color}40`, color: member.color }}
                    >
                      {member.initials}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white">{member.name}</span>
                      <span className="text-[9px] font-mono text-zinc-500 block">{member.role}</span>
                    </div>
                    <span
                      className="ml-auto text-[7px] font-mono px-2 py-0.5 rounded-full border"
                      style={{ borderColor: `${member.color}30`, color: member.color }}
                    >
                      {member.product}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
            className="mt-16 text-center"
          >
            <a
              href="/shop"
              className="inline-flex items-center gap-2 bg-[#00C2FF] hover:bg-[#00e5ff] text-black font-black text-xs tracking-widest px-10 py-4 rounded-xl transition-all duration-300 shadow-[0_0_25px_rgba(0,194,255,0.35)] uppercase"
            >
              JOIN THE COMMUNITY
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
