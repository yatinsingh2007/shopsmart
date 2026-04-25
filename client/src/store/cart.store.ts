import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../lib/api';

interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  product: {
    name: string;
    price: number;
    imageUrl?: string;
  };
}

interface CartState {
  items: CartItem[];
  isLoading: boolean;
  fetchCart: () => Promise<void>;
  addItem: (productId: string, quantity: number) => Promise<void>;
  updateItem: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,
      fetchCart: async () => {
        set({ isLoading: true });
        try {
          const res = await api.get('/cart');
          if (res.data && res.data.items) {
            set({ items: res.data.items, isLoading: false });
          } else {
            set({ items: [], isLoading: false });
          }
        } catch (error) {
          console.error('Failed to fetch cart:', error);
          set({ items: [], isLoading: false });
        }
      },
      addItem: async (productId, quantity) => {
        try {
          await api.post('/cart/items', { productId, quantity });
          await get().fetchCart();
        } catch (error) {
          console.error('Failed to add item:', error);
        }
      },
      updateItem: async (itemId, quantity) => {
        try {
          await api.put(`/cart/items/${itemId}`, { quantity });
          await get().fetchCart();
        } catch (error) {
          console.error('Failed to update item:', error);
        }
      },
      removeItem: async (itemId) => {
        try {
          await api.delete(`/cart/items/${itemId}`);
          await get().fetchCart();
        } catch (error) {
          console.error('Failed to remove item:', error);
        }
      },
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage',
    }
  )
);
