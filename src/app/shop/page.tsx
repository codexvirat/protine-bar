"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { Sparkles, ShoppingBag, Eye, Cpu, ArrowRight, Star } from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";

type FilterCategory = "all" | "anabolic" | "glow";

const EASE = "easeOut" as const;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE } },
};

/* Magnetic card tilt hook */
function MagneticCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [6, -6]);
  const rotateY = useTransform(x, [-100, 100], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`magnetic-card ${className ?? ""}`}
    >
      {children}
    </motion.div>
  );
}

export default function Shop() {
  const products = useStore((state) => state.products);
  const addToCart = useStore((state) => state.addToCart);
  const [filter, setFilter] = useState<FilterCategory>("all");
  const [addedId, setAddedId] = useState<string | null>(null);

  const filters: { name: string; key: FilterCategory }[] = [
    { name: "ALL FORMULATIONS", key: "all" },
    { name: "ANABOLIC & CNS", key: "anabolic" },
    { name: "GLOW & WELLNESS", key: "glow" },
  ];

  const filteredProducts = products.filter((product) => {
    if (filter === "all") return true;
    if (filter === "anabolic" && product.id === "aesthetic-blueprint") return true;
    if (filter === "glow" && product.id === "collagen-glow") return true;
    return false;
  });

  const router = useRouter();

  const handleAdd = (product: (typeof products)[0]) => {
    addToCart(product, 1);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  const handleBuyNow = (product: (typeof products)[0]) => {
    addToCart(product, 1);
    router.push("/checkout");
  };

  return (
    <div className="w-full bg-[#050505] text-[#F5F7FA] min-h-screen">

      {/* ─── Cinematic Hero Banner ─────────────────────────────────────────── */}
      <section className="relative w-full pt-40 pb-24 px-6 sm:px-12 md:px-24 overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-[#00c2ff]/6 to-transparent pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,194,255,0.04),transparent_70%)] pointer-events-none" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="max-w-7xl mx-auto relative z-10"
        >
          <motion.div variants={fadeUp} className="section-label mb-6">
            <Cpu className="w-3 h-3" />
            INVENTORY CATALOG // SYSTEM_ACCESS
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-5xl sm:text-6xl md:text-7xl font-black tracking-widest text-white uppercase leading-none mb-6"
          >
            CORE
            <br />
            <span className="text-shimmer">INVENTORY</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-sm text-zinc-400 leading-relaxed max-w-lg font-sans mb-10">
            Select high-performance recovery loadout cartridges. Formulated around clinical concentrations, pure structural isolates, and zero digestive stress compounds.
          </motion.p>

          {/* Quick macro comparison strip */}
          <motion.div
            variants={fadeUp}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl"
          >
            {[
              { label: "Max Protein", val: "24g / bar", color: "#00C2FF" },
              { label: "Max Creatine", val: "3000mg", color: "#00E5FF" },
              { label: "Net Calories", val: "200 kcal", color: "#F5F7FA" },
              { label: "Bloat Score", val: "0.0%", color: "#34D399" },
            ].map((s) => (
              <div
                key={s.label}
                className="p-4 rounded-xl border border-white/[0.04] bg-white/[0.01] space-y-1"
              >
                <span className="block text-[8px] font-mono text-zinc-500 uppercase tracking-widest">{s.label}</span>
                <span className="block text-sm font-black font-mono" style={{ color: s.color }}>{s.val}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ─── Filters ──────────────────────────────────────────────────────── */}
      <div className="px-6 sm:px-12 md:px-24 max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-3 border-b border-white/[0.04] pb-8 mb-12">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-5 py-2 text-[10px] font-mono font-bold tracking-widest rounded-lg border transition-all duration-300 cursor-pointer ${
                filter === f.key
                  ? "bg-[#00C2FF] text-black border-[#00C2FF] shadow-[0_0_20px_rgba(0,194,255,0.3)]"
                  : "bg-white/[0.01] text-zinc-400 border-white/[0.05] hover:text-white hover:border-white/[0.15]"
              }`}
            >
              {f.name}
            </button>
          ))}
        </div>
      </div>

      {/* ─── Products Grid ────────────────────────────────────────────────── */}
      <div className="px-6 sm:px-12 md:px-24 max-w-7xl mx-auto pb-24">
        <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <MagneticCard className="rounded-2xl border border-white/[0.04] bg-white/[0.01] hover:border-white/[0.1] hover:bg-white/[0.02] transition-colors duration-500 overflow-hidden group">

                  {/* Product Visual — Cinematic */}
                  <div
                    className="relative h-64 flex flex-col items-center justify-center overflow-hidden"
                    style={{ backgroundColor: `${product.color}05` }}
                  >
                    {/* Environment glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                      style={{ background: `radial-gradient(circle at 50% 60%, ${product.color}18, transparent 70%)` }}
                    />
                    {/* Scanline texture */}
                    <div className="absolute inset-0 bg-cyber-grid opacity-10" />

                    {/* Floating bar */}
                    <div className="float-animation relative z-10">
                      <div
                        className="w-52 h-16 rounded-2xl product-bar-mock border-2 flex flex-col items-center justify-center gap-1"
                        style={{
                          backgroundColor: `${product.color}18`,
                          borderColor: `${product.color}50`,
                          boxShadow: `0 0 50px ${product.color}20, 0 20px 40px rgba(0,0,0,0.4)`,
                        }}
                      >
                        <span className="font-mono text-[11px] font-black tracking-widest uppercase" style={{ color: product.color }}>
                          {product.name.split(" ").map((w) => w[0]).join("")} CARTRIDGE
                        </span>
                        <span className="font-mono text-[8px] text-zinc-400 uppercase">{product.flavorProfile}</span>
                      </div>
                      {/* Bar shadow/reflection */}
                      <div
                        className="w-52 h-4 rounded-2xl mt-1 opacity-10 blur-sm"
                        style={{ backgroundColor: product.color, transform: "scaleY(-0.4) scaleX(0.9)" }}
                      />
                    </div>

                    {/* Particle system */}
                    {[...Array(5)].map((_, j) => (
                      <div
                        key={j}
                        className="absolute rounded-full"
                        style={{
                          width: `${3 + j * 2}px`,
                          height: `${3 + j * 2}px`,
                          backgroundColor: product.color,
                          opacity: 0.2 + j * 0.05,
                          top: `${15 + j * 15}%`,
                          right: `${8 + j * 8}%`,
                          filter: "blur(1px)",
                          animation: `float-y ${3 + j * 0.7}s ease-in-out ${j * 0.4}s infinite`,
                        }}
                      />
                    ))}

                    {/* Rating badge */}
                    <div
                      className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 rounded-full border backdrop-blur-sm"
                      style={{ borderColor: `${product.color}30`, backgroundColor: `${product.color}10` }}
                    >
                      <Star className="w-2.5 h-2.5 fill-current" style={{ color: product.color }} />
                      <span className="text-[8px] font-mono font-bold" style={{ color: product.color }}>
                        {product.rating} ({product.reviewsCount})
                      </span>
                    </div>

                    {/* Top scan line */}
                    <div className="absolute top-0 left-0 right-0 h-[1px]"
                      style={{ background: `linear-gradient(90deg, transparent, ${product.color}40, transparent)` }}
                    />
                  </div>

                  {/* Card Content */}
                  <div className="p-8 space-y-5">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="text-[9px] font-mono font-bold tracking-widest uppercase block" style={{ color: product.color }}>
                          {product.scientificFocus}
                        </span>
                        <h3 className="text-xl font-black tracking-widest text-white uppercase mt-1">{product.name}</h3>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className="text-xl font-black font-mono text-white">₹{product.price}</span>
                        <span className="text-[8px] font-mono text-zinc-500 block">per bar</span>
                      </div>
                    </div>

                    <p className="text-xs text-zinc-400 leading-relaxed font-sans">{product.description}</p>

                    {/* Psychological badge */}
                    <div className="p-3 rounded-lg bg-white/[0.01] border border-white/[0.03]">
                      <span className="text-[8px] font-mono text-zinc-600 block mb-0.5 uppercase">IDENTITY PROFILE:</span>
                      <span className="text-[10px] font-mono text-zinc-300 font-bold">{product.psychologicalFocus}</span>
                    </div>

                    {/* Active ingredients — hover reveal */}
                    <div className="space-y-1.5 overflow-hidden">
                      <h4 className="text-[8px] font-mono font-bold text-zinc-500 uppercase tracking-widest">ACTIVE COMPOUNDS:</h4>
                      {product.nutrition.activeIngredients.slice(0, 3).map((ing) => (
                        <div key={ing.name} className="flex justify-between items-center text-[9px] font-mono border-b border-white/[0.02] pb-1">
                          <span className="text-zinc-300 font-bold">{ing.name}</span>
                          <span className="text-zinc-500">{ing.dose}</span>
                        </div>
                      ))}
                    </div>

                    {/* Macro grid */}
                    <div className="grid grid-cols-4 gap-2 border-t border-white/[0.04] pt-4 text-center font-mono text-[9px] text-zinc-500">
                      <div><span className="block text-white font-bold text-sm">{product.nutrition.protein}</span><span>PROTEIN</span></div>
                      <div><span className="block text-white font-bold text-sm">{product.nutrition.carbs}</span><span>CARBS</span></div>
                      <div><span className="block text-white font-bold text-sm">{product.nutrition.calories}</span><span>KCAL</span></div>
                      <div><span className="block font-bold text-sm" style={{ color: product.color }}>0%</span><span>BLOAT</span></div>
                    </div>

                    {/* CTA Row */}
                    <div className="flex flex-col gap-2 pt-2">
                      <div className="flex gap-2">
                        <Link
                          href={`/product/${product.id}`}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.06] text-[9px] font-bold tracking-widest text-zinc-300 transition-all uppercase"
                        >
                          <Eye className="w-3 h-3" />
                          EXAMINE
                        </Link>
                        <button
                          onClick={() => handleAdd(product)}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.06] text-[9px] font-bold tracking-widest text-zinc-300 transition-all cursor-pointer uppercase"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          {addedId === product.id ? "ADDED ✓" : "ADD CARGO"}
                        </button>
                      </div>
                      <button
                        onClick={() => handleBuyNow(product)}
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black tracking-widest text-black transition-all cursor-pointer uppercase"
                        style={{
                          backgroundColor: product.color,
                          boxShadow: `0 0 15px ${product.color}30`,
                        }}
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                        INSTANT BUY NOW
                      </button>
                    </div>
                  </div>
                </MagneticCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ─── Macro Comparison Table ─────────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="mt-20 p-8 sm:p-10 rounded-2xl border border-white/[0.04] bg-[#07070a] overflow-hidden"
        >
          <motion.h3 variants={fadeUp} className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest mb-8 text-center">
            SIDE-BY-SIDE FORMULATION COMPARISON
          </motion.h3>
          <div className="grid grid-cols-3 gap-4">
            {/* Labels column */}
            <div className="space-y-4 flex flex-col justify-end">
              {["Protein", "Creatine", "Collagen", "Calories", "Bloat Score"].map((label) => (
                <div key={label} className="h-10 flex items-center">
                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">{label}</span>
                </div>
              ))}
            </div>
            {/* Product columns */}
            {products.map((product) => (
              <div key={product.id} className="space-y-4">
                <div className="text-center mb-2">
                  <span className="text-[9px] font-mono font-bold uppercase" style={{ color: product.color }}>
                    {product.name}
                  </span>
                </div>
                {[
                  { val: product.nutrition.protein, max: 24, unit: "g" },
                  { val: product.id === "aesthetic-blueprint" ? "3000mg" : "—", max: 100, unit: "" },
                  { val: product.id === "collagen-glow" ? "5000mg" : "—", max: 100, unit: "" },
                  { val: `${product.nutrition.calories} kcal`, max: 200, unit: "" },
                  { val: "0%", max: 100, unit: "" },
                ].map((metric, i) => (
                  <div key={i} className="h-10 flex flex-col justify-center gap-1">
                    <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: metric.val === "—" ? "0%" : "70%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: metric.val === "—" ? "transparent" : product.color }}
                      />
                    </div>
                    <span className="text-[9px] font-mono text-center" style={{ color: metric.val === "—" ? "#3f3f46" : product.color }}>
                      {metric.val}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </motion.div>

        {/* ─── Subscription Promo ─────────────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="mt-12 p-8 sm:p-12 rounded-3xl border border-white/[0.04] bg-[#07070a] relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-8 scanlines"
        >
          <div className="absolute top-1/2 left-[-10%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(0,194,255,0.04)_0%,transparent_70%)] pointer-events-none" />

          <div className="space-y-4 max-w-xl relative z-10">
            <span className="section-label">SUBSCRIPTION DEPLOYMENTS</span>
            <h2 className="text-2xl font-black tracking-widest text-white uppercase">AUTOMATE YOUR BIOMASS SUPPLY</h2>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              Save up to 15% on regular deployments by building a custom monthly cartridge loader. Free biometric dashboard integration and zero commitment.
            </p>
          </div>

          <div className="relative z-10 flex-shrink-0">
            <Link
              href="/subscribe"
              className="inline-flex items-center gap-2 bg-[#00C2FF] hover:bg-[#00e5ff] text-black font-black text-xs tracking-widest px-8 py-4 rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(0,194,255,0.2)] uppercase cursor-pointer"
            >
              BUILD 12-PACK CARTRIDGE
              <Sparkles className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
