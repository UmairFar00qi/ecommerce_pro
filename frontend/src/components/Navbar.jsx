import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, LayoutDashboard, LogOut, Package, Search } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const cartCount = JSON.parse(localStorage.getItem("cart"))?.length || 0;

  const logout = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Brand Logo */}
        <Link
          to="/"
          className="text-2xl font-serif font-extrabold tracking-widest text-black"
        >
          E-SHOP.
        </Link>

        {/* Center Links (Sections) - Hidden on small screens */}
        <div className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-gray-600">
          <a href="/#top" className="hover:text-black transition-colors">Home</a>
          <a href="/#collections" className="hover:text-black transition-colors">Collections</a>
          <a href="/#products" className="hover:text-black transition-colors">Trending</a>
          <a href="/#reviews" className="hover:text-black transition-colors">Reviews</a>
        </div>

        {/* Right Side Icons & User Actions */}
        <div className="flex items-center gap-6 text-gray-800">
          {/* Cart Icon */}
          <Link to="/cart" className="relative hover:text-black transition-transform hover:scale-110">
            <ShoppingCart size={20} strokeWidth={2} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center gap-5 text-sm font-medium border-l pl-5">
              <Link to="/my-orders" className="flex items-center gap-1.5 hover:text-black transition">
                <Package size={18} /> <span className="hidden sm:inline">Orders</span>
              </Link>

              <Link to="/admin" className="flex items-center gap-1.5 hover:text-black transition">
                <LayoutDashboard size={18} /> <span className="hidden sm:inline">Admin</span>
              </Link>
              
              <button onClick={logout} className="flex items-center gap-1.5 text-gray-500 hover:text-red-600 transition">
                <LogOut size={18} /> <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <Link to="/login" className="flex items-center gap-1.5 text-sm font-bold uppercase tracking-wider hover:text-black transition border-l pl-5">
              <User size={18} /> Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;