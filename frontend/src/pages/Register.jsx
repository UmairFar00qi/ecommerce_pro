import { useState, useEffect } from 'react';
import API from '../api/axios'; 
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Loader2 } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const navigate = useNavigate();

  // Agar user pehle se login hai to home bhej dein
  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      navigate('/');
    }
  }, [navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // 1. Password Match Check
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      // 2. Backend API Call (products/urls.py mein humne register/ banaya tha)
      await API.post('products/register/', { 
        name: name,
        email: email, 
        password: password 
      });
      
      // 3. Success par Login page par bhej dein
      alert("Welcome! Your exclusive account has been created. Please sign in.");
      navigate('/login'); 

    } catch (error) {
      console.error("Registration Error:", error);
      const message = error.response && error.response.data.detail
        ? error.response.data.detail
        : "Failed to create account. Please try again.";
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex flex-row-reverse">
      {/* Right Side: Fashion Image (Reverse layout for Register to distinguish from Login) */}
      <div className="hidden md:block md:w-1/2 relative">
        <img 
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop" 
          alt="Fashion Editorial" 
          className="absolute inset-0 w-full h-full object-cover grayscale-[20%]"
        />
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-10 right-10 text-white text-right">
          <h2 className="text-3xl font-serif font-bold tracking-widest drop-shadow-lg">E-SHOP.</h2>
          <p className="tracking-widest uppercase text-xs mt-2 drop-shadow-md">Join the minimalist revolution.</p>
        </div>
      </div>

      {/* Left Side: Register Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md">
          
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-serif font-bold tracking-widest text-black mb-3 uppercase">Join Us</h2>
            <p className="text-gray-500 text-[10px] tracking-[0.3em] uppercase font-bold">Create your exclusive account</p>
          </div>

          {errorMessage && (
            <div className="mb-6 p-4 bg-red-50 border-l-2 border-red-500 text-red-600 text-xs uppercase tracking-widest font-bold">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-8">
            {/* Name Input */}
            <div className="relative">
              <input 
                type="text" 
                id="name"
                className="w-full border-b border-gray-200 py-3 bg-transparent text-gray-900 focus:outline-none focus:border-black transition-colors peer placeholder-transparent"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <label htmlFor="name" className="absolute left-0 -top-3.5 text-gray-400 text-[10px] tracking-widest uppercase transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:text-black font-bold">
                Full Name
              </label>
            </div>

            {/* Email Input */}
            <div className="relative">
              <input 
                type="email" 
                id="email"
                className="w-full border-b border-gray-200 py-3 bg-transparent text-gray-900 focus:outline-none focus:border-black transition-colors peer placeholder-transparent"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-400 text-[10px] tracking-widest uppercase transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:text-black font-bold">
                Email Address
              </label>
            </div>

            {/* Password Input */}
            <div className="relative">
              <input 
                type="password" 
                id="password"
                autoComplete="new-password"
                className="w-full border-b border-gray-200 py-3 bg-transparent text-gray-900 focus:outline-none focus:border-black transition-colors peer placeholder-transparent"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-400 text-[10px] tracking-widest uppercase transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:text-black font-bold">
                Password
              </label>
            </div>

            {/* Confirm Password Input */}
            <div className="relative">
              <input 
                type="password" 
                id="confirmPassword"
                autoComplete="new-password"
                className="w-full border-b border-gray-200 py-3 bg-transparent text-gray-900 focus:outline-none focus:border-black transition-colors peer placeholder-transparent"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <label htmlFor="confirmPassword" className="absolute left-0 -top-3.5 text-gray-400 text-[10px] tracking-widest uppercase transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:text-black font-bold">
                Confirm Password
              </label>
            </div>

            {/* Register Button */}
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-black text-white py-4 flex justify-center items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-zinc-800 transition-all duration-500 disabled:bg-gray-200 disabled:text-gray-400 group mt-4"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={16} />
              ) : (
                <>
                  Create Account <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-12 text-center pt-8 border-t border-gray-50">
            <p className="text-gray-400 text-[10px] tracking-widest uppercase font-bold">
              Already a member?
              <Link to="/login" className="text-black ml-2 hover:border-b border-black pb-1 transition-all">
                Sign In
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Register;