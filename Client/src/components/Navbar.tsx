import { useState } from "react"
import Search from "./Search"
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [pastOrders,setPastOrders] = useState(0);
  const navigate = useNavigate();
  const { cartCount } = useContext(CartContext)!;
  return (
    <nav className="h-14 sticky top-0 bg-white flex items-center gap-5">
        <div className="flex flex-1 items-center px-10">       
            <div className="flex items-center">
                {
                    pastOrders > 0 &&
                    <h1 className="text-2xl text-black/80">{pastOrders}</h1>
                }
                <div className="border-r border-gray-400 h-4 mx-1"></div>
                <div className="flex flex-col text-sm">
                    <p>Orders</p>
                    <p className="text-gray-400 text-xs">Last 7 days</p>
                </div>
            </div>
            <div className="ml-auto gap-1 flex items-center">
                <button
                    onClick={()=>navigate("/my-cart")}
                    className="flex items-center gap-1 bg-gray-100 px-3 py-2 rounded-full shadow-sm border relative">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                    Cart
                    {
                        cartCount > 0 && <span className="absolute -top-1 right-0 border rounded-full px-1 text-xs text-white bg-red-500">{cartCount}</span>
                    }
                </button>
                <button className="flex items-center gap-1 bg-gray-100 px-2 py-2 rounded-full shadow-sm border">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                </button>
                <div className="bg-gray-100 h-10 shadow-sm border rounded-full items-center flex p-2 gap-1">
                    {/* <img className="border h-8 w-8 rounded-full bg-gray-500" src="" alt="" /> */}
                    <h2>Profile</h2>
                </div>
            </div>
        </div>
    </nav>
  )
}

export default Navbar;
