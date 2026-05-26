"use client";

import { useState } from "react";
import { Mail, MessageSquare, Cpu, Send, CheckCircle2 } from "lucide-react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("general");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
    setTimeout(() => {
      setName("");
      setEmail("");
      setMessage("");
      setSubmitted(false);
    }, 5000);
  };

  return (
    <div className="w-full bg-[#050505] text-[#F5F7FA] py-32 px-6 sm:px-12 md:px-24">
      <div className="absolute inset-0 bg-cyber-grid opacity-10 pointer-events-none z-0" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="space-y-4 max-w-xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00C2FF]/10 border border-[#00C2FF]/20 text-[10px] tracking-widest text-[#00C2FF] font-mono uppercase">
            <Mail className="w-3.5 h-3.5" />
            <span>COMMUNICATION CONSOLE // CHANNELS</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white uppercase">
            CONTACT THE LAB
          </h1>
          <p className="text-sm text-zinc-400 leading-relaxed font-sans">
            Transmit queries regarding formulation biochemistry, corporate wholesale node contracts, or orders logistics to our core laboratory support database.
          </p>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          {/* Form */}
          <div className="md:col-span-8 p-8 rounded-2xl border border-white/[0.04] bg-[#07070a]/90 relative overflow-hidden scanlines shadow-2xl">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-[#00C2FF]/30" />

            {submitted ? (
              <div className="py-12 flex flex-col items-center justify-center text-center gap-4 animate-in fade-in zoom-in-95 duration-300">
                <CheckCircle2 className="w-12 h-12 text-[#00C2FF] animate-bounce" />
                <div>
                  <h3 className="font-mono text-sm font-bold text-white uppercase">TRANSMISSION SUCCESSFUL</h3>
                  <p className="text-[10px] text-zinc-400 leading-relaxed font-sans mt-2 max-w-[220px] mx-auto">
                    Your packet has been safely received by Aesthetix Core. Response cycles resolve in 12 to 24 hours.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 font-mono text-xs text-zinc-400">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-zinc-500 block">SENDER NAME:</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alexis Stark"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#020204]/60 border border-white/[0.05] p-3 rounded-lg text-white placeholder-zinc-700 outline-none focus:border-[#00C2FF] transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-zinc-500 block">EMAIL ENVELOPE:</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. alex@stark.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#020204]/60 border border-white/[0.05] p-3 rounded-lg text-white placeholder-zinc-700 outline-none focus:border-[#00C2FF] transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-zinc-500 block">SUBJECT PACKET:</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-[#020204]/60 border border-white/[0.05] p-3 rounded-lg text-white outline-none focus:border-[#00C2FF]"
                  >
                    <option value="general">General Biotech Inquiry</option>
                    <option value="order">Order Telemetry Support</option>
                    <option value="wholesale">B2B Core Wholesales</option>
                    <option value="careers">Incubator Career Options</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-zinc-500 block">PACKET CONTENT MESSAGE:</label>
                  <textarea
                    required
                    placeholder="Input message contents..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="w-full bg-[#020204]/60 border border-white/[0.05] p-3 rounded-lg text-white placeholder-zinc-700 outline-none focus:border-[#00C2FF] resize-none transition-all"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="flex items-center gap-2 bg-[#00C2FF] hover:bg-[#00e5ff] text-black font-black px-6 py-3.5 rounded-lg transition-all duration-300 shadow-[0_0_15px_rgba(0,194,255,0.2)] cursor-pointer uppercase"
                  >
                    <Send className="w-4 h-4" /> TRANSMIT MESSAGE
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Details (Right Column) */}
          <div className="md:col-span-4 space-y-6 font-mono text-[10px] text-zinc-500">
            <div className="p-6 rounded-2xl border border-white/[0.04] bg-[#07070a]/90 space-y-4">
              <span className="text-[#00C2FF] font-bold block uppercase border-b border-white/[0.04] pb-2">LAB HEADQUARTERS</span>
              <div>
                <span className="block text-zinc-600">PHYSICAL NODE:</span>
                <span className="text-zinc-300">10880 Wilshire Blvd, Los Angeles, CA 90024</span>
              </div>
              <div>
                <span className="block text-zinc-600">EMAIL CHANNEL:</span>
                <span className="text-[#00C2FF]">contact@aesthetix.lab</span>
              </div>
              <div>
                <span className="block text-zinc-600">CORE STATUS:</span>
                <span className="text-emerald-500 font-bold">STABLE / ACCESSABLE</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-white/[0.04] bg-[#07070a]/90 flex gap-3 items-center">
              <Cpu className="w-6 h-6 text-[#00C2FF]" />
              <div>
                <span className="block text-zinc-600 uppercase">SYS_LOG LEVEL</span>
                <span className="text-white">ENCRYPTED TELEMETRY STREAM</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
