"use client";

import { useState } from "react";
import { Cpu, ChevronDown, HelpCircle, ShieldCheck } from "lucide-react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: "science" | "logistics" | "account";
}

export default function FAQ() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      id: 1,
      category: "science",
      question: "WHY DO YOU OMIT SUGAR ALCOHOLS AND THICKENING GUMS?",
      answer: "Synthetic sweeteners (like maltitol, erythritol) and structural gums (like xanthan, guar) draw excess water into the large intestine, prompting fermentation. This causes high abdominal bloat and digestive delays during workouts. We use natural nut butters and clean organic sweeteners to support rapid gastric emptying."
    },
    {
      id: 2,
      category: "science",
      question: "IS CREATINE MONOHYDRATE STABLE IN BAR WRAPPERS?",
      answer: "Yes. Creapure® Creatine Monohydrate remains chemically stable when moisture activity coefficients are kept below 0.6. Aesthetix dry matrix processes keep moisture levels well below this threshold, ensuring that creatine does not degrade into creatinine prior to ingestion."
    },
    {
      id: 3,
      category: "logistics",
      question: "HOW DOES COMPLIMENTARY NANOTECH SHIPPING OPERATE?",
      answer: "All cartridge deployments of 12 bars or larger receive immediate free expedited shipping. We dispatch packages within 12 hours from our California facility, delivering to local nodes in 2 to 4 business days."
    },
    {
      id: 4,
      category: "account",
      question: "CAN I CUSTOMIZE FLAVOR ALLOCATIONS DURING SUBSCRIPTION CYCLES?",
      answer: "Absolutely. Log into your Account Console at any point prior to your next dispatch. You can modify flavor increments, shift delivery intervals (e.g. from 30 days to 14 days), or pause shipments with zero penalties."
    }
  ];

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="w-full bg-[#050505] text-[#F5F7FA] py-32 px-6 sm:px-12 md:px-24">
      <div className="absolute inset-0 bg-cyber-grid opacity-10 pointer-events-none z-0" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="space-y-4 max-w-xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00C2FF]/10 border border-[#00C2FF]/20 text-[10px] tracking-widest text-[#00C2FF] font-mono uppercase">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>INFORMATION CONSOLE // PROTOCOLS</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white uppercase">
            SYSTEM FAQ
          </h1>
          <p className="text-sm text-zinc-400 leading-relaxed font-sans">
            Resolve common operational and biochemical inquiries regarding the Aesthetix ecosystem. Select a category module below to review details.
          </p>
        </div>

        {/* FAQ Accordion list */}
        <div className="space-y-4">
          {faqs.map((faq) => {
            const isExpanded = expandedId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                  isExpanded
                    ? "bg-[#07070a] border-[#00C2FF] shadow-[0_0_15px_rgba(0,194,255,0.05)]"
                    : "bg-white/[0.01] border-white/[0.03] hover:border-white/[0.08]"
                }`}
              >
                {/* Accordion Trigger */}
                <button
                  onClick={() => toggleExpand(faq.id)}
                  className="w-full text-left p-6 flex justify-between items-center cursor-pointer font-mono"
                >
                  <div className="flex gap-4 items-center pr-4">
                    <span className="text-[9px] text-[#00C2FF] font-bold tracking-widest uppercase bg-[#00C2FF]/5 border border-[#00C2FF]/10 px-2 py-0.5 rounded">
                      {faq.category}
                    </span>
                    <span className="text-xs font-bold text-white tracking-wider uppercase">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-500 transition-transform duration-300 flex-shrink-0 ${
                      isExpanded ? "rotate-180 text-[#00C2FF]" : ""
                    }`}
                  />
                </button>

                {/* Accordion Content */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isExpanded ? "max-h-[300px] border-t border-white/[0.03]" : "max-h-0"
                  }`}
                >
                  <p className="p-6 text-xs text-zinc-400 leading-relaxed font-sans">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global info support footer */}
        <div className="mt-12 p-6 rounded-xl border border-white/[0.03] bg-white/[0.01] flex items-center justify-between font-mono text-[9px] text-zinc-500">
          <span className="flex items-center gap-1.5 uppercase">
            <ShieldCheck className="w-4 h-4 text-emerald-500" /> SECURE RESOLUTION PROTOCOLS ACTIVE
          </span>
          <span>SYSTEM VERSION: V1.12</span>
        </div>

      </div>
    </div>
  );
}
