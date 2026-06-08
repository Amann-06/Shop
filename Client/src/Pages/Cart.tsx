import { useState } from "react"
import CartProductCard from "../components/CartProductCard";

const Cart = () => {
  const [products,setProducts] = useState([]);
  const token = localStorage.getItem("token");
  const getCart = async () => {  
    try{
        const response = await fetch("http://localhost:3000/api/cart/",{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                // Authorization: `Bearer ${token}`,
            }
        })
        const data = await response.json();
        if(!response.ok){
            console.log("Failed to fetch cart");
            return;
        }
        setProducts(data.products);
    }catch(err){

    }
  }
  return (
    <div>
      <CartProductCard/>
    </div>
  )
}

export default Cart
