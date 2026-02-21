import { useState, useEffect } from 'react';
import API from '../api/axios'; // Capital 'API' for consistency
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Loader2 } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const navigate = useNavigate();

  // Agar user pehle se login hai to use home bhej dein
  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      navigate('/');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      // Axios instance ka sahi istemal
     const response = await API.post('users/login/', { 
    username: username, // Yahan 'admin' pass hoga
    password: password 
});
      
      // Token aur user info save karna
      localStorage.setItem('userInfo', JSON.stringify(response.data));
      
      // Success! Home page par redirect
      navigate('/'); 
    } catch (error) {
      console.error("Login Error:", error);
      
      // Backend se aane wala specific error message dikhana
      const message = error.response && error.response.data.detail
        ? error.response.data.detail
        : "Connection failed. Please check if backend is live.";
      
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex">
      {/* Left Side: Fashion Image */}
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
            <h2 className="text-3xl font-serif font-bold tracking-widest text-black mb-3 uppercase">Welcome Back</h2>
            <p className="text-gray-500 text-[10px] tracking-[0.3em] uppercase font-bold">Sign in to your exclusive account</p>
          </div>

          {/* Error Message Display */}
          {errorMessage && (
            <div className="mb-6 p-4 bg-red-50 border-l-2 border-red-500 text-red-600 text-xs uppercase tracking-widest font-bold">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-10">
            {/* Username Input */}
            <div className="relative">
              <input 
                type="text" 
                id="username"
                className="w-full border-b border-gray-200 py-3 bg-transparent text-gray-900 focus:outline-none focus:border-black transition-colors peer placeholder-transparent"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label 
                htmlFor="username" 
                className="absolute left-0 -top-3.5 text-gray-400 text-[10px] tracking-widest uppercase transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:text-black font-bold"
              >
                Username
              </label>
            </div>

            {/* Password Input */}
            <div className="relative">
  <input 
    type="password" 
    id="password"
    autoComplete="current-password" // ✅ Browser warnings khatam aur UX behtar
    className="w-full border-b border-gray-200 py-3 bg-transparent text-gray-900 focus:outline-none focus:border-black transition-colors peer placeholder-transparent"
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
  />
  <label 
    htmlFor="password" 
    className="absolute left-0 -top-3.5 text-gray-400 text-[10px] tracking-widest uppercase transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:text-black font-bold"
  >
    Password
  </label>
</div>
            <div className="flex justify-end">
              <button type="button" className="text-[10px] text-gray-400 hover:text-black transition-colors uppercase tracking-[0.2em] font-bold border-b border-transparent hover:border-black pb-1">
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-black text-white py-4 flex justify-center items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-zinc-800 transition-all duration-500 disabled:bg-gray-200 disabled:text-gray-400 group"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={16} />
              ) : (
                <>
                  Enter Studio <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-16 text-center pt-8 border-t border-gray-50">
            <p className="text-gray-400 text-[10px] tracking-widest uppercase font-bold">
              New to the collection?
              <Link to="/register" className="text-black ml-2 hover:border-b border-black pb-1 transition-all">
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