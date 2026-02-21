import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // ✅ useNavigate yahan add kiya
import API from "../api/axios";
import { Star, ArrowRight, Loader2 } from "lucide-react";

const BASE_URL = import.meta.env.VITE_API_URL || "https://e-shop-backend-em02.onrender.com";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate(); // ✅ Is line ko lazmi add karein

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Axios instance baseURL ke sath perfectly kaam karega
        const res = await API.get('products/');
        setProducts(res.data);
      } catch (err) {
        console.error("API Error:", err);
        setError("Unable to load collection. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-black"></div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500 font-bold tracking-widest uppercase text-sm">
        Error: {error}
      </div>
    );

  return (
    <div className="font-sans text-gray-900 bg-white" id="top">
      
      {/* 0. ANNOUNCEMENT BAR (New Luxury Touch) */}
      <div className="bg-black text-white text-[10px] uppercase tracking-[0.3em] py-2.5 text-center font-bold">
        Complimentary global shipping on all orders over $200
      </div>

      {/* 1. HERO SECTION (More Cinematic) */}
      <section className="relative h-[85vh] w-full bg-black overflow-hidden group">
        <img
          src="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop"
          alt="Fashion Hero"
          className="absolute inset-0 w-full h-full object-cover opacity-70 transition-transform duration-[15s] ease-out group-hover:scale-110 grayscale-[20%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <span className="text-[10px] md:text-xs uppercase tracking-[0.5em] mb-6 font-bold text-gray-200">
            The Fall / Winter Collection
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-10 tracking-tighter drop-shadow-2xl">
            MODERN <br className="md:hidden" /> ELEGANCE
          </h1>
          <a
            href="#products"
            className="border border-white bg-transparent backdrop-blur-sm text-white px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-500 flex items-center gap-3 group/btn"
          >
            Explore Campaign <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-2" />
          </a>
        </div>
      </section>

      {/* 2. COLLECTIONS SECTION */}
      <section id="collections" className="container mx-auto px-6 py-28 scroll-mt-10">
        <div className="flex flex-col items-center mb-20">
          <h2 className="text-2xl md:text-3xl font-serif font-bold tracking-[0.15em] text-center uppercase">Curated Edits</h2>
          <div className="w-8 h-[1px] bg-black mt-8"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
          {/* Collection 1 */}
          <a href="#products" className="relative h-[32rem] group overflow-hidden bg-gray-100 block">
            <img src="https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=500&auto=format&fit=crop" alt="Men" className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute bottom-10 left-0 right-0 text-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <h3 className="text-2xl font-serif font-bold mb-2 tracking-widest uppercase">Menswear</h3>
              <span className="inline-block border-b border-transparent group-hover:border-white pb-1 text-[10px] font-bold uppercase tracking-widest transition-colors duration-500">Discover</span>
            </div>
          </a>
          {/* Collection 2 */}
          <a href="#products" className="relative h-[32rem] group overflow-hidden bg-gray-100 block md:-mt-12">
            <img src="https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=500&auto=format&fit=crop" alt="Women" className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute bottom-10 left-0 right-0 text-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <h3 className="text-2xl font-serif font-bold mb-2 tracking-widest uppercase">Womenswear</h3>
              <span className="inline-block border-b border-transparent group-hover:border-white pb-1 text-[10px] font-bold uppercase tracking-widest transition-colors duration-500">Discover</span>
            </div>
          </a>
          {/* Collection 3 */}
          <a href="#products" className="relative h-[32rem] group overflow-hidden bg-gray-100 block">
            <img src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&auto=format&fit=crop" alt="Accessories" className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute bottom-10 left-0 right-0 text-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <h3 className="text-2xl font-serif font-bold mb-2 tracking-widest uppercase">Accessories</h3>
              <span className="inline-block border-b border-transparent group-hover:border-white pb-1 text-[10px] font-bold uppercase tracking-widest transition-colors duration-500">Discover</span>
            </div>
          </a>
        </div>
      </section>

      {/* 3. DYNAMIC PRODUCTS SECTION */}
      <section id="products" className="bg-[#fcfcfc] py-28 border-t border-gray-100 scroll-mt-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold tracking-[0.15em] uppercase">New Arrivals</h2>
              <div className="w-8 h-[1px] bg-black mt-6"></div>
            </div>
            <a href="#products" className="text-[10px] font-bold uppercase tracking-[0.2em] border-b border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-all">View All Styles</a>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-sm uppercase tracking-widest">The collection is currently being updated.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16">
              {products.map((product, index) => (
                <div key={product.id} className="group flex flex-col">
                  {/* Image Container */}
                  <div className="relative overflow-hidden aspect-[3/4] mb-6 bg-gray-100 cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
                    
                    {/* "NEW IN" Badge for first 2 products */}
                    {index < 2 && (
                      <div className="absolute top-4 left-4 bg-white text-black px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] z-10 shadow-sm">
                        New In
                      </div>
                    )}

              <img
                      src={
                        product.image.startsWith("http")
                          ? product.image
                          : `${BASE_URL}${product.image}`
                      }
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                    />
                    
                    {/* Dark Overlay Button (Sleeker design) */}
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6">
                      <button 
                        onClick={(e) => { e.stopPropagation(); navigate(`/product/${product.id}`); }}
                        className="w-full bg-white text-black py-3.5 text-center text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-colors shadow-lg transform translate-y-4 group-hover:translate-y-0 duration-300"
                      >
                        Quick Shop
                      </button>
                    </div>
                  </div>

                  {/* Product Text Details */}
                  <div className="flex-1 flex flex-col items-center text-center px-2">
                    <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-2 hover:text-gray-500 transition-colors">
                      <Link to={`/product/${product.id}`}>{product.name}</Link>
                    </h3>
                    <p className="text-sm font-serif text-gray-600 mb-3">${product.price}</p>
                    <div className="flex text-black space-x-1">
                      <Star size={10} fill="currentColor" />
                      <Star size={10} fill="currentColor" />
                      <Star size={10} fill="currentColor" />
                      <Star size={10} fill="currentColor" />
                      <Star size={10} fill="currentColor" className="text-gray-300" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. EDITORIAL BANNER (New Section) */}
      <section className="py-24 bg-black text-white text-center px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-widest mb-8 uppercase">The Philosophy</h2>
          <p className="text-sm md:text-base text-gray-400 leading-loose font-light tracking-wide mb-10">
            We believe in clothing as an extension of one's identity. 
            Every piece is designed with meticulous attention to detail, 
            blending timeless silhouettes with contemporary minimalism.
          </p>
          <div className="w-12 h-[1px] bg-gray-500 mx-auto"></div>
        </div>
      </section>

      {/* 5. CLIENT TESTIMONIALS SECTION */}
      <section id="reviews" className="container mx-auto px-6 py-28 scroll-mt-20">
        <div className="flex flex-col items-center mb-20">
          <h2 className="text-2xl md:text-3xl font-serif font-bold tracking-[0.15em] text-center uppercase">Press & Voices</h2>
          <div className="w-8 h-[1px] bg-black mt-8"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {[
            { name: "Sarah L.", role: "Fashion Editor", review: "The fabric quality is absolutely unmatched. It feels luxurious, fits perfectly, and elevates my everyday wardrobe seamlessly." },
            { name: "Michael R.", role: "Architect", review: "Fast delivery and the minimalist aesthetic is exactly what I was looking for. E-SHOP has redefined my approach to modern style." },
            { name: "Emma W.", role: "Creative Director", review: "I love the attention to detail. From the premium packaging to the actual product, everything screams quiet luxury." }
          ].map((testimonial, idx) => (
            <div key={idx} className="text-center flex flex-col h-full group">
              <div className="flex justify-center text-black mb-6 gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
              </div>
              <p className="text-gray-600 italic mb-8 flex-grow leading-relaxed font-serif text-lg">"{testimonial.review}"</p>
              <div>
                <h4 className="font-bold text-[10px] tracking-[0.2em] uppercase text-black mb-1.5">{testimonial.name}</h4>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest">{testimonial.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Home;