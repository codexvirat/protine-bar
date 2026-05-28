"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import ProductCanvas from "@/components/product-canvas";
import { Plus, Minus, ShoppingBag, ChevronLeft, ShieldCheck, Star, ArrowRight } from "lucide-react";
import { motion, Variants } from "framer-motion";

const EASE = "easeOut" as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE } },
};
const slideLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
};

const NOT_INSIDE = [
  { label: "No Preservatives", icon: "✕" },
  { label: "No Artificial Flavours", icon: "✕" },
  { label: "No Sugar Crash", icon: "✕" },
  { label: "No Bloating Agents", icon: "✕" },
  { label: "No Synthetic Fillers", icon: "✕" },
  { label: "No FODMAP Triggers", icon: "✕" },
];

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const products = useStore((state) => state.products);
  const addToCart = useStore((state) => state.addToCart);

  const product = products.find((p) => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const router = useRouter();

  if (!product) {
    return (
      <div className="w-full min-h-screen bg-[#050505] text-[#F5F7FA] flex flex-col items-center justify-center gap-4 py-32">
        <span className="font-mono text-xs text-rose-500">ERROR: CORE_METADATA_MISSING</span>
        <h1 className="text-2xl font-bold uppercase tracking-widest">FORMULATION NOT FOUND</h1>
        <Link href="/shop" className="text-xs font-bold tracking-widest text-[#00C2FF] border border-[#00C2FF]/30 px-6 py-3 rounded-lg hover:bg-[#00C2FF]/5 uppercase">
          RETURN TO WAREHOUSE
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push("/checkout");
  };

  return (
    <div className="w-full bg-[#050505] text-[#F5F7FA]">

      {/* ─── Cinematic Background Glow ────────────────────────────────────── */}
      <div
        className="fixed top-0 inset-x-0 h-[700px] pointer-events-none z-0 opacity-15 transition-all duration-700"
        style={{ background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${product.color}, transparent)` }}
      />

      <div className="relative z-10 py-32 px-6 sm:px-12 md:px-24">
        <div className="max-w-7xl mx-auto">

          {/* Breadcrumb */}
          <Link href="/shop"
            className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-widest text-zinc-500 hover:text-white transition-colors mb-12 uppercase group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            BROWSE CATALOG
          </Link>

          {/* ─── Hero Grid ─────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">

            {/* Left — Canvas + telemetry */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={slideLeft}
              className="lg:col-span-6 flex flex-col gap-6"
            >
              {/* 3D Canvas */}
              <div
                className="h-[420px] sm:h-[520px] rounded-2xl border relative overflow-hidden"
                style={{ borderColor: `${product.color}20`, backgroundColor: `${product.color}05` }}
              >
                {/* Scan line top */}
                <div className="absolute top-0 left-0 right-0 h-[1px] z-10"
                  style={{ background: `linear-gradient(90deg, transparent, ${product.color}60, transparent)` }}
                />
                <ProductCanvas color={product.color} />

                {/* HUD overlays */}
                <div className="absolute top-4 left-4 font-mono text-[8px] text-zinc-500 tracking-widest flex flex-col gap-1 pointer-events-none">
                  <span style={{ color: product.color }}>FORMULA_CELL_MATRIX</span>
                  <span>RENDER: WEBGL_2.0</span>
                  <span>STATUS: ACTIVE</span>
                </div>
                <div className="absolute bottom-4 right-4 font-mono text-[8px] text-zinc-600 text-right pointer-events-none">
                  <span className="block">ROTATION: AUTORUN</span>
                  <span className="block" style={{ color: product.color }}>AESTHETIX CORE</span>
                </div>
              </div>

              {/* Telemetry panel */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "STABILITY", value: "100%", color: "#34D399" },
                  { label: "STRUCTURE", value: "BIO-MATRIX", color: "#F5F7FA" },
                  { label: "PHASE_CELLS", value: "ACTIVE", color: "#F5F7FA" },
                  { label: "ABSORB_COEF", value: "98.4%", color: product.color },
                ].map((t) => (
                  <div key={t.label} className="p-3 rounded-xl border border-white/[0.03] bg-white/[0.01] text-center">
                    <span className="block text-[7px] font-mono text-zinc-600 uppercase mb-1">{t.label}:</span>
                    <span className="text-[10px] font-mono font-bold" style={{ color: t.color }}>{t.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right — Product info */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="lg:col-span-6 space-y-8"
            >
              {/* Identity */}
              <motion.div variants={fadeUp} className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="section-label" style={{ color: product.color }}>
                    {product.scientificFocus}
                  </span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" style={{ color: product.color }} />
                    ))}
                    <span className="text-[9px] font-mono text-zinc-500 ml-1">({product.reviewsCount})</span>
                  </div>
                </div>
                <h1 className="text-4xl sm:text-5xl font-black tracking-widest text-white uppercase leading-none">
                  {product.name}
                </h1>
                <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{product.flavorProfile}</p>
              </motion.div>

              {/* Tagline */}
              <motion.p variants={fadeUp} className="text-sm text-zinc-400 leading-relaxed font-sans border-l-2 pl-4" style={{ borderColor: product.color }}>
                {product.description}
              </motion.p>

              {/* Psychological focus */}
              <motion.div variants={fadeUp} className="p-4 rounded-xl bg-white/[0.01] border border-white/[0.04]">
                <span className="text-[9px] font-mono text-zinc-600 block mb-1 uppercase">IDENTITY BLUEPRINT:</span>
                <span className="text-sm font-bold text-zinc-200" style={{ color: product.color }}>{product.psychologicalFocus}</span>
              </motion.div>

              {/* Benefits */}
              <motion.div variants={stagger} className="space-y-3">
                <h3 className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest">EXPECTED BIO-RESPONSE PROFILES</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.benefits.map((benefit, idx) => (
                    <motion.div
                      key={idx}
                      variants={scaleIn}
                      className="flex items-start gap-3 p-3 rounded-lg border border-white/[0.03] bg-white/[0.01]"
                    >
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 border"
                        style={{ borderColor: `${product.color}40`, backgroundColor: `${product.color}15` }}
                      >
                        <span className="text-[8px] font-bold" style={{ color: product.color }}>✓</span>
                      </div>
                      <span className="text-xs text-zinc-300 leading-relaxed">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Macro Metrics */}
              <motion.div variants={fadeUp} className="grid grid-cols-3 gap-3 border-y border-white/[0.04] py-6">
                {[
                  { label: "PROTEIN MASS", value: product.nutrition.protein, sub: "Cell Repair" },
                  { label: "ENERGY COEF.", value: `${product.nutrition.calories} kcal`, sub: "ATP Density" },
                  { label: "BLOAT COEF.", value: "0.0%", sub: "Gastric Compat", color: "#34D399" },
                ].map((m) => (
                  <div key={m.label} className="text-center p-4 rounded-xl bg-white/[0.01] border border-white/[0.03]">
                    <span className="block text-[7px] font-mono text-zinc-600 uppercase tracking-widest mb-1">{m.label}</span>
                    <span className="block text-lg font-black font-mono" style={{ color: m.color ?? product.color }}>{m.value}</span>
                    <span className="block text-[7px] font-mono text-zinc-600">{m.sub}</span>
                  </div>
                ))}
              </motion.div>

              {/* Purchase Control */}
              <motion.div
                variants={fadeUp}
                className="p-6 rounded-2xl border bg-[#07070a]/80 backdrop-blur-md"
                style={{ borderColor: `${product.color}20` }}
              >
                <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                  <div>
                    <span className="text-[9px] font-mono text-zinc-500 block uppercase mb-1">PER-UNIT COST</span>
                    <span className="text-3xl font-black font-mono text-white">₹{product.price.toFixed(2)}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center w-full sm:w-auto">
                    {/* Quantity & Add Cargo row */}
                    <div className="flex gap-4 items-center flex-1 sm:flex-none">
                      {/* Quantity */}
                      <div className="flex items-center border border-white/[0.06] bg-white/[0.02] rounded-xl p-1">
                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 text-zinc-400 hover:text-white transition-colors cursor-pointer">
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-sm font-mono text-white px-4 font-bold select-none">{quantity}</span>
                        <button onClick={() => setQuantity(quantity + 1)} className="p-2 text-zinc-400 hover:text-white transition-colors cursor-pointer">
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Add Cargo CTA */}
                      <button
                        onClick={handleAddToCart}
                        className="flex-1 flex items-center justify-center gap-2 font-black text-xs tracking-widest px-6 py-3.5 rounded-xl transition-all duration-300 cursor-pointer uppercase border border-white/[0.08] bg-white/[0.02] text-white hover:bg-white/[0.08]"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        {added ? "ADDED ✓" : "ADD CARGO"}
                      </button>
                    </div>

                    {/* Instant Buy Now CTA */}
                    <button
                      onClick={handleBuyNow}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-2 font-black text-xs tracking-widest px-8 py-3.5 rounded-xl transition-all duration-300 cursor-pointer uppercase text-black"
                      style={{
                        backgroundColor: product.color,
                        boxShadow: `0 0 25px ${product.color}40`,
                      }}
                    >
                      <ArrowRight className="w-4 h-4" />
                      INSTANT BUY NOW
                    </button>
                  </div>
                </div>

                {/* Trust row */}
                <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t border-white/[0.04]">
                  {[
                    "Free shipping over ₹999",
                    "30-day return protocol",
                    "Encrypted checkout",
                  ].map((t) => (
                    <div key={t} className="flex items-center gap-1.5 text-[9px] font-mono text-zinc-500">
                      <ShieldCheck className="w-3 h-3 text-emerald-500" />
                      {t}
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* ─── Ingredient Storytelling Section ────────────────────────── */}
          <section className="py-20 border-t border-white/[0.04]">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={stagger}
            >
              <motion.div variants={fadeUp} className="mb-16 space-y-4 max-w-2xl">
                <span className="section-label">MOLECULAR BREAKDOWN // BIOACTIVE STACK</span>
                <h2 className="text-3xl font-black tracking-widest text-white uppercase">FORMULA ARCHITECTURE</h2>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Every compound has a specific cellular target. Nothing is random. Each ingredient is precision-dosed for maximum bioavailability and synergistic effect.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {product.nutrition.activeIngredients.map((ing, idx) => (
                  <motion.div
                    key={idx}
                    variants={scaleIn}
                    className="ingredient-card p-6 rounded-2xl border border-white/[0.04] bg-white/[0.01] flex flex-col gap-5 group hover:border-white/[0.1] hover:bg-white/[0.02] transition-all duration-500"
                  >
                    {/* Index line */}
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[9px] font-bold" style={{ color: product.color }}>
                        0{idx + 1}
                      </span>
                      <div className="h-[1px] flex-1" style={{ background: `linear-gradient(90deg, ${product.color}50, transparent)` }} />
                    </div>

                    {/* Dosage — big number */}
                    <div>
                      <span
                        className="text-3xl font-black font-mono"
                        style={{ color: product.color }}
                      >
                        {ing.dose}
                      </span>
                      <span className="text-[9px] font-mono text-zinc-500 block mt-1">clinical dosage</span>
                    </div>

                    {/* Ingredient name */}
                    <div className="space-y-2 flex-1">
                      <h3
                        className="text-sm font-black tracking-widest uppercase"
                        style={{ color: product.color }}
                      >
                        {ing.name}
                      </h3>
                      <p className="text-[11px] text-zinc-500 leading-relaxed font-sans">
                        Precision micro-dosed bioactive agent incorporated to activate targeted cellular recovery and physical optimization.
                      </p>
                    </div>

                    {/* Purpose badge */}
                    <div className="flex items-center gap-2 text-[9px] font-mono tracking-wider text-zinc-500 border-t border-white/[0.03] pt-4">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                      <span>TARGET: {ing.purpose}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* ─── What's NOT Inside ────────────────────────────────────────── */}
          <section className="py-20 border-t border-white/[0.04]">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={stagger}
            >
              <motion.div variants={fadeUp} className="text-center max-w-xl mx-auto mb-16 space-y-4">
                <span className="section-label mx-auto">TRANSPARENCY PROTOCOL // OMISSION RECORD</span>
                <h2 className="text-3xl font-black tracking-widest text-white uppercase">WHAT&apos;S NOT INSIDE</h2>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Trust is built on what we leave out. Every excluded compound is a deliberate decision backed by research.
                </p>
              </motion.div>

              <motion.div
                variants={stagger}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto"
              >
                {NOT_INSIDE.map((item, idx) => (
                  <motion.div
                    key={idx}
                    variants={scaleIn}
                    className="flex items-center gap-4 p-5 rounded-xl border border-white/[0.04] bg-white/[0.01] hover:border-emerald-500/20 hover:bg-emerald-500/[0.02] transition-all duration-400 group"
                  >
                    <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500/15 transition-colors">
                      <span className="text-[11px] text-emerald-400 font-black">✕</span>
                    </div>
                    <span className="text-xs font-bold text-zinc-200 tracking-wider">{item.label}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </section>

          {/* ─── Subscribe Upsell ────────────────────────────────────────── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
            className="mt-8 p-8 sm:p-12 rounded-3xl border border-white/[0.04] bg-[#07070a] relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-8 scanlines"
            style={{ borderColor: `${product.color}15` }}
          >
            <div
              className="absolute top-1/2 left-[-10%] w-[400px] h-[400px] rounded-full pointer-events-none opacity-50"
              style={{ background: `radial-gradient(circle, ${product.color}06, transparent 70%)` }}
            />
            <div className="space-y-3 relative z-10 max-w-lg">
              <span className="section-label" style={{ color: product.color }}>SUBSCRIBE & SAVE — 15% OFF</span>
              <h3 className="text-xl font-black tracking-widest text-white uppercase">NEVER RUN OUT OF FUEL</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                Build a custom 12-pack subscription and lock in 15% savings on every deployment cycle.
              </p>
            </div>
            <Link
              href="/subscribe"
              className="inline-flex items-center gap-2 font-black text-xs tracking-widest px-8 py-4 rounded-xl transition-all duration-300 uppercase flex-shrink-0"
              style={{
                backgroundColor: product.color,
                color: "#050505",
                boxShadow: `0 0 20px ${product.color}33`,
              }}
            >
              CONFIGURE SUBSCRIPTION
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
