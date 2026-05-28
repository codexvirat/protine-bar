"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, User, Menu, X, Activity } from "lucide-react";
import { useStore } from "@/lib/store";

interface NavbarProps {
  onCartClick: () => void;
}

export default function Navbar({ onCartClick }: NavbarProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cart = useStore((state) => state.cart);
  const user = useStore((state) => state.user);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "HOME", href: "/" },
    { name: "BUY NOW", href: "/shop" },
    { name: "PRODUCT", href: "/product/aesthetic-blueprint" },
    { name: "SUBSCRIPTION", href: "/subscribe" },
    { name: "EXPERIENCE", href: "/experience" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        scrolled
          ? "bg-[#050508]/80 backdrop-blur-md border-white/[0.04] py-4"
          : "bg-transparent border-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 flex justify-between items-center">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-xl font-black tracking-widest text-white transition-all duration-300 group-hover:text-cyan-400">
            AESTHETIX<span className="text-[#00C2FF]">.LABS</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-xs font-semibold tracking-widest transition-all duration-300 relative py-1 hover:text-white ${
                  isActive ? "text-[#00C2FF]" : "text-zinc-400"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#00C2FF] text-glow-cyan shadow-[0_0_8px_rgba(0,194,255,0.8)]" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Control Center */}
        <div className="flex items-center gap-4">
          {/* Biomarkers Status Quick-Link */}
          <Link
            href="/experience"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#00C2FF]/5 border border-[#00C2FF]/10 text-xs text-[#00C2FF] font-mono tracking-tighter"
            title="Biomarkers Status"
          >
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>SYS: 85%</span>
          </Link>

          {/* Account Portal */}
          <Link
            href="/account"
            className={`p-2 rounded-full border border-white/[0.05] bg-white/[0.02] text-zinc-300 transition-all duration-300 hover:text-[#00C2FF] hover:border-[#00C2FF]/30 ${
              pathname === "/account" ? "text-[#00C2FF] border-[#00C2FF]/30" : ""
            }`}
            title="Account Portal"
          >
            <User className="w-4 h-4" />
          </Link>

          {/* Cart Toggle */}
          <button
            onClick={onCartClick}
            className="p-2 rounded-full border border-white/[0.05] bg-white/[0.02] text-zinc-300 relative transition-all duration-300 hover:text-[#00C2FF] hover:border-[#00C2FF]/30 cursor-pointer"
            title="Cart Drawer"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#00C2FF] text-[#050508] text-[9px] font-black flex items-center justify-center shadow-[0_0_8px_rgba(0,194,255,0.8)]">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full border border-white/[0.05] bg-white/[0.02] text-zinc-300 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[65px] bg-[#050508]/95 border-b border-white/[0.04] backdrop-blur-lg flex flex-col py-8 px-6 gap-6 z-40 animate-in fade-in slide-in-from-top-4 duration-300">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                onClick={() => setMobileMenuOpen(false)}
                href={link.href}
                className={`text-sm font-bold tracking-widest py-2 border-b border-white/[0.02] hover:text-white ${
                  isActive ? "text-[#00C2FF]" : "text-zinc-400"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
