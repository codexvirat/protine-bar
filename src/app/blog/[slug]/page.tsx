"use client";

import { use } from "react";
import Link from "next/link";
import { ChevronLeft, Clock, User, Share2, Award, Cpu, ShieldCheck } from "lucide-react";

export default function BlogPostDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);

  // Mock articles database
  const articles: { [key: string]: { title: string; author: string; role: string; date: string; readTime: string; body: string[]; bibliography: string[] } } = {
    "cns-fatigue-and-adaptogens": {
      title: "MITIGATING SYMPATHETIC CNS STRAIN VIA WITHANOLIDE INJECTION",
      author: "Dr. Victor Vance",
      role: "CNS Physiology & Neurochemistry Labs",
      date: "2026-05-18",
      readTime: "8 MIN READ",
      body: [
        "Following high-intensity resistance training or extreme cardiovascular output, the sympathetic nervous system triggers elevated release of glucocortocoids—primarily cortisol. While acute rises in cortisol spur energy mobilization, chronic post-exercise elevations inhibit glycogen synthesis, suppress protein transcription, and degrade sleep architecture by reducing slow-wave delta phases.",
        "KSM-66® Ashwagandha (Withania somnifera extract) has emerged as a crucial bio-adaptogen for buffering this endocrine response. Its active withanolide compounds interact with high-affinity cortisol receptor sites on neural membranes, blunting HPA axis stimulation. The biochemical result is down-regulated systemic arousal, permitting a smoother transition into parasympathetic rebuilding states.",
        "Spectroscopy analysis confirms that a daily therapeutic dosage of 600mg, administered post-workout, blunts serum cortisol spikes by up to 27.9%. This reduction in stress indicators facilitates rapid amino acid transportation into exhausted muscle fibers, expediting overall cell regeneration."
      ],
      bibliography: [
        "Vance, V. et al. (2024). 'HPA-Axis Regulation via Bioactive Withanolide Administration post-exertion.' Journal of CNS Science, 14(2), 112-124.",
        "Rostova, E. (2025). 'Comparative Bioavailability of Chelated Mineral Arrays on Neuro-muscular Synapses.' Sports Biochemistry Quarterly, 8(3), 45-56."
      ]
    },
    "phosphagen-atp-resynthesis": {
      title: "OPTIMIZING INTRAMUSCULAR ATP RE-SYNTHESIS UNDER ANEROBIC LOAD",
      author: "Elena Rostova, MSc",
      role: "Mitochondrial Energy Systems Lab",
      date: "2026-05-10",
      readTime: "6 MIN READ",
      body: [
        "Anaerobic peak contraction (above 85% VO2 Max) exhausts the muscle cell's immediate ATP pools within 6-10 seconds. The secondary restoration pathway relies on the phosphagen system: transfer of a high-energy phosphate group from phosphocreatine to ADP. In the presence of inadequate cellular creatine reserves, peak velocity falls off rapidly, inducing premature lactic accumulation.",
        "Creapure® Creatine Monohydrate acts as an elite donor for immediate intracellular phosphagen reserves. Micro-dosed loading (3000mg) ensures saturation of the skeletal muscles without causing the water retention or gastric distress associated with coarse, lower-grade creatine imports.",
        "By maintaining cellular hydration volume (intracellular osmotic pressure), Creapure also stimulates secondary anabolic signalling, upregulating myogenic regulatory factors. Integrating 3000mg of creatine into a fast-digesting protein bar matrix maximizes uptake speed via insulin-mediated transport mechanisms."
      ],
      bibliography: [
        "Rostova, E. (2023). 'Phosphagen Kinase Kinetics During Intermittent Muscle Contractile Stress.' Sports Metabolism Review, 19(4), 210-219.",
        "Mercer, A. (2025). 'Upregulation of Myogenic Signalling Pathways via Intracellular Osmotic Saturation.' Journal of Cellular Physiology, 301(2), 89-98."
      ]
    },
    "marine-peptides-connective-tissue": {
      title: "HYDROLYZED TYPE-I MARINE COLLAGEN PEPTIDE SYNTHESIS IN TENDONS",
      author: "Dr. Alan Mercer",
      role: "Connective Tissue Repair & Structural Longevity",
      date: "2026-04-28",
      readTime: "10 MIN READ",
      body: [
        "Skeletal muscle adaptations frequently outpace the structural load-bearing capacity of surrounding tendons and ligaments. Connective tissues possess minimal vascularity compared to muscle fibers, relying on passive nutrient diffusion. This results in delayed recovery of tendon stiffness, causing joint pain or chronic insertional tendinopathy.",
        "Hydrolyzed Marine Collagen Peptides, micro-filtered to a low molecular weight (below 2000 Daltons), bypass gastric breakdown to enter the bloodstream as intact proline-hydroxyproline dipeptides. These peptide chains act as chemotactic signals, binding to fibroblasts in connective tissues to trigger endogenous Type-I collagen synthesis.",
        "Clinical verification shows that consuming 5000mg of marine peptides along with Vitamin C (a critical cofactor for prolyl hydroxylase enzymes) significantly elevates collagen density in joints, closing recovery gaps for athletes under high volume or high impact strain."
      ],
      bibliography: [
        "Mercer, A. et al. (2024). 'Fibroblast Proliferation and Fibrogenesis via Marine Peptide Administration.' Connective Tissue Journal, 34(5), 322-331.",
        "Vance, V. (2025). 'Lysyl Oxidase Cross-linking Mechanisms under Collagen Substrate Loading.' Longevity Sciences Quarterly, 12(1), 57-69."
      ]
    }
  };

  const article = articles[slug] || articles["cns-fatigue-and-adaptogens"];

  return (
    <div className="w-full bg-[#050505] text-[#F5F7FA] py-32 px-6 sm:px-12 md:px-24">
      <div className="absolute inset-0 bg-cyber-grid opacity-10 pointer-events-none z-0" />

      <div className="max-w-3xl mx-auto relative z-10">
        
        {/* Back Link */}
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-1 text-[10px] font-mono tracking-widest text-zinc-500 hover:text-white transition-colors mb-12 uppercase"
        >
          <ChevronLeft className="w-4 h-4" /> JOURNAL HOME
        </Link>

        {/* Article Container */}
        <article className="space-y-8">
          
          {/* Header */}
          <div className="space-y-6 border-b border-white/[0.04] pb-8">
            <div className="flex flex-wrap items-center gap-4 font-mono text-[9px] text-[#00C2FF]">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {article.readTime}
              </span>
              <span className="text-zinc-500">PUBLISHED: {article.date}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-widest text-white leading-tight uppercase">
              {article.title}
            </h1>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#00C2FF]/10 border border-[#00C2FF]/20 flex items-center justify-center text-xs font-mono text-[#00C2FF] font-black">
                {article.author.split(" ").map(n => n[0]).join("")}
              </div>
              <div className="font-mono text-[9px]">
                <span className="text-white block uppercase font-bold">{article.author}</span>
                <span className="text-zinc-500 uppercase">{article.role}</span>
              </div>
            </div>
          </div>

          {/* Body content */}
          <div className="space-y-6 font-sans text-sm text-zinc-400 leading-relaxed">
            {article.body.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {/* Scientific credentials callout */}
          <div className="p-6 rounded-2xl border border-white/[0.04] bg-[#07070a]/90 relative overflow-hidden scanlines flex gap-4">
            <Cpu className="w-6 h-6 text-[#00C2FF] flex-shrink-0" />
            <div className="space-y-1">
              <span className="font-mono text-[9px] text-zinc-500 block">PEER-REVIEWED VALIDATION STATUS</span>
              <span className="font-mono text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" /> VERIFIED SCIENTIFIC AUTHORITY
              </span>
              <p className="text-[11px] text-zinc-400 font-sans leading-relaxed pt-1">
                This document is verified and signed by the Aesthetix biochemistry committee. All biochemical claims align with clinical parameters.
              </p>
            </div>
          </div>

          {/* Bibliography / Citations */}
          <div className="border-t border-white/[0.04] pt-8 space-y-4">
            <h3 className="font-mono text-[10px] text-zinc-500 tracking-wider uppercase flex items-center gap-1">
              <Award className="w-4 h-4 text-[#00C2FF]" /> JOURNAL REFERENCES & BIBLIOGRAPHY
            </h3>
            <div className="space-y-2 font-mono text-[9px] text-zinc-500">
              {article.bibliography.map((bib, idx) => (
                <div key={idx} className="p-2 border border-white/[0.01] bg-white/[0.005] rounded">
                  <span>{bib}</span>
                </div>
              ))}
            </div>
          </div>

        </article>

      </div>
    </div>
  );
}
