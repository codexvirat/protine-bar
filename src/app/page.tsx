"use client";

import Link from "next/link";
import { ArrowRight, Cpu, Activity, ShieldCheck, Sparkles, Plus, Dumbbell, Sparkle, Heart } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { useStore } from "@/lib/store";

export default function Home() {
  const products = useStore((state) => state.products);
  const addToCart = useStore((state) => state.addToCart);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.4 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 18 }
    }
  };

  return (
    <div className="flex flex-col w-full bg-[#050505] text-[#F5F7FA]">
      
      {/* SCENE 1 & 2: INTRO & ENGINEERED RECOVERY */}
      <section className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden pt-20 px-6 sm:px-12 md:px-24">
        {/* Cinematic Background Video Layer */}
        <div className="absolute inset-0 w-full h-full z-10 pointer-events-none overflow-hidden select-none">
          <video
            className="w-full h-full object-cover opacity-20 mix-blend-screen scale-105"
            src="/hero-video.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>

        {/* Text Interface overlay */}
        <div className="relative max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 h-[calc(100vh-80px)] items-center z-20 pointer-events-none gap-8">
          
          {/* Main Hero Header Info */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="flex flex-col gap-6 items-start text-left max-w-xl pointer-events-auto lg:col-span-7"
          >
            {/* Biotech tagline badge */}
            <motion.div 
              variants={itemVariants}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00C2FF]/10 border border-[#00C2FF]/20 text-[9px] tracking-widest text-[#00C2FF] font-mono uppercase"
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>AESTHETIX LABS // SPEC_VERSION: 2.0</span>
            </motion.div>

            {/* Headline */}
            <motion.h1 
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-7xl font-black tracking-widest text-white leading-[1.0] uppercase"
            >
              ENGINEERED <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-[#00C2FF] text-glow-cyan">
                RECOVERY
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p 
              variants={itemVariants}
              className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans max-w-md"
            >
              This is not a supplement. This is advanced performance nutrition technology. Calibrated to preserve muscle cell nitrogen, promote joint integrity, and drive aesthetic physique transformation.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap gap-4 mt-2"
            >
              <Link
                href="/shop"
                className="flex items-center gap-2 bg-[#00C2FF] hover:bg-[#00e5ff] text-black font-black text-xs tracking-widest px-8 py-4 rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(0,194,255,0.3)] hover:shadow-[0_0_30px_rgba(0,194,255,0.5)] uppercase cursor-pointer"
              >
                ACQUIRE TARGET
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#science"
                className="flex items-center gap-2 bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] text-white hover:text-white font-bold text-xs tracking-widest px-8 py-4 rounded-lg transition-all duration-300 uppercase"
              >
                EXAMINE DECK
              </a>
            </motion.div>
          </motion.div>

          {/* Right column: 3D bar video product showcase */}
          <div className="hidden lg:flex items-center justify-center h-full w-full pointer-events-auto lg:col-span-5">
            <div className="relative w-full max-w-sm aspect-square rounded-2xl border border-white/[0.04] bg-[#07070a]/60 backdrop-blur-md overflow-hidden scanlines shadow-2xl">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00C2FF]/30 to-transparent" />
              <video
                className="w-full h-full object-contain p-4 scale-105"
                src="/hero-video.mp4"
                autoPlay
                loop
                muted
                playsInline
              />
              <div className="absolute bottom-4 left-4 font-mono text-[8px] text-zinc-500 tracking-widest uppercase">
                3D_RENDER_STREAM: NOMINAL
              </div>
            </div>
          </div>
        </div>

        {/* Floating Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-500 font-mono text-[8px] tracking-widest z-20 pointer-events-none">
          <span>SCROLL TO UNWRAP</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-zinc-500 to-transparent animate-pulse" />
        </div>
      </section>

      {/* SCENE 3 & 4: MOLECULAR INGREDIENT EMERGENCE */}
      <section id="science" className="relative w-full py-32 bg-[#07070a] border-y border-white/[0.03] px-6 sm:px-12 md:px-24">
        {/* Ambient Grid Accent */}
        <div className="absolute inset-0 bg-cyber-grid opacity-15 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
            <span className="text-[9px] font-mono tracking-widest text-[#00C2FF] uppercase">SCENE 03 // ACTIVE COMPOUND EMERGENCE</span>
            <h2 className="text-3xl font-black tracking-widest text-white uppercase">THE BIOCELLULAR CORE</h2>
            <p className="text-xs text-zinc-400 leading-relaxed">
              As the outer wrapper seals break, clinical dosages of bioactive minerals and peptide systems release into cellular targets. We omit synthetic fillers in favor of pure response complexes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 font-mono text-xs">
            {/* Compound 1 */}
            <div className="p-6 rounded-2xl border border-white/[0.03] bg-white/[0.01] hover:border-[#00C2FF]/30 transition-all duration-500 space-y-4">
              <span className="text-[#00C2FF] font-bold block text-[10px]">01 // WHEY ISOLATE & PEPTIDES</span>
              <h3 className="text-white font-bold tracking-widest uppercase">BIOACTIVE PROTEIN</h3>
              <p className="text-[10px] text-zinc-500 leading-relaxed font-sans">
                High-absorption nitrogen retention isolate to rebuild skeletal micro-tears immediately post-strain without gastric delay.
              </p>
            </div>

            {/* Compound 2 */}
            <div className="p-6 rounded-2xl border border-white/[0.03] bg-white/[0.01] hover:border-[#00C2FF]/30 transition-all duration-500 space-y-4">
              <span className="text-[#00C2FF] font-bold block text-[10px]">02 // CREAPURE® MONOHYDRATE</span>
              <h3 className="text-white font-bold tracking-widest uppercase">CREATINE ATP</h3>
              <p className="text-[10px] text-zinc-500 leading-relaxed font-sans">
                Accelerates the resynthesis of adenosine triphosphate (ATP) in myofibrils to preserve maximal anaerobic strength potential.
              </p>
            </div>

            {/* Compound 3 */}
            <div className="p-6 rounded-2xl border border-white/[0.03] bg-white/[0.01] hover:border-[#00C2FF]/30 transition-all duration-500 space-y-4">
              <span className="text-[#00C2FF] font-bold block text-[10px]">03 // L-GLUTAMINE</span>
              <h3 className="text-white font-bold tracking-widest uppercase">GLUTAMINE REPAIR</h3>
              <p className="text-[10px] text-zinc-500 leading-relaxed font-sans">
                Crucial amino acid substrate supporting intestinal cell structures, mucosal barrier integrity, and glycogen replenishment.
              </p>
            </div>

            {/* Compound 4 */}
            <div className="p-6 rounded-2xl border border-white/[0.03] bg-white/[0.01] hover:border-[#00C2FF]/30 transition-all duration-500 space-y-4">
              <span className="text-[#00C2FF] font-bold block text-[10px]">04 // KSM-66® EXTRACT</span>
              <h3 className="text-white font-bold tracking-widest uppercase">ASHWAGANDHA CNS</h3>
              <p className="text-[10px] text-zinc-500 leading-relaxed font-sans">
                Downregulates central nervous arousal, lowers serum cortisol stress levels, and triggers parasympathetic recovery pathways.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SCENE 5: SELLING IDENTITY & TRANSFORMATION ENERGY */}
      <section className="relative w-full py-32 px-6 sm:px-12 md:px-24 overflow-hidden">
        {/* Pink Glow source */}
        <div className="absolute top-1/2 right-[-10%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(255,51,102,0.03)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-20 relative z-10">
          
          {/* Identity block 1: Aesthetic discipline */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00C2FF]/10 border border-[#00C2FF]/20 text-[9px] font-mono tracking-widest text-[#00C2FF] uppercase">
                <Dumbbell className="w-3.5 h-3.5" />
                <span>IDENTITY PROFILES // ANABOLIC DISCIPLINE</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-widest text-white uppercase leading-none">
                THE ELITE PHYSUQUE BLUEPRINT
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                Performance is not just about muscle; it is a manifestation of discipline, focus, and cellular optimization. The Aesthetic Blueprint represents high-performance recovery reengineered—enabling rapid nitrogen restoration and creatine load integration, so you can execute every protocol with maximum power.
              </p>
              <div className="font-mono text-[9px] text-[#00C2FF]">
                <span>KEY VERDICT: HIGHEST ANAEROBIC OUTPUT RESILIENCE</span>
              </div>
            </div>

            <div className="lg:col-span-5 p-8 rounded-2xl border border-white/[0.04] bg-[#07070a]/90 relative overflow-hidden scanlines">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00C2FF]/30 to-transparent" />
              <span className="font-mono text-[9px] text-zinc-500 block uppercase mb-4">ACTIVE METABOLIC RESPONSE</span>
              <div className="space-y-4 font-mono text-[10px]">
                <div className="flex justify-between">
                  <span>ANABOLIC NITROGEN:</span>
                  <span className="text-[#00C2FF] font-bold">OPTIMAL</span>
                </div>
                <div className="flex justify-between">
                  <span>CREATINE RE-SYNTHESIS:</span>
                  <span className="text-[#00C2FF] font-bold">2.4s RAPID</span>
                </div>
                <div className="flex justify-between">
                  <span>CORTISOL DAMPING:</span>
                  <span className="text-[#00C2FF] font-bold">-27.9% SPIKE</span>
                </div>
              </div>
            </div>
          </div>

          {/* Identity block 2: Beauty science */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-12">
            <div className="lg:col-span-5 lg:order-2 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF3366]/10 border border-[#FF3366]/20 text-[9px] font-mono tracking-widest text-[#FF3366] uppercase">
                <Sparkle className="w-3.5 h-3.5" />
                <span>IDENTITY PROFILES // RADIANCE SCIENCE</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-widest text-white uppercase leading-none">
                REPAIR & RADIANCE FUSION
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                Beauty is the mirror of physical integrity. Collagen Glow fuses collagen peptides with pure whey isolate to nourish joints, repair ligaments, and hydrate epidermal cells. Keep your structure functional and skin radiant while ashwagandha shields your system from stress-induced breakdown.
              </p>
              <div className="font-mono text-[9px] text-[#FF3366]">
                <span>KEY VERDICT: BIOMIMETIC TISSUE HYDRATION</span>
              </div>
            </div>

            <div className="lg:col-span-7 lg:order-1 p-8 rounded-2xl border border-white/[0.04] bg-[#07070a]/90 relative overflow-hidden scanlines">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF3366]/30 to-transparent" />
              <span className="font-mono text-[9px] text-zinc-500 block uppercase mb-4">CONNECTIVE MATRIX METRICS</span>
              <div className="space-y-4 font-mono text-[10px]">
                <div className="flex justify-between">
                  <span>COLLAGEN DEPOSITION:</span>
                  <span className="text-[#FF3366] font-bold">UPREGULATED</span>
                </div>
                <div className="flex justify-between">
                  <span>JOINT LUBRICATION SYNOVIAL:</span>
                  <span className="text-[#FF3366] font-bold">120mg DAILY</span>
                </div>
                <div className="flex justify-between">
                  <span>DERMAL HYDRATION COEFFICIENT:</span>
                  <span className="text-[#FF3366] font-bold">+18.4% RETENT</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SCENE 6: PRODUCT STACKS & ACQUISITION */}
      <section className="relative w-full py-32 bg-[#07070a] border-t border-white/[0.03] px-6 sm:px-12 md:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
            <span className="text-[9px] font-mono tracking-widest text-[#00C2FF] uppercase">SCENE 06 // PRODUCT STACKS & DEPLOYMENT</span>
            <h2 className="text-3xl font-black tracking-widest text-white uppercase">AESTHETIX NUTRITIONAL LOADOUT</h2>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Compare formulations. Select your cartridge system based on dynamic biometric requirements.
            </p>
          </div>

          {/* Stacks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {products.map((product) => (
              <div 
                key={product.id}
                className="group relative rounded-2xl border border-white/[0.04] bg-white/[0.01] overflow-hidden flex flex-col justify-between hover:border-white/[0.1] hover:bg-white/[0.02] transition-all duration-500 hover:shadow-[0_15px_40px_rgba(0,0,0,0.6)] scanlines p-8"
              >
                {/* Visual Block */}
                <div 
                  className="h-44 w-full relative flex items-center justify-center border border-white/[0.02] rounded-xl mb-6"
                  style={{ backgroundColor: `${product.color}07` }}
                >
                  <div 
                    className="absolute w-24 h-24 rounded-full filter blur-[35px] opacity-15 group-hover:opacity-30 transition-all duration-500"
                    style={{ backgroundColor: product.color }}
                  />
                  <div 
                    className="w-36 h-10 rounded-lg flex items-center justify-center border text-[10px] font-mono font-black select-none tracking-widest rotate-[-5deg] group-hover:rotate-0 transition-transform duration-500"
                    style={{
                      backgroundColor: `${product.color}22`,
                      borderColor: product.color,
                      color: product.color,
                      boxShadow: `0 0 15px ${product.color}11`
                    }}
                  >
                    {product.name.split(" ").map(w => w[0]).join("")} CARTRIDGE
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4 flex-1">
                  <div>
                    <span 
                      className="text-[9px] font-mono font-bold tracking-widest uppercase block"
                      style={{ color: product.color }}
                    >
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

                  {/* Nutritional macro labels */}
                  <div className="grid grid-cols-4 gap-2 border-t border-white/[0.04] pt-4 text-center font-mono text-[9px] text-zinc-500">
                    <div>
                      <span className="block text-white font-bold">{product.nutrition.protein}</span>
                      <span>PROTEIN</span>
                    </div>
                    <div>
                      <span className="block text-white font-bold">{product.nutrition.carbs}</span>
                      <span>CARBS</span>
                    </div>
                    <div>
                      <span className="block text-white font-bold">{product.nutrition.calories}</span>
                      <span>KCAL</span>
                    </div>
                    <div>
                      <span className="block text-white font-bold" style={{ color: product.color }}>${product.price}</span>
                      <span>RETAIL</span>
                    </div>
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
                    style={{ backgroundColor: product.color }}
                  >
                    ADD CARGO LOAD
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Subscription Package load banner */}
          <div className="mt-20 p-8 sm:p-12 rounded-3xl border border-white/[0.04] bg-[#030305] relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-8 scanlines">
            <div className="absolute top-1/2 left-[-10%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(0,194,255,0.03)_0%,transparent_70%)] pointer-events-none" />
            
            <div className="space-y-4 max-w-xl relative z-10">
              <span className="text-[9px] font-mono tracking-widest text-[#00C2FF] uppercase">SUBSCRIPTION PROTOCOLS</span>
              <h2 className="text-2xl font-black tracking-widest text-white uppercase">NEVER ALLOW RECOVERY GAP TO COLLAPSE</h2>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                Save 15% on regular deployments by building a custom 12-pack cartridge containing your balanced levels of Aesthetic Blueprint and Collagen Glow.
              </p>
            </div>

            <div className="relative z-10 flex-shrink-0">
              <Link
                href="/subscribe"
                className="inline-flex items-center gap-2 bg-[#00C2FF] hover:bg-[#00e5ff] text-black font-black text-xs tracking-widest px-8 py-4 rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(0,194,255,0.2)] uppercase cursor-pointer"
              >
                CONFIGURE CARTRIDGE SUBSCRIPTION
              </Link>
            </div>
          </div>

        </div>
      </section>
      
    </div>
  );
}
