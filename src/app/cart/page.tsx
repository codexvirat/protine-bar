"use client";

import { useStore } from "@/lib/store";
import Link from "next/link";
import { Trash2, Plus, Minus, ArrowRight, Sparkles, Box, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function CartPage() {
  const cart = useStore((state) => state.cart);
  const user = useStore((state) => state.user);
  const updateQuantity = useStore((state) => state.updateCartQuantity);
  const removeItem = useStore((state) => state.removeFromCart);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="w-full bg-[#050505] text-[#F5F7FA] min-h-screen py-32 px-6 sm:px-12 md:px-24 relative">
      <div className="absolute inset-0 bg-cyber-grid opacity-10 pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(0,194,255,0.03)_0%,transparent_70%)] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        {/* Header */}
        <div className="space-y-4 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00C2FF]/10 border border-[#00C2FF]/20 text-[10px] tracking-widest text-[#00C2FF] font-mono uppercase">
            <Box className="w-3.5 h-3.5" />
            <span>CARGO CART TERMINAL // WAREHOUSE</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white uppercase">
            SHOPPING CART
          </h1>
          <p className="text-sm text-zinc-400 leading-relaxed font-sans">
            Review your active formulation loadout. Select checkout pathways or integrate subscription cycles for regular performance restoratives.
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="min-h-[350px] flex flex-col items-center justify-center text-center gap-6 border border-white/[0.03] bg-white/[0.01] rounded-2xl p-12 max-w-md mx-auto shadow-2xl">
            <Box className="w-12 h-12 text-zinc-700 animate-pulse" />
            <div className="space-y-2">
              <h3 className="font-mono text-sm font-bold text-zinc-300 uppercase">NO ACTIVE LOAD DETECTED</h3>
              <p className="text-xs text-zinc-500 font-sans leading-relaxed max-w-[280px] mx-auto">
                Your cart cargo loadout is empty. Allocate recovery formulas from the shop to build your recovery stack.
              </p>
            </div>
            <Link
              href="/shop"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg border border-[#00C2FF]/30 text-[#00C2FF] font-black text-xs tracking-widest hover:bg-[#00C2FF]/5 transition-all uppercase"
            >
              ACCESS LAB STORE
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Side: Cart Items */}
            <div className="lg:col-span-8 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="p-5 rounded-2xl border border-white/[0.03] bg-white/[0.01] hover:border-white/[0.06] transition-all flex flex-col sm:flex-row items-center gap-6"
                >
                  {/* Square color block visual */}
                  <div
                    className="w-20 h-20 rounded-xl flex-shrink-0 flex items-center justify-center border font-mono text-xs font-black select-none"
                    style={{
                      backgroundColor: `${item.product.color}22`,
                      borderColor: `${item.product.color}40`,
                      boxShadow: `0 0 15px ${item.product.color}15`
                    }}
                  >
                    <span style={{ color: item.product.color }}>
                      {item.product.name.split(" ").map((w) => w[0]).join("")}
                    </span>
                  </div>

                  {/* Information block */}
                  <div className="flex-1 text-center sm:text-left min-w-0 space-y-1">
                    <span className="text-[8px] font-mono font-bold tracking-widest uppercase block" style={{ color: item.product.color }}>
                      {item.product.category} Formulation
                    </span>
                    <h3 className="text-lg font-black tracking-widest text-white uppercase truncate">
                      {item.product.name}
                    </h3>
                    <p className="text-xs font-mono text-zinc-500 uppercase">
                      FLAVOR: {item.product.flavorProfile}
                    </p>
                  </div>

                  {/* Quantity selector and price */}
                  <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto justify-between sm:justify-end border-t border-white/[0.03] sm:border-t-0 pt-4 sm:pt-0">
                    {/* Unit price details */}
                    <div className="text-center sm:text-right font-mono">
                      <span className="text-zinc-500 block text-[9px]">UNIT RATE</span>
                      <span className="text-zinc-300 font-bold">₹{item.product.price.toFixed(2)}</span>
                    </div>

                    {/* Quantity Adjustment */}
                    <div className="flex items-center border border-white/[0.06] bg-[#020204]/60 rounded-xl p-1 gap-1">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-2 text-zinc-400 hover:text-white transition-colors cursor-pointer rounded-lg hover:bg-white/[0.05]"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-sm font-mono font-black px-4 select-none min-w-[1.5rem] text-center text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-2 text-zinc-400 hover:text-white transition-colors cursor-pointer rounded-lg hover:bg-white/[0.05]"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Total item price */}
                    <div className="text-center sm:text-right font-mono min-w-[70px]">
                      <span className="text-zinc-500 block text-[9px]">SUBTOTAL</span>
                      <span className="text-white font-bold text-sm">
                        ₹{(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>

                    {/* Remove button */}
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="p-2 rounded-xl text-zinc-500 hover:text-rose-500 hover:bg-rose-500/5 transition-all cursor-pointer"
                      title="Remove Formulation"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Side: Billing panel */}
            <div className="lg:col-span-4 space-y-6">
              {/* Order total checkout box */}
              <div className="p-6 rounded-2xl border border-white/[0.04] bg-[#07070a]/90 relative overflow-hidden scanlines shadow-2xl space-y-6">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00C2FF]/30 to-transparent" />
                <span className="font-mono text-xs text-white tracking-widest block uppercase border-b border-white/[0.04] pb-2">
                  DISPATCH SUMMARY
                </span>

                <div className="space-y-3 text-xs font-mono text-zinc-500">
                  <div className="flex justify-between">
                    <span>CARGO VALUE:</span>
                    <span className="text-zinc-300">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>SHIPPING ROUTING:</span>
                    <span className="text-emerald-400 font-bold">COMPLIMENTARY</span>
                  </div>
                  <div className="border-t border-white/[0.03] pt-3 mt-3 flex justify-between text-sm font-bold text-white tracking-widest">
                    <span>NET TOTAL:</span>
                    <span className="text-[#00C2FF] text-glow-cyan font-mono">₹{subtotal.toFixed(2)}</span>
                  </div>
                </div>

                {user.authenticated ? (
                  <Link
                    href="/checkout"
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-white hover:bg-[#00C2FF] text-black font-black text-xs tracking-widest transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(0,194,255,0.3)] uppercase"
                  >
                    PROCEED TO BIO-CHECKOUT
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <div className="space-y-3">
                    <Link
                      href="/login?redirect=checkout"
                      className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-white hover:bg-[#FF3366] text-black font-black text-xs tracking-widest transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(255,51,102,0.3)] uppercase"
                    >
                      AUTHENTICATE TO CHECKOUT
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <span className="block text-[8px] font-mono text-zinc-600 text-center uppercase">
                      Secure login required to bind cargo to profile
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-2 text-[8px] font-mono text-zinc-600 justify-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>SECURE CONNECTION NODE ACTIVE</span>
                </div>
              </div>

              {/* Subscription Upsell Banner */}
              <div className="p-6 rounded-2xl border border-white/[0.04] bg-[#07070a]/90 relative overflow-hidden scanlines shadow-2xl flex flex-col gap-4">
                <div className="absolute top-1/2 left-[-10%] w-[250px] h-[250px] rounded-full bg-[radial-gradient(circle,rgba(0,194,255,0.04)_0%,transparent_70%)] pointer-events-none" />
                <span className="section-label inline-flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#00C2FF]" />
                  SUBSCRIPTION UPGRADE // 15% OFF
                </span>
                <h3 className="text-sm font-black tracking-widest text-white uppercase">
                  AUTOMATE STACK DEPLOYMENTS
                </h3>
                <p className="text-[10px] text-zinc-400 leading-relaxed font-sans">
                  Convert this loadout into a recurring 12-pack monthly subscription cycle. Unlocks complimentary biomarker dashboards, free shipping, and locks in clinical pricing.
                </p>
                <Link
                  href="/subscribe"
                  className="w-full text-center py-2.5 rounded-lg border border-white/[0.08] bg-white/[0.01] hover:bg-white/[0.04] text-[10px] font-mono font-bold tracking-widest text-[#00C2FF] transition-all uppercase"
                >
                  CONFIGURE SUBSCRIPTION
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
