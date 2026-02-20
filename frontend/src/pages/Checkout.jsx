import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';
import { CreditCard, Smartphone, X, Check, Lock, ArrowRight, ShieldCheck } from 'lucide-react';

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [orderNumber, setOrderNumber] = useState(null);
  
  // Payment States
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(items);
    if (items.length === 0) {
      navigate('/cart'); // Agar cart khali hai to wapis bhej do
    }
  }, [navigate]);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const tax = subtotal * 0.05;
  const totalPrice = subtotal + tax;

  const executeOrder = async () => {
    setIsProcessing(true);
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      
      if (!userInfo) {
        alert("Please sign in to complete your purchase.");
        navigate('/login');
        return;
      }

      const myToken = userInfo.access || userInfo.token;
      
      if (!myToken) {
        alert("Session expired. Please sign in again.");
        navigate('/login');
        return;
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${myToken}`,
        },
      };

      const { data } = await API.post('products/orders/add/', {
        orderItems: cartItems,
        totalPrice: totalPrice.toFixed(2),
      }, config);
      
      setOrderNumber(data.id);
      localStorage.removeItem('cart');
      setShowPaymentModal(false);
      window.dispatchEvent(new Event('storage')); // Update Navbar cart count
    } catch (error) {
      alert(`Order Failed: ${error.response?.data?.detail || "Please try again later."}`);
      setShowPaymentModal(false);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleProceedToPayment = () => {
    setShowPaymentModal(true);
  };

  // ---------------- PREMIUM SUCCESS SCREEN ----------------
  if (orderNumber) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-white text-center px-6">
        <div className="w-24 h-24 bg-black text-white rounded-full flex items-center justify-center mb-8 shadow-2xl animate-bounce">
          <Check size={40} strokeWidth={3} />
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-widest text-black mb-4">ORDER CONFIRMED</h1>
        <p className="text-gray-500 uppercase tracking-widest text-sm mb-8">Thank you for your purchase.</p>
        
        <div className="bg-gray-50 border border-gray-100 p-8 w-full max-w-md mb-10">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Order Reference</p>
          <p className="text-2xl font-serif font-bold tracking-widest">#ORD-{orderNumber}</p>
          <div className="mt-6 text-xs text-gray-500 tracking-wide leading-relaxed">
            We've sent a confirmation email with your order details.<br/>
            Your items will be dispatched shortly.
          </div>
        </div>

        <Link 
          to="/" 
          className="bg-black text-white px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-800 transition-all shadow-md flex items-center gap-2 group"
        >
          Continue Shopping <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans py-16">
      <div className="container mx-auto px-6 max-w-6xl">
        
        <div className="mb-12 border-b border-gray-200 pb-6">
          <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-widest uppercase">Secure Checkout</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Side: Forms (Takes 7 columns on large screens) */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Shipping Info */}
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest mb-6 border-b border-gray-100 pb-2 flex items-center gap-2">
                1. Shipping Address
              </h2>
              <div className="space-y-4">
                <input type="text" placeholder="Full Name" className="w-full border-b border-gray-300 py-3 bg-transparent focus:outline-none focus:border-black transition-colors text-sm" />
                <input type="text" placeholder="Complete Address" className="w-full border-b border-gray-300 py-3 bg-transparent focus:outline-none focus:border-black transition-colors text-sm" />
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="City" className="w-full border-b border-gray-300 py-3 bg-transparent focus:outline-none focus:border-black transition-colors text-sm" />
                  <input type="text" placeholder="Postal Code" className="w-full border-b border-gray-300 py-3 bg-transparent focus:outline-none focus:border-black transition-colors text-sm" />
                </div>
                <input type="tel" placeholder="Phone Number" className="w-full border-b border-gray-300 py-3 bg-transparent focus:outline-none focus:border-black transition-colors text-sm" />
              </div>
            </div>

            {/* Payment Method Selection */}
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest mb-6 border-b border-gray-100 pb-2 flex items-center gap-2">
                2. Payment Method
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Card */}
                <label className={`cursor-pointer border p-6 flex flex-col items-center justify-center gap-3 transition-all ${paymentMethod === 'card' ? 'border-black border-2 bg-gray-50' : 'border-gray-200 hover:border-gray-400'}`}>
                  <input type="radio" name="payment" value="card" className="hidden" onChange={() => setPaymentMethod('card')} />
                  <CreditCard size={28} className={paymentMethod === 'card' ? 'text-black' : 'text-gray-400'} strokeWidth={1.5} />
                  <span className="font-bold text-xs uppercase tracking-widest text-center">Credit Card</span>
                </label>

                {/* PayPal */}
                <label className={`cursor-pointer border p-6 flex flex-col items-center justify-center gap-3 transition-all ${paymentMethod === 'paypal' ? 'border-black border-2 bg-gray-50' : 'border-gray-200 hover:border-gray-400'}`}>
                  <input type="radio" name="payment" value="paypal" className="hidden" onChange={() => setPaymentMethod('paypal')} />
                  <span className="text-xl font-bold italic tracking-tighter text-blue-900">PayPal</span>
                  <span className="font-bold text-xs uppercase tracking-widest text-center mt-1">PayPal</span>
                </label>

                {/* Google Pay */}
                <label className={`cursor-pointer border p-6 flex flex-col items-center justify-center gap-3 transition-all ${paymentMethod === 'gpay' ? 'border-black border-2 bg-gray-50' : 'border-gray-200 hover:border-gray-400'}`}>
                  <input type="radio" name="payment" value="gpay" className="hidden" onChange={() => setPaymentMethod('gpay')} />
                  <Smartphone size={28} className={paymentMethod === 'gpay' ? 'text-black' : 'text-gray-400'} strokeWidth={1.5} />
                  <span className="font-bold text-xs uppercase tracking-widest text-center">Google Pay</span>
                </label>
              </div>
            </div>
          </div>

          {/* Right Side: Order Summary (Takes 5 columns) */}
          <div className="lg:col-span-5">
            <div className="bg-[#f9f9f9] p-8 sticky top-28">
              <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-200 pb-4 mb-6">In Your Bag</h2>
              
              {/* Items List (Miniature) */}
              <div className="max-h-64 overflow-y-auto mb-6 pr-2 space-y-4">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-16 bg-gray-200 flex-shrink-0">
                         <img src={item.image.startsWith('http') ? item.image : `http://127.0.0.1:8000${item.image}`} className="w-full h-full object-cover grayscale-[20%]" alt=""/>
                      </div>
                      <div>
                        <p className="font-bold uppercase tracking-wider text-xs">{item.name}</p>
                        <p className="text-gray-500 text-xs">Qty: {item.qty}</p>
                      </div>
                    </div>
                    <span className="font-serif">${(item.price * item.qty).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 pt-6 border-t border-gray-200 text-sm tracking-wide">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Estimated Tax (5%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-xs uppercase">Free</span>
                </div>
              </div>

              <div className="flex justify-between font-serif font-bold text-xl border-t border-gray-200 pt-6 mt-6 mb-8">
                <span className="uppercase tracking-widest text-base font-sans">Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>

              <button 
                onClick={handleProceedToPayment}
                className="w-full bg-black text-white py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-800 transition-all shadow-md flex justify-center items-center gap-2 group"
              >
                <Lock size={14} /> Authorize Payment
              </button>
            </div>
          </div>
          
        </div>

        {/* ---------------- PAYMENT MODAL ---------------- */}
        {showPaymentModal && (
          <div className="fixed inset-0 bg-white/90 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div className="bg-white border border-gray-200 p-10 shadow-2xl w-full max-w-md relative animate-fade-in-up">
              
              <button onClick={() => setShowPaymentModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-black transition">
                <X size={24} strokeWidth={1.5} />
              </button>
              
              <div className="text-center mb-8">
                <ShieldCheck size={40} strokeWidth={1} className="mx-auto mb-4 text-black" />
                <h2 className="text-xl font-serif font-bold uppercase tracking-widest text-black">
                  {paymentMethod === 'paypal' ? 'PayPal Checkout' : paymentMethod === 'gpay' ? 'Google Pay' : 'Secure Checkout'}
                </h2>
                <p className="text-gray-500 text-sm mt-2 tracking-widest uppercase">Amount due: <span className="font-bold text-black">${totalPrice.toFixed(2)}</span></p>
              </div>

              {paymentMethod === 'card' && (
                <div className="space-y-6 mb-8">
                  <input type="text" placeholder="Card Number" className="w-full border-b border-gray-300 py-3 text-sm focus:outline-none focus:border-black transition-colors font-mono tracking-widest" />
                  <div className="flex gap-6">
                    <input type="text" placeholder="MM/YY" className="w-1/2 border-b border-gray-300 py-3 text-sm focus:outline-none focus:border-black transition-colors font-mono tracking-widest" />
                    <input type="text" placeholder="CVC" className="w-1/2 border-b border-gray-300 py-3 text-sm focus:outline-none focus:border-black transition-colors font-mono tracking-widest" />
                  </div>
                  <input type="text" placeholder="Cardholder Name" className="w-full border-b border-gray-300 py-3 text-sm focus:outline-none focus:border-black transition-colors uppercase tracking-widest" />
                </div>
              )}

              {paymentMethod === 'paypal' && (
                <div className="mb-8 p-6 bg-gray-50 text-center border border-gray-100 text-sm tracking-wide text-gray-600">
                  You will be securely redirected to PayPal to complete your purchase.
                </div>
              )}

              {paymentMethod === 'gpay' && (
                <div className="mb-8 flex justify-center">
                  <div className="px-8 py-4 border border-black flex items-center gap-3 cursor-pointer hover:bg-black hover:text-white transition-colors uppercase tracking-widest text-xs font-bold">
                    <Smartphone size={18} /> Pay with Device
                  </div>
                </div>
              )}

              <button 
                onClick={executeOrder}
                disabled={isProcessing}
                className="w-full bg-black text-white py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-800 transition-all shadow-md flex justify-center items-center disabled:bg-gray-400"
              >
                {isProcessing ? 'PROCESSING...' : `PAY $${totalPrice.toFixed(2)}`}
              </button>
              
              <p className="text-center text-[10px] text-gray-400 mt-6 tracking-widest uppercase">
                256-bit Secure Encryption
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Checkout;