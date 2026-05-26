"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, Search, Cpu, ArrowRight, Clock, User } from "lucide-react";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: "neuromuscular" | "metabolic" | "longevity";
}

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<"all" | "neuromuscular" | "metabolic" | "longevity">("all");

  const posts: BlogPost[] = [
    {
      slug: "cns-fatigue-and-adaptogens",
      title: "MITIGATING SYMPATHETIC CNS STRAIN VIA WITHANOLIDE INJECTION",
      excerpt: "An in-depth chemical analysis of how KSM-66 Ashwagandha blocks cortisol binding sites on neural membranes to promote delta-wave sleep induction and fast repair.",
      author: "Dr. Victor Vance",
      date: "2026-05-18",
      readTime: "8 MIN READ",
      category: "neuromuscular"
    },
    {
      slug: "phosphagen-atp-resynthesis",
      title: "OPTIMIZING INTRAMUSCULAR ATP RE-SYNTHESIS UNDER ANEROBIC LOAD",
      excerpt: "Reviewing the rate-limiting chemical barriers of phosphocreatine loading. How to maximize motor unit contraction velocity through Creapure supplementation protocols.",
      author: "Elena Rostova, MSc",
      date: "2026-05-10",
      readTime: "6 MIN READ",
      category: "metabolic"
    },
    {
      slug: "marine-peptides-connective-tissue",
      title: "HYDROLYZED TYPE-I MARINE COLLAGEN PEPTIDE SYNTHESIS IN TENDONS",
      excerpt: "Tracing the direct uptake of low-molecular-weight amino acids in load-bearing connective tissue. Proving repair speed increases of up to 30% in active joints.",
      author: "Dr. Alan Mercer",
      date: "2026-04-28",
      readTime: "10 MIN READ",
      category: "longevity"
    }
  ];

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full bg-[#050505] text-[#F5F7FA] py-32 px-6 sm:px-12 md:px-24">
      <div className="absolute inset-0 bg-cyber-grid opacity-10 pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="space-y-4 max-w-xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00C2FF]/10 border border-[#00C2FF]/20 text-[10px] tracking-widest text-[#00C2FF] font-mono uppercase">
            <BookOpen className="w-3.5 h-3.5" />
            <span>RESEARCH JOURNAL // PHYSIOLOGY</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white uppercase">
            RESOURCES & RESEARCH
          </h1>
          <p className="text-sm text-zinc-400 leading-relaxed font-sans">
            Deepen your understanding of exercise biology. Read science-backed literature, clinical trials summaries, and recovery optimization reports published by Aesthetix Labs.
          </p>
        </div>

        {/* Search & Category controls */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center border-b border-white/[0.04] pb-8 mb-12">
          {/* Categories */}
          <div className="flex flex-wrap gap-2.5 font-mono text-[9px] font-bold">
            {["all", "neuromuscular", "metabolic", "longevity"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat as any)}
                className={`px-4 py-2 rounded-lg border transition-all duration-300 uppercase cursor-pointer ${
                  activeCategory === cat
                    ? "bg-[#00C2FF] text-black border-[#00C2FF]"
                    : "bg-white/[0.01] text-zinc-500 border-white/[0.03] hover:text-white"
                }`}
              >
                {cat === "all" ? "ALL RESEARCH" : cat}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="flex items-center border border-white/[0.05] bg-[#07070a] rounded-lg px-3 py-2 w-full md:w-80">
            <Search className="w-4 h-4 text-zinc-500 mr-2" />
            <input
              type="text"
              placeholder="SEARCH JOURNAL INDEX"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-0 outline-none text-xs font-mono text-white placeholder-zinc-700 w-full focus:ring-0"
            />
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <Link 
              href={`/blog/${post.slug}`} 
              key={post.slug}
              className="group p-6 rounded-2xl border border-white/[0.03] bg-white/[0.01] hover:border-white/[0.08] hover:bg-white/[0.02] flex flex-col justify-between h-full transition-all duration-500 hover:shadow-[0_15px_30px_rgba(0,0,0,0.5)] scanlines"
            >
              <div className="space-y-4">
                {/* Meta details */}
                <div className="flex items-center gap-4 font-mono text-[8px] text-zinc-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#00C2FF]" /> {post.readTime}
                  </span>
                  <span>{post.date}</span>
                </div>

                <h3 className="text-sm font-black tracking-widest text-white leading-snug uppercase group-hover:text-[#00C2FF] transition-colors duration-300">
                  {post.title}
                </h3>

                <p className="text-xs text-zinc-400 leading-relaxed font-sans line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              {/* Read link */}
              <div className="mt-8 pt-4 border-t border-white/[0.04] flex items-center justify-between font-mono text-[9px] text-[#00C2FF]">
                <span className="flex items-center gap-1 uppercase">
                  <User className="w-3.5 h-3.5 text-zinc-500" /> {post.author}
                </span>
                <span className="flex items-center gap-1 uppercase font-bold tracking-widest group-hover:translate-x-1 transition-transform">
                  EXAMINE PAPER <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
