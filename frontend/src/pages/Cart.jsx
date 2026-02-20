import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // LocalStorage se cart uthana
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(items);
  }, []);

  // Quantity barhane ya kam karne ke liye
  const updateQty = (id, action) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === id) {
        let newQty = action === 'inc' ? item.qty + 1 : item.qty - 1;
        return { ...item, qty: Math.max(1, newQty) };
      }
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    // Optional: Agar quantity change karne par navbar update nahi hota to window.dispatchEvent use kar sakte hain
    window.dispatchEvent(new Event('storage')); 
  };

  // Item remove karne ke liye
  const removeItem = (id) => {
    const filteredCart = cartItems.filter(item => item.id !== id);
    setCartItems(filteredCart);
    localStorage.setItem('cart', JSON.stringify(filteredCart));
    window.dispatchEvent(new Event('storage')); // Navbar cart count refresh karne ke liye
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="min-h-[80vh] bg-white text-gray-900 font-sans py-16">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Header */}
        <div className="mb-12 border-b border-gray-200 pb-6 flex items-center justify-between">
          <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-widest uppercase">Shopping Bag</h1>
          <span className="text-gray-500 text-sm uppercase tracking-widest">{cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}</span>
        </div>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-20 flex flex-col items-center">
            <ShoppingBag size={48} strokeWidth={1} className="text-gray-300 mb-6" />
            <p className="text-xl font-serif text-gray-500 mb-8 tracking-wide">Your shopping bag is empty.</p>
            <Link 
              to="/#products" 
              className="bg-black text-white px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-800 transition-all shadow-md inline-flex items-center gap-2"
            >
              Continue Shopping <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            
            {/* Items List (Left Side) */}
            <div className="lg:col-span-2 space-y-8">
              {/* Desktop View Table Header (Optional, for structure) */}
              <div className="hidden md:flex justify-between text-xs text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-4">
                <span className="w-2/3">Product Details</span>
                <span className="w-1/6 text-center">Quantity</span>
                <span className="w-1/6 text-right">Price</span>
              </div>

              {cartItems.map(item => (
                <div key={item.id} className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-gray-100 pb-8 gap-6 group">
                  
                  {/* Product Info */}
                  <div className="flex items-center gap-6 w-full md:w-2/3">
                    <div className="w-24 h-32 flex-shrink-0 bg-gray-50 overflow-hidden">
                      <img 
                        src={item.image.startsWith('http') ? item.image : `http://127.0.0.1:8000${item.image}`} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        alt={item.name} 
                      />
                    </div>
                    <div>
                      <h3 className="text-base font-bold uppercase tracking-widest mb-1">
                        <Link to={`/product/${item.id}`} className="hover:text-gray-500 transition-colors">{item.name}</Link>
                      </h3>
                      <p className="text-gray-500 text-xs uppercase tracking-widest mb-4">Ref. {item.id}</p>
                      
                      {/* Mobile Remove Button */}
                      <button onClick={() => removeItem(item.id)} className="text-xs text-gray-400 hover:text-black uppercase tracking-widest border-b border-transparent hover:border-black transition-all flex items-center gap-1 md:hidden">
                        Remove
                      </button>
                    </div>
                  </div>
                  
                  {/* Controls & Price (Desktop aligns right, Mobile flexes) */}
                  <div className="flex items-center justify-between w-full md:w-1/3 mt-4 md:mt-0">
                    {/* Quantity Control */}
                    <div className="flex items-center border border-gray-300 w-fit">
                      <button onClick={() => updateQty(item.id, 'dec')} className="p-3 text-gray-500 hover:text-black transition-colors"><Minus size={14}/></button>
                      <span className="w-8 text-center text-sm font-medium">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, 'inc')} className="p-3 text-gray-500 hover:text-black transition-colors"><Plus size={14}/></button>
                    </div>

                    {/* Price & Desktop Remove */}
                    <div className="flex flex-col items-end gap-4">
                      <p className="font-serif text-lg font-medium">${(item.price * item.qty).toFixed(2)}</p>
                      <button 
                        onClick={() => removeItem(item.id)} 
                        className="hidden md:flex text-gray-400 hover:text-black transition-colors p-2"
                        title="Remove Item"
                      >
                        <Trash2 size={18}/>
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>

            {/* Summary Box (Right Side) */}
            <div className="lg:col-span-1">
              <div className="bg-[#f9f9f9] p-8 sticky top-28">
                <h2 className="text-lg font-bold uppercase tracking-widest border-b border-gray-200 pb-4 mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-8 text-sm tracking-wide">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-xs uppercase">Calculated at checkout</span>
                  </div>
                </div>

                <div className="flex justify-between font-serif font-bold text-xl border-t border-gray-200 pt-6 mb-8">
                  <span className="uppercase tracking-widest text-base font-sans">Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <button 
                  onClick={() => navigate('/checkout')}
                  className="w-full bg-black text-white py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-800 transition-all shadow-md flex justify-center items-center gap-2 group"
                >
                  Proceed to Checkout <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="mt-6 text-center">
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest leading-loose">
                    Taxes and shipping calculated at checkout.<br/>Secure payment processing.
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;