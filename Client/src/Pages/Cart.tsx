import { useEffect, useState } from "react"
import CartProductCard from "../components/CartProductCard";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import CartStatus from "../components/CartStatus";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
const Cart = () => {
  const [products,setProducts] = useState([]);
  const { setCartCount } = useContext(CartContext)!;
  const totalPrice = products.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalDiscount = products.reduce((sum,item) => sum + (item.product.price * item.product.discount / 100) * item.quantity,0);
  const discount = 0;
  const token = localStorage.getItem("token");
  const getCart = async () => {  
    try{
        const response = await fetch("http://localhost:3000/api/cart",{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        })
        const data = await response.json();
        if(!response.ok){
            console.log("Failed to fetch cart");
            return;
        }
        setProducts(data.cart.products);
        console.log('Cart fetched successfully');
    }catch(err){
        console.log("Error in Cart",err);
    }
  }

  const clearCart = async () => {
        try {
            const response = await fetch(
                "http://localhost:3000/api/cart/clear",
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                console.log("Failed to clear cart");
                return;
            }
            setCartCount(0);
            await getCart();
        } catch (err) {
            console.log(err);
        }
    };

  useEffect(()=>{
    getCart();
  },[])

  return (
    <>  
        <Navbar/>
        <CartStatus status="cart"/>
        <div className="flex gap-5 px-32">
            <div className="flex-1 border rounded-2xl shadow-sm p-5 space-y-5">
                <div className="flex justify-between">
                    <div className="flex gap-3 items-center">
                        <h1 className="font-semibold text-2xl">Cart</h1>
                        <span className="text-gray-400">({products.length} Products)</span>
                    </div>
                    <div
                        onClick={clearCart}
                        className="flex text-red-500 items-center text-sm gap-1 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                        Clear cart
                    </div>
                </div>
                <div className="flex flex-1 justify-between px-5 ">
                    <h2 className="">Products</h2>
                    <h2 className="">Count</h2>
                    <h2 className="">Price</h2>
                    <h2 className="px-6"></h2>
                </div>
                <div className="flex flex-col gap-2 h-[320px] overflow-y-auto px-5">
                    {
                        products.length === 0 && (
                            <div className="text-center py-10 text-gray-400 flex justify-center items-center h-full">
                                No products in cart
                            </div>
                        )
                    }
                    {products.map((item) => (
                        <CartProductCard
                            key={item.product._id}
                            productId={item.product._id}
                            name={item.product.name}
                            img={item.product.images[0]}
                            price={item.product.price}
                            quantity={item.quantity}
                            getCart={getCart}
                        />
                    )
                    )}
                </div>
            </div>
            <div className="w-96 border h-80 rounded-2xl shadow-sm bg-gray-50 px-5 ">
                <div className="border-b space-y-5 py-5">
                    <h1 className="text-lg font-semibold">Promo code</h1>
                    <div className="flex border py-1 px-2 rounded-full">
                        <input type="text" placeholder="Type here..." className="flex-1 outline-none px-1 rounded-full"/>
                        <Button color="bg-black rounded-full w-24">Apply</Button>
                    </div>
                </div>
                <div className="flex flex-col space-y-2 my-5">
                    <div className="flex justify-between text-gray-400 text-sm">
                        <span>Subtotal</span>
                        <span>₹{totalPrice}</span>
                    </div>
                    <div className="flex justify-between text-gray-400 text-sm">
                        <span>Discount</span>
                        <span>- ₹{totalDiscount}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Total</span>
                        <span>₹{totalPrice-totalDiscount}</span>
                    </div>
                    <Button color="bg-black">Continue to checkout</Button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Cart
