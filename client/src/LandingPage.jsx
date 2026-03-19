import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// --- Icons (Lucide-inspired raw SVGs to keep single-file without external deps) ---
const IconMenu = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>;
const IconSearch = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>;
const IconUser = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const IconBag = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>;
const IconArrowUpRight = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>;
const IconChevronDown = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>;
const IconStar = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const IconTruck = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11"/><path d="M14 9h4l4 4v5c0 .6-.4 1-1 1h-2"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>;
const IconRefresh = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2v6h-6"/><path d="M3 12a9 9 0 1 0 2.32-6.02L21 8"/><path d="M3 22v-6h6"/><path d="M21 12a9 9 0 1 0-2.32 6.02L3 16"/></svg>;
const IconShield = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
const IconHeadphones = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>;

// --- Components ---

const Navbar = () => (
  <header className="w-full bg-white relative z-50" data-testid="navbar">
    {/* Top Row */}
    <div className="max-w-[1400px] mx-auto px-2 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-1">
      
      {/* Left section: Hamburger & Search */}
      <div className="flex items-center gap-2 sm:gap-4 flex-none sm:flex-1">
        <button className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
          <IconMenu />
        </button>
        <div className="hidden lg:flex items-center bg-neutral-100 rounded-full px-4 py-2 w-64 border border-transparent focus-within:border-neutral-300 focus-within:bg-white transition-all">
          <span className="text-neutral-400 mr-2"><IconSearch /></span>
          <input 
            type="text" 
            placeholder="Search clothing..." 
            className="bg-transparent border-none outline-none text-sm w-full text-neutral-800 placeholder-neutral-400"
          />
        </div>
      </div>

      {/* Center: Logo */}
      <Link to="/shopsmart/" data-testid="logo" className="flex-none sm:flex-1 flex justify-center cursor-pointer min-w-fit">
        <h1 className="text-sm sm:text-2xl font-black tracking-tighter text-neutral-950 uppercase">
          SHOPSMART
        </h1>
      </Link>

      {/* Right section: Links & Icons */}
      <div className="flex items-center justify-end gap-1 sm:gap-6 flex-none sm:flex-1">
        <div className="hidden xl:flex items-center gap-6 text-sm font-medium text-neutral-500">
          <a href="#" className="hover:text-neutral-900 transition-colors">About Us</a>
          <a href="#" className="hover:text-neutral-900 transition-colors">Blog</a>
          <a href="#" className="hover:text-neutral-900 transition-colors">FAQ</a>
        </div>
        <div className="hidden xl:block w-px h-5 bg-neutral-200"></div>
        <div className="flex items-center gap-4">
          <Link to="/shopsmart/login/" data-testid="login-link" className="text-[8px] sm:text-sm font-bold text-neutral-900 hover:text-neutral-600 transition-colors whitespace-nowrap">
            Login
          </Link>
          <Link to="/shopsmart/signup/" data-testid="signup-link" className="bg-neutral-900 text-white text-[8px] sm:text-sm font-bold px-1.5 py-1 sm:px-5 sm:py-2.5 rounded-full hover:bg-neutral-800 transition-all transform hover:scale-105 whitespace-nowrap">
            Sign Up
          </Link>
          <button className="p-2 hover:bg-neutral-100 rounded-full transition-colors text-neutral-700 sm:hidden">
            <IconUser />
          </button>
          <button className="p-2 hover:bg-neutral-100 rounded-full transition-colors relative text-neutral-700">
            <IconBag />
            <span className="absolute top-1 right-0 bg-neutral-900 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
              2
            </span>
          </button>
        </div>
      </div>
    </div>

    {/* Bottom Row / Categories (Desktop) */}
    <div className="hidden lg:flex border-t border-neutral-100 py-3">
      <div className="max-w-[1400px] mx-auto px-8 w-full flex items-center justify-center gap-10 text-sm font-medium text-neutral-600">
        <button className="flex items-center gap-1 text-neutral-900 font-semibold px-3 py-1.5 bg-neutral-100 rounded-full">
          Clothing <IconChevronDown />
        </button>
        <a href="#" className="hover:text-neutral-900 transition-colors">New Arrivals</a>
        <a href="#" className="hover:text-neutral-900 transition-colors">Sales</a>
        <a href="#" className="hover:text-neutral-900 transition-colors">Men</a>
        <a href="#" className="hover:text-neutral-900 transition-colors">Women</a>
        <a href="#" className="hover:text-neutral-900 transition-colors">Kids</a>
        <a href="#" className="hover:text-neutral-900 transition-colors">Brand</a>
      </div>
    </div>
  </header>
);

const Hero = () => (
  <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12" data-testid="hero">
    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
      
      {/* Left Content */}
      <div className="w-full lg:w-5/12 flex flex-col items-start gap-8 z-10 xl:pr-10">
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl sm:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight text-neutral-900">
            Unleash Your Style<br />
            Shop the Latest<br />
            Trends
          </h2>
          <p className="text-neutral-500 text-base sm:text-lg leading-relaxed max-w-lg mt-2">
            Discover the latest trends & express your style effortlessly. 
            Shop exclusive collections with premium designs, just for you!
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="bg-neutral-900 hover:bg-neutral-800 text-white px-8 py-4 rounded-full font-medium transition-all transform hover:scale-105 shadow-lg shadow-neutral-900/20 flex items-center gap-2">
            Shop Now
          </button>
          <button className="bg-neutral-900 hover:bg-neutral-800 text-white p-4 rounded-full transition-all transform hover:scale-105 shadow-lg shadow-neutral-900/20">
            <IconArrowUpRight />
          </button>
        </div>

        <div className="pt-8 flex flex-col gap-3">
          <div className="text-2xl font-black text-neutral-900">25 Million+</div>
          <p className="text-sm text-neutral-500 max-w-xs leading-relaxed">
            Real reviews from our happy customers! See what fashion lovers are saying about our quality, style, and service.
          </p>
          <div className="flex items-center mt-2">
            {[1, 2, 3, 4].map((i) => (
              <img 
                key={i} 
                src={`https://i.pravatar.cc/100?img=${i + 10}`} 
                alt="Avatar" 
                className={`w-10 h-10 rounded-full border-2 border-white object-cover ${i > 1 ? '-ml-3' : ''}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Right Image */}
      <div className="w-full lg:w-7/12 h-[500px] sm:h-[600px] xl:h-[750px] relative">
        <img 
          src="https://images.unsplash.com/photo-1492446845049-9c50cc313c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
          alt="Stylish man in blazer" 
          className="w-full h-full object-cover rounded-[2rem] sm:rounded-[3rem] shadow-sm transform transition-transform duration-700 hover:scale-[1.01]"
        />
      </div>

    </div>
  </section>
);

const ProductCard = ({ image, name, price, badge }) => (
  <div className="group cursor-pointer flex flex-col gap-4">
    <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-100">
      {badge && (
        <span className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur text-neutral-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          {badge}
        </span>
      )}
      <img 
        src={image} 
        alt={name} 
        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-in-out"
      />
      <div className="absolute inset-x-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button className="w-full bg-white/90 backdrop-blur hover:bg-white text-neutral-900 font-semibold py-3 rounded-xl shadow-lg transition-colors text-sm">
          Quick Add
        </button>
      </div>
    </div>
    <div className="flex flex-col gap-1">
      <h3 className="font-semibold text-neutral-900 text-lg group-hover:text-neutral-600 transition-colors">{name}</h3>
      <p className="text-neutral-500 font-medium">${price}</p>
    </div>
  </div>
);

ProductCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  badge: PropTypes.string,
};

const FeaturedProducts = () => {
  const products = [
    { name: "Oversized Cotton Tee", price: "35.00", badge: "New", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80" },
    { name: "Minimalist Wool Coat", price: "185.00", badge: "", image: "https://images.unsplash.com/photo-1534030617300-36ba92daeaad?w=600&q=80" },
    { name: "Pleated Wide Trousers", price: "95.00", badge: "Bestseller", image: "https://images.unsplash.com/photo-1434389678369-108bf09f92a1?w=600&q=80" },
    { name: "Classic Leather Loafers", price: "145.00", badge: "", image: "https://images.unsplash.com/photo-1620012253295-c159d60d28f5?w=600&q=80" },
  ];

  return (
    <section className="py-20 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8" data-testid="products">
      <div className="flex items-end justify-between mb-10">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">Trending Now</h2>
          <p className="text-neutral-500 mt-2">Curated essentials for your everyday wardrobe.</p>
        </div>
        <a href="#" className="hidden sm:flex items-center gap-2 font-medium text-neutral-900 hover:text-neutral-600 transition-colors pb-1 border-b-2 border-neutral-900 hover:border-neutral-600">
          View All <IconArrowUpRight />
        </a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((p, i) => <ProductCard key={i} {...p} />)}
      </div>
    </section>
  );
};

const Categories = () => {
  const categories = [
    { title: "Men's Line", image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=80" },
    { title: "Women's Collection", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80" },
    { title: "Accessories", image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=800&q=80" },
  ];

  return (
    <section className="py-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat, i) => (
          <div key={i} className="group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 z-10" />
            <img 
              src={cat.image} 
              alt={cat.title} 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-8">
              <h3 className="text-white text-3xl font-bold tracking-tight mb-2">{cat.title}</h3>
              <div className="overflow-hidden">
                <span className="inline-flex items-center gap-2 text-white font-medium transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  Shop Category <IconArrowUpRight />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Benefits = () => {
  const items = [
    { icon: <IconTruck />, title: "Free Shipping", desc: "On all orders over $100" },
    { icon: <IconRefresh />, title: "Easy Returns", desc: "30-day return policy" },
    { icon: <IconShield />, title: "Secure Payment", desc: "100% secure checkout" },
    { icon: <IconHeadphones />, title: "24/7 Support", desc: "Dedicated team available" },
  ];

  return (
    <section className="py-20 border-y border-neutral-100 mt-10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {items.map((item, i) => (
            <div key={i} className="flex flex-col items-center sm:items-start text-center sm:text-left gap-4 p-4 hover:bg-neutral-50 rounded-2xl transition-colors">
              <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-900 border border-neutral-200">
                {item.icon}
              </div>
              <div>
                <h4 className="font-bold text-neutral-900 text-lg mb-1">{item.title}</h4>
                <p className="text-neutral-500 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => (
  <section className="py-24 bg-neutral-50">
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight text-center mb-16">
        Loved By You
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { name: "Sarah M.", role: "Verified Buyer", text: "The quality is absolutely incredible. I've completely replaced my basic wardrobe with ShopSmart essentials. The fit is perfect!" },
          { name: "James K.", role: "Fashion Blogger", text: "Premium feel without the luxury markup. Shipping was lighting fast and the packaging was beautiful. Will definitely order again." },
          { name: "Emily R.", role: "Verified Buyer", text: "Finally clothing that actually looks like the photos. The fabrics are so soft and they hold up amazingly well after multiple washes." }
        ].map((t, i) => (
          <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-neutral-100">
            <div className="flex gap-1 text-yellow-400 mb-6 font-bold">
              <IconStar /><IconStar /><IconStar /><IconStar /><IconStar />
            </div>
            <p className="text-neutral-600 mb-8 leading-relaxed text-lg">&quot;{t.text}&quot;</p>
            <div className="flex items-center gap-4">
              <img src={`https://i.pravatar.cc/100?img=${i + 30}`} alt={t.name} className="w-12 h-12 rounded-full object-cover bg-neutral-100"/>
              <div>
                <div className="font-bold text-neutral-900">{t.name}</div>
                <div className="text-sm text-neutral-500">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Newsletter = () => (
  <section className="py-24 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
    <div className="bg-neutral-900 rounded-[3rem] p-10 md:p-20 text-center flex flex-col items-center justify-center relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] pt-[50%] rounded-full bg-white blur-[100px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] pt-[50%] rounded-full bg-white blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Join The Club</h2>
        <p className="text-neutral-400 text-lg mb-10">
          Subscribe to our newsletter and get 15% off your first order, plus early access to new collections and sales.
        </p>
        <form className="flex flex-col sm:flex-row gap-3 w-full max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="flex-1 px-6 py-4 rounded-full bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
            required
          />
          <button className="px-8 py-4 bg-white text-neutral-900 font-bold rounded-full hover:bg-neutral-200 transition-colors whitespace-nowrap">
            Subscribe
          </button>
        </form>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-white pt-16 pb-8 border-t border-neutral-200">
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-16">
        
        <div className="col-span-2 lg:col-span-2">
          <h1 className="text-2xl font-black tracking-tighter text-neutral-950 uppercase mb-4">
            SHOPSMART
          </h1>
          <p className="text-neutral-500 max-w-sm mb-6 leading-relaxed">
            Elevating your everyday wardrobe with premium essentials designed for modern life.
          </p>
          <div className="flex gap-4">
            {/* Social Placeholder Circles */}
            {[1, 2, 3, 4].map(i => (
              <a key={i} href="#" className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-900 hover:bg-neutral-900 hover:text-white transition-colors">
                <span className="w-4 h-4 block bg-currentColor rounded-[2px]"></span>
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-bold text-neutral-900 mb-6">Shop</h4>
          <ul className="flex flex-col gap-4 text-neutral-500 text-sm">
            <li><a href="#" className="hover:text-neutral-900 transition-colors">All Products</a></li>
            <li><a href="#" className="hover:text-neutral-900 transition-colors">New Arrivals</a></li>
            <li><a href="#" className="hover:text-neutral-900 transition-colors">Men&apos;s Collection</a></li>
            <li><a href="#" className="hover:text-neutral-900 transition-colors">Women&apos;s Collection</a></li>
            <li><a href="#" className="hover:text-neutral-900 transition-colors">Sale</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-neutral-900 mb-6">Support</h4>
          <ul className="flex flex-col gap-4 text-neutral-500 text-sm">
            <li><a href="#" className="hover:text-neutral-900 transition-colors">FAQ</a></li>
            <li><a href="#" className="hover:text-neutral-900 transition-colors">Shipping Returns</a></li>
            <li><a href="#" className="hover:text-neutral-900 transition-colors">Track Order</a></li>
            <li><a href="#" className="hover:text-neutral-900 transition-colors">Contact Us</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-neutral-900 mb-6">Company</h4>
          <ul className="flex flex-col gap-4 text-neutral-500 text-sm">
            <li><a href="#" className="hover:text-neutral-900 transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-neutral-900 transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-neutral-900 transition-colors">Sustainability</a></li>
            <li><a href="#" className="hover:text-neutral-900 transition-colors">Terms & Privacy</a></li>
          </ul>
        </div>

      </div>

      <div className="pt-8 border-t border-neutral-100 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-400">
        <p>© 2026 ShopSmart. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-neutral-900 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-neutral-900 transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-neutral-900 antialiased font-[Inter,system-ui,sans-serif] overflow-x-hidden">
      <Navbar />
      <main data-testid="main-content">
        <Hero />
        <FeaturedProducts />
        <Categories />
        <Benefits />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
