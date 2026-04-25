'use client';

import Link from 'next/link';
import { useAuthStore } from '@/store/auth.store';
import { useCartStore } from '@/store/cart.store';
import { ShoppingCart, User, LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const { items } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-blue-600">ShopSmart</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-6">
            <Link href="/products" className="text-gray-700 hover:text-blue-600 font-medium">
              Products
            </Link>
            
            <Link href="/cart" className="text-gray-700 hover:text-blue-600 relative">
              <ShoppingCart className="h-6 w-6" />
              {mounted && totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {mounted && isAuthenticated ? (
              <div className="flex items-center space-x-4">
                {user?.role === 'ADMIN' && (
                  <Link href="/admin" className="text-sm font-semibold bg-gray-100 px-3 py-1 rounded-md text-gray-800 hover:bg-gray-200">
                    Admin
                  </Link>
                )}
                <Link href="/profile" className="text-gray-700 hover:text-blue-600">
                  <User className="h-6 w-6" />
                </Link>
                <button
                  onClick={() => logout()}
                  className="text-gray-700 hover:text-red-600"
                  title="Logout"
                >
                  <LogOut className="h-6 w-6" />
                </button>
              </div>
            ) : (
              mounted && (
                <div className="flex items-center space-x-4">
                  <Link href="/login" className="text-gray-700 hover:text-blue-600 font-medium">
                    Log in
                  </Link>
                  <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors">
                    Sign up
                  </Link>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
