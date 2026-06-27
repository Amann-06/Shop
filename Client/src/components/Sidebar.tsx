import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "./Button";
const Sidebar = () => {
  const navigate = useNavigate();
  const [lastOrders, setLastOrders] = useState([]);
  const  token = localStorage.getItem("token");
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  useEffect(() => {
    const getLastOrders = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:3000/api/order", {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await response.json();
            if (!response.ok) return;
            setLastOrders(data.orders.slice(0, 3));
        } catch (err) {
            console.log(err);
        }
    };
    getLastOrders();
}, []);
  return (
    <aside className="w-56 sticky border p-5 flex flex-col top-3 mx-5 rounded-3xl shadow-md max-h-[calc(100vh-25px)]">
      <h1
        onClick={()=>navigate("/")}
        className="text-2xl font-bold mb-5 cursor-pointer text-center">Sh<span className="text-indigo-9500">o</span><span className="text-indigo-800">py<span className="text-indigo-700">y</span></span></h1>
      <div className="text-sm">
        <ul className="space-y-2 font-medium">
            <li
                onClick={()=>navigate("/")}
                className="px-4 py-3 rounded-full hover:bg-indigo-600 transition-colors hover:text-white cursor-pointer flex gap-2 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 -mt-0.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
                Home
            </li>
            <li
                onClick={() => navigate("/categories")}
                className="px-4 py-3 rounded-full hover:bg-indigo-600 transition-colors hover:text-white cursor-pointer flex gap-1 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 -mt-0.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                </svg>
                Category
            </li>
            <li className="px-4 py-3 transition-colors rounded-full hover:bg-indigo-600 hover:text-white cursor-pointer flex gap-1 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 -mt-0.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 0 1 0 3.46" />
                </svg>
                New Arrivals
            </li>
        </ul>
        <ul className="space-y-2 mt-5 border-t py-3 font-medium">
            <h1 className="px-4 text-sm text-gray-400 font-normal">Quick actions</h1>
            <li
                onClick={()=>navigate("/add-product")}
                className="px-4 py-3 transition-colors rounded-full hover:bg-indigo-600 hover:text-white cursor-pointer flex gap-2 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 -mt-0.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Add product
            </li>
            <li 
                onClick={()=>navigate("/my-orders")}
                className="px-4 py-3 transition-colors rounded-full hover:bg-indigo-600 hover:text-white cursor-pointer flex gap-2 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 -mt-0.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                </svg>
                My Orders
            </li>
        </ul>
        <ul className="space-y-2 mt-5 border-t py-5">
            <h1 className="px-4 text-sm text-gray-400">Last orders</h1>
            {lastOrders.length === 0 ? (
                <li className="px-4 text-xs text-gray-300">No orders yet</li>
            ) : (
                lastOrders.map((order) => (
                    <li
                        key={order._id}
                        onClick={() => navigate("/my-orders")}
                        className="px-4 py-2 rounded-full hover:bg-indigo-600 hover:text-white transition-colors cursor-pointer group"
                    >
                        <p className="text-xs font-medium truncate">
                            #{order._id.slice(-6).toUpperCase()}
                        </p>
                        <p className="text-xs text-gray-400 transition-colors hover:text-white group-hover:text-white">
                            ₹{order.amount} · {order.status}
                        </p>
                    </li>
                ))
            )}
        </ul>
      </div>
      {
        token &&
        <Button
            onClick={handleLogout}
            color="bg-transparent text-black py-3 hover:shadow-sm hover:bg-indigo-600 hover:text-white rounded-full text-sm mt-auto" icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9" />
            </svg>
        }>Log out</Button>
      }
    </aside>
  );
};

export default Sidebar;