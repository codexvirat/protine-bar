"use client";

import { useStore } from "@/lib/store";
import { User, Cpu, ShieldCheck, Mail, MapPin, Box, LogOut, ToggleLeft, ToggleRight, Settings, Phone, Calendar, ArrowRight, Truck, Check, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UserAccountDashboard() {
  const user = useStore((state) => state.user);
  const subscription = useStore((state) => state.subscription);
  const products = useStore((state) => state.products);
  const addToCart = useStore((state) => state.addToCart);
  
  const cancelSubscription = useStore((state) => state.cancelSubscription);
  const activateSubscription = useStore((state) => state.activateSubscription);

  const router = useRouter();
  const [dbOrders, setDbOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [reorderingId, setReorderingId] = useState<string | null>(null);

  // Sync session and fetch orders
  useEffect(() => {
    // If not authenticated, redirect to login
    const checkSession = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) {
          router.push("/login");
          return;
        }

        // Fetch user's orders from DB
        const ordersRes = await fetch("/api/orders");
        if (ordersRes.ok) {
          const data = await ordersRes.json();
          setDbOrders(data.orders);
        }
      } catch (err) {
        console.error("Fetch orders failed:", err);
      } finally {
        setLoadingOrders(false);
      }
    };

    checkSession();
  }, [router]);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        // Clear cookies and refresh
        window.location.href = "/login";
      }
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleSubToggle = () => {
    if (subscription.active) {
      cancelSubscription();
    } else {
      activateSubscription();
    }
  };

  const handleReorder = async (orderItems: any[]) => {
    setReorderingId("loading");
    // Add all products in the order back to the cart
    for (const item of orderItems) {
      if (item.product) {
        addToCart(item.product, item.quantity);
      }
    }
    setTimeout(() => {
      setReorderingId(null);
      router.push("/cart");
    }, 800);
  };

  // Helper to map order status to step index for the tracker timeline
  const getStatusStepIndex = (status: string) => {
    const statuses = ["Pending", "Confirmed", "Processing", "Shipped", "Out for Delivery", "Delivered"];
    return statuses.indexOf(status);
  };

  const orderStatuses = ["Confirmed", "Processing", "Shipped", "Out for Delivery", "Delivered"];

  return (
    <div className="w-full bg-[#050505] text-[#F5F7FA] py-32 px-6 sm:px-12 md:px-24 min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-cyber-grid opacity-10 pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(0,194,255,0.03)_0%,transparent_70%)] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-white/[0.04] pb-8">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00C2FF]/10 border border-[#00C2FF]/20 text-[10px] tracking-widest text-[#00C2FF] font-mono uppercase">
              <User className="w-3.5 h-3.5" />
              <span>USER CONTROL PANEL // TELEMETRY ACCESS</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white uppercase">
              ATHLETE CONSOLE
            </h1>
            <p className="text-sm text-zinc-400 leading-relaxed font-sans">
              Welcome back, <span className="text-[#00C2FF] font-bold">{user.name || "Athlete"}</span>. Track active cargo logistics, update delivery addresses, and manage subscription variables.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {user.isAdmin && (
              <Link
                href="/admin"
                className="flex items-center gap-1.5 border border-[#00C2FF]/30 bg-[#00C2FF]/10 text-[10px] font-mono tracking-widest text-[#00C2FF] px-4 py-2.5 rounded-lg hover:bg-[#00C2FF]/20 transition-all uppercase"
              >
                <Settings className="w-4 h-4" /> ADMIN PANEL
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 border border-white/[0.05] bg-white/[0.01] hover:bg-white/[0.04] text-[10px] font-mono tracking-widest text-zinc-500 hover:text-white px-4 py-2.5 rounded-lg transition-colors cursor-pointer uppercase"
            >
              <LogOut className="w-4 h-4" /> DISCONNECT
            </button>
          </div>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Details & Orders */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Active Orders Tracker */}
            <div className="p-6 rounded-2xl border border-white/[0.04] bg-[#07070a]/90 relative overflow-hidden shadow-xl space-y-6">
              <span className="font-mono text-xs text-white tracking-widest block uppercase border-b border-white/[0.04] pb-2">
                01 // ACTIVE IN-TRANSIT CARGO
              </span>

              {loadingOrders ? (
                <div className="flex justify-center items-center py-12">
                  <RefreshCw className="w-6 h-6 text-[#00C2FF] animate-spin" />
                </div>
              ) : dbOrders.filter(o => o.orderStatus !== "Delivered" && o.orderStatus !== "Cancelled").length === 0 ? (
                <div className="text-center py-8 text-zinc-600 font-mono text-xs uppercase">
                  NO ACTIVE IN-TRANSIT CONDUITS
                </div>
              ) : (
                <div className="space-y-8">
                  {dbOrders
                    .filter(o => o.orderStatus !== "Delivered" && o.orderStatus !== "Cancelled")
                    .map((order) => {
                      const activeStepIndex = getStatusStepIndex(order.orderStatus);
                      return (
                        <div key={order.id} className="p-5 rounded-xl border border-[#00C2FF]/10 bg-white/[0.01] space-y-6">
                          <div className="flex justify-between items-center border-b border-white/[0.03] pb-3 font-mono text-[10px]">
                            <div>
                              <span className="text-[#00C2FF] font-bold block">ORDER NO: {order.orderNumber}</span>
                              <span className="text-zinc-500">PLACED ON: {order.createdAt.split("T")[0]}</span>
                            </div>
                            <div className="text-right">
                              <span className="text-white block font-bold">₹{order.totalAmount.toFixed(2)}</span>
                              <span className="text-cyan-400 font-bold uppercase">{order.orderStatus}</span>
                            </div>
                          </div>

                          {/* Stepper progress bar */}
                          <div className="relative py-4">
                            {/* Horizontal Line background */}
                            <div className="absolute top-1/2 left-2 right-2 h-[2px] bg-zinc-900 -translate-y-1/2 z-0" />
                            
                            {/* Active line progress */}
                            <div 
                              className="absolute top-1/2 left-2 h-[2px] bg-[#00C2FF] -translate-y-1/2 z-0 transition-all duration-700" 
                              style={{ 
                                width: `${(activeStepIndex / 5) * 100}%` 
                              }}
                            />

                            {/* Stepper nodes */}
                            <div className="relative z-10 flex justify-between">
                              {["Confirmed", "Processing", "Shipped", "Out for Delivery", "Delivered"].map((stName, idx) => {
                                const isCompleted = activeStepIndex >= (idx + 1);
                                const isActive = order.orderStatus === stName;
                                return (
                                  <div key={stName} className="flex flex-col items-center gap-2">
                                    <div 
                                      className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
                                        isActive 
                                          ? "bg-black border-[#00C2FF] text-[#00C2FF] shadow-[0_0_12px_rgba(0,194,255,0.6)]" 
                                          : isCompleted 
                                            ? "bg-[#00C2FF] border-[#00C2FF] text-black" 
                                            : "bg-[#0c0c12] border-white/[0.05] text-zinc-600"
                                      }`}
                                    >
                                      {isCompleted ? (
                                        <Check className="w-3.5 h-3.5" />
                                      ) : (
                                        <span className="text-[8px] font-mono font-bold">{idx + 1}</span>
                                      )}
                                    </div>
                                    <span 
                                      className={`text-[7px] font-mono font-black tracking-tighter uppercase hidden sm:block ${
                                        isActive ? "text-[#00C2FF] font-bold" : isCompleted ? "text-zinc-300" : "text-zinc-600"
                                      }`}
                                    >
                                      {stName}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Tracking ID details if shipped */}
                          {order.trackingId && (
                            <div className="flex gap-2 items-center bg-[#020204]/60 p-3 rounded-lg font-mono text-[9px] text-zinc-400">
                              <Truck className="w-3.5 h-3.5 text-[#00C2FF]" />
                              <span>CARGO TRACKING ID:</span>
                              <span className="text-white font-bold">{order.trackingId}</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              )}
            </div>

            {/* Profile Biometrics */}
            <div className="p-6 rounded-2xl border border-white/[0.04] bg-[#07070a]/90 relative overflow-hidden shadow-xl space-y-6">
              <span className="font-mono text-xs text-white tracking-widest block uppercase border-b border-white/[0.04] pb-2">
                02 // ATHLETE PROFILE SPECS
              </span>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-mono">
                <div className="space-y-4">
                  <div className="flex gap-3 items-center">
                    <User className="w-4 h-4 text-[#00C2FF]" />
                    <div>
                      <span className="text-zinc-600 block text-[9px]">NAME:</span>
                      <span className="text-zinc-300 font-bold">{user.name}</span>
                    </div>
                  </div>
                  <div className="flex gap-3 items-center">
                    <Mail className="w-4 h-4 text-[#00C2FF]" />
                    <div>
                      <span className="text-zinc-600 block text-[9px]">EMAIL NODE:</span>
                      <span className="text-zinc-300">{user.email}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-3 items-center">
                    <Phone className="w-4 h-4 text-[#00C2FF]" />
                    <div>
                      <span className="text-zinc-600 block text-[9px]">PHONE NODE:</span>
                      <span className="text-zinc-300">{user.phone || "Not Declared"}</span>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <MapPin className="w-4 h-4 text-[#00C2FF] mt-0.5" />
                    <div>
                      <span className="text-zinc-600 block text-[9px]">DISPATCH ADDRESS:</span>
                      <span className="text-zinc-300 leading-relaxed text-[11px] block">{user.address || "Not Declared"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Orders history */}
            <div className="p-6 rounded-2xl border border-white/[0.04] bg-[#07070a]/90 shadow-xl space-y-6">
              <span className="font-mono text-xs text-white tracking-widest block uppercase border-b border-white/[0.04] pb-2">
                03 // COMPLETED INVENTORY LOGS
              </span>
              
              {loadingOrders ? (
                <div className="flex justify-center items-center py-12">
                  <RefreshCw className="w-6 h-6 text-[#00C2FF] animate-spin" />
                </div>
              ) : dbOrders.length === 0 ? (
                <div className="text-center py-8 text-zinc-600 font-mono text-xs uppercase">
                  NO ACQUISITION CYCLES REGISTERED
                </div>
              ) : (
                <div className="space-y-4">
                  {dbOrders.map((order) => (
                    <div 
                      key={order.id}
                      className="p-4 rounded-xl border border-white/[0.03] bg-white/[0.01] hover:bg-white/[0.02] transition-colors flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                    >
                      <div className="font-mono text-[10px] space-y-1">
                        <span className="text-white font-bold block">REQ CODE: {order.orderNumber}</span>
                        <span className="text-zinc-500 block uppercase">DATE: {order.createdAt.split("T")[0]}</span>
                        <span className="text-zinc-400 block font-sans">
                          {order.items.map((it: any) => `${it.product?.name} (x${it.quantity})`).join(", ")}
                        </span>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3">
                        <div className="text-left sm:text-right font-mono text-[10px]">
                          <span className="text-white font-bold block">₹{order.totalAmount.toFixed(2)}</span>
                          <span className={`font-bold block text-[8px] uppercase ${order.orderStatus === "Delivered" ? "text-emerald-400" : order.orderStatus === "Cancelled" ? "text-rose-500" : "text-[#00C2FF]"}`}>
                            {order.orderStatus}
                          </span>
                        </div>
                        
                        <button
                          onClick={() => handleReorder(order.items)}
                          disabled={reorderingId !== null}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-white/[0.05] bg-white/[0.02] hover:bg-[#00C2FF] hover:text-black font-mono text-[8px] tracking-widest hover:border-transparent transition-all uppercase cursor-pointer disabled:opacity-50"
                        >
                          {reorderingId === "loading" ? "SYNCHRONIZING..." : "REORDER"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Subscriptions */}
          <div className="lg:col-span-4 space-y-8">
            <div className="p-6 rounded-2xl border border-white/[0.04] bg-[#07070a]/90 shadow-xl relative scanlines">
              <div 
                className="absolute top-0 inset-x-0 h-40 opacity-5 pointer-events-none z-0 filter blur-[35px] transition-all"
                style={{ backgroundColor: subscription.active ? "#00C2FF" : "#ff3366" }}
              />

              <div className="flex justify-between items-center border-b border-white/[0.04] pb-4 mb-6 relative z-10">
                <span className="font-mono text-xs text-white tracking-widest uppercase">DEPLOYMENT CARTRIDGE</span>
                <span className={`font-mono text-[9px] font-bold ${subscription.active ? "text-emerald-400" : "text-rose-500"}`}>
                  {subscription.active ? "SYS: ACTIVE" : "SYS: DISABLED"}
                </span>
              </div>

              <div className="space-y-6 relative z-10">
                
                {/* Subscription status */}
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

                {/* Carton allocations details */}
                <div className="space-y-3 font-mono text-[10px]">
                  <span className="text-zinc-500 uppercase tracking-widest block border-b border-white/[0.03] pb-1">
                    CURRENT ALLOCATIONS
                  </span>
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
                    <span>
                      {Object.values(subscription.items).reduce((s, c) => s + c, 0)} BARS
                    </span>
                  </div>
                </div>

                {/* Sub controls actions */}
                {subscription.active && (
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button
                      onClick={() => alert("Simulation: Skipping next month cycle load.")}
                      className="py-2.5 rounded border border-white/[0.05] bg-white/[0.01] hover:bg-white/[0.04] text-[8px] font-mono tracking-widest text-zinc-400 hover:text-white uppercase transition-all cursor-pointer text-center"
                    >
                      SKIP CYCLE
                    </button>
                    <Link
                      href="/subscribe"
                      className="py-2.5 rounded border border-white/[0.05] bg-white/[0.01] hover:bg-white/[0.04] text-[8px] font-mono tracking-widest text-zinc-400 hover:text-white uppercase transition-all text-center"
                    >
                      REPROGRAM
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
