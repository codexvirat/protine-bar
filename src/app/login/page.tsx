"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { Cpu, ShieldCheck, ArrowRight, Mail, Lock, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Authentication failed");
      } else {
        // Successful login
        // Trigger browser reload to refresh layout headers and navigate to dashboard
        window.location.href = data.user.isAdmin ? "/admin" : "/account";
      }
    } catch (err) {
      setError("Failed to link with secure session authentication.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#050505] text-[#F5F7FA] flex items-center justify-center py-32 px-6 relative">
      <div className="absolute inset-0 bg-cyber-grid opacity-10 pointer-events-none z-0" />
      
      <div className="max-w-md w-full p-8 rounded-2xl border border-white/[0.04] bg-[#07070a]/90 text-center space-y-6 scanlines relative shadow-2xl z-10">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-[#00C2FF]/30" />
        
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00C2FF]/10 border border-[#00C2FF]/20 text-[9px] tracking-widest text-[#00C2FF] font-mono uppercase mx-auto">
            <Cpu className="w-3.5 h-3.5 animate-pulse" />
            <span>SECURE IDENTITY GATE // DEPLOY</span>
          </div>
          <h2 className="text-2xl font-black text-white uppercase tracking-widest pt-2">
            CONSOLE SIGN-IN
          </h2>
          <p className="text-[10px] text-zinc-500 font-sans tracking-wide">
            Access your personalized biomarkers, dispatch logs, and formulation stack subscription variables.
          </p>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 rounded-lg border border-rose-500/20 bg-rose-500/5 text-rose-400 font-mono text-[10px] text-left">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-left font-mono text-xs text-zinc-400">
          <div className="space-y-1">
            <label className="text-zinc-500 block">AUTHENTICATION NODE (EMAIL):</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
              <input
                type="email"
                required
                placeholder="stark@aesthetix.lab"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#020204]/80 border border-white/[0.05] p-3 pl-10 rounded-lg text-white outline-none focus:border-[#00C2FF] transition-all"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-zinc-500 block">ENCRYPTION PINCODE (PASSWORD):</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#020204]/80 border border-white/[0.05] p-3 pl-10 rounded-lg text-white outline-none focus:border-[#00C2FF] transition-all"
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-lg bg-white hover:bg-[#00C2FF] text-black font-black text-xs tracking-widest transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(0,194,255,0.3)] cursor-pointer uppercase disabled:opacity-50"
            >
              {loading ? "LINKING SESSION..." : "AUTHORIZE SESSION"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        <div className="border-t border-white/[0.03] pt-4 flex justify-between items-center text-[9px] font-mono text-zinc-500">
          <span>NO CONNECTED ID?</span>
          <Link href="/register" className="text-[#00C2FF] hover:text-[#00e5ff] font-bold transition-colors">
            CREATE ATHLETE PROFILE ↳
          </Link>
        </div>

        <div className="flex items-center gap-2 text-[8px] font-mono text-zinc-600 justify-center">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>AES-256 CONTEXT ENCRYPTION ACTIVE</span>
        </div>
      </div>
    </div>
  );
}
