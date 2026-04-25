'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { useCartStore } from '@/store/cart.store';
import Image from 'next/image';
import { useParams } from 'next/navigation';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  stock: number;
  category: {
    id: string;
    name: string;
  };
}

export default function ProductDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error('Failed to fetch product details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addItem(product.id, quantity);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse flex flex-col md:flex-row gap-12">
          <div className="w-full md:w-1/2 h-96 bg-gray-200 rounded-xl"></div>
          <div className="w-full md:w-1/2 space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            <div className="h-24 bg-gray-200 rounded w-full"></div>
            <div className="h-12 bg-gray-200 rounded w-1/2 mt-8"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Product not found</h2>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Product Image */}
          <div className="w-full md:w-1/2">
            <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              {product.imageUrl ? (
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No Image Available
                </div>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="w-full md:w-1/2 flex flex-col">
            <div className="mb-2">
              <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                {product.category?.name || 'Uncategorized'}
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-4">
              {product.name}
            </h1>
            
            <div className="text-3xl font-bold text-gray-900 mb-6">
              ${product.price.toFixed(2)}
            </div>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {product.description}
            </p>
            
            <div className="mt-auto border-t border-gray-200 pt-8">
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-gray-700 font-medium">Availability:</span>
                {product.stock > 0 ? (
                  <span className="text-green-600 font-medium bg-green-50 px-2 py-1 rounded">In Stock ({product.stock})</span>
                ) : (
                  <span className="text-red-600 font-medium bg-red-50 px-2 py-1 rounded">Out of Stock</span>
                )}
              </div>

              {product.stock > 0 && (
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-l-md transition"
                    >
                      -
                    </button>
                    <span className="px-4 py-3 text-gray-900 font-medium w-12 text-center">
                      {quantity}
                    </span>
                    <button 
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-r-md transition"
                    >
                      +
                    </button>
                  </div>
                  
                  <button 
                    onClick={handleAddToCart}
                    className="flex-1 bg-blue-600 text-white font-bold py-3 px-8 rounded-md hover:bg-blue-700 transition shadow-sm hover:shadow-md"
                  >
                    Add to Cart
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
