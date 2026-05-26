"use client";

import { useStore } from "@/lib/store";
import { Activity, Zap, ShieldAlert, Sparkles, RefreshCw, Flame, Brain, Compass, Dumbbell } from "lucide-react";

export default function Experience() {
  const recoveryScore = useStore((state) => state.recoveryScore);
  const biomarkers = useStore((state) => state.biomarkers);
  const workouts = useStore((state) => state.workouts);
  
  const addWorkout = useStore((state) => state.addWorkout);
  const simulateRecovery = useStore((state) => state.simulateRecovery);
  const resetBiomarkers = useStore((state) => state.resetBiomarkers);

  // Dynamic status styling based on recovery score
  const getStatus = (score: number) => {
    if (score > 80) return { label: "OPTIMAL", color: "text-emerald-400", border: "border-emerald-500/20", bg: "bg-emerald-500/5" };
    if (score > 50) return { label: "DEGRADED", color: "text-amber-400", border: "border-amber-500/20", bg: "bg-amber-500/5" };
    return { label: "CRITICAL WEAR", color: "text-rose-400", border: "border-rose-500/20", bg: "bg-rose-500/5" };
  };

  const statusInfo = getStatus(recoveryScore);

  // Determine recovery recommendation
  const getRecommendation = () => {
    if (biomarkers.muscleFatigue > 60 || biomarkers.atpLevel < 40) {
      return {
        barId: "electric-cyan",
        name: "Electric Cyan",
        purpose: "Accelerate phosphocreatine ATP rebuild",
        detail: "Your muscular fatigue index is high and phosphagen reservoirs are severely depleted. Ingest Electric Cyan (3000mg Creapure Creatine) immediately to reset muscle ATP pools.",
        color: "#00C2FF"
      };
    }
    if (biomarkers.cortisol > 60) {
      return {
        barId: "matte-obsidian",
        name: "Matte Obsidian",
        purpose: "Blunt sympathetic cortisol wear",
        detail: "HPA axis signals reveal elevated cortisol levels. Consume Matte Obsidian (600mg Ashwagandha, 200mg Magnesium) to induce non-REM relaxation and downregulate systemic tension.",
        color: "#FFFFFF"
      };
    }
    if (biomarkers.hydration < 60) {
      return {
        barId: "volt-crimson",
        name: "Volt Crimson",
        purpose: "Electrolyte and nitric oxide loadout",
        detail: "Osmotic cell pressure is degraded due to fluid loss. Ingest Volt Crimson (L-Citrulline Malate, Nitric Oxide boosters) to expand vascular volume and carry nutrients to fatigued fibers.",
        color: "#FF3366"
      };
    }
    return {
      barId: "melted-silver",
      name: "Melted Silver",
      purpose: "Structural tissue recovery",
      detail: "Biomarker indices are balanced. Consume Melted Silver (5000mg Marine Collagen Peptides) to reinforce joint cartilage and promote skin cell hydration during downtime.",
      color: "#E2E8F0"
    };
  };

  const recommendation = getRecommendation();

  return (
    <div className="w-full bg-[#050505] text-[#F5F7FA] py-32 px-6 sm:px-12 md:px-24">
      {/* Background glowing cyber grids */}
      <div className="absolute inset-0 bg-cyber-grid-cyan opacity-10 pointer-events-none z-0" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00C2FF]/10 border border-[#00C2FF]/20 text-[10px] tracking-widest text-[#00C2FF] font-mono uppercase">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              <span>REAL-TIME BIOMETRIC READOUT // ACTIVE</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white uppercase">
              PERFORMANCE EXPERIENCE
            </h1>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Track your central nervous system strain, cellular energy indices, and fluid pressures. Use our simulated workout modules to model physiological strain and view immediate nutritional countermeasures.
            </p>
          </div>

          <button
            onClick={resetBiomarkers}
            className="flex items-center gap-2 border border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.06] text-xs font-bold font-mono tracking-wider px-5 py-3 rounded-lg text-zinc-400 hover:text-white transition-all cursor-pointer uppercase"
            title="Reset telemetry dashboard"
          >
            <RefreshCw className="w-4 h-4" /> RESET SYSTEM
          </button>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Diagnostic Console Panel (Left side) */}
          <div className="lg:col-span-8 space-y-8">
            <div className="p-8 rounded-2xl border border-white/[0.04] bg-[#07070a]/90 scanlines shadow-2xl relative">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00C2FF]/30 to-transparent" />
              
              <div className="flex justify-between items-center border-b border-white/[0.04] pb-6 mb-8">
                <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest">BIOMARKER MONITOR DIAGNOSTICS</span>
                <span className="font-mono text-[9px] text-[#00C2FF] tracking-widest">CORE_VERSION: V1.12</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* Gauge Area */}
                <div className="flex flex-col items-center justify-center p-6 border border-white/[0.03] bg-white/[0.01] rounded-xl relative">
                  <div className="w-36 h-36 rounded-full border-4 border-zinc-950 flex flex-col items-center justify-center relative shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]">
                    {/* Ring glow */}
                    <div 
                      className="absolute inset-0 rounded-full border-4 transition-all duration-1000"
                      style={{
                        borderColor: recoveryScore > 80 ? "#10b981" : recoveryScore > 50 ? "#f59e0b" : "#ef4444",
                        boxShadow: `0 0 15px ${recoveryScore > 80 ? "rgba(16,185,129,0.3)" : recoveryScore > 50 ? "rgba(245,158,11,0.3)" : "rgba(239,68,68,0.3)"}`
                      }}
                    />
                    <span className="text-4xl font-mono font-black text-white">{recoveryScore}%</span>
                    <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest mt-1">RECOVERY INDEX</span>
                  </div>

                  <div className={`mt-6 px-4 py-1.5 rounded-full border font-mono text-[9px] font-black tracking-widest ${statusInfo.border} ${statusInfo.bg} ${statusInfo.color}`}>
                    SYSTEM STATUS: {statusInfo.label}
                  </div>
                </div>

                {/* Progress bars Area */}
                <div className="space-y-5">
                  {/* Hydration */}
                  <div className="space-y-1">
                    <div className="flex justify-between font-mono text-[9px] text-zinc-400">
                      <span>CELLULAR HYDRATION (OSMOTIC PRESSURE)</span>
                      <span>{biomarkers.hydration}%</span>
                    </div>
                    <div className="w-full h-2 bg-zinc-950 rounded-full overflow-hidden border border-white/[0.02]">
                      <div 
                        className="h-full bg-cyan-500 rounded-full meter-fill"
                        style={{ width: `${biomarkers.hydration}%` }}
                      />
                    </div>
                  </div>

                  {/* ATP level */}
                  <div className="space-y-1">
                    <div className="flex justify-between font-mono text-[9px] text-zinc-400">
                      <span>PHOSPHAGEN ATP RESERVES</span>
                      <span>{biomarkers.atpLevel}%</span>
                    </div>
                    <div className="w-full h-2 bg-zinc-950 rounded-full overflow-hidden border border-white/[0.02]">
                      <div 
                        className="h-full bg-amber-500 rounded-full meter-fill"
                        style={{ width: `${biomarkers.atpLevel}%` }}
                      />
                    </div>
                  </div>

                  {/* Cortisol */}
                  <div className="space-y-1">
                    <div className="flex justify-between font-mono text-[9px] text-zinc-400">
                      <span>SERUM CORTISOL (STRESS INDEX)</span>
                      <span className={biomarkers.cortisol > 60 ? "text-rose-500 font-bold" : ""}>{biomarkers.cortisol}%</span>
                    </div>
                    <div className="w-full h-2 bg-zinc-950 rounded-full overflow-hidden border border-white/[0.02]">
                      <div 
                        className="h-full bg-red-500 rounded-full meter-fill"
                        style={{ width: `${biomarkers.cortisol}%` }}
                      />
                    </div>
                  </div>

                  {/* Fatigue */}
                  <div className="space-y-1">
                    <div className="flex justify-between font-mono text-[9px] text-zinc-400">
                      <span>MUSCLE FIBER FATIGUE</span>
                      <span className={biomarkers.muscleFatigue > 60 ? "text-rose-500 font-bold" : ""}>{biomarkers.muscleFatigue}%</span>
                    </div>
                    <div className="w-full h-2 bg-zinc-950 rounded-full overflow-hidden border border-white/[0.02]">
                      <div 
                        className="h-full bg-[#00C2FF] rounded-full meter-fill"
                        style={{ width: `${biomarkers.muscleFatigue}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Workout Strain Simulation Module */}
            <div className="p-8 rounded-2xl border border-white/[0.04] bg-[#07070a]/90 shadow-2xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF3366]/30 to-transparent" />
              <div>
                <h3 className="font-mono text-xs font-bold text-zinc-300 tracking-widest uppercase mb-1">INJECT PHYSICAL STRAIN LOAD</h3>
                <p className="text-[11px] text-zinc-500 leading-relaxed font-sans">
                  Simulate dynamic exercises. High-load stress consumes creatine ATP stores, triggers high cortisol levels, and depletes hydration salts.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button
                  onClick={() => addWorkout({ type: "Active Mobility Protocol", duration: 30, intensity: "low", timestamp: new Date().toLocaleTimeString() })}
                  className="flex flex-col items-center p-4 border border-white/[0.03] bg-white/[0.01] hover:border-cyan-500/30 hover:bg-white/[0.03] transition-all rounded-xl gap-2 cursor-pointer group"
                >
                  <Compass className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                  <span className="font-mono text-[10px] font-bold text-white uppercase">MOBILITY PROTOCOL</span>
                  <span className="font-mono text-[8px] text-zinc-500">LOW INTENSITY // 30M</span>
                </button>

                <button
                  onClick={() => addWorkout({ type: "Cardiovascular Circuit", duration: 45, intensity: "medium", timestamp: new Date().toLocaleTimeString() })}
                  className="flex flex-col items-center p-4 border border-white/[0.03] bg-white/[0.01] hover:border-amber-500/30 hover:bg-white/[0.03] transition-all rounded-xl gap-2 cursor-pointer group"
                >
                  <Flame className="w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform" />
                  <span className="font-mono text-[10px] font-bold text-white uppercase">CARDIO CIRCUIT</span>
                  <span className="font-mono text-[8px] text-zinc-500">MEDIUM INTENSITY // 45M</span>
                </button>

                <button
                  onClick={() => addWorkout({ type: "Heavy Resistance Training", duration: 60, intensity: "high", timestamp: new Date().toLocaleTimeString() })}
                  className="flex flex-col items-center p-4 border border-white/[0.03] bg-white/[0.01] hover:border-[#FF3366]/30 hover:bg-white/[0.03] transition-all rounded-xl gap-2 cursor-pointer group"
                >
                  <Dumbbell className="w-5 h-5 text-[#FF3366] group-hover:scale-110 transition-transform" />
                  <span className="font-mono text-[10px] font-bold text-white uppercase">RESISTANCE LOAD</span>
                  <span className="font-mono text-[8px] text-zinc-500">HIGH INTENSITY // 60M</span>
                </button>
              </div>
            </div>
          </div>

          {/* Biomass Recommendation Module (Right side) */}
          <div className="lg:col-span-4 space-y-8">
            <div className="p-6 rounded-2xl border border-white/[0.04] bg-[#07070a]/90 shadow-2xl relative scanlines">
              <div 
                className="absolute top-0 inset-x-0 h-40 opacity-10 pointer-events-none z-0 filter blur-[40px] transition-all duration-500"
                style={{ backgroundColor: recommendation.color }}
              />

              <div className="flex gap-2 items-center text-xs font-bold text-white font-mono uppercase tracking-widest mb-6">
                <Sparkles className="w-4 h-4 animate-spin text-[#00C2FF]" />
                <span>RECOMMENDED COUNTERMEASURE</span>
              </div>

              <div className="space-y-6 relative z-10">
                <div className="space-y-1">
                  <span className="font-mono text-[8px] text-zinc-500 block uppercase">FORMULATION CARTRIDGE</span>
                  <h3 
                    className="text-2xl font-black uppercase tracking-widest"
                    style={{ color: recommendation.color }}
                  >
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
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-black font-black text-xs tracking-widest transition-all duration-300 hover:opacity-95 cursor-pointer uppercase"
                    style={{ 
                      backgroundColor: recommendation.color,
                      boxShadow: `0 0 15px ${recommendation.color}33`
                    }}
                  >
                    INGEST CARTRIDGE (SIMULATE)
                  </button>

                  <a
                    href={`/product/${recommendation.barId}`}
                    className="w-full flex items-center justify-center gap-2 py-3 border border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.06] text-white text-[10px] font-mono tracking-widest rounded-lg transition-colors uppercase"
                  >
                    INSPECT MOLECULAR SPECS
                  </a>
                </div>
              </div>
            </div>

            {/* Live workout stream */}
            <div className="p-6 rounded-2xl border border-white/[0.04] bg-[#07070a]/90 shadow-2xl space-y-4">
              <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest block border-b border-white/[0.04] pb-2">SIMULATED EXERCISE LOGS</span>
              {workouts.length === 0 ? (
                <div className="text-center py-6 text-[10px] font-mono text-zinc-600">
                  NO STRAIN LOGS DETECTED IN ACTIVE CYCLE
                </div>
              ) : (
                <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                  {workouts.map((w, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-white/[0.01] border border-white/[0.02] flex justify-between items-center text-[9px] font-mono">
                      <div>
                        <span className="block text-white font-bold">{w.type}</span>
                        <span className="text-zinc-500">{w.timestamp} // {w.duration}M</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full border ${
                        w.intensity === "high" ? "bg-red-500/10 text-red-400 border-red-500/20" :
                        w.intensity === "medium" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
                        "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                      } font-black uppercase`}>
                        {w.intensity}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
