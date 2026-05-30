"use client";

import Link from "next/link";
import { ArrowRight, Cpu, Dumbbell, Sparkle, Star, ShieldCheck, Zap, Heart, Leaf, ChevronDown } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { useStore } from "@/lib/store";


/* ─── Animation Variants ─────────────────────────────────────────────────── */

const EASE = "easeOut" as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
};

const staggerFast: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const slideLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE } },
};

const slideRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE } },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: EASE } },
};

/* ─── Data ───────────────────────────────────────────────────────────────── */

const INGREDIENTS = [
  {
    code: "01",
    label: "WHEY ISOLATE & PEPTIDES",
    title: "BIOACTIVE PROTEIN",
    desc: "High-absorption nitrogen retention isolate to rebuild skeletal micro-tears immediately post-strain without gastric delay.",
    stat: "24g",
    unit: "per bar",
    color: "#00C2FF",
  },
  {
    code: "02",
    label: "CREAPURE® MONOHYDRATE",
    title: "CREATINE ATP",
    desc: "Accelerates resynthesis of adenosine triphosphate (ATP) in myofibrils to preserve maximal anaerobic strength potential.",
    stat: "3000mg",
    unit: "clinical dose",
    color: "#00E5FF",
  },
  {
    code: "03",
    label: "L-GLUTAMINE",
    title: "GLUTAMINE REPAIR",
    desc: "Crucial amino acid substrate supporting intestinal cell structures, mucosal barrier integrity, and glycogen replenishment.",
    stat: "2000mg",
    unit: "gut integrity",
    color: "#7DD3FC",
  },
  {
    code: "04",
    label: "KSM-66® EXTRACT",
    title: "ASHWAGANDHA CNS",
    desc: "Downregulates central nervous arousal, lowers serum cortisol, and triggers parasympathetic recovery pathways.",
    stat: "600mg",
    unit: "cortisol shield",
    color: "#00C2FF",
  },
];

const BENEFITS = [
  { icon: Dumbbell, label: "LEAN MUSCLE\nSUPPORT", color: "#00C2FF" },
  { icon: Zap, label: "CLEAN\nENERGY", color: "#00E5FF" },
  { icon: Sparkle, label: "SKIN GLOW\nSUPPORT", color: "#FF3366" },
  { icon: Heart, label: "JOINT\nINTEGRITY", color: "#FF3366" },
  { icon: ShieldCheck, label: "STRESS\nSHIELD", color: "#00C2FF" },
  { icon: Leaf, label: "GUT-FRIENDLY\nNUTRITION", color: "#34D399" },
];

const NOT_INSIDE = [
  "No Preservatives",
  "No Artificial Flavours",
  "No Sugar Crash",
  "No Bloating Agents",
  "No Synthetic Fillers",
  "No FODMAP Triggers",
];

const FLAVOURS = [
  {
    name: "AESTHETIC BLUEPRINT",
    flavour: "Glacial Mint & Crisp Dark Cacao",
    desc: "A dark, intense recovery experience. Cold mint clarity meets deep cacao richness. Post-workout perfection.",
    color: "#00C2FF",
    glowColor: "rgba(0,194,255,0.12)",
    textureColor: "rgba(0,194,255,0.04)",
    accentBg: "#0A1A28",
    badge: "ANABOLIC · RECOVERY",
  },
  {
    name: "COLLAGEN GLOW",
    flavour: "Rich Madagascan Vanilla & Almond Butter",
    desc: "Warm, indulgent luxury. Premium vanilla notes meet roasted almond depth. Beauty science in every bite.",
    color: "#FF3366",
    glowColor: "rgba(255,51,102,0.12)",
    textureColor: "rgba(255,51,102,0.04)",
    accentBg: "#1E0A10",
    badge: "BEAUTY · COLLAGEN",
  },
];

const REVIEWS = [
  {
    name: "Aryan S.",
    initials: "AS",
    product: "Aesthetic Blueprint",
    rating: 5,
    text: "Switched from a big-name protein shake. This tastes cleaner, digests instantly, and my recovery has genuinely improved. The mint-cacao flavour is elite.",
    tag: "Verified Buyer",
    color: "#00C2FF",
  },
  {
    name: "Priya M.",
    initials: "PM",
    product: "Collagen Glow",
    rating: 5,
    text: "I can feel the difference in my skin within 3 weeks. The vanilla almond is honestly addictive — not too sweet. This is my daily non-negotiable now.",
    tag: "Subscriber",
    color: "#FF3366",
  },
  {
    name: "Rohan K.",
    initials: "RK",
    product: "Aesthetic Blueprint",
    rating: 5,
    text: "Ashwagandha in a protein bar is genius. I used to crash hard after heavy lifts — now I recover and sleep better. The packaging alone makes you feel premium.",
    tag: "Verified Buyer",
    color: "#00C2FF",
  },
];

/* ─── Component ──────────────────────────────────────────────────────────── */

export default function Home() {
  const products = useStore((state) => state.products);
  const addToCart = useStore((state) => state.addToCart);

  return (
    <div className="flex flex-col w-full bg-[#050505] text-[#F5F7FA]">

      {/* ════════════════════════════════════════════════════════════════════
          SCENE 1 — CINEMATIC HERO (video bg + Three.js particles + overlays)
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden">

        {/* ── Layer 1: Cinematic video background ── */}
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ opacity: 0.55, mixBlendMode: "screen" }}
          src="/hero-video.mp4"
          autoPlay
          loop
          muted
          playsInline
        />

        {/* ── Layer 2: Radial vignette ── */}
        <div
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 20%, rgba(5,5,5,0.65) 100%)",
          }}
        />

        {/* ── Layer 4: Top-to-bottom cinematic fade ── */}
        <div className="cinematic-video-overlay z-[2]" />

        {/* Hero Text Overlay */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative z-[3] flex flex-col items-center text-center max-w-5xl mx-auto px-6 gap-6"
        >
          {/* Biotech tag */}
          <motion.div variants={fadeUp} className="section-label">
            <Cpu className="w-3 h-3" />
            AESTHETIX LABS // SPEC_VERSION: 2.0
          </motion.div>

          {/* Main headline */}
          <motion.h1
            variants={fadeUp}
            className="text-5xl sm:text-6xl md:text-8xl font-black tracking-widest text-white leading-[0.95] uppercase"
          >
            YOUR AESTHETIC
            <br />
            <span className="text-shimmer">BLUEPRINT</span>
            <br />
            IN A WRAPPER
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeUp}
            className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-xl font-sans"
          >
            Elite recovery engineered for clean performance, aesthetic nutrition, and zero-bloat fuel.
            Not just a protein bar — a precision system.
          </motion.p>

          {/* CTA Row */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 justify-center mt-2">
            <Link
              href="/shop"
              className="flex items-center gap-2 bg-[#00C2FF] hover:bg-[#00e5ff] text-black font-black text-xs tracking-widest px-10 py-4 rounded-lg transition-all duration-300 shadow-[0_0_30px_rgba(0,194,255,0.4)] hover:shadow-[0_0_50px_rgba(0,194,255,0.6)] uppercase glow-pulse-cyan"
            >
              BUY NOW
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#formula"
              className="flex items-center gap-2 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-white font-bold text-xs tracking-widest px-10 py-4 rounded-lg transition-all duration-300 uppercase"
            >
              EXPLORE FORMULA
            </a>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap gap-8 mt-4 font-mono text-xs text-zinc-400 justify-center border-t border-white/[0.06] pt-6"
          >
            <div className="text-center">
              <span className="block text-2xl font-black text-white">24g</span>
              <span className="text-[9px] uppercase tracking-widest">Protein</span>
            </div>
            <div className="w-[1px] bg-white/[0.06]" />
            <div className="text-center">
              <span className="block text-2xl font-black text-[#00C2FF]">0</span>
              <span className="text-[9px] uppercase tracking-widest">Bloat</span>
            </div>
            <div className="w-[1px] bg-white/[0.06]" />
            <div className="text-center">
              <span className="block text-2xl font-black text-white">3000mg</span>
              <span className="text-[9px] uppercase tracking-widest">Creatine</span>
            </div>
            <div className="w-[1px] bg-white/[0.06]" />
            <div className="text-center">
              <span className="block text-2xl font-black text-white">200</span>
              <span className="text-[9px] uppercase tracking-widest">Kcal</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-500 font-mono text-[8px] tracking-widest z-[3] pointer-events-none">
          <ChevronDown className="w-4 h-4 animate-bounce" />
          <span>SCROLL TO UNWRAP</span>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SCENE 2 — PRODUCT STACKS & DEPLOYMENT
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full py-32 bg-[#07070a] border-b border-white/[0.03] px-6 sm:px-12 md:px-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="text-center max-w-2xl mx-auto mb-20 space-y-4"
          >
            <motion.span variants={fadeUp} className="section-label mx-auto">
              SCENE 02 // PRODUCT STACKS & DEPLOYMENT
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-black tracking-widest text-white uppercase">
              AESTHETIX NUTRITIONAL LOADOUT
            </motion.h2>
            <motion.p variants={fadeUp} className="text-sm text-zinc-400 leading-relaxed">
              Compare formulations. Select your cartridge system based on dynamic biometric requirements.
            </motion.p>
          </motion.div>

          {/* Product Cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            {products.map((product) => (
              <motion.div
                key={product.id}
                variants={scaleIn}
                className="group relative rounded-2xl border border-white/[0.04] bg-white/[0.01] overflow-hidden flex flex-col justify-between hover:border-white/[0.1] hover:bg-white/[0.02] transition-all duration-500 hover:shadow-[0_15px_40px_rgba(0,0,0,0.6)] scanlines p-8"
              >
                {/* Visual Block */}
                <div
                  className="h-44 w-full relative flex items-center justify-center border border-white/[0.02] rounded-xl mb-6 overflow-hidden"
                  style={{ backgroundColor: `${product.color}07` }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{ background: `radial-gradient(circle at 50% 50%, ${product.color}15, transparent 70%)` }}
                  />
                  <div
                    className="absolute w-24 h-24 rounded-full filter blur-[35px] opacity-15 group-hover:opacity-35 transition-all duration-500"
                    style={{ backgroundColor: product.color }}
                  />
                  <div
                    className="w-40 h-12 rounded-xl flex items-center justify-center border text-[10px] font-mono font-black select-none tracking-widest rotate-[-4deg] group-hover:rotate-0 transition-transform duration-500 product-bar-mock"
                    style={{
                      backgroundColor: `${product.color}22`,
                      borderColor: `${product.color}60`,
                      color: product.color,
                      boxShadow: `0 0 20px ${product.color}20`,
                    }}
                  >
                    {product.name.split(" ").map((w) => w[0]).join("")} CARTRIDGE
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4 flex-1">
                  <div>
                    <span className="text-[9px] font-mono font-bold tracking-widest uppercase block" style={{ color: product.color }}>
                      {product.scientificFocus}
                    </span>
                    <h3 className="text-lg font-black tracking-widest text-white uppercase mt-1">{product.name}</h3>
                    <p className="text-[9px] font-mono text-zinc-500 uppercase">{product.flavorProfile}</p>
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed font-sans">{product.description}</p>

                  <div className="p-4 rounded-lg bg-white/[0.01] border border-white/[0.03] space-y-1 text-[9px] font-mono text-zinc-500">
                    <span className="text-zinc-600 block mb-1">PSYCHOLOGICAL PROFILE:</span>
                    <span className="text-zinc-300 font-bold block">{product.psychologicalFocus}</span>
                  </div>

                  <div className="grid grid-cols-4 gap-2 border-t border-white/[0.04] pt-4 text-center font-mono text-[9px] text-zinc-500">
                    <div><span className="block text-white font-bold">{product.nutrition.protein}</span><span>PROTEIN</span></div>
                    <div><span className="block text-white font-bold">{product.nutrition.carbs}</span><span>CARBS</span></div>
                    <div><span className="block text-white font-bold">{product.nutrition.calories}</span><span>KCAL</span></div>
                    <div><span className="block font-bold" style={{ color: product.color }}>₹{product.price}</span><span>RETAIL</span></div>
                  </div>
                </div>

                <div className="mt-8 flex gap-3 border-t border-white/[0.04] pt-6">
                  <Link
                    href={`/product/${product.id}`}
                    className="flex-1 text-center py-3 rounded-lg border border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.06] text-[10px] font-bold tracking-widest text-white transition-colors uppercase"
                  >
                    EXAMINE SPECS
                  </Link>
                  <button
                    onClick={() => addToCart(product, 1)}
                    className="flex-1 py-3 rounded-lg text-[10px] font-black tracking-widest text-black transition-all hover:opacity-90 cursor-pointer uppercase"
                    style={{ backgroundColor: product.color, boxShadow: `0 0 15px ${product.color}33` }}
                  >
                    ADD CARGO
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SCENE 3 — MOLECULAR INGREDIENT EMERGENCE
      ════════════════════════════════════════════════════════════════════ */}
      <section id="formula" className="relative w-full py-32 bg-[#07070a] border-y border-white/[0.03] px-6 sm:px-12 md:px-24 overflow-hidden">
        {/* Ambient grid */}
        <div className="absolute inset-0 bg-cyber-grid opacity-15 pointer-events-none" />
        {/* Cyan glow source */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,194,255,0.04)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="text-center max-w-2xl mx-auto mb-20 space-y-4"
          >
            <motion.span variants={fadeUp} className="section-label mx-auto">
              SCENE 03 // ACTIVE COMPOUND EMERGENCE
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-black tracking-widest text-white uppercase">
              THE BIOCELLULAR CORE
            </motion.h2>
            <motion.p variants={fadeUp} className="text-sm text-zinc-400 leading-relaxed">
              As the outer wrapper breaks, clinical dosages of bioactive minerals and peptide systems release into cellular targets. Zero synthetic fillers. Pure response complexes only.
            </motion.p>
          </motion.div>

          {/* Ingredient Cards Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {INGREDIENTS.map((ing) => (
              <motion.div
                key={ing.code}
                variants={scaleIn}
                className="ingredient-card p-6 rounded-2xl border border-white/[0.04] bg-white/[0.01] hover:border-white/[0.1] hover:bg-white/[0.02] transition-all duration-500 space-y-5 group"
              >
                {/* Number + label */}
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[9px] font-bold" style={{ color: ing.color }}>{ing.code}</span>
                  <div className="h-[1px] flex-1" style={{ background: `linear-gradient(90deg, ${ing.color}40, transparent)` }} />
                </div>

                {/* Stat */}
                <div>
                  <span className="text-3xl font-black font-mono" style={{ color: ing.color }}>{ing.stat}</span>
                  <span className="text-[9px] font-mono text-zinc-500 ml-2 uppercase">{ing.unit}</span>
                </div>

                {/* Title + desc */}
                <div className="space-y-2">
                  <span className="font-mono text-[9px] font-bold tracking-widest uppercase" style={{ color: ing.color }}>{ing.label}</span>
                  <h3 className="text-sm font-black tracking-widest text-white uppercase">{ing.title}</h3>
                  <p className="text-[11px] text-zinc-500 leading-relaxed font-sans">{ing.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* "What's NOT Inside" strip */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={stagger}
            className="mt-16 p-8 rounded-2xl border border-white/[0.04] bg-white/[0.005]"
          >
            <motion.h3 variants={fadeUp} className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest mb-6 text-center">
              WHAT&apos;S NOT INSIDE — TRANSPARENCY PROTOCOL
            </motion.h3>
            <div className="flex flex-wrap justify-center gap-3">
              {NOT_INSIDE.map((item) => (
                <motion.div
                  key={item}
                  variants={scaleIn}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.05] bg-white/[0.01]"
                >
                  <span className="w-4 h-4 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-[8px] text-emerald-400 font-bold">✕</span>
                  </span>
                  <span className="text-[10px] font-mono text-zinc-300 tracking-wider">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SCENE 4 — PERFORMANCE BENEFITS (Orbital orb grid)
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full py-32 px-6 sm:px-12 md:px-24 overflow-hidden">
        {/* Subtle glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(0,194,255,0.03),transparent)] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="text-center max-w-2xl mx-auto mb-20 space-y-4"
          >
            <motion.span variants={fadeUp} className="section-label mx-auto">
              SCENE 04 // BIO-RESPONSE PROFILES
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-black tracking-widest text-white uppercase">
              WHAT IT DOES TO YOU
            </motion.h2>
            <motion.p variants={fadeUp} className="text-sm text-zinc-400 leading-relaxed">
              Six targeted physiological responses. Activated together. Working in precision synergy across your muscle, skin, joint, and nervous system.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerFast}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8"
          >
            {BENEFITS.map((b) => {
              const Icon = b.icon;
              return (
                <motion.div key={b.label} variants={scaleIn} className="benefit-orb cursor-default">
                  <div
                    className="benefit-orb-icon"
                    style={{ borderColor: `${b.color}30`, background: `${b.color}08` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: b.color }} />
                  </div>
                  <span
                    className="text-[10px] font-bold font-mono tracking-widest text-center whitespace-pre-line uppercase"
                    style={{ color: b.color }}
                  >
                    {b.label}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Big stat banner */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeUp}
            className="mt-24 grid grid-cols-1 lg:grid-cols-3 gap-1 rounded-2xl overflow-hidden border border-white/[0.04]"
          >
            {[
              { label: "ANABOLIC NITROGEN", value: "OPTIMAL", sub: "Muscle cell retention" },
              { label: "CREATINE RE-SYNTHESIS", value: "2.4s RAPID", sub: "ATP phosphagen restore" },
              { label: "CORTISOL DAMPING", value: "−27.9%", sub: "HPA-axis blunting" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className={`p-8 bg-white/[0.01] text-center ${i < 2 ? "lg:border-r border-r-0 border-b lg:border-b-0 border-white/[0.04]" : ""}`}
              >
                <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest block mb-2">{stat.label}</span>
                <span className="text-2xl font-black font-mono text-[#00C2FF]">{stat.value}</span>
                <span className="font-mono text-[9px] text-zinc-600 block mt-1">{stat.sub}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SCENE 5 — FLAVOUR EXPERIENCE
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full py-32 bg-[#06060A] border-y border-white/[0.03] px-6 sm:px-12 md:px-24 overflow-hidden">
        <div className="absolute inset-0 bg-cyber-grid opacity-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="text-center max-w-2xl mx-auto mb-20 space-y-4"
          >
            <motion.span variants={fadeUp} className="section-label mx-auto">
              SCENE 05 // SENSORY ENVIRONMENT
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-black tracking-widest text-white uppercase">
              THE FLAVOUR UNIVERSE
            </motion.h2>
            <motion.p variants={fadeUp} className="text-sm text-zinc-400 leading-relaxed">
              Every flavour is an environment. Not just taste — a complete sensory experience calibrated to your recovery identity.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {FLAVOURS.map((flavour, i) => (
              <motion.div
                key={flavour.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={i === 0 ? slideLeft : slideRight}
                className="flavour-card rounded-2xl border border-white/[0.04] overflow-hidden group"
                style={{ backgroundColor: flavour.accentBg }}
              >
                {/* Glow source */}
                <div
                  className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full pointer-events-none transition-all duration-700 group-hover:opacity-70 opacity-40"
                  style={{ background: `radial-gradient(circle, ${flavour.glowColor}, transparent 70%)` }}
                />

                {/* Product Visual Mock */}
                <div
                  className="relative h-48 flex items-center justify-center overflow-hidden"
                  style={{ backgroundColor: flavour.textureColor }}
                >
                  {/* Bar mock */}
                  <div className="relative float-animation">
                    <div
                      className="w-48 h-14 rounded-xl product-bar-mock border flex items-center justify-center"
                      style={{
                        backgroundColor: `${flavour.color}18`,
                        borderColor: `${flavour.color}40`,
                        boxShadow: `0 0 40px ${flavour.color}25, 0 0 80px ${flavour.color}10`,
                      }}
                    >
                      <span
                        className="font-mono text-[10px] font-black tracking-widest uppercase"
                        style={{ color: flavour.color }}
                      >
                        {flavour.name.split(" ").map((w) => w[0]).join("")} CARTRIDGE
                      </span>
                    </div>
                    {/* Reflection */}
                    <div
                      className="w-48 h-4 rounded-xl mt-1 opacity-20 blur-sm"
                      style={{ backgroundColor: `${flavour.color}30`, transform: "scaleY(-1)" }}
                    />
                  </div>

                  {/* Particle dots */}
                  {[...Array(6)].map((_, j) => (
                    <div
                      key={j}
                      className="absolute rounded-full opacity-30"
                      style={{
                        width: `${4 + j * 2}px`,
                        height: `${4 + j * 2}px`,
                        backgroundColor: flavour.color,
                        top: `${20 + j * 12}%`,
                        left: `${10 + j * 14}%`,
                        filter: "blur(1px)",
                        animation: `float-y ${3 + j * 0.5}s ease-in-out ${j * 0.3}s infinite`,
                      }}
                    />
                  ))}
                </div>

                {/* Content */}
                <div className="p-8 space-y-4 relative z-10">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span
                        className="font-mono text-[9px] font-bold tracking-widest uppercase block mb-1"
                        style={{ color: flavour.color }}
                      >
                        {flavour.badge}
                      </span>
                      <h3 className="text-xl font-black tracking-widest text-white uppercase">{flavour.name}</h3>
                    </div>
                    <span
                      className="px-3 py-1 rounded-full border text-[9px] font-mono font-bold tracking-widest flex-shrink-0"
                      style={{ borderColor: `${flavour.color}40`, color: flavour.color, backgroundColor: `${flavour.color}10` }}
                    >
                      ₹399
                    </span>
                  </div>
                  <p className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider">{flavour.flavour}</p>
                  <p className="text-xs text-zinc-400 leading-relaxed font-sans">{flavour.desc}</p>

                  <Link
                    href={`/product/${flavour.name.toLowerCase().replace(/ /g, "-")}`}
                    className="inline-flex items-center gap-2 mt-2 text-[10px] font-bold font-mono tracking-widest uppercase transition-all duration-300"
                    style={{ color: flavour.color }}
                  >
                    INSPECT FORMULA
                    <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SCENE 6 — SOCIAL PROOF (Reviews + aggregate)
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full py-32 px-6 sm:px-12 md:px-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_100%,rgba(0,194,255,0.03),transparent)] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="text-center max-w-2xl mx-auto mb-16 space-y-4"
          >
            <motion.span variants={fadeUp} className="section-label mx-auto">
              SCENE 06 // ATHLETE SIGNAL
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-black tracking-widest text-white uppercase">
              FIELD REPORTS
            </motion.h2>
            <motion.p variants={fadeUp} className="text-sm text-zinc-400 leading-relaxed">
              Real performance data from real athletes. Not influencers. Not paid testimonials. Verified users.
            </motion.p>
          </motion.div>

          {/* Aggregate banner */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeUp}
            className="flex flex-wrap justify-center gap-8 mb-16 p-6 rounded-2xl border border-white/[0.04] bg-white/[0.01]"
          >
            {[
              { value: "512+", label: "Verified Reviews" },
              { value: "4.9★", label: "Average Rating", color: "#00C2FF" },
              { value: "94%", label: "Repurchase Rate" },
              { value: "48h", label: "Avg Delivery" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <span
                  className="block text-2xl font-black font-mono"
                  style={{ color: stat.color ?? "#F5F7FA" }}
                >
                  {stat.value}
                </span>
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">{stat.label}</span>
              </div>
            ))}
          </motion.div>

          {/* Review cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {REVIEWS.map((review) => (
              <motion.div key={review.name} variants={scaleIn} className="review-card p-6 space-y-4">
                {/* Stars */}
                <div className="flex gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-[#00C2FF] text-[#00C2FF]" />
                  ))}
                </div>

                <p className="text-sm text-zinc-300 leading-relaxed font-sans">&ldquo;{review.text}&rdquo;</p>

                <div className="flex items-center justify-between border-t border-white/[0.04] pt-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black font-mono border"
                      style={{ backgroundColor: `${review.color}15`, borderColor: `${review.color}40`, color: review.color }}
                    >
                      {review.initials}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white">{review.name}</span>
                      <span className="text-[9px] font-mono text-zinc-500 block">{review.product}</span>
                    </div>
                  </div>
                  <span
                    className="text-[8px] font-mono font-bold px-2 py-0.5 rounded-full border tracking-widest uppercase"
                    style={{ borderColor: `${review.color}30`, color: review.color, backgroundColor: `${review.color}10` }}
                  >
                    {review.tag}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="relative w-full py-32 bg-[#07070a] border-t border-white/[0.03] px-6 sm:px-12 md:px-24">
        <div className="max-w-7xl mx-auto">
          {/* Subscription banner */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="p-8 sm:p-12 rounded-3xl border border-white/[0.04] bg-[#030305] relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-8 scanlines"
          >
            <div className="absolute top-1/2 left-[-10%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(0,194,255,0.04)_0%,transparent_70%)] pointer-events-none" />

            <div className="space-y-4 max-w-xl relative z-10">
              <span className="section-label">SCENE 07 // SUBSCRIPTION PROTOCOLS</span>
              <h2 className="text-2xl font-black tracking-widest text-white uppercase">NEVER ALLOW YOUR RECOVERY GAP TO COLLAPSE</h2>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                Save 15% on regular deployments by building a custom 12-pack cartridge containing balanced levels of Aesthetic Blueprint and Collagen Glow.
              </p>
            </div>

            <div className="relative z-10 flex-shrink-0">
              <Link
                href="/subscribe"
                className="inline-flex items-center gap-2 bg-[#00C2FF] hover:bg-[#00e5ff] text-black font-black text-xs tracking-widest px-8 py-4 rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(0,194,255,0.25)] uppercase cursor-pointer"
              >
                CONFIGURE SUBSCRIPTION
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
