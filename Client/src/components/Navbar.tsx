import { useEffect, useState, useContext, useRef } from "react"
import Search from "./Search"
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

interface NavProps {
  showLogo?:boolean;
}

const Navbar = ({showLogo}:NavProps) => {
  const [pastOrders, setPastOrders] = useState(0);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();
  const { cartCount, refreshCartCount } = useContext(CartContext)!;
  const profileRef = useRef<HTMLDivElement>(null);

  const categories = [
    "All Categories", "Electronics", "Fashion", "Home & Kitchen",
    "Beauty", "Sports & Fitness", "Books", "Toys & Games",
    "Grocery", "Gaming", "Furniture",
  ];

  const profileOptions = [
    { title: "Profile", path: "/profile", icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
    )},
    { title: "My Orders", path: "/my-orders", icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
        </svg>
    )},
    { title: "My Cart", path: "/my-cart", icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
      </svg>
    )},
    { title: "Saved Addresses", path: "/saved-address", icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
        </svg>
    )},
    { title: "Notifications", path: "/notification", icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
        </svg>
    )},
    { title: "Log out", path: "/login", icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9" />
      </svg>
    )},
  ];


  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    refreshCartCount();
    const getRecentOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3000/api/order", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (!response.ok) return;
        const last7days = data.orders.filter((order) => {
          const diff = (Date.now() - new Date(order.createdAt).getTime()) / (1000 * 60 * 60 * 24);
          return diff <= 7;
        });
        setPastOrders(last7days.length);
      } catch (err) {
        console.log(err);
      }
    };
    getRecentOrders();
  }, []);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === "all-categories") navigate("/");
    else navigate(`/category/${val}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="h-24 sticky top-0 flex items-center gap-5 z-10 border-b bg-gray-100">
      <div className="flex flex-1 items-center px-10">

        <div className="flex items-center gap-10">
          {
            showLogo && 
            <h1
              onClick={()=>navigate("/")}
              className="text-2xl font-bold cursor-pointer text-center">Sh<span className="text-indigo-9500">o</span><span className="text-indigo-800">py<span className="text-indigo-700">y</span></span>
            </h1>
          }
          <div className="flex items-center">
            {pastOrders > 0 && (
              <h1 className="text-2xl text-black/80">{pastOrders}</h1>
            )}
            <div className="border-r border-gray-400 h-4 mx-3"></div>
            <div className="flex flex-col text-sm">
              <p>Orders</p>
              <p className="text-gray-400 text-xs">Last 7 days</p>
            </div>
          </div>
        </div>

        <div className="flex-1 items-center flex justify-center">
          <div className="flex border-gray-400 rounded-full border max-w-4xl justify-center flex-1 gap-2 items-center">
            <select
              onChange={handleCategoryChange}
              className="py-1 px-5 outline-none text-indigo-700 bg-transparent"
            >
              {categories.map((cat, i) => (
                <option key={i} value={cat.toLowerCase().replace(/[^a-z0-9]+/g, "-")}>
                  {cat}
                </option>
              ))}
            </select>
            <div className="border h-8"></div>
            <Search/>
          </div>
        </div>

        <div className="ml-auto gap-5 flex items-center">
          <button onClick={() => navigate("/my-cart")} className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 rounded-full px-1.5 text-xs text-white bg-red-500">
                {cartCount}
              </span>
            )}
          </button>

          <button onClick={()=>navigate("/wishlist")}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
          </button>

          <div ref={profileRef} className="relative">
            <button onClick={() => setShowProfile(!showProfile)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </button>

            {showProfile && (
              <div className="absolute w-52 border rounded-xl shadow-md bg-white -left-44 top-9 p-2 z-20">
                {profileOptions.map((option) => (
                  <button
                    key={option.title}
                    onClick={() => {
                      if (option.title === "Log out") handleLogout();
                      else navigate(option.path);
                      setShowProfile(false);
                    }}
                    className={`flex items-center gap-2 p-2 w-full hover:bg-gray-100 rounded-lg text-sm text-left
                      ${option.title === "Log out" ? "text-red-500 hover:bg-red-50 mt-1 border-t pt-2" : ""}`}
                  >
                    {option.icon}
                    {option.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;