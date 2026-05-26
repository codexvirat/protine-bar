"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import ProductCanvas from "@/components/product-canvas";
import { Plus, Minus, ShoppingBag, ChevronLeft, ShieldCheck, Activity, Award, CheckCircle } from "lucide-react";

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const products = useStore((state) => state.products);
  const addToCart = useStore((state) => state.addToCart);

  const product = products.find((p) => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

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
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="w-full bg-[#050505] text-[#F5F7FA] py-32 px-6 sm:px-12 md:px-24">
      {/* Background radial glow matching product theme */}
      <div 
        className="absolute top-0 inset-x-0 h-[600px] pointer-events-none z-0 transition-all duration-500 opacity-20 filter blur-[120px]"
        style={{
          background: `radial-gradient(circle at 50% 20%, ${product.color}, transparent 60%)`
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Navigation Breadcrumb */}
        <Link 
          href="/shop" 
          className="inline-flex items-center gap-1 text-[10px] font-mono tracking-widest text-zinc-500 hover:text-white transition-colors mb-12 uppercase"
        >
          <ChevronLeft className="w-4 h-4" /> BROWSE CATALOG
        </Link>

        {/* Core Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Interactive 3D Canvas */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="h-[400px] sm:h-[500px] rounded-2xl border border-white/[0.04] bg-[#07070a]/60 backdrop-blur-md relative overflow-hidden scanlines">
              <ProductCanvas color={product.color} />
            </div>

            {/* Simulated telemetry panel */}
            <div className="p-6 rounded-xl border border-white/[0.03] bg-white/[0.01] grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-[9px] text-zinc-500 uppercase tracking-wider">
              <div>
                <span className="block text-zinc-600">STABILITY_VAL:</span>
                <span className="text-emerald-500 font-bold">100% NOMINAL</span>
              </div>
              <div>
                <span className="block text-zinc-600">STRUCTURE:</span>
                <span className="text-white font-bold">BIO-MATRIX</span>
              </div>
              <div>
                <span className="block text-zinc-600">PHASE_CELLS:</span>
                <span className="text-white font-bold">ACTIVE</span>
              </div>
              <div>
                <span className="block text-zinc-600">ABSORB_COEF:</span>
                <span className="text-[#00C2FF] font-bold">98.4% MAX</span>
              </div>
            </div>
          </div>

          {/* Right Column: Information & Controls */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <span 
                className="text-[10px] font-mono font-bold tracking-widest uppercase"
                style={{ color: product.color }}
              >
                {product.scientificFocus}
              </span>
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white uppercase leading-none">
                {product.name}
              </h1>
              <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest">{product.flavorProfile}</p>
            </div>

            <p className="text-sm text-zinc-400 leading-relaxed font-sans">
              {product.description}
            </p>

            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/[0.03] space-y-2 font-mono text-[9px] text-zinc-500">
              <span className="text-zinc-600 block uppercase">PSYCHOLOGICAL BLUEPRINT PROFILE:</span>
              <span className="text-zinc-300 font-bold block leading-relaxed">{product.psychologicalFocus}</span>
            </div>

            {/* Benefits ticks */}
            <div className="space-y-2 border-y border-white/[0.04] py-6">
              <h3 className="text-[10px] font-mono font-bold text-zinc-500 tracking-wider uppercase mb-3">EXPECTED BIO-RESPONSE PROFILES</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-zinc-300">
                {product.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex gap-2 items-start">
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Biomarkers efficacy score simulation meters */}
            <div className="space-y-4">
              <h3 className="text-[10px] font-mono font-bold text-zinc-500 tracking-wider uppercase">METABOLIC METRICS ANALYSIS</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-[9px] text-zinc-400">
                <div className="space-y-1.5 p-3 rounded-lg border border-white/[0.02] bg-white/[0.01]">
                  <span>PROTEIN MASS RATIO</span>
                  <div className="flex justify-between items-baseline">
                    <span className="text-white text-sm font-bold">{product.nutrition.protein}</span>
                    <span className="text-zinc-600">CELL REPAIR</span>
                  </div>
                </div>
                <div className="space-y-1.5 p-3 rounded-lg border border-white/[0.02] bg-white/[0.01]">
                  <span>ENERGY COEFFICIENT</span>
                  <div className="flex justify-between items-baseline">
                    <span className="text-white text-sm font-bold">{product.nutrition.calories} kcal</span>
                    <span className="text-zinc-600">ATP DENSITY</span>
                  </div>
                </div>
                <div className="space-y-1.5 p-3 rounded-lg border border-white/[0.02] bg-white/[0.01]">
                  <span>BLOAT COEFFICIENT</span>
                  <div className="flex justify-between items-baseline">
                    <span className="text-emerald-500 text-sm font-bold">0.0%</span>
                    <span className="text-zinc-600">GASTRIC COMPAT</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Controls Bar */}
            <div className="p-6 rounded-2xl border border-white/[0.04] bg-[#07070a]/60 backdrop-blur-md flex flex-col sm:flex-row justify-between items-center gap-6">
              <div>
                <span className="text-[10px] font-mono text-zinc-500 block uppercase">PER-UNIT LOADOUT COST</span>
                <span className="text-2xl font-mono text-white font-bold">${product.price.toFixed(2)}</span>
              </div>

              <div className="flex gap-4 items-center w-full sm:w-auto">
                <div className="flex items-center border border-white/[0.05] bg-[#020204]/60 rounded-lg p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-sm font-mono text-white px-4 select-none font-bold">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#00C2FF] hover:bg-[#00e5ff] text-black font-black text-xs tracking-widest px-8 py-3.5 rounded-lg transition-all duration-300 shadow-[0_0_15px_rgba(0,194,255,0.2)] cursor-pointer uppercase"
                >
                  <ShoppingBag className="w-4 h-4" />
                  {added ? "ADDED CARGO" : "REQUISITION LOAD"}
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Molecular breakdown details */}
        <div className="mt-20 space-y-8">
          <h2 className="text-xl font-black tracking-widest text-white uppercase border-b border-white/[0.04] pb-4">
            MOLECULAR ACTIVE BIO-AGENTS INJECTION
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {product.nutrition.activeIngredients.map((ing, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-2xl border border-white/[0.03] bg-white/[0.01] flex flex-col justify-between h-full hover:border-[#00C2FF]/20 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center font-mono">
                    <span 
                      className="text-xs font-bold uppercase tracking-wider"
                      style={{ color: product.color }}
                    >
                      {ing.name}
                    </span>
                    <span className="text-[10px] text-zinc-500 font-bold bg-white/[0.02] border border-white/[0.04] px-2.5 py-0.5 rounded-full">
                      {ing.dose}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
                    Precision micro-dosed bioactive agent incorporated into the formulation to activate targeted cellular recovery and physical optimization.
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-2 text-[9px] font-mono text-zinc-500 tracking-wider uppercase">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>TARGET RESPONSE: {ing.purpose}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
