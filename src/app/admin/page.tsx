"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Cpu, ShieldCheck, ArrowLeft, RefreshCw, BarChart2, DollarSign, Box, User, Clock, AlertCircle } from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);

  // Data states
  const [orders, setOrders] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<any>({
    totalSales: 0,
    totalOrdersCount: 0,
    activeSubsCount: 0,
    monthlyRevenue: 0,
    topProducts: [],
  });

  const [loadingData, setLoadingData] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Verify Admin authorization on mount
  useEffect(() => {
    async function checkAdmin() {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) {
          router.push("/login");
          return;
        }

        const data = await res.json();
        if (!data.user || !data.user.isAdmin) {
          // Not an admin
          setAuthorized(false);
          setLoadingAuth(false);
          return;
        }

        setAuthorized(true);
        setLoadingAuth(false);

        // Fetch admin details
        await fetchAdminData();
      } catch (err) {
        console.error("Admin verification failed:", err);
        router.push("/login");
      }
    }

    checkAdmin();
  }, [router]);

  const fetchAdminData = async () => {
    setLoadingData(true);
    try {
      const [ordersRes, analyticsRes] = await Promise.all([
        fetch("/api/admin/orders"),
        fetch("/api/admin/analytics"),
      ]);

      if (ordersRes.ok && analyticsRes.ok) {
        const ordersData = await ordersRes.json();
        const analyticsData = await analyticsRes.json();
        setOrders(ordersData.orders);
        setAnalytics(analyticsData);
      }
    } catch (err) {
      console.error("Fetch admin data error:", err);
    } finally {
      setLoadingData(false);
    }
  };

  const handleUpdateStatus = async (orderId: string, status: string) => {
    setUpdatingId(orderId);
    try {
      const res = await fetch("/api/admin/order/status", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, orderStatus: status }),
      });

      if (res.ok) {
        // Refresh orders and analytics locally
        await fetchAdminData();
      }
    } catch (err) {
      console.error("Status update failed:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleUpdateTracking = async (orderId: string, trackingId: string) => {
    setUpdatingId(orderId);
    try {
      const res = await fetch("/api/admin/order/status", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, trackingId }),
      });

      if (res.ok) {
        await fetchAdminData();
      }
    } catch (err) {
      console.error("Tracking ID update failed:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  if (loadingAuth) {
    return (
      <div className="w-full min-h-screen bg-[#050505] text-[#F5F7FA] flex items-center justify-center">
        <RefreshCw className="w-8 h-8 text-[#00C2FF] animate-spin" />
      </div>
    );
  }

  if (!authorized) {
    return (
      <div className="w-full min-h-screen bg-[#050505] text-[#F5F7FA] flex flex-col items-center justify-center gap-4 py-32">
        <AlertCircle className="w-12 h-12 text-rose-500 animate-bounce" />
        <span className="font-mono text-xs text-rose-500 uppercase tracking-widest">
          ERROR_CODE: ACCESS_UNAUTHORIZED
        </span>
        <h1 className="text-2xl font-black uppercase tracking-widest text-white">
          ADMIN CONSOLE LOCKED
        </h1>
        <p className="text-sm text-zinc-500 max-w-xs text-center font-sans">
          Your profile key lacks system administrator elevations. Authenticate with a compliant admin node.
        </p>
        <Link
          href="/account"
          className="text-xs font-bold tracking-widest text-[#00C2FF] border border-[#00C2FF]/30 px-6 py-3 rounded-lg hover:bg-[#00C2FF]/5 uppercase"
        >
          RETURN TO USER DASHBOARD
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#050505] text-[#F5F7FA] py-32 px-6 sm:px-12 md:px-24 min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-cyber-grid opacity-10 pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,rgba(0,194,255,0.03)_0%,transparent_70%)] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-white/[0.04] pb-8">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00C2FF]/10 border border-[#00C2FF]/20 text-[10px] tracking-widest text-[#00C2FF] font-mono uppercase">
              <Cpu className="w-3.5 h-3.5" />
              <span>SYSTEM ADMIN // CENTRAL TELESCOPE</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white uppercase">
              ADMIN CONTROL
            </h1>
            <p className="text-sm text-zinc-400 leading-relaxed font-sans">
              Oversee database order queues, track payment nodes, monitor subscription active parameters, and inspect performance analytics.
            </p>
          </div>

          <Link
            href="/account"
            className="flex items-center gap-1.5 border border-white/[0.05] bg-white/[0.01] hover:bg-white/[0.04] text-[10px] font-mono tracking-widest text-zinc-400 hover:text-white px-4 py-2.5 rounded-lg transition-colors uppercase"
          >
            <ArrowLeft className="w-4 h-4" /> USER PORTAL
          </Link>
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "NET ACCUMULATED SALES", value: `₹${analytics.totalSales.toFixed(2)}`, icon: DollarSign, color: "#00C2FF" },
            { label: "COMPLETED CARGO CYCLES", value: `${analytics.totalOrdersCount}`, icon: Box, color: "#F5F7FA" },
            { label: "ACTIVE SUBSCRIPTIONS", value: `${analytics.activeSubsCount}`, icon: Cpu, color: "#00E5FF" },
            { label: "CURRENT MONTH REVENUE", value: `₹${analytics.monthlyRevenue.toFixed(2)}`, icon: BarChart2, color: "#FF3366" }
          ].map((card, idx) => {
            const Icon = card.icon;
            return (
              <div 
                key={idx} 
                className="p-5 rounded-2xl border border-white/[0.03] bg-white/[0.01] relative overflow-hidden group shadow-lg"
              >
                <div 
                  className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-[0.02] blur-[15px] pointer-events-none"
                  style={{ backgroundColor: card.color }}
                />
                <span className="block text-[8px] font-mono text-zinc-500 uppercase tracking-widest">{card.label}</span>
                <span className="block text-2xl font-black font-mono mt-3" style={{ color: card.color }}>
                  {loadingData ? "..." : card.value}
                </span>
              </div>
            );
          })}
        </div>

        {/* Formulation Popularity Strips */}
        <div className="p-6 rounded-2xl border border-white/[0.04] bg-[#07070a]/90 shadow-xl space-y-6">
          <span className="font-mono text-xs text-white tracking-widest block uppercase border-b border-white/[0.04] pb-2">
            FORMULATION DISPATCH DISPERSION
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-mono text-xs">
            {loadingData ? (
              <div className="py-6 text-center text-zinc-600 uppercase">CALCULATING METRICS...</div>
            ) : analytics.topProducts.length === 0 ? (
              <div className="py-6 text-center text-zinc-600 uppercase">NO SALES DISPERSION DATA</div>
            ) : (
              analytics.topProducts.map((p: any) => {
                const percentage = Math.min(100, analytics.totalOrdersCount > 0 ? (p.count / analytics.totalOrdersCount) * 100 : 0);
                return (
                  <div key={p.name} className="space-y-2">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="font-bold text-white uppercase">{p.name}</span>
                      <span style={{ color: p.color }}>{p.count} UNITS SOLD</span>
                    </div>
                    <div className="w-full h-2 bg-zinc-950 rounded-full overflow-hidden border border-white/[0.02]">
                      <div 
                        className="h-full rounded-full transition-all duration-1000"
                        style={{ width: `${percentage || 5}%`, backgroundColor: p.color }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Orders Table */}
        <div className="p-6 rounded-2xl border border-white/[0.04] bg-[#07070a]/90 shadow-xl space-y-6 overflow-hidden">
          <span className="font-mono text-xs text-white tracking-widest block uppercase border-b border-white/[0.04] pb-2">
            ACQUISITION QUEUE DISPATCH MANAGER
          </span>

          {loadingData ? (
            <div className="flex justify-center items-center py-12">
              <RefreshCw className="w-6 h-6 text-[#00C2FF] animate-spin" />
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-12 text-zinc-600 font-mono text-xs uppercase">
              ACQUISITION QUEUE EMPTY
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-[10px] text-zinc-400 border-collapse">
                <thead>
                  <tr className="border-b border-white/[0.04] text-zinc-500 uppercase tracking-widest">
                    <th className="py-3 pr-4 font-bold">ORDER REF</th>
                    <th className="py-3 pr-4 font-bold">ATHLETE</th>
                    <th className="py-3 pr-4 font-bold">FORMULATIONS</th>
                    <th className="py-3 pr-4 font-bold">NET TOTAL</th>
                    <th className="py-3 pr-4 font-bold">PAYMENT</th>
                    <th className="py-3 pr-4 font-bold">DISPATCH STATUS</th>
                    <th className="py-3 pr-4 font-bold">TRACKING TOKEN</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.02]">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-white/[0.01] transition-colors">
                      <td className="py-4 pr-4 font-bold text-white">{order.orderNumber}</td>
                      <td className="py-4 pr-4">
                        <span className="block text-zinc-300 font-sans font-bold">{order.name}</span>
                        <span className="block text-[8px] text-zinc-600">{order.email}</span>
                      </td>
                      <td className="py-4 pr-4 font-sans text-xs text-zinc-400">
                        {order.items.map((it: any) => `${it.product?.name} (x${it.quantity})`).join(", ")}
                      </td>
                      <td className="py-4 pr-4 font-bold text-white">₹{order.totalAmount.toFixed(2)}</td>
                      <td className="py-4 pr-4">
                        <span className={`px-2 py-0.5 rounded-full border text-[8px] font-bold ${
                          order.paymentStatus === "Paid" 
                            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
                            : "bg-amber-500/10 border-amber-500/20 text-amber-400"
                        }`}>
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td className="py-4 pr-4">
                        <select
                          disabled={updatingId === order.id}
                          value={order.orderStatus}
                          onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                          className="bg-[#0c0c12] border border-white/[0.05] text-[9px] font-mono text-zinc-300 rounded p-1 outline-none focus:border-[#00C2FF] cursor-pointer disabled:opacity-50"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="py-4">
                        <input
                          type="text"
                          defaultValue={order.trackingId || ""}
                          placeholder="Insert tracking ID"
                          disabled={updatingId === order.id}
                          onBlur={(e) => handleUpdateTracking(order.id, e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleUpdateTracking(order.id, e.currentTarget.value);
                              e.currentTarget.blur();
                            }
                          }}
                          className="bg-[#0c0c12] border border-white/[0.05] text-[9px] font-mono text-zinc-300 rounded p-1 w-28 outline-none focus:border-[#00C2FF] disabled:opacity-50"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}
