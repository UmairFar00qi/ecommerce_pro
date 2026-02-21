import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { ShoppingBag, DollarSign, Package, CheckCircle, Clock } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const navigate = useNavigate();

const fetchAdminData = async () => {
    try {
      const storedUser = localStorage.getItem('userInfo');
      if (!storedUser) {
        navigate('/login');
        return;
      }

      const userInfo = JSON.parse(storedUser);
      const config = {
        headers: { Authorization: `Bearer ${userInfo.access}` },
      };

      // Yahan endpoint path check karein:
      // Agar axios.js mein baseURL '.../api/' hai, to ye path bilkul sahi hai.
      const { data } = await API.get('products/admin/stats/', config);
      setStats(data);
    } catch (error) {
      console.error("Admin Fetch Error:", error);
      alert("Unauthorized access or session expired.");
      navigate('/login'); // Login par wapis bhejein
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const markAsDelivered = async (orderId) => {
    if (window.confirm("Confirm marking this order as Delivered?")) {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const config = {
          headers: { Authorization: `Bearer ${userInfo.access}` },
        };
        await API.put(`products/orders/${orderId}/deliver/`, {}, config);
        alert("Order status successfully updated.");
        fetchAdminData();
      } catch (error) {
        alert("Failed to update order status. Please try again.");
      }
    }
  };

  if (!stats) return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gray-50">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-black"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fcfcfc] text-gray-900 font-sans py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-12 border-b border-gray-200 pb-6">
          <h1 className="text-2xl md:text-3xl font-serif font-bold tracking-widest uppercase">Overview</h1>
          <p className="text-xs tracking-widest uppercase text-gray-500 mt-2">Executive Dashboard</p>
        </div>
        
        {/* 1. Stats Cards (Top Row) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          <div className="bg-white p-8 rounded-none border border-gray-200 shadow-sm relative overflow-hidden group">
            <div className="flex justify-between items-start mb-6">
              <p className="text-[10px] font-bold tracking-widest uppercase text-gray-500">Total Revenue</p>
              <DollarSign className="text-black" size={20} strokeWidth={1.5} />
            </div>
            <h3 className="text-4xl font-serif tracking-tight">${stats.totalSales.toFixed(2)}</h3>
            <div className="absolute bottom-0 left-0 h-1 bg-black w-0 group-hover:w-full transition-all duration-500"></div>
          </div>

          <div className="bg-white p-8 rounded-none border border-gray-200 shadow-sm relative overflow-hidden group">
            <div className="flex justify-between items-start mb-6">
              <p className="text-[10px] font-bold tracking-widest uppercase text-gray-500">Total Orders</p>
              <ShoppingBag className="text-black" size={20} strokeWidth={1.5} />
            </div>
            <h3 className="text-4xl font-serif tracking-tight">{stats.totalOrders}</h3>
            <div className="absolute bottom-0 left-0 h-1 bg-black w-0 group-hover:w-full transition-all duration-500"></div>
          </div>

          <div className="bg-white p-8 rounded-none border border-gray-200 shadow-sm relative overflow-hidden group">
            <div className="flex justify-between items-start mb-6">
              <p className="text-[10px] font-bold tracking-widest uppercase text-gray-500">Active Inventory</p>
              <Package className="text-black" size={20} strokeWidth={1.5} />
            </div>
            <h3 className="text-4xl font-serif tracking-tight">{stats.totalProducts}</h3>
            <div className="absolute bottom-0 left-0 h-1 bg-black w-0 group-hover:w-full transition-all duration-500"></div>
          </div>

        </div>

        {/* 2. Order Management Table */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-lg font-serif font-bold tracking-widest uppercase">Recent Transactions</h2>
        </div>
        
        <div className="bg-white border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-[10px] font-bold tracking-widest uppercase text-gray-500">Order Ref</th>
                  <th className="px-6 py-4 text-[10px] font-bold tracking-widest uppercase text-gray-500">Date</th>
                  <th className="px-6 py-4 text-[10px] font-bold tracking-widest uppercase text-gray-500 text-right">Amount</th>
                  <th className="px-6 py-4 text-[10px] font-bold tracking-widest uppercase text-gray-500 text-center">Status</th>
                  <th className="px-6 py-4 text-[10px] font-bold tracking-widest uppercase text-gray-500 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {stats.latestOrders.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-sm text-gray-500 italic tracking-wide">
                      No recent transactions found.
                    </td>
                  </tr>
                ) : (
                  stats.latestOrders.map(order => (
                    <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-5">
                        <span className="font-mono text-xs tracking-wider font-semibold">#ORD-{order.id}</span>
                      </td>
                      <td className="px-6 py-5 text-sm text-gray-600">
                        {new Date(order.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </td>
                      <td className="px-6 py-5 text-sm font-serif font-semibold text-right">
                        ${order.total_price}
                      </td>
                      <td className="px-6 py-5 text-center">
                        {order.is_delivered ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 text-[10px] font-bold uppercase tracking-widest border border-green-200">
                            <CheckCircle size={12} strokeWidth={2}/> Delivered
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-50 text-orange-700 text-[10px] font-bold uppercase tracking-widest border border-orange-200">
                            <Clock size={12} strokeWidth={2}/> Pending
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-5 text-right">
                         {!order.is_delivered ? (
                           <button 
                             onClick={() => markAsDelivered(order.id)}
                             className="text-[10px] font-bold uppercase tracking-widest text-black border border-black px-4 py-2 hover:bg-black hover:text-white transition-colors"
                           >
                             Fulfill Order
                           </button>
                         ) : (
                           <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-4 py-2">
                             Complete
                           </span>
                         )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;