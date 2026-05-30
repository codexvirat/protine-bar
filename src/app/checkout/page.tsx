"use client";

import { useStore } from "@/lib/store";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Cpu, ShieldCheck, ArrowRight, ShoppingBag, CreditCard, QrCode, AlertCircle, RefreshCw, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CheckoutPage() {
  const cart = useStore((state) => state.cart);
  const user = useStore((state) => state.user);
  const clearCart = useStore((state) => state.clearCart);
  const discount = useStore((state) => state.discount);
  const promoCode = useStore((state) => state.promoCode);
  
  const router = useRouter();

  // User input details
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [address, setAddress] = useState(user.address || "");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [pincode, setPincode] = useState("");
  const [biomarkerToken, setBiomarkerToken] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Simulated Razorpay Overlay Modal State
  const [showRazorpay, setShowRazorpay] = useState(false);
  const [createdOrderId, setCreatedOrderId] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [razorpayMethod, setRazorpayMethod] = useState<"card" | "upi" | "netbanking">("upi");
  
  // Simulated Card/UPI inputs
  const [simCardNum, setSimCardNum] = useState("");
  const [simUpi, setSimUpi] = useState("");
  const [processingPayment, setProcessingPayment] = useState(false);

  // Prefill details and check auth session
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) {
          router.push("/login");
        }
      } catch (err) {
        console.error("Session verification failed:", err);
      }
    }
    checkAuth();

    if (user.authenticated) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setAddress(user.address || "");
    }
  }, [user, router]);

  // Total pricing calculations
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = subtotal * discount;
  const netTotal = subtotal - discountAmount;

  // Handle Order Initialization
  const handleInitiateOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    if (!name || !email || !phone || !address || !city || !stateName || !pincode) {
      setError("Please declare all required delivery coordinates.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/order/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          address,
          city,
          state: stateName,
          pincode,
          biomarkerToken,
          promoCode,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Order initialization failed");
      } else {
        setCreatedOrderId(data.orderId);
        setOrderNumber(data.orderNumber);
        setShowRazorpay(true); // Open simulated Razorpay popup
      }
    } catch (err) {
      setError("Failed to link with order placement APIs.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Razorpay Payment simulation and verification
  const handleSimulatePayment = async () => {
    setProcessingPayment(true);
    setError("");

    try {
      const paymentId = `pay_sim_${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
      
      const res = await fetch("/api/order/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: createdOrderId,
          razorpayPaymentId: paymentId,
          razorpaySignature: `sig_sim_${Math.random().toString(36).substring(2, 10)}`,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Payment verification failed");
        setProcessingPayment(false);
        setShowRazorpay(false);
      } else {
        // Clear local Zustand cart
        clearCart();
        
        // Redirect to success route
        router.push(`/checkout/success?orderNumber=${orderNumber}`);
      }
    } catch (err) {
      setError("Payment compliance link failed.");
      setProcessingPayment(false);
      setShowRazorpay(false);
    }
  };

  return (
    <div className="w-full bg-[#050505] text-[#F5F7FA] py-32 px-6 sm:px-12 md:px-24 min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-cyber-grid opacity-10 pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,rgba(0,194,255,0.03)_0%,transparent_70%)] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        
        {/* Header */}
        <div className="space-y-4 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00C2FF]/10 border border-[#00C2FF]/20 text-[10px] tracking-widest text-[#00C2FF] font-mono uppercase">
            <CreditCard className="w-3.5 h-3.5" />
            <span>TRANSACTION GATEWAY // SECURED ACCESS</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white uppercase">
            BIO-CHECKOUT
          </h1>
          <p className="text-sm text-zinc-400 leading-relaxed font-sans">
            Declare dispatch details to initialize transaction. Secure payment processing is configured via Razorpay Test Integration.
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="min-h-[300px] flex flex-col items-center justify-center text-center gap-4 py-8 max-w-sm mx-auto border border-white/[0.03] bg-white/[0.01] rounded-xl p-6">
            <ShoppingBag className="w-12 h-12 text-zinc-700" />
            <h3 className="font-mono text-sm font-bold text-zinc-300 uppercase">CART IS EMPTY</h3>
            <Link
              href="/shop"
              className="mt-2 text-xs font-bold tracking-widest text-[#00C2FF] border border-[#00C2FF]/30 px-6 py-3 rounded-lg hover:bg-[#00C2FF]/5 uppercase"
            >
              ACCESS LAB STORE
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Form Fields (Left Column) */}
            <form onSubmit={handleInitiateOrder} className="lg:col-span-8 space-y-8 font-mono text-xs text-zinc-400">
              
              {error && (
                <div className="flex items-center gap-2 p-3 rounded-lg border border-rose-500/20 bg-rose-500/5 text-rose-400 font-mono text-[10px] text-left">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Shipping Address */}
              <div className="space-y-4">
                <span className="text-[#00C2FF] font-bold block uppercase border-b border-white/[0.04] pb-2 tracking-widest text-[10px]">
                  01 // RECIPIENT & LOCATION DETAILS
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-zinc-500 block">RECIPIENT FULL NAME:</label>
                    <input
                      type="text"
                      required
                      placeholder="Alexis Stark"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#07070a]/80 border border-white/[0.05] p-3 rounded-lg text-white outline-none focus:border-[#00C2FF] transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-zinc-500 block">COMMUNICATION NODE (EMAIL):</label>
                    <input
                      type="email"
                      required
                      placeholder="stark@aesthetix.lab"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#07070a]/80 border border-white/[0.05] p-3 rounded-lg text-white outline-none focus:border-[#00C2FF] transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-zinc-500 block">CONTACT SIGNAL (PHONE):</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#07070a]/80 border border-white/[0.05] p-3 rounded-lg text-white outline-none focus:border-[#00C2FF] transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-zinc-500 block">OPTIONAL BIOMARKER API CONSOLE TOKEN:</label>
                    <input
                      type="text"
                      placeholder="TOKEN_KEY: e.g. BIO-AESTH-X901"
                      value={biomarkerToken}
                      onChange={(e) => setBiomarkerToken(e.target.value)}
                      className="w-full bg-[#07070a]/80 border border-white/[0.05] p-3 rounded-lg text-white outline-none focus:border-[#00C2FF] transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-zinc-500 block">STREET PHYSICAL ADDRESS:</label>
                  <input
                    type="text"
                    required
                    placeholder="Sector 4, Building 12, Cyber City"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-[#07070a]/80 border border-white/[0.05] p-3 rounded-lg text-white outline-none focus:border-[#00C2FF] transition-all"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-zinc-500 block">CITY:</label>
                    <input
                      type="text"
                      required
                      placeholder="Mumbai"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-[#07070a]/80 border border-white/[0.05] p-3 rounded-lg text-white outline-none focus:border-[#00C2FF] transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-zinc-500 block">STATE:</label>
                    <input
                      type="text"
                      required
                      placeholder="Maharashtra"
                      value={stateName}
                      onChange={(e) => setStateName(e.target.value)}
                      className="w-full bg-[#07070a]/80 border border-white/[0.05] p-3 rounded-lg text-white outline-none focus:border-[#00C2FF] transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-zinc-500 block">PINCODE:</label>
                    <input
                      type="text"
                      required
                      placeholder="400001"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="w-full bg-[#07070a]/80 border border-white/[0.05] p-3 rounded-lg text-white outline-none focus:border-[#00C2FF] transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-lg bg-white hover:bg-[#00C2FF] text-black font-black text-xs tracking-widest transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(0,194,255,0.3)] cursor-pointer uppercase disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      RESERVE LAB STOCK...
                    </>
                  ) : (
                    <>
                      COMPILE DISPATCH ORDER
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

            </form>

            {/* Cart Summary (Right Column) */}
            <div className="lg:col-span-4 p-6 rounded-2xl border border-white/[0.04] bg-[#07070a]/90 relative overflow-hidden scanlines shadow-2xl space-y-6">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00C2FF]/30 to-transparent" />
              <span className="font-mono text-xs text-white tracking-widest block uppercase border-b border-white/[0.04] pb-2">
                CARGO DETAILS
              </span>
              
              <div className="space-y-4 max-h-60 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex justify-between items-center gap-3 text-xs font-mono">
                    <div>
                      <span className="text-white uppercase font-bold block">{item.product.name}</span>
                      <span className="text-[10px] text-zinc-500 uppercase">
                        {item.quantity} units x ₹{item.product.price.toFixed(2)}
                      </span>
                    </div>
                    <span className="text-white font-bold">₹{(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 border-t border-white/[0.04] pt-4 text-[10px] font-mono text-zinc-500">
                <div className="flex justify-between">
                  <span>CARGO VALUE:</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-cyan-400">
                    <span>{promoCode} DISCOUNT:</span>
                    <span>-₹{discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>EXPRESS SHIPPING:</span>
                  <span className="text-[#00C2FF] font-bold">COMPLIMENTARY</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white tracking-widest border-t border-white/[0.03] pt-3 mt-3">
                  <span>NET ORDER COST:</span>
                  <span className="text-[#00C2FF] text-glow-cyan font-mono">₹{netTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[8px] font-mono text-zinc-600 justify-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>RAZORPAY CRYPTOGRAPHIC SECURITY SYNC</span>
              </div>
            </div>

          </div>
        )}
      </div>

      {/* ─── Holographic Razorpay simulated Pop-up Overlay ─── */}
      <AnimatePresence>
        {showRazorpay && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-6">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md bg-[#0c0c12] border border-[#00C2FF]/30 rounded-2xl relative overflow-hidden font-sans shadow-[0_0_50px_rgba(0,194,255,0.15)] flex flex-col"
            >
              {/* Top Razorpay bar */}
              <div className="bg-[#11111a] p-4 flex justify-between items-center border-b border-white/[0.03]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-[#00C2FF] flex items-center justify-center font-mono font-black text-black text-xs">
                    R
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white tracking-wide uppercase">Razorpay Checkout</h4>
                    <span className="text-[8px] font-mono text-zinc-500 block">TEST TRANSACT SECURED</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[8px] text-zinc-500 block">BILLING AMT:</span>
                  <span className="text-xs font-mono font-bold text-[#00C2FF]">₹{netTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* simulated options */}
              <div className="p-6 space-y-6 flex-1">
                <div className="space-y-2">
                  <label className="text-[9px] font-mono text-zinc-500 block uppercase">CHOOSE SIMULATED TRANSACT GATEWAY:</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { key: "upi", label: "UPI", icon: QrCode },
                      { key: "card", label: "CARD", icon: CreditCard }
                    ].map((m) => {
                      const Icon = m.icon;
                      const isSelected = razorpayMethod === m.key;
                      return (
                        <button
                          key={m.key}
                          type="button"
                          onClick={() => setRazorpayMethod(m.key as any)}
                          className={`p-3 rounded-lg border flex flex-col items-center gap-2 transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[#00C2FF]/10 border-[#00C2FF] text-[#00C2FF]"
                              : "bg-[#14141f]/50 border-white/[0.03] text-zinc-400 hover:text-white"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span className="text-[8px] font-mono font-black">{m.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="min-h-[100px] bg-[#14141f]/30 border border-white/[0.03] p-4 rounded-xl">
                  {razorpayMethod === "upi" && (
                    <div className="space-y-3 font-mono text-[10px]">
                      <label className="text-zinc-500 block">VIRTUAL PAYMENT ADDRESS (VPA):</label>
                      <input
                        type="text"
                        placeholder="e.g. stark@upi"
                        value={simUpi}
                        onChange={(e) => setSimUpi(e.target.value)}
                        className="w-full bg-[#1b1b29]/80 border border-white/[0.05] p-2.5 rounded text-white outline-none focus:border-[#00C2FF] text-xs"
                      />
                      <span className="text-[8px] text-zinc-500 block leading-relaxed uppercase">
                        Input any mock ID (e.g., razorpay@pay) to execute verification call on the backend.
                      </span>
                    </div>
                  )}

                  {razorpayMethod === "card" && (
                    <div className="space-y-3 font-mono text-[10px]">
                      <label className="text-zinc-500 block">CREDIT CARD SECTOR TOKEN:</label>
                      <input
                        type="text"
                        placeholder="4111 1111 1111 1111"
                        value={simCardNum}
                        onChange={(e) => setSimCardNum(e.target.value)}
                        className="w-full bg-[#1b1b29]/80 border border-white/[0.05] p-2.5 rounded text-white outline-none focus:border-[#00C2FF] text-xs text-center"
                      />
                      <span className="text-[8px] text-zinc-500 block leading-relaxed uppercase">
                        Verify using test visa tokens (e.g., 4111 1111...) to approve order deployment logs.
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={handleSimulatePayment}
                    disabled={processingPayment}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-[#00C2FF] hover:bg-[#00e5ff] text-black font-black text-xs tracking-widest uppercase transition-all shadow-[0_0_15px_rgba(0,194,255,0.2)] disabled:opacity-50 cursor-pointer"
                  >
                    {processingPayment ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        PROCESSING SECURE TRANSACT...
                      </>
                    ) : (
                      <>
                        PAY ₹{netTotal.toFixed(2)} [TEST GATE]
                        <Check className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    disabled={processingPayment}
                    onClick={() => setShowRazorpay(false)}
                    className="w-full text-center text-zinc-500 hover:text-zinc-300 font-mono text-[9px] uppercase hover:underline disabled:opacity-50 cursor-pointer"
                  >
                    ABORT PAYMENT CHANNEL
                  </button>
                </div>
              </div>

              {/* Bottom security badges */}
              <div className="bg-[#11111a] p-3 text-center text-[7px] font-mono text-zinc-600 border-t border-white/[0.03]">
                SECURE GATEWAY ENCRYPTED VIA HTTPS CLIENT // BYPASS PROD CHECKS ACTIVE
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
