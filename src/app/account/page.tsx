"use client";

import { useStore } from "@/lib/store";
import { User, Cpu, ShieldCheck, Mail, MapPin, Box, LogOut, ToggleLeft, ToggleRight, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Account() {
  const user = useStore((state) => state.user);
  const subscription = useStore((state) => state.subscription);
  const products = useStore((state) => state.products);
  
  const cancelSubscription = useStore((state) => state.cancelSubscription);
  const activateSubscription = useStore((state) => state.activateSubscription);

  const subtotalBoxBars = Object.values(subscription.items).reduce((s, c) => s + c, 0);

  const handleSubToggle = () => {
    if (subscription.active) {
      cancelSubscription();
    } else {
      activateSubscription();
    }
  };

  return (
    <div className="w-full bg-[#050505] text-[#F5F7FA] py-32 px-6 sm:px-12 md:px-24">
      <div className="absolute inset-0 bg-cyber-grid opacity-10 pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-16 border-b border-white/[0.04] pb-8">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00C2FF]/10 border border-[#00C2FF]/20 text-[10px] tracking-widest text-[#00C2FF] font-mono uppercase">
              <User className="w-3.5 h-3.5" />
              <span>USER PROFILE // CONSOLE</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white uppercase">
              ACCOUNT PORTAL
            </h1>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Examine scheduled biomass shipments, profile details, and telemetry history logs. Update active cartridge variables below.
            </p>
          </div>

          <button
            className="flex items-center gap-1.5 border border-white/[0.05] bg-white/[0.01] hover:bg-white/[0.04] text-[10px] font-mono tracking-widest text-zinc-500 hover:text-white px-4 py-2.5 rounded-lg transition-colors cursor-pointer uppercase"
            onClick={() => alert("Simulation log-out executed. Console remains in mock guest view.")}
          >
            <LogOut className="w-4 h-4" /> DISCONNECT
          </button>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* User Details & Order logs (Left Column) */}
          <div className="lg:col-span-8 space-y-8">
            {/* profile Bio details */}
            <div className="p-6 rounded-2xl border border-white/[0.04] bg-[#07070a]/90 relative overflow-hidden scanlines shadow-2xl space-y-6">
              <span className="font-mono text-xs text-white tracking-widest block uppercase border-b border-white/[0.04] pb-2">01 // CORE PROFILE BIOMETRICS</span>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-mono">
                <div className="space-y-4">
                  <div className="flex gap-2 items-center">
                    <User className="w-4 h-4 text-[#00C2FF]" />
                    <div>
                      <span className="text-zinc-600 block">ATHLETE NAME:</span>
                      <span className="text-zinc-300 font-bold">{user.name}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Mail className="w-4 h-4 text-[#00C2FF]" />
                    <div>
                      <span className="text-zinc-600 block">COMMUNICATION NODE:</span>
                      <span className="text-zinc-300">{user.email}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-2 items-start">
                    <MapPin className="w-4 h-4 text-[#00C2FF] mt-0.5" />
                    <div>
                      <span className="text-zinc-600 block">SHIPPING COGNIZANT ADDR:</span>
                      <span className="text-zinc-300 leading-relaxed">
                        {user.address || "NO ADDRESS REGISTERED"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order History logs */}
            <div className="p-6 rounded-2xl border border-white/[0.04] bg-[#07070a]/90 shadow-2xl space-y-6">
              <span className="font-mono text-xs text-white tracking-widest block uppercase border-b border-white/[0.04] pb-2">02 // INVENTORY ACQUISITION LOGS</span>
              
              {user.orders.length === 0 ? (
                <div className="text-center py-12 text-zinc-600 font-mono text-xs uppercase">
                  NO ACQUISITION CYCLES REGISTERED
                </div>
              ) : (
                <div className="space-y-6">
                  {user.orders.map((order) => (
                    <div 
                      key={order.id}
                      className="p-4 rounded-xl border border-white/[0.03] bg-white/[0.01] hover:bg-white/[0.02] transition-colors space-y-4"
                    >
                      <div className="flex justify-between items-center border-b border-white/[0.04] pb-3 text-xs font-mono">
                        <div>
                          <span className="text-white font-bold block">ORDER REQ: {order.id}</span>
                          <span className="text-[10px] text-zinc-500 uppercase">DISPATCH DATE: {order.date}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-white font-bold block">${order.total.toFixed(2)}</span>
                          <span className="text-emerald-500 text-[10px] font-bold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                            {order.status}
                          </span>
                        </div>
                      </div>

                      {/* Items loop */}
                      <div className="space-y-2 text-xs font-mono">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-zinc-400">
                            <span>{item.product.name} (x{item.quantity})</span>
                            <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Subscription details Console (Right Column) */}
          <div className="lg:col-span-4 space-y-8">
            <div className="p-6 rounded-2xl border border-white/[0.04] bg-[#07070a]/90 shadow-2xl relative scanlines">
              {/* Cyan overlay */}
              <div 
                className="absolute top-0 inset-x-0 h-40 opacity-5 pointer-events-none z-0 filter blur-[35px] transition-all"
                style={{ backgroundColor: subscription.active ? "#00C2FF" : "#ff3366" }}
              />

              <div className="flex justify-between items-center border-b border-white/[0.04] pb-4 mb-6 relative z-10">
                <span className="font-mono text-xs text-white tracking-widest uppercase">DEPLOYMENT CARTRIDGE</span>
                <span className={`font-mono text-[9px] font-bold ${subscription.active ? "text-emerald-400" : "text-rose-500"}`}>
                  {subscription.active ? "SYS: ENABLED" : "SYS: DISABLED"}
                </span>
              </div>

              <div className="space-y-6 relative z-10">
                {/* Subscription controls */}
                <div className="flex justify-between items-center bg-white/[0.01] p-3 rounded-lg border border-white/[0.02]">
                  <div className="font-mono text-[10px]">
                    <span className="text-white block uppercase font-bold">INTERVAL SCHEDULE</span>
                    <span className="text-zinc-500">EVERY {subscription.frequency} DAYS</span>
                  </div>

                  <button
                    onClick={handleSubToggle}
                    className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
                    title={subscription.active ? "Deactivate deployment" : "Activate deployment"}
                  >
                    {subscription.active ? (
                      <ToggleRight className="w-8 h-8 text-[#00C2FF]" />
                    ) : (
                      <ToggleLeft className="w-8 h-8 text-zinc-600" />
                    )}
                  </button>
                </div>

                {/* Carton loadout details */}
                <div className="space-y-3 font-mono text-[10px]">
                  <span className="text-zinc-500 uppercase tracking-widest block border-b border-white/[0.03] pb-1">CURRENT ALLOCATIONS</span>
                  {products.map((p) => {
                    const count = subscription.items[p.id] || 0;
                    if (count === 0) return null;
                    return (
                      <div key={p.id} className="flex justify-between text-zinc-400">
                        <span>{p.name}</span>
                        <span className="text-white font-bold">{count} BARS</span>
                      </div>
                    );
                  })}
                  <div className="flex justify-between text-zinc-300 font-bold border-t border-white/[0.03] pt-2 mt-2">
                    <span>CARTRIDGE LOAD:</span>
                    <span>{subtotalBoxBars} BARS</span>
                  </div>
                </div>

                {/* Edit subscription CTA */}
                <div className="pt-2">
                  <Link
                    href="/subscribe"
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-lg border border-white/[0.05] bg-white/[0.02] text-zinc-300 hover:text-white hover:bg-white/[0.06] text-[10px] font-mono tracking-widest transition-colors uppercase"
                  >
                    REPROGRAM CARTRIDGE LOAD
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
