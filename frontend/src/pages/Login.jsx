import { useState } from 'react';
import api from '../api'; // Central API import karein
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Ab poora URL likhne ki zaroorat nahi
      const response = await api.post('/api/users/login/', { username, password });
      localStorage.setItem('userInfo', JSON.stringify(response.data));
      navigate('/'); 
    } catch (error) {
      alert("Invalid Credentials or Network Error. Check if backend is live.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex">
      {/* Left Side: Fashion Image (Sirf bari screens par nazar aayega) */}
      <div className="hidden md:block md:w-1/2 relative">
        <img 
          src="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop" 
          alt="Fashion Editorial" 
          className="absolute inset-0 w-full h-full object-cover grayscale-[30%]"
        />
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute bottom-10 left-10 text-white">
          <h2 className="text-3xl font-serif font-bold tracking-widest drop-shadow-lg">E-SHOP.</h2>
          <p className="tracking-widest uppercase text-xs mt-2 drop-shadow-md">Curated for the modern minimalists.</p>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md">
          
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-serif font-bold tracking-widest text-black mb-3">WELCOME BACK</h2>
            <p className="text-gray-500 text-sm tracking-widest uppercase">Sign in to your exclusive account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-8">
            {/* Username Input */}
            <div className="relative">
              <input 
                type="text" 
                id="username"
                className="w-full border-b border-gray-300 py-3 bg-transparent text-gray-900 focus:outline-none focus:border-black transition-colors peer placeholder-transparent"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label 
                htmlFor="username" 
                className="absolute left-0 -top-3.5 text-gray-500 text-xs tracking-widest uppercase transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-black cursor-text"
              >
                Username
              </label>
            </div>

            {/* Password Input */}
            <div className="relative">
              <input 
                type="password" 
                id="password"
                className="w-full border-b border-gray-300 py-3 bg-transparent text-gray-900 focus:outline-none focus:border-black transition-colors peer placeholder-transparent"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label 
                htmlFor="password" 
                className="absolute left-0 -top-3.5 text-gray-500 text-xs tracking-widest uppercase transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-black cursor-text"
              >
                Password
              </label>
            </div>

            <div className="flex justify-end">
              <a href="#" className="text-xs text-gray-400 hover:text-black transition-colors uppercase tracking-wider border-b border-transparent hover:border-black pb-0.5">
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button 
              disabled={isLoading}
              className="w-full bg-black text-white py-4 flex justify-center items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-800 transition-all duration-300 shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed group"
            >
              {isLoading ? 'SIGNING IN...' : (
                <>
                  SIGN IN <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-12 text-center border-t border-gray-100 pt-8">
            <p className="text-gray-500 text-xs tracking-widest uppercase">
              Don't have an account?{' '}
              <Link to="/register" className="text-black font-bold hover:border-b border-black pb-0.5 transition-all ml-1">
                Create Account
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;