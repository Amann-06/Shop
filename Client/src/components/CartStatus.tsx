import React from 'react'
import { useNavigate } from 'react-router-dom';
interface CartStatusProps {
    status:string;
}
const CartStatus = ({status}:CartStatusProps) => {
  const navigate = useNavigate();
  return (
    <div className='flex justify-center items-center h-16 mb-5 gap-3 text-sm px-10'>
      <button className="mr-auto flex items-center gap-1 text-gray-500 py-3 " onClick={()=>navigate(-1)}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
        </svg>
        <span className="hover:text-gray-700 transition-colors cursor-pointer">Back</span>
        <span>/</span>
        <span className='text-gray-600 font-medium'>{`${status === 'cart' ? "Cart" : status === "checkout"?"Checkout":"Payment"}`}</span>
      </button>
      <div className='flex flex-1 justify-center items-center gap-3'>
        <div className='flex gap-1 items-center'>
          <div className={`h-5 w-5 border rounded-full ${status === 'cart' ? 'border-black':''}`}></div>
          <span className={`${status === 'cart' ? 'text-black' : 'text-gray-300'}`}>Cart</span>
        </div>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-4 ${status === 'cart' ? 'text-black' : 'text-gray-300'}`}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </div>
        <div className='flex gap-1 items-center text-gray-300'>
          <div className={`h-5 w-5 border rounded-full ${status === 'checkout' ? 'border-black':''}`}></div>
          <span className={`${status === 'checkout' ? 'text-black' : 'text-gray-300'}`}>Checkout</span>
        </div>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-4 ${status === 'checkout' ? 'text-black' : 'text-gray-300'}`}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </div>
        <div className='flex gap-1 items-center text-gray-300'>
          <div className={`h-5 w-5 border rounded-full ${status === 'payment' ? 'border-black':''}`}></div>
          <span className={`${status === 'payment' ? 'text-black' : 'text-gray-300'}`}>Payment</span>
        </div>
      </div>
    </div>
  )
}

export default CartStatus
