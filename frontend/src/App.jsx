import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; // Footer import kiya
import Home from "./pages/Home";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";
import Cart from "./pages/Cart";
import MyOrders from "./pages/MyOrders"; 
import ProductDetail from "./pages/ProductDetail";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <Router>
      {/* flex-col aur min-h-screen lazmi hain footer ko bottom par rakhne ke liye */}
      <div className="min-h-screen flex flex-col bg-gray-50">
        
        {/* Navbar hamesha upar rahega */}
        <Navbar />
        
        {/* Main Content (flex-grow isay saari bachi hui jagah de dega) */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/my-orders" element={<MyOrders />} />
          </Routes>
        </main>

        {/* Footer hamesha neechay rahega */}
        <Footer />
        
      </div>
    </Router>
  );
}

export default App;