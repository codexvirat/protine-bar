"use client";

import { useEffect, useState } from "react";
import Lenis from "lenis";
import Navbar from "./navbar";
import CartDrawer from "./cart-drawer";
import { useStore } from "@/lib/store";
import { usePathname } from "next/navigation";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [cartOpen, setCartOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Clean up
    return () => {
      lenis.destroy();
    };
  }, [pathname]);

  const setUser = useStore((state) => state.setUser);
  const setCart = useStore((state) => state.setCart);

  useEffect(() => {
    async function initSession() {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          setUser({ ...data.user, authenticated: true });
          
          // Fetch user's persistent cart from DB
          const cartRes = await fetch("/api/cart");
          if (cartRes.ok) {
            const cartData = await cartRes.json();
            const formattedCart = cartData.items.map((item: any) => ({
              product: item.product,
              quantity: item.quantity
            }));
            setCart(formattedCart);
          }
        } else {
          setUser({
            name: "Guest Athlete",
            email: "",
            subscribed: false,
            authenticated: false,
            orders: []
          });
        }
      } catch (err) {
        console.error("Session sync failed:", err);
      }
    }
    
    initSession();
  }, [setUser, setCart]);

  return (
    <div className="flex flex-col min-h-screen bg-[#050505] text-[#F5F7FA] relative antialiased selection:bg-[#00C2FF]/30 selection:text-[#00C2FF]">
      {/* Background Cybernetic Noise Grid */}
      <div className="fixed inset-0 bg-cyber-grid opacity-30 pointer-events-none z-0" />
      
      {/* Ambient Glows */}
      <div className="fixed top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle,rgba(0,194,255,0.04)_0%,transparent_70%)] pointer-events-none z-0" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle,rgba(255,51,102,0.03)_0%,transparent_70%)] pointer-events-none z-0" />

      {/* Floating Header Navbar */}
      <Navbar onCartClick={() => setCartOpen(true)} />

      {/* Cart Drawer */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Main Viewport Content */}
      <main className="flex-1 flex flex-col w-full z-10 relative">
        {children}
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#08080A] border-t border-white/[0.03] py-16 px-6 sm:px-12 md:px-24 z-10 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="flex flex-col gap-4">
            <span className="text-xl font-bold tracking-widest text-white">AESTHETIX<span className="text-[#00C2FF]">.LABS</span></span>
            <p className="text-sm text-zinc-500 max-w-xs leading-relaxed">
              Engineered performance nutrition designed for clean muscle recovery, cellular ATP synthesis, and structural integrity.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-zinc-400 tracking-widest uppercase mb-4">Formulations</h4>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li><a href="/product/aesthetic-blueprint" className="hover:text-white transition-colors">Aesthetic Blueprint (anabolic load)</a></li>
              <li><a href="/product/collagen-glow" className="hover:text-white transition-colors">Collagen Glow (radiance repair)</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-zinc-400 tracking-widest uppercase mb-4">Research & Lab</h4>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li><a href="/science" className="hover:text-white transition-colors">Ingredient Science</a></li>
              <li><a href="/about" className="hover:text-white transition-colors">About our Lab</a></li>
              <li><a href="/experience" className="hover:text-white transition-colors">Biomarker Tracker</a></li>
              <li><a href="/blog" className="hover:text-white transition-colors">Research Journal</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-zinc-400 tracking-widest uppercase mb-4">Telemetry Console</h4>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li><a href="/faq" className="hover:text-white transition-colors">System FAQ</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Support Channels</a></li>
              <li><a href="/account" className="hover:text-white transition-colors">User Account Portal</a></li>
              <li className="text-xs text-zinc-600 mt-4">System Status: <span className="text-emerald-500 font-mono">ONLINE</span></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-white/[0.03] mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-zinc-600">
          <div>
            © {new Date().getFullYear()} AESTHETIX LABS. All rights reserved. Precision Recovery Systems.
          </div>
          <div className="font-mono text-[10px] text-zinc-500">
            DESIGNED & DEVELOPED BY <a href="https://codexvirat.in" target="_blank" rel="noopener noreferrer" className="text-[#00C2FF] hover:text-[#00e5ff] font-bold transition-colors">CODEXVIRAT</a>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Terms of Protocol</a>
            <a href="#" className="hover:text-white transition-colors">Data Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Biometric Disclaimers</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
