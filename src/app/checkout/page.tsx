"use client";

import { useStore } from "@/lib/store";
import { useState } from "react";
import Link from "next/link";
import { Cpu, ShieldCheck, ArrowRight, CreditCard, ShoppingBag, CheckCircle } from "lucide-react";

export default function Checkout() {
  const cart = useStore((state) => state.cart);
  const user = useStore((state) => state.user);
  const createOrder = useStore((state) => state.createOrder);

  // Address form fields
  const [address, setAddress] = useState(user.address || "");
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [biomarkerToken, setBiomarkerToken] = useState("");
  const [cardNum, setCardNum] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  // Simulated state transitions
  const [processing, setProcessing] = useState(false);
  const [processStep, setProcessStep] = useState("");
  const [complete, setComplete] = useState(false);
  const [generatedOrderId, setGeneratedOrderId] = useState("");

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    
    setProcessing(true);
    
    // Simulate compilation steps
    const steps = [
      "ENCRYPTING PAYLOAD DATA...",
      "AUTHORIZING CREDIT TOKEN COMPLIANCE...",
      "LINKING BIOMETRIC CONSOLE TOKEN...",
      "TRANSMITTING CARGO CONTAINER DEPLOYMENT..."
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setProcessStep(step);
        if (idx === steps.length - 1) {
          setTimeout(() => {
            // Commit to Zustand
            createOrder(address);
            setProcessing(false);
            setComplete(true);
            setGeneratedOrderId(`AST-${Math.floor(1000 + Math.random() * 9000)}`);
          }, 1200);
        }
      }, idx * 1000);
    });
  };

  if (complete) {
    return (
      <div className="w-full min-h-screen bg-[#050505] text-[#F5F7FA] flex flex-col items-center justify-center py-32 px-6">
        <div className="max-w-md w-full p-8 rounded-2xl border border-white/[0.04] bg-[#07070a]/90 text-center space-y-6 scanlines relative">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-[#00C2FF]/30" />
          <CheckCircle className="w-12 h-12 text-[#00C2FF] mx-auto animate-bounce" />
          <div className="space-y-2">
            <h2 className="text-xl font-mono font-black text-white uppercase tracking-widest">DEPLOYMENT AUTHORIZED</h2>
            <span className="font-mono text-xs text-[#00C2FF] font-bold block">ORDER_REF: {generatedOrderId}</span>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans pt-2">
              Your cargo loadout has been scheduled for nano-assembly and priority drone delivery. You can monitor the telemetry status inside your account dashboard.
            </p>
          </div>

          <div className="pt-4 space-y-3">
            <Link
              href="/account"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-[#00C2FF] text-black font-black text-xs tracking-widest transition-all duration-300 hover:bg-[#00e5ff] uppercase"
            >
              ACCESS ACCOUNT DASHBOARD
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/shop"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg border border-white/[0.05] bg-white/[0.02] text-zinc-400 text-xs font-mono tracking-widest hover:text-white uppercase"
            >
              RETURN TO WAREHOUSE
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#050505] text-[#F5F7FA] py-32 px-6 sm:px-12 md:px-24">
      <div className="absolute inset-0 bg-cyber-grid opacity-10 pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="space-y-4 max-w-xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00C2FF]/10 border border-[#00C2FF]/20 text-[10px] tracking-widest text-[#00C2FF] font-mono uppercase">
            <CreditCard className="w-3.5 h-3.5" />
            <span>TRANSACTION TERMINAL // ACQUISITION</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white uppercase">
            BIO-CHECKOUT
          </h1>
          <p className="text-sm text-zinc-400 leading-relaxed font-sans">
            Finalize cargo acquisition. Link optional biomarker API tokens to load personalized intake instructions directly to your device.
          </p>
        </div>

        {processing ? (
          <div className="min-h-[400px] flex flex-col items-center justify-center text-center gap-6">
            <Cpu className="w-12 h-12 text-[#00C2FF] animate-spin" />
            <div className="space-y-2 font-mono">
              <h3 className="text-sm font-bold text-white uppercase tracking-widest">COMPILING PAYLOAD...</h3>
              <p className="text-[10px] text-zinc-500 tracking-tighter uppercase">{processStep}</p>
            </div>
            {/* Visual compiling logs simulator */}
            <div className="max-w-xs w-full bg-[#020204]/90 p-4 border border-white/[0.03] rounded-lg text-left text-[8px] font-mono text-zinc-600 uppercase tracking-wider space-y-1 select-none">
              <p>{`> LOAD_CONTAINER: CONFIG`}</p>
              <p>{`> DEPLOY_PORT: COMPATIBLE`}</p>
              <p>{`> NANO_ROUTING: ACTIVE`}</p>
              <p className="text-cyan-400 animate-pulse">{`> COMPILING BIOMETRIC LINK...`}</p>
            </div>
          </div>
        ) : cart.length === 0 ? (
          <div className="min-h-[300px] flex flex-col items-center justify-center text-center gap-4">
            <ShoppingBag className="w-12 h-12 text-zinc-600" />
            <div>
              <h3 className="font-mono text-sm font-bold text-zinc-300 uppercase">NO ACTIVE LOAD DETECTED</h3>
              <p className="text-xs text-zinc-500 font-sans mt-2 max-w-[240px] mx-auto">
                Your cart cargo loadout is empty. Secure recovery formulations before proceeding.
              </p>
            </div>
            <Link
              href="/shop"
              className="mt-4 text-xs font-bold tracking-widest text-[#00C2FF] border border-[#00C2FF]/30 px-6 py-3 rounded-lg hover:bg-[#00C2FF]/5"
            >
              ACCESS LAB STORE
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Form Fields (Left Column) */}
            <form onSubmit={handleSubmit} className="lg:col-span-8 space-y-8 font-mono text-xs text-zinc-400">
              
              {/* Shipping section */}
              <div className="space-y-4">
                <span className="text-[#00C2FF] font-bold block uppercase border-b border-white/[0.04] pb-2 tracking-widest">01 // CARGO DELIVERY ADDR</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-zinc-500 block">RECIPIENT FULL NAME:</label>
                    <input
                      type="text"
                      required
                      placeholder="Alexis Stark"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#07070a]/80 border border-white/[0.05] p-3 rounded-lg text-white outline-none focus:border-[#00C2FF]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-zinc-500 block">COMMUNICATION EMAIL:</label>
                    <input
                      type="email"
                      required
                      placeholder="alex@stark.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#07070a]/80 border border-white/[0.05] p-3 rounded-lg text-white outline-none focus:border-[#00C2FF]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-zinc-500 block">SHIPPING PHYSICAL ADDRESS:</label>
                  <input
                    type="text"
                    required
                    placeholder="10880 Wilshire Blvd, Los Angeles, CA 90024"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-[#07070a]/80 border border-white/[0.05] p-3 rounded-lg text-white outline-none focus:border-[#00C2FF]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-zinc-500 block">OPTIONAL BIOMARKER CONSOLE TOKEN (API):</label>
                  <input
                    type="text"
                    placeholder="TOKEN_KEY: e.g. AESTHETIX-BIO-X901"
                    value={biomarkerToken}
                    onChange={(e) => setBiomarkerToken(e.target.value)}
                    className="w-full bg-[#07070a]/80 border border-white/[0.05] p-3 rounded-lg text-white outline-none focus:border-[#00C2FF]"
                  />
                </div>
              </div>

              {/* Payment Section */}
              <div className="space-y-4">
                <span className="text-[#00C2FF] font-bold block uppercase border-b border-white/[0.04] pb-2 tracking-widest">02 // TRANSACTION CARD TOKEN</span>
                <div className="space-y-1">
                  <label className="text-zinc-500 block">CREDIT CARTRIDGE NUMBER:</label>
                  <input
                    type="text"
                    required
                    placeholder="xxxx xxxx xxxx xxxx"
                    value={cardNum}
                    onChange={(e) => setCardNum(e.target.value)}
                    className="w-full bg-[#07070a]/80 border border-white/[0.05] p-3 rounded-lg text-white outline-none focus:border-[#00C2FF]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-zinc-500 block">EXPIRATION CYCLE:</label>
                    <input
                      type="text"
                      required
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full bg-[#07070a]/80 border border-white/[0.05] p-3 rounded-lg text-white outline-none focus:border-[#00C2FF]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-zinc-500 block">CVV CODE:</label>
                    <input
                      type="text"
                      required
                      placeholder="xxx"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      className="w-full bg-[#07070a]/80 border border-white/[0.05] p-3 rounded-lg text-white outline-none focus:border-[#00C2FF]"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-lg bg-white hover:bg-[#00C2FF] text-black font-black text-xs tracking-widest transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(0,194,255,0.3)] cursor-pointer uppercase"
                >
                  AUTHORIZE DISPATCH CONTAINER
                </button>
              </div>

            </form>

            {/* Cart summary (Right Column) */}
            <div className="lg:col-span-4 p-6 rounded-2xl border border-white/[0.04] bg-[#07070a]/90 relative overflow-hidden scanlines shadow-2xl space-y-6">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00C2FF]/30 to-transparent" />
              <span className="font-mono text-xs text-white tracking-widest block uppercase border-b border-white/[0.04] pb-2">CARGO CARRIAGE SUMMARY</span>
              
              <div className="space-y-4 max-h-60 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex justify-between items-center gap-3 text-xs font-mono">
                    <div>
                      <span className="text-white uppercase font-bold block">{item.product.name}</span>
                      <span className="text-[10px] text-zinc-500 uppercase">{item.quantity} units x ${item.product.price.toFixed(2)}</span>
                    </div>
                    <span className="text-white font-bold">${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 border-t border-white/[0.04] pt-4 text-[10px] font-mono text-zinc-500">
                <div className="flex justify-between">
                  <span>CARGO VALUE:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>DRONE ROUTING:</span>
                  <span className="text-[#00C2FF] font-bold">COMPLIMENTARY</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white tracking-widest border-t border-white/[0.03] pt-3 mt-3">
                  <span>NET TOTAL COST:</span>
                  <span className="text-[#00C2FF] text-glow-cyan font-mono">${subtotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[8px] font-mono text-zinc-600 justify-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>SECURE CRYPTO CHANNELS ACTIVE</span>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
