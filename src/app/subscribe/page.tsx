"use client";

import { useStore } from "@/lib/store";
import { Plus, Minus, ShieldCheck, Sparkles, Box, Calendar, ArrowRight, CheckCircle2, Target, Zap, Sparkle, Heart } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";

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
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE } },
};

const GOALS = [
  {
    key: "muscle",
    label: "MUSCLE",
    icon: Zap,
    desc: "Max anabolic nitrogen + creatine ATP",
    recommendation: { "aesthetic-blueprint": 8, "collagen-glow": 4 },
    color: "#00C2FF",
  },
  {
    key: "recovery",
    label: "RECOVERY",
    icon: Target,
    desc: "Balanced formula for full-body reset",
    recommendation: { "aesthetic-blueprint": 6, "collagen-glow": 6 },
    color: "#00E5FF",
  },
  {
    key: "glow",
    label: "GLOW",
    icon: Sparkle,
    desc: "Collagen + skin matrix + joint integrity",
    recommendation: { "aesthetic-blueprint": 4, "collagen-glow": 8 },
    color: "#FF3366",
  },
  {
    key: "wellness",
    label: "WELLNESS",
    icon: Heart,
    desc: "Holistic stress, gut & systemic balance",
    recommendation: { "aesthetic-blueprint": 5, "collagen-glow": 7 },
    color: "#34D399",
  },
];

export default function Subscribe() {
  const products = useStore((state) => state.products);
  const subscription = useStore((state) => state.subscription);

  const updateSubBox = useStore((state) => state.updateSubscriptionBox);
  const setFrequency = useStore((state) => state.setSubscriptionFrequency);
  const activateSubscription = useStore((state) => state.activateSubscription);

  const [simulatedSuccess, setSimulatedSuccess] = useState(false);
  const [activeGoal, setActiveGoal] = useState<string | null>(null);

  const items = subscription.items;
  const currentTotalBars = Object.values(items).reduce((sum, count) => sum + count, 0);
  const targetPackSize = 12;
  const isPackComplete = currentTotalBars === targetPackSize;
  const packProgressPercentage = Math.min(100, (currentTotalBars / targetPackSize) * 100);

  const discountFactor = 0.85;
  const calculateSubscriptionTotal = () => {
    let sum = 0;
    products.forEach((p) => {
      const count = items[p.id] || 0;
      sum += p.price * discountFactor * count;
    });
    return sum;
  };

  const totalCost = calculateSubscriptionTotal();

  const handleGoalSelect = (goalKey: string) => {
    const goal = GOALS.find((g) => g.key === goalKey);
    if (!goal) return;
    setActiveGoal(goalKey);
    // Apply recommendation
    Object.entries(goal.recommendation).forEach(([productId, count]) => {
      updateSubBox(productId, count);
    });
  };

  const handleActivate = () => {
    if (!isPackComplete) return;
    activateSubscription();
    setSimulatedSuccess(true);
    setTimeout(() => setSimulatedSuccess(false), 5000);
  };

  // Build slot visualizer
  const slots = Array.from({ length: targetPackSize }, (_, i) => {
    let filled = false;
    let color = "#1f2937";
    let productColor = "#1f2937";

    let count = 0;
    for (const p of products) {
      const qty = items[p.id] || 0;
      if (i < count + qty) {
        filled = true;
        productColor = p.color;
        break;
      }
      count += qty;
    }

    return { filled, productColor };
  });

  return (
    <div className="w-full bg-[#050505] text-[#F5F7FA] min-h-screen">

      {/* ─── Cinematic Header ─────────────────────────────────────────────── */}
      <section className="relative w-full pt-40 pb-24 px-6 sm:px-12 md:px-24 overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-[#00c2ff]/5 to-transparent pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(0,194,255,0.03),transparent_70%)] pointer-events-none" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="max-w-7xl mx-auto relative z-10"
        >
          <motion.div variants={fadeUp} className="section-label mb-6">
            <Box className="w-3 h-3" />
            BIO-DEPLOYMENT PACKS // CONFIGURATOR
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl font-black tracking-widest text-white uppercase leading-none mb-6">
            SUBSCRIPTION
            <br />
            <span className="text-shimmer">BUILDER</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-sm text-zinc-400 leading-relaxed max-w-lg font-sans">
            Build your custom 12-pack cartridge. Select goals, configure your stack, establish delivery frequency, and unlock 15% system savings.
          </motion.p>
        </motion.div>
      </section>

      {/* ─── Goal Selector ─────────────────────────────────────────────────── */}
      <section className="px-6 sm:px-12 md:px-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
          >
            <motion.h2 variants={fadeUp} className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest mb-6">
              STEP 01 — SELECT YOUR PRIMARY GOAL
            </motion.h2>

            <motion.div
              variants={stagger}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
            >
              {GOALS.map((goal) => {
                const Icon = goal.icon;
                const isActive = activeGoal === goal.key;
                return (
                  <motion.button
                    key={goal.key}
                    variants={scaleIn}
                    onClick={() => handleGoalSelect(goal.key)}
                    className={`relative p-5 rounded-2xl border text-left transition-all duration-400 cursor-pointer group ${
                      isActive
                        ? "border-opacity-60"
                        : "border-white/[0.05] bg-white/[0.01] hover:border-white/[0.1]"
                    }`}
                    style={
                      isActive
                        ? {
                            borderColor: `${goal.color}60`,
                            backgroundColor: `${goal.color}08`,
                            boxShadow: `0 0 30px ${goal.color}15`,
                          }
                        : {}
                    }
                  >
                    {isActive && (
                      <div className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: goal.color }}>
                        <span className="text-[8px] font-black text-black">✓</span>
                      </div>
                    )}
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 border transition-all duration-300"
                      style={{
                        borderColor: isActive ? `${goal.color}50` : "rgba(255,255,255,0.06)",
                        backgroundColor: isActive ? `${goal.color}15` : "rgba(255,255,255,0.02)",
                      }}
                    >
                      <Icon className="w-4 h-4" style={{ color: goal.color }} />
                    </div>
                    <span className="font-mono text-xs font-black tracking-widest uppercase block" style={{ color: isActive ? goal.color : "#F5F7FA" }}>
                      {goal.label}
                    </span>
                    <span className="text-[9px] font-mono text-zinc-500 block mt-1 leading-relaxed">{goal.desc}</span>
                    {isActive && (
                      <div className="mt-3 text-[8px] font-mono tracking-widest" style={{ color: goal.color }}>
                        ↳ STACK APPLIED AUTOMATICALLY
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── Builder Panel ──────────────────────────────────────────────────── */}
      <section className="px-6 sm:px-12 md:px-24 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Left — Formulation Selector */}
            <div className="lg:col-span-8 space-y-6">
              <h2 className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
                STEP 02 — ALLOCATE CARTRIDGE COMPOSITION
              </h2>

              {products.map((product) => {
                const currentQty = items[product.id] || 0;
                return (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="p-6 rounded-2xl border border-white/[0.04] bg-[#07070a]/90 hover:border-white/[0.08] transition-all group"
                    style={currentQty > 0 ? { borderColor: `${product.color}20` } : {}}
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-6">

                      {/* Product visual + info */}
                      <div className="flex items-center gap-5 w-full sm:w-auto">
                        {/* Mini bar visual */}
                        <div
                          className="w-14 h-14 rounded-xl flex-shrink-0 flex items-center justify-center border font-mono text-[10px] font-black product-bar-mock"
                          style={{
                            backgroundColor: `${product.color}15`,
                            borderColor: `${product.color}40`,
                            color: product.color,
                            boxShadow: currentQty > 0 ? `0 0 15px ${product.color}20` : "none",
                          }}
                        >
                          {product.name.split(" ").map((w) => w[0]).join("")}
                        </div>

                        <div className="flex-1">
                          <span className="text-[8px] font-mono font-bold tracking-widest uppercase block" style={{ color: product.color }}>
                            {product.scientificFocus}
                          </span>
                          <h3 className="text-sm font-black tracking-widest text-white uppercase">{product.name}</h3>
                          <p className="text-[9px] font-mono text-zinc-500 uppercase">{product.flavorProfile}</p>
                        </div>
                      </div>

                      {/* Pricing + Controls */}
                      <div className="flex gap-6 items-center w-full sm:w-auto justify-between sm:justify-end">
                        <div className="text-right">
                          <span className="text-[8px] font-mono text-zinc-500 block uppercase">Sub Price</span>
                          <span className="text-sm font-black font-mono" style={{ color: product.color }}>
                            ₹{(product.price * discountFactor).toFixed(2)}
                          </span>
                          <span className="text-[7px] font-mono text-zinc-600 block line-through">₹{product.price.toFixed(2)}</span>
                        </div>

                        <div className="flex items-center border border-white/[0.06] bg-[#020204]/60 rounded-xl p-1 gap-1">
                          <button
                            onClick={() => updateSubBox(product.id, currentQty - 1)}
                            className="p-2 text-zinc-400 hover:text-white transition-colors cursor-pointer rounded-lg hover:bg-white/[0.05]"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-sm font-mono font-black px-4 select-none min-w-[2rem] text-center" style={{ color: currentQty > 0 ? product.color : "#71717a" }}>
                            {currentQty}
                          </span>
                          <button
                            onClick={() => updateSubBox(product.id, currentQty + 1)}
                            className="p-2 text-zinc-400 hover:text-white transition-colors cursor-pointer rounded-lg hover:bg-white/[0.05]"
                            disabled={currentTotalBars >= targetPackSize}
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Per-product bar within slot allocation */}
                    {currentQty > 0 && (
                      <div className="mt-4 pt-4 border-t border-white/[0.04] flex items-center gap-3 font-mono text-[9px] text-zinc-500">
                        <div className="flex gap-1 flex-wrap">
                          {[...Array(currentQty)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ delay: i * 0.04 }}
                              className="w-3 h-5 rounded-sm"
                              style={{ backgroundColor: product.color, opacity: 0.7 }}
                            />
                          ))}
                        </div>
                        <span>{currentQty} × {product.name} allocated</span>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Right — Order Summary + Controls */}
            <div className="lg:col-span-4 space-y-5 sticky top-28">
              {/* Slot Visualizer */}
              <div className="p-6 rounded-2xl border border-white/[0.04] bg-[#07070a]/90">
                <h3 className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest mb-5">
                  STEP 03 — CARTRIDGE VISUALIZATION
                </h3>

                <div className="slot-grid mb-4">
                  {slots.map((slot, i) => (
                    <AnimatePresence key={i} mode="popLayout">
                      <motion.div
                        key={slot.filled ? "filled" : "empty"}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.02 }}
                        className="slot-item"
                        style={
                          slot.filled
                            ? {
                                backgroundColor: `${slot.productColor}30`,
                                borderColor: `${slot.productColor}60`,
                                boxShadow: `0 0 6px ${slot.productColor}20`,
                              }
                            : {}
                        }
                      />
                    </AnimatePresence>
                  ))}
                </div>

                {/* Progress bar */}
                <div className="space-y-2">
                  <div className="flex justify-between font-mono text-[9px] text-zinc-500">
                    <span>ALLOCATION:</span>
                    <span>{currentTotalBars} / {targetPackSize} BARS</span>
                  </div>
                  <div className="w-full h-2 bg-zinc-950 rounded-full overflow-hidden border border-white/[0.02]">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: "linear-gradient(90deg, #00C2FF, #00E5FF)" }}
                      animate={{ width: `${packProgressPercentage}%` }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                  {currentTotalBars < targetPackSize && (
                    <p className="text-[9px] font-mono text-amber-500">
                      ALLOCATE {targetPackSize - currentTotalBars} MORE BARS
                    </p>
                  )}
                  {currentTotalBars > targetPackSize && (
                    <p className="text-[9px] font-mono text-rose-500">
                      OVER CAPACITY BY {currentTotalBars - targetPackSize} BARS
                    </p>
                  )}
                  {isPackComplete && (
                    <p className="text-[9px] font-mono text-emerald-400 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      CARTRIDGE OPTIMAL — READY TO DEPLOY
                    </p>
                  )}
                </div>
              </div>

              {/* Order Details Panel */}
              <div className="p-6 rounded-2xl border border-white/[0.04] bg-[#07070a]/90 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00C2FF]/30 to-transparent" />

                <AnimatePresence mode="wait">
                  {simulatedSuccess ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="py-12 flex flex-col items-center text-center gap-5"
                    >
                      <div className="w-16 h-16 rounded-full bg-[#00C2FF]/10 border border-[#00C2FF]/30 flex items-center justify-center glow-pulse-cyan">
                        <CheckCircle2 className="w-8 h-8 text-[#00C2FF]" />
                      </div>
                      <div>
                        <h3 className="font-mono text-sm font-bold text-white uppercase">BIO-DEPLOYMENT ACTIVE</h3>
                        <p className="text-[10px] text-zinc-400 leading-relaxed mt-2 max-w-[200px] mx-auto">
                          Subscription initialized. View details under your Account Console.
                        </p>
                      </div>
                      <Link
                        href="/account"
                        className="text-[10px] font-mono font-bold tracking-widest text-[#00C2FF] hover:text-[#00e5ff] transition-colors border border-[#00C2FF]/20 px-6 py-2.5 rounded-xl"
                      >
                        ACCESS PROFILE
                      </Link>
                    </motion.div>
                  ) : (
                    <motion.div key="form" className="space-y-5">
                      {/* Delivery frequency */}
                      <div className="space-y-3">
                        <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest block">
                          STEP 04 — DELIVERY FREQUENCY
                        </span>
                        <div className="grid grid-cols-2 gap-3">
                          {["14", "30"].map((freq) => (
                            <button
                              key={freq}
                              onClick={() => setFrequency(freq as "14" | "30")}
                              className={`py-3 rounded-xl border font-mono text-[9px] font-bold tracking-widest transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5 ${
                                subscription.frequency === freq
                                  ? "bg-[#00C2FF]/10 text-[#00C2FF] border-[#00C2FF]/40 shadow-[0_0_12px_rgba(0,194,255,0.12)]"
                                  : "bg-white/[0.01] text-zinc-500 border-white/[0.03] hover:text-white"
                              }`}
                            >
                              <Calendar className="w-3 h-3" />
                              {freq} DAYS
                            </button>
                          ))}
                        </div>
                        <p className="text-[8px] font-mono text-zinc-600">
                          Next delivery: ~{subscription.frequency} days from order
                        </p>
                      </div>

                      {/* Pricing */}
                      <div className="space-y-2 border-t border-white/[0.04] pt-4 font-mono text-[9px]">
                        <div className="flex justify-between text-zinc-500">
                          <span>PACKAGE VALUE:</span>
                          <span>₹{(totalCost / discountFactor).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-[#00C2FF]">
                          <span>SUBSCRIPTION SAVINGS (15%):</span>
                          <span>-₹{((totalCost / discountFactor) - totalCost).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-zinc-500">
                          <span>SHIPPING:</span>
                          <span className="text-[#00C2FF] font-bold">COMPLIMENTARY</span>
                        </div>
                        <div className="flex justify-between text-sm font-black text-white border-t border-white/[0.04] pt-3 mt-3">
                          <span>TOTAL / CYCLE:</span>
                          <span className="text-[#00C2FF]">₹{totalCost.toFixed(2)}</span>
                        </div>
                      </div>

                      {/* CTA */}
                      <button
                        onClick={handleActivate}
                        disabled={!isPackComplete}
                        className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-black text-xs tracking-widest transition-all duration-300 uppercase ${
                          isPackComplete
                            ? "bg-[#00C2FF] hover:bg-[#00e5ff] text-black shadow-[0_0_20px_rgba(0,194,255,0.35)] cursor-pointer"
                            : "bg-zinc-800 text-zinc-500 border border-zinc-700/30 cursor-not-allowed"
                        }`}
                      >
                        ACTIVATE DEPLOYMENT SYSTEM
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <div className="flex items-center gap-2 text-[8px] font-mono text-zinc-600 justify-center">
                        <ShieldCheck className="w-3 h-3 text-emerald-500" />
                        ENCRYPTED PROTOCOL CONNECTED
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
