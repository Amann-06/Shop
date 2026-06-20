import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import CartStatus from '../components/CartStatus'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'

const Checkout = () => {
  const [addresses, setAddresses] = useState([]);
  const [products,setProducts] = useState([]);
  const totalPrice = products.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalDiscount = products.reduce((sum,item) => sum + (item.product.price * item.product.discount / 100) * item.quantity,0);
  const navigate = useNavigate();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const getAddress = async () => {
    try{
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:3000/api/user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        });
        const data = await response.json();
        if(!response.ok){
            console.log("Error in fetching user address");
            return;
        }
        const addrs = data.data.addresses;
        setAddresses(addrs);
        const defaultAddr = addrs.find((a) => a.isDefault);
        if (defaultAddr) setSelectedAddress(defaultAddr._id); 
    }catch(err){
        console.log(err);
    }
  }

  const getCart = async () => {  
    try{
      const token = localStorage.getItem("token");
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

  useEffect(()=>{
    getAddress();
    getCart();
  },[])

  return (
    <div>
      <Navbar/>
      <CartStatus status='checkout'/>
      <div className='flex p-5 rounded-lg justify-center gap-5'>
        <div className='flex flex-1 flex-col space-y-2 border p-5 rounded-lg max-w-lg'>
            <h1 className='font-medium text-lg'>Your Address</h1>
            <h1>Saved Address</h1>
            <ul className="p-1 border rounded-md">
                {addresses.length === 0 ? (
                    <li className="text-gray-500 p-1">No saved addresses found.</li>
                ) : (
                    addresses.map((address) => (
                <li key={address._id} 
                    onClick={() => setSelectedAddress(address._id)}
                    className={`p-3 border-b last:border-b-0 cursor-pointer transition-colors
                      ${selectedAddress === address._id ? 'bg-blue-50' : 'hover:bg-gray-50'}`}>
                  <div className="flex items-center gap-2">
                    <input type="radio" readOnly checked={selectedAddress === address._id} />
                    <div>
                      <p>{address.street}, {address.city}</p>
                      <p className="text-sm text-gray-500">{address.state} {address.postalCode}, {address.country}</p>
                      { address.isDefault &&
                        <div className='border bg-blue-100 rounded-full w-fit py-0.5 px-2 text-xs'>Default</div>
                      }
                    </div>
                  </div>
                </li>
                    ))
                )}
            </ul>
            <Button onClick={()=>navigate("/add-address")}>Add a new address</Button>
        </div>
        <div className='border rounded-lg h-fit max-w-xs w-full pb-5'>
          <div className='h-14 items-center flex border-b px-5 gap-3'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            <h1 className='font-medium text-lg'>Order summary</h1>
          </div>
          <div className='px-5 flex-1 w-full'>
            <div className='py-2 border-b flex-1 w-full'>
              {products.map(item => (
                <div key={item.product._id} className='flex flex-col py-2 border-b last:border-b-0'>
                  <span className='text-sm font-medium text-gray-700'>{item.product.name}</span>
                  <div className='flex justify-between mt-0.5'>
                    <span className='text-xs text-gray-400'>Qty {item.quantity}</span>
                    <span className='text-sm font-medium'>₹{item.product.price}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className='my-2 flex flex-col space-y-1'>
                <div className="flex justify-between text-gray-400 text-sm">
                    <span>Subtotal</span>
                    <span>₹{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400 text-sm">
                    <span>Discount</span>
                    <span>- ₹{totalDiscount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span>Total</span>
                    <span>₹{(totalPrice-totalDiscount).toFixed(2)}</span>
                </div>
            </div>
            <button
              onClick={()=>navigate("/payment", {
                state: {
                  selectedAddress: addresses.find(a => a._id === selectedAddress),
                }
              })}
              className='mt-2 bg-black text-white w-full py-2 rounded-lg hover:bg-black/85 items-center flex flex-1 gap-3 justify-center'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
              Proceed to payment
            </button>
          </div>
          </div>
      </div>
    </div>
  )
}

export default Checkout
