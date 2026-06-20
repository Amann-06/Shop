import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
interface CartProductCardProps {
    productId: string;
    img:string;
    name:string;
    quantity:number;
    price:number;
    getCart: () => Promise<void>;
}
const CartProductCard = ({productId,name,img,quantity,price,getCart}:CartProductCardProps) => {
  const [count,setCount] = useState(quantity);
  const navigate = useNavigate();
  const updateCart = async (newCount:number) =>{
    const token  = localStorage.getItem("token");
    try{
        const response = await fetch("http://localhost:3000/api/cart",{
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                productId,
                quantity:newCount
            })
        });
        const data = await response.json();
        if(!response.ok){
            console.log("Failed to update cart");
            return;
        }
        console.log("Cart updated successfully");
    }catch(err){
        console.log("Error in update cart",err);
    }
  }

  const deleteCart = async () => {
    const token = localStorage.getItem("token");
    try{
        const response = await fetch("http://localhost:3000/api/cart",{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                productId,
            })
        });
        if(!response.ok){
            console.log("Failed to delete product");
            return;
        }
        console.log("Product deleted successfully from cart");        
    }catch(err){
        console.log("Error in deleting",err);
    }
  }

    const handleIncrease = async () => {
        const newCount = count + 1;
        setCount(newCount);

        await updateCart(newCount);
        await getCart();
    };

    const handleDecrease = async () => {
        const newCount = Math.max(0, count - 1);
        if(newCount == 0)await deleteCart();
        else {
            setCount(newCount);
            await updateCart(newCount);
        }
        await getCart();
    };

  return (
    <div className="flex border shadow-sm items-center p-2 rounded-lg">
        <div className="flex flex-1 items-center justify-between">
            <div className=" flex gap-2 items-center flex-1">
                <div
                    onClick={()=>navigate(`/view-product/${productId}`)}
                    className="border h-20 w-20 bg-gray-100 rounded-lg">
                    <img src={img} alt="" className="object-cover object-center h-full w-full cursor-pointer" />
                </div>
                <h1
                    onClick={()=>navigate(`/view-product/${productId}`)}
                    className="hover:underline underline-offset-2 cursor-pointer">{name}</h1>
            </div>
            <div className="flex gap-3 items-center flex-1">
                <button
                    onClick={handleDecrease}
                    className="border rounded-full p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                    </svg>
                </button>
                <div>{count}</div>
                <button
                    onClick={handleIncrease}
                    className="border rounded-full p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </button>
            </div>
            <div className="flex-1">
                ₹{price}
            </div>
            <div
                onClick={async () => {await deleteCart();await getCart();}}
                className="p-2 text-red-500 cursor-pointer hover:scale-95 hover:text-red-700 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </div>
        </div>
    </div>
  )
}

export default CartProductCard
