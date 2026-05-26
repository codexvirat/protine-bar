"use client";

import { useStore } from "@/lib/store";
import { Plus, Minus, ShieldCheck, Sparkles, Box, Calendar, ArrowRight, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function Subscribe() {
  const products = useStore((state) => state.products);
  const subscription = useStore((state) => state.subscription);
  
  const updateSubBox = useStore((state) => state.updateSubscriptionBox);
  const setFrequency = useStore((state) => state.setSubscriptionFrequency);
  const activateSubscription = useStore((state) => state.activateSubscription);

  const [simulatedSuccess, setSimulatedSuccess] = useState(false);

  // Box calculations
  const items = subscription.items;
  const currentTotalBars = Object.values(items).reduce((sum, count) => sum + count, 0);
  const targetPackSize = 12;
  const isPackComplete = currentTotalBars === targetPackSize;
  const packProgressPercentage = Math.min(100, (currentTotalBars / targetPackSize) * 100);

  // Price calculations (Subscription pricing gets 15% discount off retail)
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

  const handleActivate = () => {
    if (!isPackComplete) return;
    activateSubscription();
    setSimulatedSuccess(true);
    setTimeout(() => {
      setSimulatedSuccess(false);
    }, 4000);
  };

  return (
    <div className="w-full bg-[#050505] text-[#F5F7FA] py-32 px-6 sm:px-12 md:px-24">
      {/* Background decoration */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-[#00c2ff]/5 to-transparent pointer-events-none z-0" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="space-y-4 max-w-xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00C2FF]/10 border border-[#00C2FF]/20 text-[10px] tracking-widest text-[#00C2FF] font-mono uppercase">
            <Box className="w-3.5 h-3.5" />
            <span>BIO-DEPLOYMENT PACKS // CONFIGURATOR</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white uppercase">
            SUBSCRIPTION BUILDER
          </h1>
          <p className="text-sm text-zinc-400 leading-relaxed font-sans">
            Build your custom 12-pack cartridge box. Select the exact biological targets to support your recovery goals, establish interval frequency, and unlock 15% system savings.
          </p>
        </div>

        {/* Builder Panel Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Formulations Incrementor list (Left Column) */}
          <div className="lg:col-span-8 space-y-4">
            <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest pl-2 block mb-2">ALLOCATE CARTRIDGE COMPOSITION</span>
            
            {products.map((product) => {
              const currentQty = items[product.id] || 0;
              return (
                <div 
                  key={product.id}
                  className="p-6 rounded-2xl border border-white/[0.04] bg-[#07070a]/90 hover:border-white/[0.08] transition-all flex flex-col sm:flex-row justify-between items-center gap-6 scanlines"
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    {/* Visual mini-bar block */}
                    <div 
                      className="w-12 h-12 rounded-lg flex-shrink-0 flex items-center justify-center border text-[10px] font-mono font-black"
                      style={{ 
                        backgroundColor: `${product.color}15`,
                        borderColor: product.color,
                        color: product.color
                      }}
                    >
                      {product.name.split(" ").map(w => w[0]).join("")}
                    </div>

                    <div>
                      <span 
                        className="text-[8px] font-mono font-bold tracking-widest uppercase block"
                        style={{ color: product.color }}
                      >
                        {product.scientificFocus}
                      </span>
                      <h3 className="text-sm font-bold tracking-widest text-white uppercase">{product.name}</h3>
                      <p className="text-[10px] font-mono text-zinc-500 uppercase">{product.flavorProfile}</p>
                    </div>
                  </div>

                  <div className="flex gap-6 items-center w-full sm:w-auto justify-between sm:justify-end">
                    <div className="text-right">
                      <span className="text-[9px] font-mono text-zinc-500 block uppercase">SUBSCRIPTION PRICE</span>
                      <span className="text-xs font-mono text-zinc-300 font-bold">${(product.price * discountFactor).toFixed(2)}</span>
                    </div>

                    <div className="flex items-center border border-white/[0.05] bg-[#020204]/60 rounded-lg p-1">
                      <button
                        onClick={() => updateSubBox(product.id, currentQty - 1)}
                        className="p-1.5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-mono text-white px-3 font-bold select-none w-6 text-center">
                        {currentQty}
                      </span>
                      <button
                        onClick={() => updateSubBox(product.id, currentQty + 1)}
                        className="p-1.5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                        disabled={currentTotalBars >= targetPackSize}
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Builder telemetry readout panel (Right Column) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-2xl border border-white/[0.04] bg-[#07070a]/90 shadow-2xl relative scanlines">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00C2FF]/30 to-transparent" />
              
              <div className="flex gap-2 items-center text-xs font-bold text-white font-mono uppercase tracking-widest mb-6">
                <span>CARTRIDGE DIAGNOSTICS</span>
              </div>

              {simulatedSuccess ? (
                <div className="py-12 flex flex-col items-center justify-center text-center gap-4 animate-in fade-in zoom-in-95 duration-300">
                  <CheckCircle2 className="w-12 h-12 text-[#00C2FF] animate-bounce" />
                  <div>
                    <h3 className="font-mono text-sm font-bold text-white uppercase">BIO-DEPLOYMENT ACTIVE</h3>
                    <p className="text-[10px] text-zinc-400 leading-relaxed font-sans mt-2 max-w-[200px] mx-auto">
                      Your custom cartridge subscription is initialized. View plan details under Account Console.
                    </p>
                  </div>
                  <Link
                    href="/account"
                    className="mt-2 text-[10px] font-mono font-bold tracking-widest text-[#00C2FF] hover:text-[#00e5ff] transition-colors border border-[#00C2FF]/20 px-5 py-2 rounded-lg"
                  >
                    ACCESS USER PROFILE
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Progress fill */}
                  <div className="space-y-2">
                    <div className="flex justify-between font-mono text-[9px] text-zinc-400">
                      <span>PACKAGE ALLOCATION:</span>
                      <span>{currentTotalBars} / {targetPackSize} BARS</span>
                    </div>
                    <div className="w-full h-2 bg-zinc-950 rounded-full overflow-hidden border border-white/[0.02]">
                      <div 
                        className="h-full bg-gradient-to-r from-[#00C2FF] to-cyan-300 rounded-full meter-fill"
                        style={{ width: `${packProgressPercentage}%` }}
                      />
                    </div>
                    {currentTotalBars < targetPackSize && (
                      <p className="text-[9px] font-mono text-amber-500 tracking-tighter">
                        ALLOCATE {targetPackSize - currentTotalBars} MORE BARS TO COMPLETE CARTRIDGE
                      </p>
                    )}
                    {currentTotalBars > targetPackSize && (
                      <p className="text-[9px] font-mono text-rose-500 tracking-tighter">
                        OVER QUANTITY BY {currentTotalBars - targetPackSize} BARS
                      </p>
                    )}
                    {isPackComplete && (
                      <p className="text-[9px] font-mono text-emerald-400 tracking-tighter flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-[#00C2FF]" /> CARTRIDGE STRUCTURE OPTIMAL
                      </p>
                    )}
                  </div>

                  {/* Interval Select */}
                  <div className="space-y-2 border-t border-white/[0.04] pt-4">
                    <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest block">DELIVERY FREQUENCY INTERVAL</span>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setFrequency("14")}
                        className={`py-3 rounded-lg border font-mono text-[10px] font-bold tracking-widest transition-all duration-300 cursor-pointer ${
                          subscription.frequency === "14"
                            ? "bg-[#00C2FF]/10 text-[#00C2FF] border-[#00C2FF]/40 shadow-[0_0_10px_rgba(0,194,255,0.1)]"
                            : "bg-white/[0.01] text-zinc-500 border-white/[0.03] hover:text-white"
                        }`}
                      >
                        <Calendar className="w-3.5 h-3.5 inline mr-1" /> EVERY 14 DAYS
                      </button>
                      <button
                        onClick={() => setFrequency("30")}
                        className={`py-3 rounded-lg border font-mono text-[10px] font-bold tracking-widest transition-all duration-300 cursor-pointer ${
                          subscription.frequency === "30"
                            ? "bg-[#00C2FF]/10 text-[#00C2FF] border-[#00C2FF]/40 shadow-[0_0_10px_rgba(0,194,255,0.1)]"
                            : "bg-white/[0.01] text-zinc-500 border-white/[0.03] hover:text-white"
                        }`}
                      >
                        <Calendar className="w-3.5 h-3.5 inline mr-1" /> EVERY 30 DAYS
                      </button>
                    </div>
                  </div>

                  {/* Cart totals */}
                  <div className="space-y-2 border-t border-white/[0.04] pt-4 text-xs font-mono text-zinc-400">
                    <div className="flex justify-between">
                      <span>PACKAGE VALUE:</span>
                      <span className="text-zinc-500">${(totalCost / discountFactor).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-cyan-400">
                      <span>BIOTECH SUBSCRIPTION SAVINGS (15%):</span>
                      <span>-${((totalCost / discountFactor) - totalCost).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>NANOTECH SHIPPING:</span>
                      <span className="text-[#00C2FF] text-[10px] font-bold">COMPLIMENTARY</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-white tracking-widest border-t border-white/[0.03] pt-3 mt-3">
                      <span>TOTAL SUBSCRIPTION DEPLOYMENT:</span>
                      <span className="text-[#00C2FF] text-glow-cyan font-mono">${totalCost.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <button
                    onClick={handleActivate}
                    disabled={!isPackComplete}
                    className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-black text-xs tracking-widest transition-all duration-300 uppercase ${
                      isPackComplete
                        ? "bg-[#00C2FF] hover:bg-[#00e5ff] text-black shadow-[0_0_15px_rgba(0,194,255,0.3)] cursor-pointer"
                        : "bg-zinc-800 text-zinc-500 border border-zinc-700/30 cursor-not-allowed"
                    }`}
                  >
                    ACTIVATE DEPLOYMENT SYSTEM
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-2 text-[8px] font-mono text-zinc-600 justify-center">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>ENCRYPTED PROTOCOL CONNECTED</span>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
