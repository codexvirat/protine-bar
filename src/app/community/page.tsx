"use client";

import { useState } from "react";
import { Cpu, ShieldCheck, Star, Users, MessageSquare, Plus, Activity } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ReviewLog {
  id: string;
  athlete: string;
  sport: string;
  goal: "cognitive" | "muscle" | "skin" | "general";
  rating: number;
  date: string;
  responseLog: string;
  verdict: string;
}

export default function Community() {
  const [filter, setFilter] = useState<"all" | "cognitive" | "muscle" | "skin">("all");
  const [showForm, setShowForm] = useState(false);
  const [newAthlete, setNewAthlete] = useState("");
  const [newSport, setNewSport] = useState("");
  const [newGoal, setNewGoal] = useState<"cognitive" | "muscle" | "skin" | "general">("muscle");
  const [newRating, setNewRating] = useState(5);
  const [newLog, setNewLog] = useState("");

  const [reviews, setReviews] = useState<ReviewLog[]>([
    {
      id: "LOG-08",
      athlete: "Sarah Connor",
      sport: "Ultra Trail Runner",
      goal: "muscle",
      rating: 5,
      date: "2026-05-24",
      responseLog: "Consuming Matte Obsidian post-50km runs. Cortisol levels feel significantly regulated. Zero gastric load, allowing fast sleep wave onset.",
      verdict: "CNS RESET FULLY VERIFIED"
    },
    {
      id: "LOG-12",
      athlete: "Kaelen Voss",
      sport: "Competitive Hyrox & CrossFit",
      goal: "cognitive",
      rating: 5,
      date: "2026-05-22",
      responseLog: "Electric Cyan has replaced my traditional caffeine crash formulas. The addition of Alpha-GPC keeps motor pathways sharp for heavy lifting.",
      verdict: "ATP RESYNTHESIS OPTIMAL"
    },
    {
      id: "LOG-03",
      athlete: "Dr. Elena Rostova",
      sport: "Biohacking Consultant & Climber",
      goal: "skin",
      rating: 4,
      date: "2026-05-18",
      responseLog: "Tendon tightness from repeat crimps is down since loading Melted Silver. Dermal hydration metrics show visible recovery.",
      verdict: "JOINT CONNECTIVE MATRIX ACTIVATED"
    },
    {
      id: "LOG-09",
      athlete: "Marcus Vance",
      sport: "BJJ Black Belt",
      goal: "muscle",
      rating: 5,
      date: "2026-05-15",
      responseLog: "Recovery gaps have closed. Volt Crimson gives insane vasodilation during sparring without post-stimulant heart rate spikes.",
      verdict: "NITRIC OXIDE SYNTHESIS CONFIRMED"
    }
  ]);

  const filteredReviews = reviews.filter((r) => {
    if (filter === "all") return true;
    return r.goal === filter;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAthlete || !newLog) return;
    
    const newEntry: ReviewLog = {
      id: `LOG-${Math.floor(10 + Math.random() * 90)}`,
      athlete: newAthlete,
      sport: newSport || "Hybrid Athlete",
      goal: newGoal,
      rating: newRating,
      date: new Date().toISOString().split("T")[0],
      responseLog: newLog,
      verdict: "PENDING SPECTROSCOPY CONFIRMATION"
    };

    setReviews([newEntry, ...reviews]);
    setNewAthlete("");
    setNewSport("");
    setNewLog("");
    setShowForm(false);
  };

  return (
    <div className="w-full bg-[#050505] text-[#F5F7FA] py-32 px-6 sm:px-12 md:px-24">
      <div className="absolute inset-0 bg-cyber-grid opacity-10 pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00C2FF]/10 border border-[#00C2FF]/20 text-[10px] tracking-widest text-[#00C2FF] font-mono uppercase">
              <Users className="w-3.5 h-3.5" />
              <span>TESTIMONIAL INTERFACE // FEEDBACK</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white uppercase">
              COMMUNITY LOGS
            </h1>
            <p className="text-sm text-zinc-400 leading-relaxed font-sans">
              Review verified physical telemetry responses from elite hybrid athletes, biohackers, and endurance racers. Submit your recovery verdict to our central database.
            </p>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-[#00C2FF] hover:bg-[#00e5ff] text-black font-black text-xs tracking-widest px-6 py-3.5 rounded-lg transition-all duration-300 shadow-[0_0_15px_rgba(0,194,255,0.2)] cursor-pointer uppercase"
          >
            <Plus className="w-4 h-4" /> SUBMIT SYSTEM VERDICT
          </button>
        </div>

        {/* Dynamic review submittal form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden border border-white/[0.05] bg-[#07070a] rounded-2xl mb-12 p-6 sm:p-8 scanlines relative"
            >
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-[#00C2FF]/30" />
              
              <h3 className="font-mono text-xs font-bold text-white tracking-widest uppercase mb-6 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#00C2FF]" /> RECORD NEW BIO-RESPONSE METRICS
              </h3>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-zinc-500 block">ATHLETE NAME:</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alexis Stark"
                      value={newAthlete}
                      onChange={(e) => setNewAthlete(e.target.value)}
                      className="w-full bg-[#020204]/60 border border-white/[0.05] p-3 rounded-lg text-white placeholder-zinc-700 outline-none focus:border-[#00C2FF]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-zinc-500 block">SPORT / SPECIALTY:</label>
                    <input
                      type="text"
                      placeholder="e.g. Hybrid Athlete"
                      value={newSport}
                      onChange={(e) => setNewSport(e.target.value)}
                      className="w-full bg-[#020204]/60 border border-white/[0.05] p-3 rounded-lg text-white placeholder-zinc-700 outline-none focus:border-[#00C2FF]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-zinc-500 block">TARGET BIO-GOAL:</label>
                    <select
                      value={newGoal}
                      onChange={(e) => setNewGoal(e.target.value as any)}
                      className="w-full bg-[#020204]/60 border border-white/[0.05] p-3 rounded-lg text-white outline-none focus:border-[#00C2FF]"
                    >
                      <option value="muscle">CNS & Muscle Recovery</option>
                      <option value="cognitive">ATP & Cognitive Speed</option>
                      <option value="skin">Joints & Dermal Glow</option>
                      <option value="general">Daily Performance</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-zinc-500 block">RATING STRENGTH (1-5):</label>
                    <div className="flex gap-2 items-center h-10">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setNewRating(star)}
                          className="text-zinc-500 hover:text-amber-400 transition-colors cursor-pointer"
                        >
                          <Star className={`w-5 h-5 ${newRating >= star ? "fill-amber-400 text-amber-400" : ""}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-zinc-500 block">STRAIN LOGS & RESPONSE VERDICT:</label>
                    <textarea
                      required
                      placeholder="Detail your metabolic response, flavor empty points, or physical recovery observations..."
                      value={newLog}
                      onChange={(e) => setNewLog(e.target.value)}
                      rows={3}
                      className="w-full bg-[#020204]/60 border border-white/[0.05] p-3 rounded-lg text-white placeholder-zinc-700 outline-none focus:border-[#00C2FF] resize-none"
                    />
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      className="bg-white text-black font-black px-6 py-3 rounded-lg hover:bg-[#00C2FF] transition-all tracking-widest cursor-pointer uppercase"
                    >
                      TRANSMIT RECOVERY DATA
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 border-b border-white/[0.04] pb-8 mb-12">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 text-[9px] font-mono font-bold tracking-widest rounded-lg border transition-all duration-300 cursor-pointer ${
              filter === "all"
                ? "bg-[#00C2FF] text-black border-[#00C2FF]"
                : "bg-white/[0.01] text-zinc-400 border-white/[0.03] hover:text-white"
            }`}
          >
            ALL LOGS
          </button>
          <button
            onClick={() => setFilter("muscle")}
            className={`px-4 py-2 text-[9px] font-mono font-bold tracking-widest rounded-lg border transition-all duration-300 cursor-pointer ${
              filter === "muscle"
                ? "bg-[#00C2FF] text-black border-[#00C2FF]"
                : "bg-white/[0.01] text-zinc-400 border-white/[0.03] hover:text-white"
            }`}
          >
            CNS & MUSCLE
          </button>
          <button
            onClick={() => setFilter("cognitive")}
            className={`px-4 py-2 text-[9px] font-mono font-bold tracking-widest rounded-lg border transition-all duration-300 cursor-pointer ${
              filter === "cognitive"
                ? "bg-[#00C2FF] text-black border-[#00C2FF]"
                : "bg-white/[0.01] text-zinc-400 border-white/[0.03] hover:text-white"
            }`}
          >
            ATP & COGNITIVE
          </button>
          <button
            onClick={() => setFilter("skin")}
            className={`px-4 py-2 text-[9px] font-mono font-bold tracking-widest rounded-lg border transition-all duration-300 cursor-pointer ${
              filter === "skin"
                ? "bg-[#00C2FF] text-black border-[#00C2FF]"
                : "bg-white/[0.01] text-zinc-400 border-white/[0.03] hover:text-white"
            }`}
          >
            JOINTS & GLOW
          </button>
        </div>

        {/* Telemetry log reviews list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="p-6 rounded-2xl border border-white/[0.03] bg-white/[0.01] flex flex-col justify-between hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300 relative overflow-hidden scanlines"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex justify-between items-start border-b border-white/[0.04] pb-4 font-mono text-[9px]">
                  <div>
                    <span className="text-white font-bold block uppercase">{review.athlete}</span>
                    <span className="text-zinc-500 uppercase">{review.sport}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[#00C2FF] font-bold block">{review.id}</span>
                    <span className="text-zinc-500">{review.date}</span>
                  </div>
                </div>

                {/* Rating stars */}
                <div className="flex gap-1 items-center">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      className={`w-3.5 h-3.5 ${
                        idx < review.rating ? "fill-amber-400 text-amber-400" : "text-zinc-700"
                      }`}
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  {review.responseLog}
                </p>
              </div>

              {/* Status footer */}
              <div className="mt-6 pt-4 border-t border-white/[0.04] flex items-center justify-between font-mono text-[8px] tracking-wider">
                <span className="text-emerald-500 font-bold flex items-center gap-1.5 uppercase">
                  <ShieldCheck className="w-3.5 h-3.5" /> {review.verdict}
                </span>
                <span className="text-zinc-600">SYS_LOG: SECURE</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
