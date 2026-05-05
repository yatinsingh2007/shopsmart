'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { useAuthStore } from '@/store/auth.store';
import { useRouter } from 'next/navigation';
import { Users, ShoppingBag, DollarSign, Package } from 'lucide-react';

interface DashboardMetrics {
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  totalProducts: number;
}

export default function AdminDashboardPage() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'ADMIN') {
      router.push('/');
      return;
    }

    const fetchMetrics = async () => {
      try {
        const res = await api.get('/admin/metrics');
        setMetrics(res.data);
      } catch (error) {
        console.error('Failed to fetch admin metrics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || user?.role !== 'ADMIN') return null;

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse space-y-8">
          <div className="h-10 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-500 mt-2">Welcome back, {user.name}. Here&apos;s what&apos;s happening with your store.</p>
      </div>

      {metrics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Revenue Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center">
            <div className="p-4 rounded-full bg-green-100 text-green-600 mr-4">
              <DollarSign className="h-8 w-8" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${metrics.totalRevenue.toFixed(2)}</p>
            </div>
          </div>

          {/* Orders Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center">
            <div className="p-4 rounded-full bg-blue-100 text-blue-600 mr-4">
              <ShoppingBag className="h-8 w-8" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{metrics.totalOrders}</p>
            </div>
          </div>

          {/* Users Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center">
            <div className="p-4 rounded-full bg-purple-100 text-purple-600 mr-4">
              <Users className="h-8 w-8" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Customers</p>
              <p className="text-2xl font-bold text-gray-900">{metrics.totalUsers}</p>
            </div>
          </div>

          {/* Products Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center">
            <div className="p-4 rounded-full bg-yellow-100 text-yellow-600 mr-4">
              <Package className="h-8 w-8" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Products</p>
              <p className="text-2xl font-bold text-gray-900">{metrics.totalProducts}</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-4">
            <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-md transition font-medium text-gray-700">
              Manage Products
            </button>
            <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-md transition font-medium text-gray-700">
              View Recent Orders
            </button>
            <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-md transition font-medium text-gray-700">
              Customer Management
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
