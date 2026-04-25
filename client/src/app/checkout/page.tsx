'use client';

import { useCartStore } from '@/store/cart.store';
import { useAuthStore } from '@/store/auth.store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import api from '@/lib/api';

export default function CheckoutPage() {
  const { items, clearCart } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const total = items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  useEffect(() => {
    // Redirect if not authenticated or cart is empty
    if (!isAuthenticated) {
      router.push('/login?redirect=/checkout');
    } else if (items.length === 0) {
      router.push('/cart');
    }
  }, [isAuthenticated, items.length, router]);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.post('/orders', { shippingAddress: address });
      clearCart();
      router.push('/profile?orderSuccess=true');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Checkout failed. Please try again.');
      setLoading(false);
    }
  };

  if (!isAuthenticated || items.length === 0) return null;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Order Summary</h2>
          <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
            {items.map(item => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-gray-600">{item.product.name} (x{item.quantity})</span>
                <span className="font-medium text-gray-900">${(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t border-gray-200 pt-3 flex justify-between font-bold text-lg text-gray-900">
              <span>Total to Pay</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleCheckout}>
          {error && (
            <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-md text-sm border border-red-100">
              {error}
            </div>
          )}

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Shipping Information</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="address">
                Full Delivery Address
              </label>
              <textarea
                id="address"
                required
                rows={3}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="123 Main St, Apt 4B, New York, NY 10001"
              ></textarea>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Payment</h2>
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-md text-sm text-blue-800">
              <p>For this demonstration, a mock payment will be processed automatically.</p>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-4 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 transition"
          >
            {loading ? 'Processing Order...' : `Pay $${total.toFixed(2)} & Place Order`}
          </button>
        </form>
      </div>
    </div>
  );
}
