"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Cpu, ShieldCheck, ArrowRight, User, Mail, Lock, Phone, MapPin, AlertCircle, CheckCircle } from "lucide-react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return;

    if (password !== confirmPassword) {
      setError("Pincode confirmations do not match");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, phone, address }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration process failed");
      } else {
        setSuccess(true);
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (err) {
      setError("Failed to link with registration authentication console.");
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF3366]/10 border border-[#FF3366]/20 text-[9px] tracking-widest text-[#FF3366] font-mono uppercase mx-auto">
            <Cpu className="w-3.5 h-3.5" />
            <span>CREATE IDENTITY PROTOCOL // REGISTER</span>
          </div>
          <h2 className="text-2xl font-black text-white uppercase tracking-widest pt-2">
            ATHLETE PROFILE SETUP
          </h2>
          <p className="text-[10px] text-zinc-500 font-sans tracking-wide">
            Register your profile key. The first account created is automatically elevated to System Admin.
          </p>
        </div>

        {success ? (
          <div className="flex flex-col items-center justify-center py-10 space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 animate-pulse">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-mono text-sm font-bold text-white uppercase">REGISTRATION ACTIVE</h3>
              <p className="text-[9px] text-zinc-500">Redirecting to session authorization gate...</p>
            </div>
          </div>
        ) : (
          <>
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg border border-rose-500/20 bg-rose-500/5 text-rose-400 font-mono text-[10px] text-left">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-left font-mono text-xs text-zinc-400">
              <div className="space-y-1">
                <label className="text-zinc-500 block">ATHLETE NAME:</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                  <input
                    type="text"
                    required
                    placeholder="Alexis Stark"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#020204]/80 border border-white/[0.05] p-3 pl-10 rounded-lg text-white outline-none focus:border-[#00C2FF] transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-zinc-500 block">COMMUNICATION NODE (EMAIL):</label>
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-zinc-500 block">PASSWORD:</label>
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

                <div className="space-y-1">
                  <label className="text-zinc-500 block">CONFIRM PASSWORD:</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full bg-[#020204]/80 border border-white/[0.05] p-3 pl-10 rounded-lg text-white outline-none focus:border-[#00C2FF] transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-zinc-500 block">PHONE SIGNAL (OPTIONAL):</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                  <input
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#020204]/80 border border-white/[0.05] p-3 pl-10 rounded-lg text-white outline-none focus:border-[#00C2FF] transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-zinc-500 block">SHIPPING COORDINATE ADDRESS (OPTIONAL):</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                  <input
                    type="text"
                    placeholder="10880 Wilshire Blvd, Los Angeles, CA 90024"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-[#020204]/80 border border-white/[0.05] p-3 pl-10 rounded-lg text-white outline-none focus:border-[#00C2FF] transition-all"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-lg bg-white hover:bg-[#FF3366] text-black font-black text-xs tracking-widest transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(255,51,102,0.3)] cursor-pointer uppercase disabled:opacity-50"
                >
                  {loading ? "ASSEMBLING PROFILE..." : "ACTIVATE ATHLETE KEY"}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>

            <div className="border-t border-white/[0.03] pt-4 flex justify-between items-center text-[9px] font-mono text-zinc-500">
              <span>ALREADY REGISTERED?</span>
              <Link href="/login" className="text-[#FF3366] hover:text-[#ff5588] font-bold transition-colors">
                SIGN-IN PROTOCOL ↳
              </Link>
            </div>
          </>
        )}

        <div className="flex items-center gap-2 text-[8px] font-mono text-zinc-600 justify-center">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>AES-256 CONTEXT ENCRYPTION ACTIVE</span>
        </div>
      </div>
    </div>
  );
}
