import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Star, Truck, RefreshCcw, ChevronRight, ShoppingBag } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Hardcoded Premium Sizes & Colors (Kyunke API mein abhi nahi hain)
  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  const colors = [
    { name: 'Onyx Black', hex: '#111111' },
    { name: 'Pearl White', hex: '#f4f4f4' },
    { name: 'Navy Blue', hex: '#1a237e' },
    { name: 'Earthy Beige', hex: '#d7ccc8' }
  ];

  const [selectedSize, setSelectedSize] = useState('M'); // Default size
  const [selectedColor, setSelectedColor] = useState(colors[0]); // Default color

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/products/${id}/`)
      .then(res => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  // Asli Add to Cart Logic
  const handleAddToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    // Check item exists
    const exist = cart.find((item) => item.id === product.id);

    if (exist) {
      cart = cart.map((item) =>
        item.id === product.id ? { ...exist, qty: exist.qty + 1 } : item
      );
    } else {
      // Size aur Color bhi cart mein save kar rahe hain
      cart.push({ 
        ...product, 
        qty: 1, 
        selectedSize, 
        selectedColor: selectedColor.name 
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event('storage')); // Navbar update karne ke liye
    alert(`${product.name} (Size: ${selectedSize}) added to your bag!`);
    navigate('/cart'); // Add hone ke baad direct cart par le jao
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!product) return <div className="text-center py-20 text-xl font-serif">Product not found.</div>;

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans pb-20">
      
      {/* Breadcrumb Navigation */}
      <div className="container mx-auto px-6 py-6 border-b border-gray-100">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400">
          <Link to="/" className="hover:text-black transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link to="/#products" className="hover:text-black transition-colors">Collections</Link>
          <ChevronRight size={12} />
          <span className="text-black font-bold truncate max-w-[200px]">{product.name}</span>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* Left: Product Image */}
        <div className="lg:w-1/2">
          <div className="bg-[#f9f9f9] w-full aspect-[4/5] relative group overflow-hidden">
            <img 
              src={product.image.startsWith('http') ? product.image : `http://127.0.0.1:8000${product.image}`} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              alt={product.name} 
            />
          </div>
        </div>
        
        {/* Right: Product Details */}
        <div className="lg:w-1/2 flex flex-col justify-center">
          
          <h1 className="text-3xl md:text-5xl font-serif font-bold tracking-widest mb-4 uppercase">{product.name}</h1>
          <p className="text-2xl font-serif text-black mb-6">${product.price}</p>
          
          <div className="flex items-center gap-1 text-black mb-8">
            <Star size={14} fill="currentColor" />
            <Star size={14} fill="currentColor" />
            <Star size={14} fill="currentColor" />
            <Star size={14} fill="currentColor" />
            <Star size={14} fill="currentColor" className="text-gray-300" />
            <span className="text-xs uppercase tracking-widest text-gray-400 ml-2 border-b border-gray-400 pb-0.5">124 Reviews</span>
          </div>

          <p className="text-gray-500 text-sm leading-relaxed mb-10 tracking-wide">
            {product.description || "Crafted from premium materials, this piece offers a minimalist aesthetic tailored for the modern wardrobe. Experience unparalleled comfort and timeless style."}
          </p>

          {/* COLOR SELECTOR */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold uppercase tracking-widest">Color: <span className="text-gray-500 font-normal ml-1">{selectedColor.name}</span></span>
            </div>
            <div className="flex gap-4">
              {colors.map((color, idx) => (
                <button 
                  key={idx}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${selectedColor.name === color.name ? 'border-black p-0.5 scale-110' : 'border-transparent hover:border-gray-300'}`}
                >
                  <div className="w-full h-full rounded-full border border-gray-200" style={{ backgroundColor: color.hex }}></div>
                </button>
              ))}
            </div>
          </div>

          {/* SIZE SELECTOR */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold uppercase tracking-widest">Size: <span className="text-gray-500 font-normal ml-1">{selectedSize}</span></span>
              <a href="#" className="text-xs text-gray-400 uppercase tracking-widest border-b border-gray-300 hover:text-black transition-colors">Size Guide</a>
            </div>
            <div className="grid grid-cols-5 gap-3">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 text-xs font-bold uppercase tracking-widest transition-all border ${
                    selectedSize === size 
                      ? 'bg-black text-white border-black' 
                      : 'bg-white text-gray-600 border-gray-200 hover:border-black'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* ADD TO CART BUTTON */}
          <button 
            onClick={handleAddToCart}
            className="w-full bg-black text-white py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-800 transition-all shadow-lg flex justify-center items-center gap-3 group mb-12"
          >
            <ShoppingBag size={18} className="group-hover:-translate-y-1 transition-transform" /> 
            Add to Bag
          </button>

          {/* Product Perks */}
          <div className="space-y-6 border-t border-gray-100 pt-8">
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <Truck size={20} className="text-black" strokeWidth={1.5} />
              <span className="tracking-wide">Complimentary shipping on orders over $150.</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <RefreshCcw size={20} className="text-black" strokeWidth={1.5} />
              <span className="tracking-wide">Free 30-day returns and exchanges.</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;