import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <span className="text-2xl font-bold text-white mb-4 block">ShopSmart</span>
            <p className="text-gray-400 text-sm">
              Your one-stop destination for premium products at unbeatable prices. Experience smart shopping today.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><Link href="/products" className="text-gray-400 hover:text-white transition">All Products</Link></li>
              <li><Link href="/categories/electronics" className="text-gray-400 hover:text-white transition">Electronics</Link></li>
              <li><Link href="/categories/clothing" className="text-gray-400 hover:text-white transition">Clothing</Link></li>
              <li><Link href="/categories/home" className="text-gray-400 hover:text-white transition">Home & Garden</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition">Contact Us</Link></li>
              <li><Link href="/faq" className="text-gray-400 hover:text-white transition">FAQ</Link></li>
              <li><Link href="/returns" className="text-gray-400 hover:text-white transition">Returns Policy</Link></li>
              <li><Link href="/shipping" className="text-gray-400 hover:text-white transition">Shipping Info</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to get special offers, free giveaways, and updates.
            </p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full px-4 py-2 rounded-l-md text-gray-900 focus:outline-none"
              />
              <button 
                type="button" 
                className="bg-blue-600 px-4 py-2 rounded-r-md hover:bg-blue-700 transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} ShopSmart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
