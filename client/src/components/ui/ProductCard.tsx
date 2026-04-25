import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/store/cart.store';
import { ShoppingCart } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  stock: number;
}

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent Link navigation
    addItem(product.id, 1);
  };

  return (
    <Link href={`/products/${product.id}`} className="group block">
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col h-full">
        <div className="relative aspect-square bg-gray-100 overflow-hidden">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
        </div>
        
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">{product.name}</h3>
          <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-grow">{product.description}</p>
          
          <div className="flex items-center justify-between mt-auto">
            <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
            
            <button 
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`p-2 rounded-full flex items-center justify-center transition-colors ${
                product.stock > 0 
                  ? 'bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              title={product.stock > 0 ? "Add to cart" : "Out of stock"}
            >
              <ShoppingCart className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
