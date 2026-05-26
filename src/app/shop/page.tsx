"use client";

import { useState } from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { Sparkles, ShoppingBag, Eye, Cpu, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type FilterCategory = "all" | "anabolic" | "glow";

export default function Shop() {
  const products = useStore((state) => state.products);
  const addToCart = useStore((state) => state.addToCart);
  const [filter, setFilter] = useState<FilterCategory>("all");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const filters: { name: string; key: FilterCategory }[] = [
    { name: "ALL DEPLOYMENTS", key: "all" },
    { name: "ANABOLIC & CNS (PRODUCT 1)", key: "anabolic" },
    { name: "GLOW & WELLNESS (PRODUCT 2)", key: "glow" },
  ];

  const filteredProducts = products.filter((product) => {
    if (filter === "all") return true;
    if (filter === "anabolic" && product.id === "aesthetic-blueprint") return true;
    if (filter === "glow" && product.id === "collagen-glow") return true;
    return false;
  });

  return (
    <div className="w-full bg-[#050505] text-[#F5F7FA] py-32 px-6 sm:px-12 md:px-24">
      {/* Background decoration */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-[#00c2ff]/5 to-transparent pointer-events-none z-0" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="space-y-4 max-w-xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00C2FF]/10 border border-[#00C2FF]/20 text-[10px] tracking-widest text-[#00C2FF] font-mono uppercase">
            <Cpu className="w-3.5 h-3.5" />
            <span>INVENTORY CATALOG // SYSTEM_ACCESS</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white uppercase">
            CORE INVENTORY
          </h1>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Select high-performance recovery loadout cartridges. Formulated around clinical concentrations, pure structural isolates, and zero digestive stress compounds.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 border-b border-white/[0.04] pb-8 mb-12">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-2 text-[10px] font-mono font-bold tracking-widest rounded-lg border transition-all duration-300 cursor-pointer ${
                filter === f.key
                  ? "bg-[#00C2FF] text-black border-[#00C2FF] shadow-[0_0_15px_rgba(0,194,255,0.25)]"
                  : "bg-white/[0.01] text-zinc-400 border-white/[0.05] hover:text-white hover:border-white/[0.15]"
              }`}
            >
              {f.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                key={product.id}
                onMouseEnter={() => setHoveredCard(product.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative rounded-2xl border border-white/[0.04] bg-white/[0.01] hover:border-white/[0.1] hover:bg-white/[0.02] p-8 flex flex-col gap-6 transition-all duration-500 hover:shadow-[0_15px_40px_rgba(0,0,0,0.6)] scanlines"
              >
                {/* Visual Block */}
                <div 
                  className="w-full h-48 rounded-xl relative flex items-center justify-center border border-white/[0.02] flex-shrink-0"
                  style={{ backgroundColor: `${product.color}05` }}
                >
                  <div 
                    className="absolute w-24 h-24 rounded-full filter blur-[40px] opacity-10 group-hover:opacity-25 transition-all duration-500"
                    style={{ backgroundColor: product.color }}
                  />

                  <div 
                    className="w-36 h-10 rounded-lg flex items-center justify-center border text-[10px] font-mono font-black select-none tracking-widest rotate-[-5deg] group-hover:rotate-0 transition-transform duration-500"
                    style={{
                      backgroundColor: `${product.color}22`,
                      borderColor: product.color,
                      color: product.color,
                      boxShadow: `0 0 12px ${product.color}11`
                    }}
                  >
                    {product.name.split(" ").map(w => w[0]).join("")} CARTRIDGE
                  </div>
                </div>

                {/* Info block */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <span 
                          className="text-[9px] font-mono font-bold tracking-widest uppercase"
                          style={{ color: product.color }}
                        >
                          {product.scientificFocus}
                        </span>
                        <span className="text-sm font-mono font-bold text-white">${product.price.toFixed(2)}</span>
                      </div>
                      <h3 className="text-xl font-black tracking-widest text-white uppercase mt-1">{product.name}</h3>
                      <p className="text-[9px] font-mono text-zinc-500 uppercase">{product.flavorProfile}</p>
                    </div>

                    <p className="text-xs text-zinc-400 leading-relaxed font-sans">{product.description}</p>

                    <div className="p-3 rounded-lg bg-white/[0.01] border border-white/[0.03] space-y-1 text-[9px] font-mono text-zinc-500">
                      <span className="text-zinc-600 block mb-0.5">PSYCHOLOGICAL VERDICT:</span>
                      <span className="text-zinc-300 font-bold block">{product.psychologicalFocus}</span>
                    </div>

                    {/* Active Biotech Molecules list */}
                    <div className="space-y-2">
                      <h4 className="text-[9px] font-mono font-bold text-zinc-500 tracking-wider flex items-center gap-1 uppercase">
                        <Info className="w-3 h-3 text-[#00C2FF]" /> ACTIVE_BIO_AGENTS_INJECT:
                      </h4>
                      <div className="grid grid-cols-1 gap-1.5 font-mono text-[9px] text-zinc-400">
                        {product.nutrition.activeIngredients.map((ing) => (
                          <div key={ing.name} className="flex justify-between border-b border-white/[0.02] pb-1">
                            <span className="text-zinc-300 font-bold">{ing.name}</span>
                            <span>{ing.dose} // {ing.purpose}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex gap-3 border-t border-white/[0.04] pt-6">
                    <Link
                      href={`/product/${product.id}`}
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.06] text-xs font-bold tracking-widest text-white transition-all uppercase"
                    >
                      <Eye className="w-4 h-4" /> EXAMINE SPECS
                    </Link>
                    <button
                      onClick={() => addToCart(product, 1)}
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-xs font-black tracking-widest text-black transition-all hover:opacity-90 cursor-pointer uppercase"
                      style={{ 
                        backgroundColor: product.color,
                        boxShadow: hoveredCard === product.id ? `0 0 15px ${product.color}44` : "none"
                      }}
                    >
                      <ShoppingBag className="w-4 h-4" /> ADD CARGO LOAD
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Subscription Promo Banner */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl border border-white/[0.04] bg-[#07070a] relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-8 scanlines max-w-4xl mx-auto">
          {/* Cyan Glow source */}
          <div className="absolute top-1/2 left-[-10%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(0,194,255,0.04)_0%,transparent_70%)] pointer-events-none" />
          
          <div className="space-y-4 max-w-xl relative z-10">
            <span className="text-[9px] font-mono tracking-widest text-[#00C2FF] uppercase">SUBSCRIPTION DEPLOYMENTS</span>
            <h2 className="text-2xl font-black tracking-widest text-white uppercase">AUTOMATE BIOMASS SUPPLY</h2>
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
        </div>

      </div>
    </div>
  );
}
