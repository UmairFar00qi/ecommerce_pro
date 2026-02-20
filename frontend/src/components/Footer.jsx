import { Facebook, Instagram, Twitter, ArrowRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Info */}
          <div className="md:col-span-1">
            <h2 className="text-2xl font-serif font-bold tracking-widest mb-6">E-SHOP.</h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Elevating everyday style with premium quality fabrics and minimalist designs. Redefining modern fashion.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition"><Instagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition"><Facebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition"><Twitter size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-6 border-b border-gray-800 pb-2 inline-block">Shop</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="/#collections" className="hover:text-white transition">Men's Collection</a></li>
              <li><a href="/#collections" className="hover:text-white transition">Women's Collection</a></li>
              <li><a href="/#products" className="hover:text-white transition">New Arrivals</a></li>
              <li><a href="#" className="hover:text-white transition">Accessories</a></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-6 border-b border-gray-800 pb-2 inline-block">Support</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-white transition">Size Guide</a></li>
              <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-6 border-b border-gray-800 pb-2 inline-block">Stay Updated</h3>
            <p className="text-gray-400 text-sm mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <form className="flex border-b border-gray-600 pb-2 group focus-within:border-white transition-colors">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="w-full bg-transparent outline-none text-sm text-white placeholder-gray-500"
              />
              <button type="submit" className="text-gray-400 group-hover:text-white transition">
                <ArrowRight size={20} />
              </button>
            </form>
          </div>

        </div>

        {/* Copyright */}
        <div className="text-center border-t border-gray-800 pt-8">
          <p className="text-gray-500 text-xs tracking-widest uppercase">
            &copy; {new Date().getFullYear()} E-Shop Fashion. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;