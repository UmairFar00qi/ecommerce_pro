import { useState } from "react"; // 1. State add karein
import { Link, useNavigate } from "react-router-dom";
import { 
  ShoppingCart, User, LayoutDashboard, LogOut, 
  Package, Menu, X  // 2. Menu aur X icons add karein
} from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // Mobile menu state
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const cartCount = JSON.parse(localStorage.getItem("cart"))?.length || 0;

  const logout = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  // Menu close karne ke liye helper function
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Mobile: Hamburger Icon (Left) */}
        <button className="md:hidden text-gray-800" onClick={toggleMenu}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Brand Logo */}
        <Link
          to="/"
          className="text-2xl font-serif font-extrabold tracking-widest text-black"
        >
          E-SHOP.
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-gray-600">
          <a href="/#top" className="hover:text-black transition-colors">Home</a>
          <a href="/#collections" className="hover:text-black transition-colors">Collections</a>
          <a href="/#products" className="hover:text-black transition-colors">Trending</a>
          <a href="/#reviews" className="hover:text-black transition-colors">Reviews</a>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-4 sm:gap-6 text-gray-800">
          <Link to="/cart" className="relative hover:text-black transition-transform hover:scale-110">
            <ShoppingCart size={20} strokeWidth={2} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Desktop User Actions */}
          <div className="hidden md:flex items-center">
            {user ? (
              <div className="flex items-center gap-5 text-sm font-medium border-l pl-5">
                <Link to="/my-orders" className="flex items-center gap-1.5 hover:text-black transition">
                  <Package size={18} /> Orders
                </Link>
                <Link to="/admin" className="flex items-center gap-1.5 hover:text-black transition">
                  <LayoutDashboard size={18} /> Admin
                </Link>
                <button onClick={logout} className="flex items-center gap-1.5 text-gray-500 hover:text-red-600 transition">
                  <LogOut size={18} /> Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="flex items-center gap-1.5 text-sm font-bold uppercase tracking-wider hover:text-black transition border-l pl-5">
                <User size={18} /> Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* --- Mobile Menu Overlay --- */}
      {isOpen && (
        <div className="md:hidden bg-white border-t absolute w-full left-0 shadow-lg animate-in slide-in-from-top duration-300">
          <div className="flex flex-col p-6 gap-4 font-bold uppercase tracking-widest text-gray-600 text-sm">
            <a href="/#top" onClick={toggleMenu} className="hover:text-black">Home</a>
            <a href="/#collections" onClick={toggleMenu} className="hover:text-black">Collections</a>
            <a href="/#products" onClick={toggleMenu} className="hover:text-black">Trending</a>
            <a href="/#reviews" onClick={toggleMenu} className="hover:text-black">Reviews</a>
            
            <hr className="my-2" />
            
            {user ? (
              <>
                <Link to="/my-orders" onClick={toggleMenu} className="flex items-center gap-2 text-black">
                  <Package size={18} /> My Orders
                </Link>
                <Link to="/admin" onClick={toggleMenu} className="flex items-center gap-2 text-black">
                  <LayoutDashboard size={18} /> Admin Dashboard
                </Link>
                <button onClick={() => { logout(); toggleMenu(); }} className="flex items-center gap-2 text-red-600 text-left">
                  <LogOut size={18} /> Logout
                </button>
              </>
            ) : (
              <Link to="/login" onClick={toggleMenu} className="flex items-center gap-2 text-black">
                <User size={18} /> Login / Register
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;