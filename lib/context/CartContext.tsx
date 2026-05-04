'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  type: string;
}

export interface DiscountInfo {
  code: string;
  description: string;
  discountType: 'fixed' | 'percent';
  discountValueCents: number;
  discountPercent: number;
  appliesToProductIds: string[];
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  discount: DiscountInfo | null;
  discountAmount: number;
  applyDiscount: (code: string) => Promise<{ ok: boolean; error?: string }>;
  clearDiscount: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'bs_discount';

function computeDiscountAmount(items: CartItem[], discount: DiscountInfo | null): number {
  if (!discount) return 0;
  const applicable = discount.appliesToProductIds.length === 0
    ? items
    : items.filter((i) => discount.appliesToProductIds.includes(i.id));
  const applicableTotal = applicable.reduce((sum, i) => sum + i.price * i.quantity, 0);
  if (applicableTotal <= 0) return 0;
  if (discount.discountType === 'fixed') {
    return Math.min(applicableTotal, discount.discountValueCents / 100);
  }
  return Math.round(applicableTotal * (discount.discountPercent / 100) * 100) / 100;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [discount, setDiscount] = useState<DiscountInfo | null>(null);
  const router = useRouter();

  useEffect(() => {
    try {
      const raw = typeof window !== 'undefined' ? window.sessionStorage.getItem(STORAGE_KEY) : null;
      if (raw) setDiscount(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (discount) {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(discount));
    } else {
      window.sessionStorage.removeItem(STORAGE_KEY);
    }
  }, [discount]);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
    router.push('/checkout');
  };

  const removeFromCart = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setDiscount(null);
  };

  const clearDiscount = () => setDiscount(null);

  const applyDiscount = async (code: string) => {
    try {
      const res = await fetch('/api/discount/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (!data.valid) {
        return { ok: false, error: data.error || 'Code ungültig' };
      }
      setDiscount({
        code: data.code,
        description: data.description,
        discountType: data.discountType,
        discountValueCents: data.discountValueCents,
        discountPercent: data.discountPercent,
        appliesToProductIds: data.appliesToProductIds,
      });
      return { ok: true };
    } catch {
      return { ok: false, error: 'Fehler bei Validierung' };
    }
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const grossTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = computeDiscountAmount(items, discount);
  const totalPrice = Math.max(0, grossTotal - discountAmount);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        discount,
        discountAmount,
        applyDiscount,
        clearDiscount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
