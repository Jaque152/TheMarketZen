"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
// 1. Añadimos getProduct a las importaciones
import { getProduct, IVA_RATE, type Product } from "./products";

export type CartLine = {
  id: string;
  quantity: number;
};

type CartContextValue = {
  lines: CartLine[];
  detailedLines: { product: Product; quantity: number }[];
  addItem: (id: string, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  iva: number;
  total: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  lastAdded: string | null;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "the-market-zen-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartLine[];
        if (Array.isArray(parsed)) setLines(parsed);
      }
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  // Persist
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // ignore
    }
  }, [lines, hydrated]);

  function addItem(id: string, quantity = 1) {
    setLines((prev) => {
      const existing = prev.find((l) => l.id === id);
      if (existing) {
        return prev.map((l) =>
          l.id === id ? { ...l, quantity: l.quantity + quantity } : l,
        );
      }
      return [...prev, { id, quantity }];
    });
    setLastAdded(id);
    setIsOpen(true);
  }

  function removeItem(id: string) {
    setLines((prev) => prev.filter((l) => l.id !== id));
  }

  function updateQuantity(id: string, quantity: number) {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setLines((prev) =>
      prev.map((l) => (l.id === id ? { ...l, quantity } : l)),
    );
  }

  function clearCart() {
    setLines([]);
  }

  const detailedLines = useMemo(() => {
    return lines
      .map((l) => {
        // 2. EL CAMBIO CLAVE: Usamos getProduct(l.id) en lugar de products.find()
        const product = getProduct(l.id);
        return product ? { product, quantity: l.quantity } : null;
      })
      .filter((v): v is { product: Product; quantity: number } => v !== null);
  }, [lines]);

  const itemCount = useMemo(
    () => lines.reduce((sum, l) => sum + l.quantity, 0),
    [lines],
  );

  const subtotal = useMemo(
    () =>
      detailedLines.reduce(
        (sum, l) => sum + l.product.price * l.quantity,
        0,
      ),
    [detailedLines],
  );

  const iva = useMemo(() => Math.round(subtotal * IVA_RATE), [subtotal]);
  const total = subtotal + iva;

  const value: CartContextValue = {
    lines,
    detailedLines,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    itemCount,
    subtotal,
    iva,
    total,
    isOpen,
    setIsOpen,
    lastAdded,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}