import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const statusStyles: Record<string, { label: string; class: string }> = {
  pending:    { label: "Pending",    class: "bg-amber-50 text-amber-700" },
  processing: { label: "Processing", class: "bg-blue-50 text-blue-700" },
  shipped:    { label: "Shipped",    class: "bg-purple-50 text-purple-700" },
  delivered:  { label: "Delivered",  class: "bg-green-50 text-green-700" },
  cancelled:  { label: "Cancelled",  class: "bg-red-50 text-red-700" },
};

const cancellable = ["pending", "processing"];

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const getOrders = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/order", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) return;
      setOrders(data.orders);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (orderId: string) => {
    setCancellingId(orderId);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3000/api/order/${orderId}/cancel`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) return;
      getOrders();
    } catch (err) {
      console.log(err);
    } finally {
      setCancellingId(null);
    }
  };

  useEffect(() => { getOrders(); }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-6 max-w-2xl">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-lg font-medium">My orders</h1>
            <span className="text-sm text-gray-400">{orders.length} orders</span>
          </div>

          {loading ? (
            <p className="text-sm text-gray-400">Loading orders...</p>
          ) : orders.length === 0 ? (
            <div className="border rounded-xl p-10 text-center">
              <p className="text-gray-400 text-sm">No orders yet.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {orders.map((order) => {
                const status = statusStyles[order.status] ?? statusStyles.pending;
                return (
                  <div key={order._id} className="border rounded-xl overflow-hidden">

                    <div className="flex items-center justify-between px-4 py-3 border-b">
                      <div>
                        <p className="text-sm font-medium">
                          #{order._id.slice(-6).toUpperCase()}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {new Date(order.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric", month: "long", year: "numeric"
                          })}
                        </p>
                      </div>
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${status.class}`}>
                        {status.label}
                      </span>
                    </div>

                    <div className="px-4 py-3 flex flex-col gap-2.5 border-b">
                      {order.products.map((item) => (
                        <div key={item._id} className="flex justify-between items-center">
                          <div>
                            <p className="text-sm">{item.product?.name ?? "Product"}</p>
                            <p className="text-xs text-gray-400">Qty {item.quantity}</p>
                          </div>
                          <span className="text-sm font-medium">
                            ₹{item.product?.price}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center px-4 py-3">
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                        </svg>
                        {order.address?.street}, {order.address?.city} {order.address?.pincode}
                      </div>
                      <span className="text-sm font-medium">₹{order.amount}</span>
                    </div>

                    {cancellable.includes(order.status) && (
                      <div className="px-4 pb-3">
                        <button
                          onClick={() => handleCancel(order._id)}
                          disabled={cancellingId === order._id}
                          className="text-xs text-red-500 hover:text-red-600 disabled:opacity-50 transition-colors"
                        >
                          {cancellingId === order._id ? "Cancelling..." : "Cancel order"}
                        </button>
                      </div>
                    )}

                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default MyOrders;