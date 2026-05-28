"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, Plus, Minus, Trash2, ArrowRight, Sparkles } from "lucide-react";
import { useStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const cart = useStore((state) => state.cart);
  const updateQuantity = useStore((state) => state.updateCartQuantity);
  const removeItem = useStore((state) => state.removeFromCart);
  
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState("");
  const [promoSuccess, setPromoSuccess] = useState("");

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const total = subtotal * (1 - discount);

  // Close drawer on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const applyPromo = () => {
    if (promoCode.trim().toUpperCase() === "BIO-UPGRADE") {
      setDiscount(0.15);
      setPromoSuccess("15% SYSTEM DISCOUNT APPLIED");
      setPromoError("");
    } else {
      setPromoError("INVALID ACCESS CODE");
      setPromoSuccess("");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#020204]/80 backdrop-blur-sm z-50 cursor-pointer"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[450px] bg-[#07070a]/95 border-l border-white/[0.04] backdrop-blur-xl z-50 flex flex-col shadow-[[-10px_0_30px_rgba(0,0,0,0.5)]] scanlines"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/[0.04] flex justify-between items-center bg-[#0a0a0f]/50">
              <div>
                <h3 className="text-sm font-bold tracking-widest text-white uppercase flex items-center gap-2">
                  CARTRIDGE CARGO <span className="text-[10px] font-mono text-[#00C2FF] bg-[#00C2FF]/10 px-2 py-0.5 rounded-full border border-[#00C2FF]/20">STABLE</span>
                </h3>
                <p className="text-[10px] font-mono text-zinc-500 mt-1">LOGGED AS CORE QUANTITY: {cart.reduce((s, i) => s + i.quantity, 0)}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full border border-white/[0.05] bg-white/[0.02] text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-20">
                  <div className="w-12 h-12 rounded-full border border-dashed border-zinc-700 flex items-center justify-center text-zinc-500">
                    <ShoppingBagIcon />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold tracking-wider text-zinc-300">CARGO BAY EMPTY</h4>
                    <p className="text-xs text-zinc-500 mt-1 max-w-[200px] mx-auto">Select recovery formulas from the lab shop to configure active load.</p>
                  </div>
                  <Link
                    href="/shop"
                    onClick={onClose}
                    className="mt-2 text-xs font-bold tracking-widest text-[#00C2FF] hover:text-[#00e5ff] transition-colors border border-[#00C2FF]/20 bg-[#00C2FF]/5 px-6 py-2 rounded-full hover:bg-[#00C2FF]/10"
                  >
                    ACCESS LAB STORE
                  </Link>
                </div>
              ) : (
                cart.map((item) => (
                  <motion.div
                    layout
                    key={item.product.id}
                    className="p-4 rounded-xl border border-white/[0.03] bg-white/[0.01] hover:bg-white/[0.02] hover:border-white/[0.06] transition-all flex items-start gap-4"
                  >
                    {/* Visual box block */}
                    <div
                      className="w-16 h-16 rounded-lg flex-shrink-0 flex items-center justify-center border text-xs font-mono font-black select-none"
                      style={{
                        backgroundColor: `${item.product.color}33`,
                        borderColor: item.product.color,
                        boxShadow: `0 0 10px ${item.product.color}22`
                      }}
                    >
                      <span style={{ color: item.product.color }}>
                        {item.product.name.split(" ").map((w) => w[0]).join("")}
                      </span>
                    </div>

                    {/* Information */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-xs font-bold tracking-widest uppercase text-white truncate">
                          {item.product.name}
                        </h4>
                        <span className="text-xs font-mono text-zinc-300 font-semibold">
                          ₹{(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                      <p className="text-[10px] font-mono text-zinc-500 uppercase truncate mt-0.5">
                        {item.product.flavorProfile}
                      </p>

                      {/* Control bar */}
                      <div className="flex justify-between items-center mt-3">
                        <div className="flex items-center border border-white/[0.05] bg-[#020204]/60 rounded-lg py-0.5 px-1.5 gap-2">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 text-zinc-400 hover:text-white transition-colors"
                          >
                            <Minus className="w-2.5 h-2.5" />
                          </button>
                          <span className="text-xs font-mono text-zinc-300 px-1 select-none">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 text-zinc-400 hover:text-white transition-colors"
                          >
                            <Plus className="w-2.5 h-2.5" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="text-zinc-500 hover:text-rose-500 transition-colors p-1 cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Cart Calculations */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-white/[0.04] bg-[#0a0a0f]/50 space-y-4">
                {/* Promo field */}
                <div className="space-y-1">
                  <div className="flex border border-white/[0.05] bg-[#020204]/60 rounded-lg p-1">
                    <input
                      type="text"
                      placeholder="ENTER PROTOCOL KEY (BIO-UPGRADE)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="bg-transparent border-0 outline-none flex-1 px-3 text-[10px] font-mono tracking-wider text-white placeholder-zinc-600 focus:ring-0 uppercase"
                    />
                    <button
                      onClick={applyPromo}
                      className="px-4 py-1.5 rounded-md bg-[#00C2FF] text-[#050508] text-[9px] font-black tracking-widest hover:bg-[#00e5ff] transition-colors cursor-pointer"
                    >
                      APPLY
                    </button>
                  </div>
                  {promoError && (
                    <p className="text-[9px] font-mono text-rose-500 pl-3 tracking-tighter">{promoError}</p>
                  )}
                  {promoSuccess && (
                    <p className="text-[9px] font-mono text-cyan-400 pl-3 tracking-tighter flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" /> {promoSuccess}
                    </p>
                  )}
                </div>

                {/* Subtotals */}
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between text-zinc-500">
                    <span>CARGO VALUE:</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-cyan-400">
                      <span>BIO-UPGRADE DISCOUNT:</span>
                      <span>-₹{(subtotal * discount).toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-zinc-500">
                    <span>NANOTECH DELIVERY:</span>
                    <span className="text-[#00C2FF] text-[10px] font-bold">COMPLIMENTARY</span>
                  </div>
                  <div className="border-t border-white/[0.03] pt-2 mt-2 flex justify-between text-sm font-bold text-white tracking-widest">
                    <span>NET LOADOUT:</span>
                    <span className="text-[#00C2FF] text-glow-cyan font-mono">₹{total.toFixed(2)}</span>
                  </div>
                </div>

                {/* CTA */}
                <Link
                  href="/checkout"
                  onClick={onClose}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-white text-black font-black text-xs tracking-widest transition-all duration-300 hover:bg-[#00C2FF] hover:text-black hover:shadow-[0_0_15px_rgba(0,194,255,0.4)] relative overflow-hidden group"
                >
                  PROCEED TO BIO-CHECKOUT
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <p className="text-[9px] font-mono text-zinc-600 text-center uppercase tracking-wider">
                  Secure checkout processed via Aesthetix Core telemetry
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function ShoppingBagIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
