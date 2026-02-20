import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { Package, Download, ArrowRight, Clock, CheckCircle } from 'lucide-react';
import { jsPDF } from 'jspdf'; // NAYA IMPORT: PDF banane ke liye

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        
        if (!userInfo) {
          navigate('/login');
          return;
        }

        const myToken = userInfo.access || userInfo.token;
        const config = {
          headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${myToken}` 
          },
        };

        const { data } = await API.get('products/orders/myorders/', config);
        setOrders(data);
      } catch (err) {
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyOrders();
  }, [navigate]);

  // ----------------------------------------------------
  // NAYA FUNCTION: Premium E-Receipt Generate Karne ke liye
  // ----------------------------------------------------
  const generateReceipt = (order) => {
    const doc = new jsPDF();

    // 1. Brand Name (Minimalist)
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.text("E-SHOP.", 20, 30);

    // 2. Subtitle
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(120, 120, 120); // Gray color
    doc.text("OFFICIAL E-RECEIPT", 20, 40);

    // 3. Divider Line
    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.line(20, 45, 190, 45);

    // 4. Order Details
    doc.setTextColor(0, 0, 0); // Black color
    doc.setFontSize(12);
    
    doc.text(`Order Reference:`, 20, 60);
    doc.setFont("helvetica", "bold");
    doc.text(`#ORD-${order.id}`, 60, 60);

    doc.setFont("helvetica", "normal");
    doc.text(`Date:`, 20, 70);
    doc.text(`${new Date(order.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, 60, 70);

    doc.text(`Status:`, 20, 80);
    doc.text(`${order.is_delivered ? 'Delivered' : 'Processing'}`, 60, 80);

    // 5. Total Amount (Big and Bold)
    doc.line(20, 95, 190, 95); // Doosri line
    doc.setFontSize(14);
    doc.text(`Total Amount Paid:`, 20, 110);
    doc.setFont("helvetica", "bold");
    doc.text(`$${order.total_price}`, 150, 110);

    // 6. Footer Note
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text("Thank you for elevating your style with E-SHOP.", 20, 140);
    doc.text("For any inquiries, please contact support@e-shop.com", 20, 146);

    // 7. PDF Download karwa do
    doc.save(`E-SHOP_Receipt_ORD-${order.id}.pdf`);
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[80vh] bg-white">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-black"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans py-16 px-4 sm:px-6">
      <div className="container mx-auto max-w-5xl">
        
        <div className="mb-12 border-b border-gray-200 pb-6">
          <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-widest uppercase">Purchase History</h1>
          <p className="text-xs tracking-widest uppercase text-gray-500 mt-2">Manage your recent orders and returns</p>
        </div>
        
        {orders.length === 0 ? (
          <div className="text-center py-20 flex flex-col items-center">
            <Package size={48} strokeWidth={1} className="text-gray-300 mb-6" />
            <p className="text-lg font-serif text-gray-500 mb-8 tracking-wide">You haven't placed any orders yet.</p>
            <Link 
              to="/#products" 
              className="bg-black text-white px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-800 transition-all shadow-md inline-flex items-center gap-2 group"
            >
              Discover New Arrivals <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map(order => (
              <div key={order.id} className="bg-white p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group">
                
                {/* Order Info */}
                <div>
                  <div className="flex items-center gap-4 mb-3">
                    <p className="text-xs text-gray-500 font-bold tracking-widest uppercase">Order Ref.</p>
                    <p className="text-sm font-mono tracking-wider font-semibold text-black">#ORD-{order.id}</p>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="tracking-wide">Placed on:</span> <span className="font-serif ml-1">{new Date(order.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </p>
                  <p className="text-lg font-serif font-bold mt-3 text-black">
                    ${order.total_price}
                  </p>
                </div>

                {/* Status & Actions */}
                <div className="w-full md:w-auto flex flex-col items-start md:items-end gap-4 border-t border-gray-100 md:border-none pt-4 md:pt-0">
                  
                  {/* Status Badge */}
                  {order.is_delivered ? (
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-gray-50 text-black text-[10px] font-bold uppercase tracking-widest border border-gray-200">
                      <CheckCircle size={12} strokeWidth={2}/> Delivered
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-gray-50 text-gray-500 text-[10px] font-bold uppercase tracking-widest border border-gray-200">
                      <Clock size={12} strokeWidth={2}/> Processing
                    </span>
                  )}

                  {/* UPDATE: Invoice Button ab functional hai */}
                  <button 
                    onClick={() => generateReceipt(order)}
                    className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 hover:text-black transition-colors flex items-center gap-2 border-b border-transparent hover:border-black pb-0.5 mt-2"
                  >
                    <Download size={14} /> Download E-Receipt
                  </button>
                </div>
                
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;