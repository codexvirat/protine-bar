"use client";

import { use, useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle, Box, ArrowRight, ShieldCheck, Calendar, Truck, Clock, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber") || "AEST-XXXXXX";
  const [etaDate, setEtaDate] = useState("");

  useEffect(() => {
    // Generate simulated delivery ETA (e.g. 2 days from now)
    const eta = new Date();
    eta.setDate(eta.getDate() + 2);
    setEtaDate(eta.toLocaleDateString("en-IN", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
  }, []);

  return (
    <div className="w-full bg-[#050505] text-[#F5F7FA] min-h-screen py-32 px-6 flex items-center justify-center relative">
      <div className="absolute inset-0 bg-cyber-grid opacity-10 pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,194,255,0.03)_0%,transparent_70%)] pointer-events-none z-0" />

      <div className="max-w-md w-full p-8 rounded-2xl border border-white/[0.04] bg-[#07070a]/90 text-center space-y-6 scanlines relative shadow-2xl z-10">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-emerald-500/30" />
        
        {/* Animated Check */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: [0.5, 1.1, 1], opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400 glow-pulse-cyan"
          style={{ boxShadow: "0 0 20px rgba(16,185,129,0.15)" }}
        >
          <CheckCircle className="w-8 h-8" />
        </motion.div>

        {/* Headline & Subhead */}
        <div className="space-y-2">
          <span className="font-mono text-[9px] text-emerald-400 font-bold uppercase tracking-widest block">
            TRANSACTION COMPLIANT // STACK COMPILING
          </span>
          <h2 className="text-xl font-black text-white uppercase tracking-widest pt-1 leading-tight">
            Your Performance Stack Is Confirmed.
          </h2>
          <p className="text-[10px] text-zinc-500 font-sans tracking-wide leading-relaxed pt-1">
            Order payload has been authorized. The lab is packaging your stack under clinical sterilization protocols.
          </p>
        </div>

        {/* Details card */}
        <div className="p-4 rounded-xl border border-white/[0.03] bg-[#020204]/80 text-left font-mono text-[10px] text-zinc-400 space-y-3">
          <div className="flex justify-between items-center border-b border-white/[0.02] pb-2">
            <span>ORDER REFERENCE:</span>
            <span className="text-white font-bold text-xs">{orderNumber}</span>
          </div>
          
          <div className="flex gap-3 items-start pt-1">
            <Truck className="w-4 h-4 text-[#00C2FF] flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-zinc-500 block uppercase">SHIPPING DISPATCH:</span>
              <span className="text-zinc-300 font-bold">Express Ground Logistics</span>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <Calendar className="w-4 h-4 text-[#00C2FF] flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-zinc-500 block uppercase">ESTIMATED ARRIVAL:</span>
              <span className="text-emerald-400 font-bold">{etaDate || "Pending Compilation"}</span>
            </div>
          </div>
        </div>

        {/* Dynamic dispatch logs */}
        <div className="p-3 bg-[#020204]/40 border border-white/[0.02] rounded-lg text-left text-[8px] font-mono text-zinc-500 uppercase tracking-wider space-y-1 select-none">
          <p>{`> DEPLOYMENT STAGE: SECURED`}</p>
          <p>{`> PAYMENT TRANSACTION: SUCCESSFUL`}</p>
          <p className="text-[#00C2FF] animate-pulse">{`> COMPILING SHIPMENT DISPATCH TIMELINE...`}</p>
        </div>

        {/* CTAs */}
        <div className="space-y-3 pt-2">
          <Link
            href="/account"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-[#00C2FF] hover:bg-[#00e5ff] text-black font-black text-xs tracking-widest transition-all duration-300 uppercase shadow-[0_0_15px_rgba(0,194,255,0.2)]"
          >
            TRACK DISPATCH ON DASHBOARD
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/shop"
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-white/[0.05] bg-white/[0.01] text-zinc-400 text-xs font-mono tracking-widest hover:text-white uppercase transition-colors"
          >
            RETURN TO WAREHOUSE
          </Link>
        </div>

        <div className="flex items-center gap-2 text-[8px] font-mono text-zinc-600 justify-center">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>AES-256 CONTEXT BLOCKCHAIN SEAL COMPLIANT</span>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={
      <div className="w-full bg-[#050505] text-[#F5F7FA] min-h-screen py-32 px-6 flex items-center justify-center relative">
        <div className="absolute inset-0 bg-cyber-grid opacity-10 pointer-events-none z-0" />
        <div className="text-center space-y-4">
          <RefreshCw className="w-8 h-8 text-[#00C2FF] animate-spin mx-auto" />
          <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest">LOADING CONTEXT LOGS...</p>
        </div>
      </div>
    }>
      <OrderSuccessContent />
    </Suspense>
  );
}
