import { create } from "zustand";

export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number;
  rating: number;
  reviewsCount: number;
  color: string; // Tailwind hex color
  accentColor: string; // Electric Cyan etc
  bgGlow: string; // CSS glow class
  textColor: string;
  nutrition: {
    protein: string;
    carbs: string;
    fat: string;
    calories: number;
    activeIngredients: { name: string; dose: string; purpose: string }[];
  };
  flavorProfile: string;
  description: string;
  benefits: string[];
  scientificFocus: string;
  psychologicalFocus: string;
  category: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface WorkoutSim {
  type: string;
  duration: number;
  intensity: "low" | "medium" | "high";
  timestamp: string;
}

export interface SubscriptionBox {
  items: { [productId: string]: number }; // product ID -> count
  frequency: "14" | "30"; // days
  active: boolean;
}

interface AppState {
  products: Product[];
  cart: CartItem[];
  subscription: SubscriptionBox;
  recoveryScore: number;
  biomarkers: {
    hydration: number; // 0-100
    atpLevel: number; // 0-100
    cortisol: number; // 0-100
    muscleFatigue: number; // 0-100
  };
  workouts: WorkoutSim[];
  user: {
    id?: string;
    name: string;
    email: string;
    phone?: string;
    address?: string;
    subscribed: boolean;
    isAdmin?: boolean;
    orders: { id: string; date: string; total: number; status: string; items: CartItem[] }[];
    authenticated?: boolean;
  };
  
  // Actions
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  
  // Subscription actions
  updateSubscriptionBox: (productId: string, count: number) => void;
  setSubscriptionFrequency: (freq: "14" | "30") => void;
  activateSubscription: () => void;
  cancelSubscription: () => void;

  // Biomarker actions
  addWorkout: (workout: WorkoutSim) => void;
  simulateRecovery: () => void;
  resetBiomarkers: () => void;

  // Checkout actions
  createOrder: (address: string) => void;
  setUser: (user: any) => void;
  setCart: (cart: CartItem[]) => void;
  promoCode: string;
  discount: number;
  applyPromoCode: (code: string) => boolean;
  clearPromoCode: () => void;
}

export const useStore = create<AppState>((set, get) => ({
  products: [
    {
      id: "aesthetic-blueprint",
      name: "Aesthetic Blueprint",
      tagline: "YOUR AESTHETIC BLUEPRINT IN A WRAPPER",
      price: 399.00,
      rating: 4.9,
      reviewsCount: 512,
      color: "#00C2FF",
      accentColor: "#00C2FF",
      bgGlow: "rgba(0,194,255,0.15)",
      textColor: "text-[#00C2FF]",
      nutrition: {
        protein: "24g",
        carbs: "2g",
        fat: "5g",
        calories: 200,
        activeIngredients: [
          { name: "Bioactive Whey Isolate", dose: "24g", purpose: "Muscle nitrogen retention" },
          { name: "Creapure® Creatine Monohydrate", dose: "3000mg", purpose: "Intramuscular ATP synthesis" },
          { name: "L-Glutamine Amino Acid", dose: "2000mg", purpose: "Gastric lining and muscle recovery" },
          { name: "KSM-66® Ashwagandha", dose: "600mg", purpose: "Blunting HPA-axis stress cortisol" }
        ]
      },
      flavorProfile: "Glacial Mint & Crisp Dark Cacao",
      description: "Precision-engineered post-workout formula. Restores high-energy phosphagen ATP reservoirs and establishes critical muscle nitrogen levels while blunting sympathetic cortisol markers. Formulated without synthetic sugars or bloating fibers for optimal physical restoration.",
      benefits: [
        "Upregulates Muscle Nitrogen Recovery",
        "Sustains Peak Anaerobic Contraction Velocity",
        "Mitigates Sympathetic Post-Exertion Cortisol Spikes",
        "Zero FODMAP Gastric Emptying Integration"
      ],
      scientificFocus: "CNS Recovery & Anabolic Support",
      psychologicalFocus: "Elite. Optimized. Disciplined. High-Performance.",
      category: "anabolic"
    },
    {
      id: "collagen-glow",
      name: "Collagen Glow",
      tagline: "COLLAGEN GLOW: REPAIR & RADIANCE",
      price: 399.00,
      rating: 4.8,
      reviewsCount: 387,
      color: "#FF3366",
      accentColor: "#FF3366",
      bgGlow: "rgba(255,51,102,0.15)",
      textColor: "text-[#FF3366]",
      nutrition: {
        protein: "20g",
        carbs: "3g",
        fat: "6g",
        calories: 190,
        activeIngredients: [
          { name: "Bioactive Marine Collagen Builders", dose: "5000mg", purpose: "Joint structure and skin matrix" },
          { name: "Pure Whey Isolate Core", dose: "20g", purpose: "Myofibrillar nitrogen retention" },
          { name: "L-Glutamine Amino Acid", dose: "1500mg", purpose: "Synovial fluid hydration" },
          { name: "KSM-66® Ashwagandha", dose: "400mg", purpose: "Buffer stress-induced dermal degradation" }
        ]
      },
      flavorProfile: "Rich Madagascan Vanilla & Almond Butter",
      description: "A fusion of advanced beauty science and muscle recovery. Delivers low-molecular-weight marine collagen peptides alongside pure whey isolate to rebuild connective tissues, hydrate joint structures, and promote skin elasticity while regulating systemic stress.",
      benefits: [
        "Triggers Endogenous Connective Matrix Synthesis",
        "Promotes Epidermal Skin Cell Glow & Hydration",
        "Reinforces Joint Cartilage Integrity",
        "Buffers Dermal Stress Degradation Factors"
      ],
      scientificFocus: "Beauty-Performance & Joint Integrity",
      psychologicalFocus: "Premium Wellness. Modern Beauty Science. Healthy Lifestyle.",
      category: "glow"
    }
  ],
  cart: [],
  promoCode: "",
  discount: 0,
  subscription: {
    items: {
      "aesthetic-blueprint": 6,
      "collagen-glow": 6
    },
    frequency: "30",
    active: false
  },
  recoveryScore: 92,
  biomarkers: {
    hydration: 82,
    atpLevel: 85,
    cortisol: 35,
    muscleFatigue: 20
  },
  workouts: [],
  user: {
    name: "Guest Athlete",
    email: "",
    subscribed: false,
    authenticated: false,
    orders: [
      {
        id: "AST-8201",
        date: "2026-05-18",
        total: 4788.00,
        status: "Delivered",
        items: [
          {
            product: {
              id: "aesthetic-blueprint",
              name: "Aesthetic Blueprint",
              tagline: "YOUR AESTHETIC BLUEPRINT IN A WRAPPER",
              price: 399.00,
              rating: 4.9,
              reviewsCount: 512,
              color: "#00C2FF",
              accentColor: "#00C2FF",
              bgGlow: "rgba(0,194,255,0.15)",
              textColor: "text-[#00C2FF]",
              nutrition: {
                protein: "24g",
                carbs: "2g",
                fat: "5g",
                calories: 200,
                activeIngredients: [
                  { name: "Bioactive Whey Isolate", dose: "24g", purpose: "Muscle recovery" }
                ]
              }
            } as any,
            quantity: 12
          }
        ]
      }
    ]
  },

  // Actions
  addToCart: (product, quantity = 1) => {
    set((state) => {
      const fullProduct = state.products.find((p) => p.id === product.id) || product;
      const existing = state.cart.find((item) => item.product.id === product.id);
      const newQty = existing ? existing.quantity + quantity : quantity;
      
      if (state.user.authenticated) {
        fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId: product.id, quantity: newQty }),
        }).catch(err => console.error("Sync cart error:", err));
      }

      if (existing) {
        return {
          cart: state.cart.map((item) =>
            item.product.id === product.id
              ? { ...item, product: { ...item.product, ...fullProduct }, quantity: item.quantity + quantity }
              : item
          )
        };
      }
      return { cart: [...state.cart, { product: fullProduct, quantity }] };
    });
  },

  removeFromCart: (productId) => {
    set((state) => {
      if (state.user.authenticated) {
        fetch(`/api/cart?productId=${productId}`, {
          method: "DELETE",
        }).catch(err => console.error("Sync cart error:", err));
      }
      return {
        cart: state.cart.filter((item) => item.product.id !== productId)
      };
    });
  },

  updateCartQuantity: (productId, quantity) => {
    set((state) => {
      if (state.user.authenticated) {
        if (quantity <= 0) {
          fetch(`/api/cart?productId=${productId}`, {
            method: "DELETE",
          }).catch(err => console.error("Sync cart error:", err));
        } else {
          fetch("/api/cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ productId, quantity }),
          }).catch(err => console.error("Sync cart error:", err));
        }
      }

      if (quantity <= 0) {
        return {
          cart: state.cart.filter((item) => item.product.id !== productId)
        };
      }
      return {
        cart: state.cart.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      };
    });
  },

  clearCart: () => {
    set((state) => {
      if (state.user.authenticated) {
        fetch("/api/cart", {
          method: "DELETE",
        }).catch(err => console.error("Sync cart error:", err));
      }
      return { cart: [], promoCode: "", discount: 0 };
    });
  },

  updateSubscriptionBox: (productId, count) => {
    set((state) => {
      const countClamped = Math.max(0, count);
      return {
        subscription: {
          ...state.subscription,
          items: {
            ...state.subscription.items,
            [productId]: countClamped
          }
        }
      };
    });
  },

  setSubscriptionFrequency: (freq) => {
    set((state) => ({
      subscription: {
        ...state.subscription,
        frequency: freq
      }
    }));
  },

  activateSubscription: () => {
    set((state) => ({
      subscription: {
        ...state.subscription,
        active: true
      },
      user: {
        ...state.user,
        subscribed: true
      }
    }));
  },

  cancelSubscription: () => {
    set((state) => ({
      subscription: {
        ...state.subscription,
        active: false
      },
      user: {
        ...state.user,
        subscribed: false
      }
    }));
  },

  addWorkout: (workout) => {
    set((state) => {
      const updatedWorkouts = [workout, ...state.workouts].slice(0, 10);
      
      let cortisolDelta = 0;
      let fatigueDelta = 0;
      let hydrationDelta = 0;
      let atpDelta = 0;

      if (workout.intensity === "high") {
        cortisolDelta = 35;
        fatigueDelta = 50;
        hydrationDelta = -35;
        atpDelta = -55;
      } else if (workout.intensity === "medium") {
        cortisolDelta = 18;
        fatigueDelta = 28;
        hydrationDelta = -20;
        atpDelta = -35;
      } else {
        cortisolDelta = 8;
        fatigueDelta = 12;
        hydrationDelta = -10;
        atpDelta = -15;
      }

      const hydration = Math.max(10, Math.min(100, state.biomarkers.hydration + hydrationDelta));
      const fatigue = Math.max(10, Math.min(100, state.biomarkers.muscleFatigue + fatigueDelta));
      const cortisol = Math.max(10, Math.min(100, state.biomarkers.cortisol + cortisolDelta));
      const atp = Math.max(10, Math.min(100, state.biomarkers.atpLevel + atpDelta));

      const recoveryScore = Math.max(15, Math.min(100, Math.round(100 - (fatigue * 0.45 + cortisol * 0.35 + (100 - hydration) * 0.2))));

      return {
        workouts: updatedWorkouts,
        biomarkers: { hydration, muscleFatigue: fatigue, cortisol, atpLevel: atp },
        recoveryScore
      };
    });
  },

  simulateRecovery: () => {
    set((state) => {
      const hydration = Math.min(100, state.biomarkers.hydration + 20);
      const fatigue = Math.max(5, state.biomarkers.muscleFatigue - 40);
      const cortisol = Math.max(10, state.biomarkers.cortisol - 30);
      const atp = Math.min(100, state.biomarkers.atpLevel + 50);

      const recoveryScore = Math.max(20, Math.min(100, Math.round(100 - (fatigue * 0.3 + cortisol * 0.35 + (100 - hydration) * 0.15))));

      return {
        biomarkers: { hydration, muscleFatigue: fatigue, cortisol, atpLevel: atp },
        recoveryScore
      };
    });
  },

  resetBiomarkers: () => {
    set({
      recoveryScore: 92,
      biomarkers: {
        hydration: 82,
        atpLevel: 85,
        cortisol: 35,
        muscleFatigue: 20
      },
      workouts: []
    });
  },

  createOrder: (address) => {
    set((state) => {
      if (state.cart.length === 0) return {};
      
      const newOrder = {
        id: `AST-${Math.floor(1000 + Math.random() * 9000)}`,
        date: new Date().toISOString().split("T")[0],
        total: state.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
        status: "Processing",
        items: [...state.cart]
      };

      return {
        cart: [],
        user: {
          ...state.user,
          address,
          orders: [newOrder, ...state.user.orders]
        }
      };
    });
  },

  setUser: (user) => set({ user }),
  setCart: (cart) => set((state) => {
    const enrichedCart = cart.map((item) => {
      const fullProduct = state.products.find((p) => p.id === item.product.id);
      return {
        ...item,
        product: fullProduct ? { ...item.product, ...fullProduct } : item.product
      };
    });
    return { cart: enrichedCart };
  }),
  applyPromoCode: (code) => {
    if (code.trim().toUpperCase() === "BIO-UPGRADE") {
      set({ promoCode: "BIO-UPGRADE", discount: 0.15 });
      return true;
    }
    return false;
  },
  clearPromoCode: () => {
    set({ promoCode: "", discount: 0 });
  }
}));
