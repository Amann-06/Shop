import { useEffect, useState } from "react"
import Search from "./Search"
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [pastOrders,setPastOrders] = useState(0);
  const navigate = useNavigate();
  const { cartCount, refreshCartCount } = useContext(CartContext)!;
  const categories = [
    "All Categories",
    "Electronics",
    "Fashion",
    "Home & Kitchen",
    "Beauty",
    "Sports & Fitness",
    "Books",
    "Toys & Games",
    "Grocery",
    "Gaming",
    "Furniture",
    ];
  useEffect(()=>{
    refreshCartCount();
  },[])
  useEffect(() => {
    const getRecentOrders = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:3000/api/order", {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await response.json();
            if (!response.ok) return;
            const last7days = data.orders.filter((order) => {
                const orderDate = new Date(order.createdAt);
                const diff = (Date.now() - orderDate.getTime()) / (1000 * 60 * 60 * 24);
                return diff <= 7;
            });
            setPastOrders(last7days.length);
        } catch (err) {
            console.log(err);
        }
    };
    getRecentOrders();
    refreshCartCount();
}, []);
  return (
    <nav className="h-24 sticky top-0 bg-white flex items-center gap-5 z-10 border-b">
        <div className="flex flex-1 items-center px-10">       
            <div className="flex items-center">
                {
                    pastOrders > 0 &&
                    <h1 className="text-2xl text-black/80">{pastOrders}</h1>
                }
                <div className="border-r border-gray-400 h-4 mx-3"></div>
                <div className="flex flex-col text-sm">
                    <p>Orders</p>
                    <p className="text-gray-400 text-xs">Last 7 days</p>
                </div>
            </div>
            <div className="flex-1 items-center flex justify-center">
                <div className="flex border-gray-400 rounded-full border max-w-4xl justify-center flex-1 gap-2 items-center">
                    <select name="" id="" className="py-1 px-5 outline-none text-indigo-700">
                        {categories.map((categorie,i)=>(
                            <option key={i} value={categorie.toLowerCase().replace(/[^a-z0-9]+/g, "-")}>{categorie}</option>
                        ))}
                    </select>
                    <div className="border h-8"></div>
                    <Search/>
                </div>
            </div>
            <div className="ml-auto gap-5 flex items-center">
                <button
                    onClick={()=>navigate("/my-cart")}
                    className="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                    </svg>
                    {
                        cartCount > 0 && <span className="absolute -top-2 -right-2 rounded-full px-1.5 text-xs text-white bg-red-500">{cartCount}</span>
                    }
                </button>
                <button className="">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                </button>
                <button className="">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                </button>
            </div>
        </div>
    </nav>
  )
}

export default Navbar;
