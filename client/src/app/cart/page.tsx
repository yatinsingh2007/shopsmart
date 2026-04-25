'use client';

import { useCartStore } from '@/store/cart.store';
import { useAuthStore } from '@/store/auth.store';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function CartPage() {
  const { items, updateItem, removeItem, isLoading } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const total = items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Your Cart is Empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Link href="/products" className="inline-block bg-blue-600 text-white font-medium py-3 px-8 rounded-md hover:bg-blue-700 transition">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Cart Items */}
        <div className="w-full lg:w-2/3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {items.map((item) => (
                <li key={item.id} className="p-6 flex flex-col sm:flex-row items-center gap-6">
                  <div className="relative w-24 h-24 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                    {item.product.imageUrl ? (
                      <Image src={item.product.imageUrl} alt={item.product.name} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No Image</div>
                    )}
                  </div>
                  
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-lg font-medium text-gray-900">
                      <Link href={`/products/${item.productId}`} className="hover:text-blue-600">
                        {item.product.name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-lg font-semibold text-gray-900">${item.product.price.toFixed(2)}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <button 
                        onClick={() => updateItem(item.id, Math.max(1, item.quantity - 1))}
                        disabled={isLoading}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-l-md transition"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 text-gray-900 font-medium min-w-[2.5rem] text-center">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => updateItem(item.id, item.quantity + 1)}
                        disabled={isLoading}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-r-md transition"
                      >
                        +
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => removeItem(item.id)}
                      disabled={isLoading}
                      className="text-red-500 hover:text-red-700 p-2 transition-colors rounded-md hover:bg-red-50"
                      title="Remove item"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 sticky top-24">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6 text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>$0.00</span>
              </div>
              <div className="border-t border-gray-200 pt-4 flex justify-between font-bold text-lg text-gray-900">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {isAuthenticated ? (
              <Link 
                href="/checkout" 
                className="w-full block text-center bg-blue-600 text-white font-medium py-3 px-4 rounded-md hover:bg-blue-700 transition"
              >
                Proceed to Checkout
              </Link>
            ) : (
              <Link 
                href="/login?redirect=/checkout" 
                className="w-full block text-center bg-gray-900 text-white font-medium py-3 px-4 rounded-md hover:bg-gray-800 transition"
              >
                Login to Checkout
              </Link>
            )}
            
            <div className="mt-4 text-center">
              <Link href="/products" className="text-blue-600 text-sm font-medium hover:underline">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
